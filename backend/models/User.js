// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiration: {
    type: Date,
  },
  emailVerificationOTP: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ['customer', 'vendor'],
    default: 'customer',
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// Method to generate an authentication token (JWT)
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

userSchema.methods.uploadProfilePicture = async function (fileBuffer) {
  try {
    const result = await cloudinary.uploader.upload(fileBuffer, { folder: 'profile-pictures' });
    this.profilePicture = result.secure_url; // Save the new URL in the database
    return result;
  } catch (error) {
    throw new Error('Error uploading profile picture to Cloudinary');
  }
};

// Function to update profile picture to Cloudinary
userSchema.methods.updateProfilePicture = async function (fileBuffer) {
  try {
    const result = await cloudinary.uploader.upload(fileBuffer, { folder: 'profile-pictures' });
    this.profilePicture = result.secure_url; // Save the new URL in the database
    return result;
  } catch (error) {
    throw new Error('Error updating profile picture on Cloudinary');
  }
};

const User = mongoose.model('User', userSchema);

// Create a Vendor model
const vendorSchema = new mongoose.Schema({
  // Add vendor-specific fields here
});

// Inherit the user schema for common fields
vendorSchema.add(userSchema);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = { User, Vendor };
