const express = require('express');
require('dotenv').config();
const router = express.Router();
const { register, login, logout ,sendOTP, verifyOTP,sendEmailOTP, verifyEmailOTP} = require('../controllers/auth.controller');

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', logout);

router.post('/send-otp', sendOTP);

router.post('/verify-otp', verifyOTP);

router.post('/send-email-otp', sendEmailOTP);

// Route to verify email OTP
router.post('/verify-email-otp', verifyEmailOTP);




module.exports = router;
