require('dotenv').config();
//import express library
const express = require('express');
//import mongoose library
const mongoose = require('mongoose');
//create app variable to config the serve
const app = express();
const port = 5000;

//connect to the databae
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',() => console.log('connected to Database'));

//our server to accept json
app.use(express.json())

//set up routes
const subscribersRoutes = require('./routes/subscribers');
app.use('/subscribers',subscribersRoutes)


app.listen(port,()=>{
    console.log('Server Started')
});
