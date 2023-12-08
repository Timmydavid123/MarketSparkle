  const sendEmail = require('../utils/sendEmail');
  const otpGenerator = require('otp-generator');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;
  const uuid = require('uuid');
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const axios = require('axios');
  const multer = require('multer');
  const extractUserId = require('../middleware/extractUserId');
  const cloudinary = require('cloudinary').v2;
  const { User, Vendor } = require('../models/User');
  const {Product} = require('../models/product')

    // Set up storage for multer
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });

    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database by their Google ID
        const existingUser = await User.findOne({ googleId: profile.id });
    
        if (existingUser) {
          // If the user exists, return the user
          return done(null, existingUser);
        }
    
        // If the user doesn't exist, create a new user in your database
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
        });
    
        // Return the newly created user
        return done(null, newUser);
      } catch (error) {
        // Handle any errors that occur during the process
        return done(error, null);
      }
    }));
    
      const authController = {
        signup: async (req, res) => {
          try {
            const { email, password, confirmPassword, fullName, role, streetAddress, city, state, country, zipCode } = req.body;
      
            // Check if the passwords match
            if (password !== confirmPassword) {
              return res.status(400).json({ message: 'Passwords do not match.' });
            }
      
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              return res.status(400).json({ message: 'User already exists with this email.' });
            }
      
            // Create a new user based on the specified role
            let newUser;
      
            if (role === 'vendor') {
              // Create a vendor
              newUser = await Vendor.create({
                email,
                password,
                fullName,
                streetAddress,
                city,
                state,
                country,
                zipCode,
                // Add other vendor-specific fields as needed
              });
            } else {
              // Create a regular user
              newUser = await User.create({
                fullName,
                email,
                password,
                
                // Add other user-specific fields as needed
              });
            }
      
            // Optionally, generate a token for the newly signed up user
            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });
      
            // Generate an OTP for email verification
            const emailVerificationOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      
            // Save the OTP in the user document
            newUser.emailVerificationOTP = emailVerificationOTP;
            await newUser.save();
      
            // Send the OTP to the user's email
            const emailText = `Your OTP for email verification is: ${emailVerificationOTP}`;
            await sendEmail(email, 'Email Verification OTP', emailText);
      
            res.status(201).json({ message: 'Signup successful. Email verification OTP sent.' });
          } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ message: 'Internal Server Error during signup' });
          }
        },
      
        login: async (req, res) => {
          try {
            const { email, password } = req.body;
        
            // Determine if the user is a regular user or a vendor
            const user = await User.findOne({ email });
            const vendor = await Vendor.findOne({ email });
        
            // Check if either a regular user or a vendor is found
            if (user || vendor) {
              // Choose the appropriate model based on the role
              const userModel = user || vendor;
        
              // Check if the user is verified
              if (!userModel.isVerified) {
                return res.status(401).json({ message: 'Email not verified. Please verify your email.' });
              }
        
              // Check the password
              const validPassword = await userModel.comparePassword(password);
              if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
              }
        
              // Generate a JWT token with expiration time set to 1 day
              const token = userModel.generateAuthToken();
        
              // Send the token in the response
              res.json({ token, message: 'Login successful' });
            } else {
              return res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal Server Error during login' });
          }
        },

        updateUserProfile: async (req, res) => {
          try {
            const userId = req.userId; // Extracted from the JWT token using extractUserId middleware
            console.log('User ID:', userId);
      
            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            // Extract updated profile information from the request body
            const { email, password, fullName } = req.body;
      
            // Update the user's profile information
            user.email = email || user.email;
            if (password) {
              // If a new password is provided, hash and update it
              const hashedPassword = await bcrypt.hash(password, 10);
              user.password = hashedPassword;
            }
            user.fullName = fullName || user.fullName;
      
            // Save the user with the updated profile
            await user.save();
      
            res.status(200).json({ message: 'User profile updated successfully' });
          } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ message: 'Internal Server Error updating user profile' });
          }
        },
      
        updateVendorProfile: async (req, res) => {
          try {
            const userId = req.userId; // Extracted from the JWT token using extractUserId middleware
            console.log('User ID:', userId);
      
            // Find the vendor by ID
            const vendor = await Vendor.findById(userId);
            if (!vendor) {
              return res.status(404).json({ message: 'Vendor not found' });
            }
      
            // Extract updated profile information from the request body
            const { email, password, confirmPassword, fullName, streetAddress, city, state, country, zipCode } = req.body;
      
            // Check if the passwords match
            if (password !== confirmPassword) {
              return res.status(400).json({ message: 'Passwords do not match.' });
            }
      
            // Update the vendor's profile information
            vendor.email = email || vendor.email;
            if (password) {
              // If a new password is provided, hash and update it
              const hashedPassword = await bcrypt.hash(password, 10);
              vendor.password = hashedPassword;
            }
            vendor.fullName = fullName || vendor.fullName;
            vendor.streetAddress = streetAddress || vendor.streetAddress;
            vendor.city = city || vendor.city;
            vendor.state = state || vendor.state;
            vendor.country = country || vendor.country;
            vendor.zipCode = zipCode || vendor.zipCode;
      
            // Save the vendor with the updated profile
            await vendor.save();
      
            res.status(200).json({ message: 'Vendor profile updated successfully' });
          } catch (error) {
            console.error('Error updating vendor profile:', error);
            res.status(500).json({ message: 'Internal Server Error updating vendor profile' });
          }
        },

        getUserOrders: async (req, res) => {
          try {
            const userId = req.userId; // Extracted from the JWT token using extractUserId middleware
            console.log('User ID:', userId);
      
            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            // Fetch user orders/payment transactions from your database
            // Modify this based on your data model and requirements
            const userOrders = await Order.find({ userId: user._id });
      
            res.status(200).json({ orders: userOrders });
          } catch (error) {
            console.error('Error getting user orders:', error);
            res.status(500).json({ message: 'Internal Server Error getting user orders' });
          }
        },

      forgotPassword: async (req, res) => {
        try {
          const { email } = req.body;

          // Check if the user exists
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          // Generate a password reset token
          const passwordResetToken = uuid.v4();

          // Save the password reset token and its expiration time in the user document
          user.passwordResetToken = passwordResetToken;
          user.passwordResetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

          await user.save();

          // Send the password reset email with the token link
          const resetLink = `https://frontend reset link/change-password?token${passwordResetToken}`;
          const emailText = `Click on the following link to reset your password: ${resetLink}`;
          await sendEmail(email, 'Password Reset', emailText);

          res.status(200).json({ message: 'Password reset instructions sent. Check your email.' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },

      resetPassword: async (req, res) => {
        try {
          const { token, newPassword, confirmPassword } = req.body;

          // Find the user by the reset token
          const user = await User.findOne({ passwordResetToken: token });

          // Check if the token is valid and not expired
          if (!user || user.passwordResetTokenExpiration < Date.now()) {
            return res.status(401).json({ message: 'Invalid or expired token' });
          }

          // Check if passwords match
          if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
          }

          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);

          // Update the user's password and clear the reset token fields
          user.password = hashedPassword;
          user.passwordResetToken = undefined;
          user.passwordResetTokenExpiration = undefined;

          await user.save();

          res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },

      logout: (req, res) => {
        try {
          // For Passport.js logout with a callback
          req.logout((err) => {
            if (err) {
              console.error('Error during logout:', err);
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              // Redirect to the home page or any other page after logout
              res.status(200).json({ message: 'Logout successful' });
            }
          });
        } catch (error) {
          console.error('Error during logout:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      

      verifyEmail: async (req, res) => {
        try {
          // Implement your email verification logic here
          // Example: compare the received OTP with the stored OTP
          const { email, otp } = req.body;
      
          // Retrieve the stored OTP from your database or any storage mechanism
          // Example: Fetch the user from the database
          const user = await User.findOne({ email });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Retrieve the stored OTP from the user document in the database
          const storedEmailVerificationOTP = user.emailVerificationOTP;
      
          if (otp === storedEmailVerificationOTP) {
            // Update the user's email verification status in the database
            // For example: await User.updateOne({ email }, { isVerified: true });
            user.isVerified = true;
            await user.save();
      
            res.status(200).json({ message: 'Email verified successfully.' });
          } else {  
            res.status(401).json({ message: 'Invalid OTP. Email verification failed.' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }

      },
      resendOTP: async (req, res) => {
        try {
          const { email } = req.body;
    
          // Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Generate a new OTP
          const newOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    
          // Update the user's OTP in the database
          user.emailVerificationOTP = newOTP;
          await user.save();
    
          // Send the new OTP to the user's email
          await sendEmail(email, 'Email Verification OTP', `Your new OTP is: ${newOTP}`);
    
          res.status(200).json({ message: 'New OTP sent successfully.' });
        } catch (error) {
          console.error('Error during OTP resend:', error);
          res.status(500).json({ message: 'Internal Server Error during OTP resend' });
        }
      },

      getUser: async (req, res) => {
        try {
          // Get the user ID from the request parameter
          const userId = req.params.userId;
    
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
            // If the user is not found, try to find a vendor
            const vendor = await Vendor.findById(userId);
            if (!vendor) {
              return res.status(404).json({ message: 'User or vendor not found' });
            }
    
            // Return vendor details with profile picture
            return res.status(200).json({
              role: 'vendor',
              fullName: vendor.fullName,
              email: vendor.email,
              profilePicture: vendor.profilePicture,
              // Add other vendor-specific fields as needed
            });
          }
    
          // Return user details with profile picture
          res.status(200).json({
            role: 'user',
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
            // Add other user-specific fields as needed
          });
        } catch (error) {
          console.error('Error getting user details:', error);
          res.status(500).json({ message: 'Internal Server Error getting user details' });
        }
      },  



      uploadProfilePicture: async (req, res) => {
        try {
          const userId = req.userId; // Extracted from the JWT token using extractUserId middleware
          console.log('User ID:', userId);
      
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Check if a file is uploaded
          if (req.file) {
            const result = await cloudinary.uploader.upload(
              req.file.path,
              { folder: 'profile-pictures' } // Set the folder in Cloudinary
            );
      
            user.profilePicture = result.secure_url; // Save the URL in the database
      
            await user.save();
      
            return res.status(200).json({ message: 'Profile picture uploaded successfully' });
          } else {
            return res.status(400).json({ message: 'No file uploaded' });
          }
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          res.status(500).json({ message: 'Internal Server Error uploading profile picture' });
        }
      },
    
      updateProfilePicture: async (req, res) => {
        try {
          const userId = req.userId;
          console.log('User ID:', userId);
      
          // Call the multer middleware to handle file upload
          upload(req, res, async (err) => {
            if (err) {
              console.error('Multer error:', err);
              return res.status(400).json({ message: 'Error uploading file' });
            }
      
            try {
              // Find the user by ID
              const user = await User.findById(userId);
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
      
              // Check if a file is uploaded
              if (req.file) {
                const result = await cloudinary.uploader.upload(
                  req.file.path,
                  { folder: 'profile-pictures' } // Set the folder in Cloudinary
                );
      
                user.profilePicture = result.secure_url; // Save the new URL in the database
      
                // Remove the file from your server after uploading to Cloudinary
                fs.unlinkSync(req.file.path);
      
                await user.save();
      
                res.status(200).json({ message: 'Profile picture updated successfully' });
              } else {
                return res.status(400).json({ message: 'No file uploaded' });
              }
            } catch (error) {
              console.error('Error updating profile picture:', error);
              res.status(500).json({ message: 'Internal Server Error updating profile picture' });
            }
          });
        } catch (error) {
          console.error('Error updating profile picture:', error);
          res.status(500).json({ message: 'Internal Server Error updating profile picture' });
        }
      },

      addReview: async (req, res) => {
        try {
          const userId = req.userId; // Assuming customer's user ID is stored in the JWT token
          const { productId, rating, comment } = req.body;
    
          // Find the product by ID
          const product = await Product.findById(productId);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
    
          // Create a new review
          const review = {
            customer: userId,
            rating,
            comment,
          };
    
          // Add the review to the product
          product.reviews.push(review);
    
          // Save the updated product
          await product.save();
    
          res.status(201).json({ message: 'Review added successfully' });
        } catch (error) {
          console.error('Error adding review:', error);
          res.status(500).json({ message: 'Internal Server Error adding review' });
        }
      },
    
      getReviews: async (req, res) => {
        try {
          const productId = req.params.productId;
    
          // Find the product by ID
          const product = await Product.findById(productId).populate('reviews.customer', 'fullName');
    
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
    
          res.status(200).json({ reviews: product.reviews });
        } catch (error) {
          console.error('Error getting reviews:', error);
          res.status(500).json({ message: 'Internal Server Error getting reviews' });
        }
      },
    };

    module.exports = authController;
