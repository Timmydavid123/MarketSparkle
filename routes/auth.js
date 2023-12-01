const express = require('express');
const authController = require('../controllers/authController'); 
const passport = require('passport');
const extractUserId = require('../middleware/extractUserId');
const checkTokenExpiration = require('../middleware/checkTokenExpiration');
const multer = require('multer');
const { User, Vendor } = require('../models/User');

const router = express.Router();

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/vendor-profile', extractUserId, checkTokenExpiration, async (req, res) => {
  try {
    // Ensure that the user is a vendor
    const vendor = await Vendor.findById(req.userId);

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
router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/resend-otp', authController.resendOTP);
router.get('/user', extractUserId, authController.getUser);
router.get('/users/:userId', authController.getUser);

// Route to update user profile
router.put('/update-profile', extractUserId, authController.updateUserProfile);

// Route to update Vendor Profile 
router.put('/update-vendor-profile', extractUserId, authController.updateVendorProfile);
// Route to get user orders/payment transactions
router.get('/user-orders', extractUserId, authController.getUserOrders);

// New routes for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google Sign-In
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Redirect to the desired page after successful Google Sign-In
  res.redirect('/chat');
});

// New routes for profile picture
router.post('/upload-profile-picture', extractUserId, upload.single('profilePicture'), authController.uploadProfilePicture);
router.post('/update-profile-picture/:userId', extractUserId, upload.single('profilePicture'), authController.updateProfilePicture);

module.exports = router;
