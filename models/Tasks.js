const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    ended: {
        type: Boolean,
        required: true
    },
    deleverable: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'deleverable'
    },

})

module.exports = Task = mongoose.model('task', TasksSchema);