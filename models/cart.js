const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;