const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const codeOuput = path.join(__dirname, 'outputs');

if(!fs.existsSync(codeOuput)){
    fs.mkdirSync(codeOuput, {recursive: true});
}

const CppExecuter = (filePath) => {

    var isWin = process.platform === "win32";

    const jobID = path.basename(filePath).split(".")[0];
    const outPath = path.join(codeOuput, `${jobID}.exe`);

    if(isWin)
    {
        try {
            return new Promise((resolve, reject) => {
                //`g++ ${filePath} -o ${outPath} && cd ${codeOuput} && ./${jobID}.out`, for LINUX
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
    else
    {
        try {
            return new Promise((resolve, reject) => {
                //`g++ ${filePath} -o ${outPath} && cd ${codeOuput} && ./${jobID}.out`, for LINUX
                exec(`g++ ${filePath} -o ${outPath} && cd ${codeOuput} && ./${jobID}.out`, (error, stdout, stderr)=>{
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