const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://test:CwEXZbsqnc69hubT@cluster0.xjrzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});
    console.log("MongoDB Connected");
}

module.exports = connectDB;