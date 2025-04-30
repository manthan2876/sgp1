// middlewares/isAdmin.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User.model'); // Import the PostalCircle model

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


// old Version
// module.exports = (req, res, next) => {
//   // Assuming req.user is set after authentication
//   console.log("role" , req.user)
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied. Admins only.' });
//   }
// };

// new Version
module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Invalid or missing Authorization header' });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }


  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Extract user ID from the token
    // console.log("Isadmin admin Id " , decoded.id);
    
    // Check if the user exists in the database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') { // Assuming the role field exists in your User model
      return res.status(403).json({ message: 'Access restricted to admins only' });
    }

    next(); // Proceed if the user is an admin
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
