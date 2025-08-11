const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle user registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Failed to register. Please try again later.' });
    }
});

// Handle user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user
        const user = await User.authenticate(email, password);
        res.status(200).json({ message: 'Login successful!', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ error: error.message || 'Login failed.' });
    }
});

module.exports = router;