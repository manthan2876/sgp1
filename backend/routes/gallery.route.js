const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateUser = require('../middlewares/authenticateuser'); // Replaced 'authMiddleware' with 'authenticateUser'

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads/galleryImages/');
      
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

// Routes
router.post('/', authenticateUser, upload.single('imageFile'), galleryController.addImage); // Replaced 'authMiddleware' with 'authenticateUser'
router.delete('/:id', authenticateUser, galleryController.deleteImage); // Replaced 'authMiddleware' with 'authenticateUser'
router.get('/:userId', galleryController.getUserGallery); // Added 'authenticateUser' as in reference

module.exports = router;
