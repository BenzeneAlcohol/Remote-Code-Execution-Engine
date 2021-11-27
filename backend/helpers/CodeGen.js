const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const codeDirectory = path.join(__dirname, 'Codes');

if(!fs.existsSync(codeDirectory)){
    fs.mkdirSync(codeDirectory, {recursive: true});
}


const Generator = async (format, code) => {
    const codeID = uuid();
    const fileName = `${codeID}.${format}`;
    const filePath = path.join(codeDirectory, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath;
}

module.exports={
    Generator
};