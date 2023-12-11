const Product = require('../models/product');
const axios = require('axios'); 

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, category, subCategory, price, isPublished } = req.body;
      const vendorId = req.userId; // Assuming the user is a vendor
      const images = [];

      // Assuming req.files is an array of image files
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'product_images' });
        images.push(result.secure_url);
      }

      const product = await Product.create({
        name,
        description,
        vendor: vendorId,
        category,
        subCategory,
        price,
        images,
        isPublished,
      });

      // Send product information to the homepage
      await axios.post('http://localhost:3000/homepage/products', {
        id: product._id,
        name: product.name,
        image: product.images[0], 
        amount: product.price,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error creating product' });
    }
  },



  editProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      // Fetch the existing product details
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Extract updated fields from the request body
      const { name, category, brand, size, productDate, description } = req.body;

      // Update the product details
      existingProduct.name = name || existingProduct.name;
      existingProduct.category = category || existingProduct.category;
      existingProduct.brand = brand || existingProduct.brand;
      existingProduct.size = size || existingProduct.size;
      existingProduct.productDate = productDate || existingProduct.productDate;
      existingProduct.description = description || existingProduct.description;

      // Handle image updates (if any)
      if (req.files && req.files.length > 0) {
        const updatedImages = [];
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, { folder: 'product_images' });
          updatedImages.push(result.secure_url);
        }
        existingProduct.images = updatedImages;
      }

      // Save the updated product
      const updatedProduct = await existingProduct.save();

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error editing product:', error);
      res.status(500).json({ message: 'Internal Server Error editing product' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      // Fetch the existing product details
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Extract updated fields from the request body
      const { name, category, brand, size, productDate, color, gender } = req.body;

      // Update the product details
      existingProduct.name = name || existingProduct.name;
      existingProduct.category = category || existingProduct.category;
      existingProduct.brand = brand || existingProduct.brand;
      existingProduct.size = size || existingProduct.size;
      existingProduct.productDate = productDate || existingProduct.productDate;
      existingProduct.color = color || existingProduct.color;
      existingProduct.gender = gender || existingProduct.gender;

      // Handle image updates (if any)
      if (req.files && req.files.length > 0) {
        const updatedImages = [];
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, { folder: 'product_images' });
          updatedImages.push(result.secure_url);
        }
        existingProduct.images = updatedImages;
      }

      // Save the updated product
      const updatedProduct = await existingProduct.save();

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal Server Error updating product' });
    }
  },


  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal Server Error deleting product' });
    }
  },
};

module.exports = productController;