// models/Vendor.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  // Add other vendor-specific fields here
});

// Inherit the user schema for common fields
vendorSchema.add(User.schema);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
