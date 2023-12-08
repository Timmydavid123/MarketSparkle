// extractUserId.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const extractUserId = (req, res, next) => {
  try {
    // Check if a token is provided in the header
    const token = req.header('x-auth-token');

    // If no token is provided, move to the next middleware or route
    if (!token) {
      return next();
    }

    // If a token is provided, extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error extracting user ID:', error);
    res.status(500).json({ message: 'Internal Server Error extracting user ID' });
  }
};

module.exports = extractUserId;
