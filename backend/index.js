const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const Job = require('./models/Job');

const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {Generator} = require('./helpers/CodeGen');
const {CppExecuter, PyExecuter} = require('./helpers/Exectuer')

app.get('/', (req,res) => {
    res.send("Hello");
})

app.post('/code', async (req,res) => {
    const {language, code} = req.body;
    if(!code)
    {
        return res.status(400).json({
            success: false,
            message: "Empty code body sent!"
        })
    }
    const filePath = await Generator(language, code); //Generator generates the .cpp/.py file that is needed for further processing

    const job = await new Job({language, filePath}).save();
    const jobID = job._id;
    console.log(job);
    console.log(jobID.toString());

    res.status(201).json({
        success: true,
        jobID
    });
    let outPut;
    job.startedAt = new Date();
    try {
        if(language=== "cpp")
        {
            outPut = await CppExecuter(filePath); //Executes the .cpp file
        }
        else
        {
            outPut = await PyExecuter(filePath);
        }
    job.completedAt = new Date();
    job.status = "success";
    job.output = outPut;

    await job.save();

    console.log(job);
    } catch (error) {
        job.completedAt = new Date();
        job.status = "error";
        const newErr = error.stderr.split(filePath).join("\n");
        job.output = newErr;
        await job.save();
        console.log(job);
        // return res.json({
        //     success: false,
        //     message: newErr
        // })
    }
    // res.json({
    //     success: true,
    //     output: outPut});
})

app.get('/status/:id', async (req,res) => {
    const jobID = req.params.id;
    if(jobID == undefined)
    {
        return res.status(400).json({
            success: false,
            error: "Wrong ID Params"
        })
    }
    try {
        const job = await Job.findById(jobID);
        if(job==undefined)
        {
            return res.status(400).json({
                success: false,
                error: "Invalid ID Params"
            })
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        })
    }
})

app.listen(4000, () => {
    console.log("The server is up and running at port 4000");
})