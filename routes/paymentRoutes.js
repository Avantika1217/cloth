const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

// Create a new payment
router.post("/api/payment", async (req, res) => {
    try {
        const { name, email, address, city, state, pinCode, paymentMethod, amount } = req.body;

        // Validate required fields
        if (!name || !email || !address || !city || !state || !pinCode || !paymentMethod || !amount) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        // Create and save the new payment
        const newPayment = new Payment({ name, email, address, city, state, pinCode, paymentMethod, amount });
        await newPayment.save();
        res.status(201).json({ message: "Payment saved successfully!" });
    } catch (error) {
        console.error("Error saving payment:", error);
        res.status(500).json({ error: "Failed to save payment. Please try again later." });
    }
});

// Get all payments (for admin)
router.get("/api/payments", async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: "Failed to fetch payments. Please try again later." });
    }
});

// Get a specific payment by ID
router.get("/api/payment/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found." });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ error: "Failed to fetch payment. Please try again later." });
    }
});

// Delete a payment by ID
router.delete("/api/payment/:id", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found." });
        }
        res.status(200).json({ message: "Payment deleted successfully." });
    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({ error: "Failed to delete payment. Please try again later." });
    }
});

module.exports = router;