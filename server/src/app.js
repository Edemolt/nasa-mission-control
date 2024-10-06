const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { api } = require('./routes/api');

const app = express();

// Use the cors middleware to allow requests from http://localhost:3000
app.use(cors({
  origin: ['http://localhost:3000', 'http://13.233.119.128:8000'], // Allow multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/v1', api);

// Catch-all route for SPA (Single Page Application)
app.get('/*', (req, resp) => {
  resp.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
