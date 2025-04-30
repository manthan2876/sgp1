const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const dotenv = require('dotenv');
require('dotenv').config();

module.exports = async (req, res, next) => {
  // Retrieve token from the cookies
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Invalid or missing Authorization header' });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Set user for next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Old version
// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user; // Set user for next middleware
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };