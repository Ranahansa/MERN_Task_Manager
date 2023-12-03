const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim : true,
        required: true,
        maxlength: 20,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Task', taskSchema)