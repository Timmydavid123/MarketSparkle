const mongoose = require('mongoose');
const User = require('./User');

const vendorSchema = new mongoose.Schema({
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  // ... (other vendor-specific fields)
});

// Inherit the user schema for common fields
vendorSchema.add(User.schema);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;





