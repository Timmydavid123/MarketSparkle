const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  code: String,
  referredBy: String,
  timestamp: { type: Date, default: Date.now },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
