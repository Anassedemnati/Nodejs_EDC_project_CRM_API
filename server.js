const express = require('express');//import express
const connectDB = require('./config/db')

//initialisation du app variable
const app = express();
//Connect Database
connectDB();

//single end point
app.get('/', (req, res) => res.send('API Runing'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/deliverables', require('./routes/api/deliverables'));
app.use('/api/organization', require('./routes/api/organization'));

//port du serveur
//env look for variable env PORT to use for deploy
const PORT = process.env.PORT || 5000;

//ecouter sur le port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


