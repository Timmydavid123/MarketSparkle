require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const extractUserId = require('../middleware/extractUserId')
const cloudinary = require('cloudinary').v2;
const paymentLogic = require('../models/payment');


// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmlw4ytpo',
  api_key: '829542326545393',
  api_secret: 'u9hZkf9oCidRFZxLkii_LUmiJSs',
});

const app = express();
const PORT = process.env.PORT || 5000;

const { MONGODB_URI } = process.env;

// console.log('MongoDB Connection URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3001','http://localhost:3000','http://localhost:3002'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization',
};

// Handle preflight requests
app.options('*', cors(corsOptions));

// Use the CORS middleware for all routes
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}))
app.use(extractUserId);



// Using helmet middleware for secure headers
app.use(helmet());

// Initialize Passport and use the express-session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
