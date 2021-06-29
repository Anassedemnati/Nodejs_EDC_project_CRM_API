const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    tele: {
        type: String,
        required: true,
        unique: true
    },
    adresse: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

module.exports = User = mongoose.model('user', UserSchema);