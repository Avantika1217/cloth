const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Assuming you have an Order model

// Create a new order
router.post('/api/orders', async (req, res) => {
    try {
        const { name, address, product, quantity, total } = req.body;

        // Validate required fields
        if (!name || !address || !product || !quantity || !total) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Save order to the database
        const newOrder = new Order({ name, address, product, quantity, total });
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to place the order. Please try again later.' });
    }
});

// Get all orders (for admin)
router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders. Please try again later.' });
    }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order. Please try again later.' });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order. Please try again later.' });
    }
});

module.exports = router;