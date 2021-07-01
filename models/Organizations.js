const mongoose = require('mongoose');

const OrganizationsSchema = new mongoose.Schema({
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
    adresse: {
        type: String,
        
    },

    tele: {
        type: String,
        required: true,

    },
    contact_name: {
        type: String,
        
    },
    contact_email: {
        type: String,
        required: true,
        unique: true
    },
    web_site: {
        type: String,
        required: true,
    }
    
})

module.exports = Organization = mongoose.model('organization', OrganizationsSchema);