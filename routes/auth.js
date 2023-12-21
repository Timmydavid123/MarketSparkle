const express = require('express');
const authController = require('../controllers/authController'); 
const productController=require('../controllers/productController')
const passport = require('passport');
const extractUserId = require('../middleware/extractUserId');
const checkTokenExpiration = require('../middleware/checkTokenExpiration');
const multer = require('multer');
const fs = require('fs');
const { User, Vendor } = require('../models/User');
const paymentLogic = require('../models/payment');
const chatController = require('../controllers/chatController');
const upload = require('../middleware/uploadMiddleware');
const ChatMessage = require('../models/ChatMessage');
const Referral = require('../models/referral');
const voucherController = require('../controllers/voucherController');

const router = express.Router();

// // Set up storage for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const isLoggedIn = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  next();
};

// Middleware to check if the user is a vendor
const isVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(403).json({ message: 'Unauthorized. Only vendors can access this route.' });
    }

    next();
  } catch (error) {
    console.error('Error checking vendor status:', error);
    res.status(500).json({ message: 'Internal Server Error checking vendor status' });
  }
};

router.post('/signup/vendor', authController.userSignup);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
router.post('/signup/vendor', authController.vendorSignup);

router.post('/login/user', authController.userLogin);
router.post('/login/vendor', authController.vendorLogin);
router.get('/vendor-profile', extractUserId, checkTokenExpiration, async (req, res) => {
  try {
    // Ensure that the user is a vendor
    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(403).json({ message: 'Unauthorized. Only vendors can access this route.' });
    }

    // Handle vendor profile route
    res.json({ message: 'Vendor profile route accessed successfully.', vendor });
  } catch (error) {
    console.error('Error accessing vendor profile:', error);
    res.status(500).json({ message: 'Internal Server Error accessing vendor profile' });
  }
});
router.post('/forgot-password/user', isLoggedIn, authController.forgotPasswordUser);
router.post('/verify-email-user', isLoggedIn, authController.verifyUserEmail);

// Protected routes for vendors
router.post('/forgot-password/vendor', authController.forgotPasswordVendor);
router.post('/verify-email-vendor',  authController.verifyVendorEmail);

// Routes accessible to both users and vendors
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/resend-otp', authController.resendOTP);

router.get('/user', extractUserId, authController.getUser);
// Protected route for getting user information
router.get('/users/:userId', isLoggedIn, authController.getUser);

// Protected route for getting vendor information
router.get('/vendors/:vendorId', isLoggedIn, isVendor, authController.getVendor);

// Route to update user profile
router.put('/update-profile', extractUserId, authController.updateUserProfile);

// Route to update Vendor Profile 
router.put('/update-vendor-profile', extractUserId, authController.updateVendorProfile);
// Route to get user orders/payment transactions
router.get('/user-orders', extractUserId, authController.getUserOrders);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a response
    res.redirect('/');
  }
);

// New routes for profile picture
router.post('/upload-profile-picture', extractUserId, upload.single('profilePicture'), authController.uploadProfilePicture);
router.post('/updateProfilePicture', extractUserId,  upload.single('profilePicture'), authController.updateProfilePicture);

// Product routes
router.post('/create-product', upload.array('files'), extractUserId, productController.createProduct);
router.put('/update-product/:productId', upload.array('files'), extractUserId, productController.updateProduct);
router.delete('/delete-product/:productId', extractUserId, productController.deleteProduct);


router.post('/send_message', chatController.sendMessage);
router.get('/get_messages', async (req, res) => {
  try {
    const { user_id, vendor_id } = req.query;
    const messages = await ChatMessage.find({ $or: [{ user_id, vendor_id }, { user_id: vendor_id, vendor_id: user_id }] })
      .sort({ timestamp: +1 }); // Change to -1 for descending order
    res.json({ messages });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/generate', voucherController.generateVoucher);
router.post('/validate', voucherController.validateVoucher);

// New route for retrieving products for the homepage
router.get('/homepage/products', async (req, res) => {
  try {
    const products = await Product.find().limit(10); // Limit the number of products as needed
    res.json(products);
  } catch (error) {
    console.error('Error fetching products for homepage:', error);
    res.status(500).json({ error: 'Internal Server Error fetching products for homepage' });
  }
});

router.post('/validateReferralCode', async (req, res) => {
  const { code } = req.body;

  // Your validation logic here
  // For simplicity, this example considers any non-empty code as valid
  if (code.trim() === '') {
    return res.status(400).json({ error: 'Referral code is invalid' });
  }

  // Check if the referral code exists
  const existingReferral = await Referral.findOne({ code });

  if (!existingReferral) {
    // Generate a new referral code
    const newReferral = new Referral({
      code,
    });

    try {
      // Save the referral code
      await newReferral.save();

      // Send the generated referral code to the user
      const user = await User.findOne(/* your query to find the user */);

      if (user) {
        // Update the referral information for the user
        user.referralCode = newReferral.code;
        await user.save();

        // Send an email with the referral code or use any other notification method
        const emailContent = `Hello ${user.fullName},

          Thank you for joining our platform! Your referral code is: ${newReferral.code}

          Share this code with your friends and earn rewards for each successful referral.

          Best regards,
          MarketSparkle`;

        mailer.sendEmail(user.email, 'Referral Code', emailContent);

        res.status(200).json({ message: 'Referral code generated and sent successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error generating and sending referral code:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Referral code already exists' });
  }
});
module.exports = router;
