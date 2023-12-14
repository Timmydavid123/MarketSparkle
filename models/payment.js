// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
