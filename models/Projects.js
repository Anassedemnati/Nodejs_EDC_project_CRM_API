const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        
    },

    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'organization'
    },
    montant: {
        type: Number,
        required: true,

    },
    date_start: {
        type: Date,
        default: Date.now
    },
    date_end: {
        type: Date,
        
    }
    
})

module.exports = Project = mongoose.model('project', ProjectSchema);