const express = require('express');//import express
const connectDB = require('./config/db')

//initialisation du app variable
const app = express();
//Connect Database
connectDB();

//single end point
app.get('/', (req, res) => res.send('API Runing'));

//port du serveur
//env look for variable env PORT to use for deploy
const PORT = process.env.PORT || 5000;

//ecouter sur le port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


