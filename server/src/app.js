const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { api } = require('./routes/api');

const app = express();

// Properly configure CORS only once using the cors middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies (if you use them)
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/v1', api);

app.get('/*', (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

let users = [];

// Helper function to check if user exists and return user reference
const getUser = (username) => {
    return users.find(user => user.username === username);
};

// Helper function to check if user exists
const userExists = (username) => {
    return users.some(user => user.username === username);
};

// Endpoint to handle user sign-up
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    if (userExists(username)) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    // Create user with loginAttempts initialized to 0
    users.push({ username, password, loginAttempts: 0 });
    res.status(201).json({ message: 'User created successfully.' });
});

// Endpoint to handle user sign-in
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    const user = getUser(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username.' });
    }

    // Check if user is temporarily locked out due to too many failed attempts
    if (user.loginAttempts >= 3) {
        return res.status(403).json({ message: 'Account locked due to too many failed login attempts.' });
    }

    if (user.password !== password) {
        user.loginAttempts++; // Increment login attempts on failure
        return res.status(401).json({ message: 'Invalid password.', loginAttempts: user.loginAttempts });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    res.status(200).json({ message: 'User signed in successfully.', loginAttempts: user.loginAttempts });
});

module.exports = app;
