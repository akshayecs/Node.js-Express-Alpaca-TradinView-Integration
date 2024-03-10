require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const axios = require('axios');
const path = require('path');
const routes = require('./routes/index')

const connectDB = require('./config/db')
connectDB();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(express.static('public'))



// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


// ?Template Engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

app.use('/api',routes)

console.log("port",port);
app.listen (port,(err) => {
    if(err){
        console.log(err.message);
    }
    console.log(`Server is listening on port: ${port}`);
});
