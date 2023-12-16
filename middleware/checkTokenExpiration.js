const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      // No token provided, move to the next middleware or route
      return next();
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error('Token verification failed:', err);

        // Optionally, you can distinguish between token expiration and other verification failures
        if (err.name === 'TokenExpiredError') {
          // Token has expired
          console.error('Token has expired.');
        }

        // Handle the error or log additional information
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Token is valid, proceed with additional checks (if needed)
      const currentTime = Date.now(); // Current time in milliseconds
      const expirationTime = decoded.exp * 1000; // Convert seconds to milliseconds

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds

      if (currentTime > expirationTime + oneDayInMilliseconds) {
        console.error('Token expired after one day.');
        return res.status(401).json({ message: 'Token expired after one day' });
      }

      // Token is valid and not expired, continue to the next middleware or route
      next();
    });
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(500).json({ message: 'Internal Server Error during token verification' });
  }
};
