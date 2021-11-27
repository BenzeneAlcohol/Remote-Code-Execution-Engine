const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {Generator} = require('./helpers/CodeGen');
const {CppExecuter} = require('./helpers/Exectuer')

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
    let outPut;
    try {
        outPut = await CppExecuter(filePath); //Executes the .cpp file
    } catch (error) {
        const newErr = error.stderr.split(filePath).join("\n");
        return res.json({
            success: false,
            message: newErr
        })
    }
    res.json({
        success: true,
        output: outPut});
})

app.listen(4000, () => {
    console.log("The server is up and running at port 4000");
})