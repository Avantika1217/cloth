// filepath: c:\Users\cool\Documents\woman\routes\contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel'); // Ensure this model exists

// Handle contact form submission
router.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        // Validate required fields
        if (!firstName || !email || !message) {
            return res.status(400).json({ error: 'First name, email, and message are required.' });
        }

        // Save contact data to the database
        const newContact = new Contact({ firstName, lastName, email, phone, message });
        await newContact.save();

        res.status(201).json({ message: 'Contact info saved successfully!' });
    } catch (error) {
        console.error('Error saving contact info:', error);
        res.status(500).json({ error: 'Failed to save contact info. Please try again later.' });
    }
});

module.exports = router;