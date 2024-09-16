const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    },
    description: {
        type: String,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
