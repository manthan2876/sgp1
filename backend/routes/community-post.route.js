
// const express = require("express");
// const {
//   createPost,
//   deletePost,
//   getFeedPosts,
//   getUserPosts,
// } = require("../controllers/Community-post.controller");
// const authenticateUser = require("../middlewares/authenticateuser");
// const authenticatePostalCircle = require("../middlewares/authenticatePostalCircle");

// const router = express.Router();

// // Routes
// router.post("/create", authenticateUser, createPost); // Create post (authenticated users only)
// router.delete("/:id", authenticateUser, deletePost); // Delete post (authenticated users only)
// router.get("/feed", authenticateUser, getFeedPosts); // Get all posts for feed (authenticated)
// router.get("/user/:userId", authenticateUser, getUserPosts); // Get user's posts (authenticated)

// module.exports = router;



//old before removvign ccircle id work complete 


const express = require("express");
const multer = require('multer');
const path = require('path');
const fs= require('fs');
const {
  createPost,
  deletePost,
  getFeedPosts,
  getUserPosts,
} = require("../controllers/Community-post.controller");
const authenticateUser = require("../middlewares/authenticateuser"); // Middleware to authenticate normal users


// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/postImages/');
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); 
    }

    cb(null, uploadPath);  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image and video files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed!'), false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, 
});

const router = express.Router();

// Routes
router.post("/create", authenticateUser,upload.single('mediaFile'), createPost); // Create post (authenticated users only)
router.delete("/delete/:id", authenticateUser, deletePost); // Delete post (authenticated users only)
router.get("/feed", getFeedPosts); // Get all posts for feed (authenticated users only)
router.get("/user/:userId", authenticateUser, getUserPosts); // Get posts by user (authenticated users only)

module.exports = router;
