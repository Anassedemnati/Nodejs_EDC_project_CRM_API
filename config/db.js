const mongoose = require('mongoose');
const config = require("config")
//importer la chaine de conection du config.js
const db = config.get('mongoURI')
//olde 
// mongoose.connect(db)
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })// return promise 
        console.log('MongoDB Connected...')

    } catch (err) {
        console.error(err.message);
        //exit process whith failure
        process.exit(1);

    }
}

module.exports = connectDB;