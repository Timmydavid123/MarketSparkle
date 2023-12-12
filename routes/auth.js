const express = require('express');
const authController = require('../controllers/authController'); 
const productController=require('../controllers/productController')
const passport = require('passport');
const extractUserId = require('../middleware/extractUserId');
const checkTokenExpiration = require('../middleware/checkTokenExpiration');
const multer = require('multer');
const { User, Vendor } = require('../models/User');
const paymentLogic = require('../models/payment');
const chatController = require('../controllers/chatController');
const upload = require('../middleware/uploadMiddleware');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();

// // Set up storage for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post('/signup/user', authController.userSignup);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
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
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email-user', authController.verifyUserEmail);
router.post('/verify-email-vendor', authController.verifyVendorEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/resend-otp', authController.resendOTP);
router.get('/user', extractUserId, authController.getUser);
router.get('/users/:userId', authController.getUser);
router.get('/users/:vendorId', authController.getUser);

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

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a response
    res.redirect('/');
  }
);

router.get('/auth/instagram',
  passport.authenticate('instagram')
);

router.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a response
    res.redirect('/');
  }
);

// New routes for profile picture
router.post('/upload-profile-picture', extractUserId, upload.single('profilePicture'), authController.uploadProfilePicture);
router.post('/update-profile-picture/:userId', extractUserId, upload.single('profilePicture'), authController.updateProfilePicture);

// Product routes
router.post('/create-product', upload.array('files'), extractUserId, productController.createProduct);
router.put('/update-product/:productId', upload.array('files'), extractUserId, productController.updateProduct);
router.delete('/delete-product/:productId', extractUserId, productController.deleteProduct);



router.post('/make-transfer', async (req, res) => {
  const { AccountNumber, Bank, AccountName } = req.body;

  try {
    const transferResult = await paymentLogic.processTransfer(
      AccountNumber,
      Bank,
      AccountName
    );

    res.status(200).json(transferResult);
  } catch (error) {
    console.error('Error processing transfer:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route for processing a card payment
router.post('/make-card-payment', async (req, res) => {
  const { cardDetails } = req.body;

  try {
    const cardPaymentResult = await paymentLogic.processCardPayment(cardDetails);

    res.status(200).json(cardPaymentResult);
  } catch (error) {
    console.error('Error processing card payment:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route for processing a Flutterwave payment
router.post('/make-flutterwave-payment', async (req, res) => {
  const { amount, email, phoneNumber } = req.body;

  try {
    const flutterwavePaymentResult = await paymentLogic.processFlutterwavePayment(
      amount,
      email,
      phoneNumber
    );

    res.status(200).json(flutterwavePaymentResult);
  } catch (error) {
    console.error('Error processing Flutterwave payment:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/send_message', chatController.sendMessage);

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

module.exports = router;
