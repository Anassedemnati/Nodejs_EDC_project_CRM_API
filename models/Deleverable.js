const mongoose = require('mongoose');

const DeleverableSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },

})

module.exports = Deleverable = mongoose.model('deleverable', DeleverableSchema);