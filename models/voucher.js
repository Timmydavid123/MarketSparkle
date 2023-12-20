// voucher.js
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
