const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { api } = require('./routes/api');

const app = express();

// Use the cors middleware to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies (if you're using them)
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
