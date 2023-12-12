// models/Product.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  reviews: [reviewSchema],
  inventory: { type: Number, default: 0 },
  category: { type: String, required: true },
  subCategory: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }], // Assuming you're storing image URLs
  isPublished: { type: Boolean, default: false },
});

// Middleware to set isPublished to true before saving
productSchema.pre('save', function (next) {
  if (!this.isPublished) {
    this.isPublished = true;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
