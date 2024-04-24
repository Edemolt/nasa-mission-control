const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const  { api }= require('./routes/api');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Allow requests from this origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));

app.use('/v1', api);

app.get('/*', (req,resp) => {
    resp.sendFile(path.join(__dirname,"..","public","index.html"));
})

module.exports = app;

