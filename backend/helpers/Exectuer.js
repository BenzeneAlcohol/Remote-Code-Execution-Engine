const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const codeOuput = path.join(__dirname, 'outputs');

if(!fs.existsSync(codeOuput)){
    fs.mkdirSync(codeOuput, {recursive: true});
}

const CppExecuter = (filePath) => {

    const jobID = path.basename(filePath).split(".")[0];
    const outPath = path.join(codeOuput, `${jobID}.exe`);

    try {
        return new Promise((resolve, reject) => {
            //`g++ ${filepath} -o ${outPath} && cd ${codeOutput} && ./${jobId}.out`, for LINUX
            exec(`g++ ${filePath} -o ${outPath} && cd ${codeOuput} && ${jobID}.exe`, (error, stdout, stderr)=>{
                if(error)
                {
                    reject({error, stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        })
    } catch (error) {
        return error;
    }
} 
const PyExecuter = (filePath) => {
    try {
        return new Promise((resolve, reject) => {
            exec(`python ${filePath}`, (error, stdout, stderr)=>{
                if(error)
                {
                    reject({error, stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        })
    } catch (error) {
        return error;
    }
} 

module.exports = {
    CppExecuter,
    PyExecuter
};