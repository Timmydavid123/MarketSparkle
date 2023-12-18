const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  referredBy: String,
  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timestamp: { type: Date, default: Date.now },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
