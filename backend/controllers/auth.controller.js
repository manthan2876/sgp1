const bcrypt = require('bcrypt');
const axios = require('axios');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config(); 
const JWT_SECRET = process.env.JWT_SECRET;
const twilio = require('twilio');
const { generateOTP, isOTPExpired } = require('../utils/otp.js');
dotenv.config();

const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const client = twilio(process.env.tailio_ID_1,process.env.tailio_ID_2);

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '5d'  // 1 day
    }
  );
};

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, name, phone ,isPDA} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            phone,
            role: "user",
            isPDA
        });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token after saving the user to access `newUser._id`
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });

        // Send the token in response to save it in localStorage
        res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);
    console.log(token);

    // Send token in response body
    res.status(200).json({ 
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token // Send token so it can be stored in localStorage on frontend
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
exports.logout = (req, res) => {
    // Clear the localStorage token on the frontend (handled in frontend code)
    console.log("Inside logout function of backend");
    
    // Respond with a success message
    return res.status(200).json({ message: 'Logout successful' });
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user is set by the authenticateUser middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Current User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();

    // Store OTP with 5 minutes expiry
    otpStore.set(phoneNumber, {
      otp,
      expiry: Date.now() + 5 * 60 * 1000,
    });

    if (client) {
      // Send SMS via Twilio
      await client.messages.create({
        body: `Your OTP for verification is: ${otp}`,
        to: "+91" + phoneNumber,
        from: '+12707139063'
      });
      res.json({ message: 'OTP sent successfully' });
    } else {
      // Development mode - return OTP in response
      console.log('Twilio credentials not configured, running in development mode');
      res.json({ message: 'OTP sent successfully', otp });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    console.log(phoneNumber, otp);
    const storedData = otpStore.get(phoneNumber);

    if (!storedData || isOTPExpired(storedData.expiry) || storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    otpStore.delete(phoneNumber);
    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Email OTP Store (use Redis for production)
const emailOtpStore = new Map();

// Send Email OTP
exports.sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(); // Use the same generateOTP function
    console.log(`Generated OTP for email ${email}: ${otp}`);

    // Store OTP with 5 minutes expiry
    emailOtpStore.set(email, {
      otp,
      expiry: Date.now() + 5 * 60 * 1000,
    });

    // Send email
    await sendEmail(
      email,
      'Your OTP for Verification',
      `Your OTP for verification is: ${otp}`
    );

    res.json({ message: 'OTP sent to email successfully' });
  } catch (error) {
    console.error('Error sending email OTP:', error);
    res.status(500).json({ error: 'Failed to send email OTP' });
  }
};

// Verify Email OTP
exports.verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedData = emailOtpStore.get(email);

    if (!storedData || isOTPExpired(storedData.expiry) || storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    emailOtpStore.delete(email); // Remove OTP after successful verification
    res.json({ message: 'Email OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    res.status(500).json({ error: 'Failed to verify email OTP' });
  }
};
