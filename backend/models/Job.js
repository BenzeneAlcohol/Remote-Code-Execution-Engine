const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["cpp", "py"]
    },
    filePath: {
        type: String,
        required: true
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    output: {
        type: String
    },
    status: {
        type: String,
        default: "ongoing",
        enum: ["ongoing", "success", "error"]
    }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;