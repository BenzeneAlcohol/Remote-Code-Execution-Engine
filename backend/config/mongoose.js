const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect('mongodb://localhost/Compiler', {useNewUrlParser: true});
    console.log("MongoDB Connected");
}

module.exports = connectDB;