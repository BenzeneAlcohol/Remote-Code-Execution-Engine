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

module.exports = {
    CppExecuter
};