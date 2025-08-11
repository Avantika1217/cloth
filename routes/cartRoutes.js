// filepath: c:\Users\cool\Documents\woman\routes\cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Ensure this model exists

// Add an item to the cart
router.post('/api/cart', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate required fields
        if (!productId || !quantity) {
            return res.status(400).json({ error: 'Product ID and quantity are required.' });
        }

        // Save the cart item to the database
        const newCartItem = new Cart({ productId, quantity });
        await newCartItem.save();

        res.status(201).json({ message: 'Item added to cart successfully!' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart. Please try again later.' });
    }
});

// Get all items in the cart
router.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items. Please try again later.' });
    }
});

module.exports = router;