const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pinCode: String,
    paymentMethod: String,
    amount: Number,
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

module.exports = Payment;