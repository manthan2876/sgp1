const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
  rejectNews,
  rejectEvents,
  getAllOrders,
  approveNews,
  getItem,
  approveEvents,
  createPhilatelicItem,
  getAllPostCircleDetail,
  getTotalPostalCircles,
  getTotalUsers,
  getTotalPDAAccounts,
  getTotalIncomeForCurrentMonth,
  } = require("../controllers/admin.dashboard.controller");
// const {createPostalCircle} = require("../controllers/postalCircle.controller")
const isAdmin = require('../middlewares/isAdmin');
const authenticateisuser = require('../middlewares/authenticateuser');
const multer = require('multer');
const path =require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads/philatelicItemImg/');
      
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


// Route definition
//Admin controller routes

//Admin dashboard controller routes
router.get('/allpostCircleDetail',isAdmin,getAllPostCircleDetail);
router.get('/total-postal-circles',isAdmin,getTotalPostalCircles);
router.get('/total-users',isAdmin,getTotalUsers);
router.get('/total-pda-accounts',isAdmin, getTotalPDAAccounts);
router.get("/total-income-current-month",isAdmin, getTotalIncomeForCurrentMonth);

router.get('/get-item',getItem);
// router.post('/create-postal-circle', isAdmin, createPostalCircle)
// router.post('/create-item',isAdmin,createPhilatelicItem)
router.post('/create-item',isAdmin,upload.single('image'), createPhilatelicItem);
router.put('/approve-news/:id', isAdmin, approveNews);
router.put('/approve-event/:id', isAdmin, approveEvents);
router.put('/reject-news/:id', isAdmin, rejectNews);
router.put('/reject-event/:id',isAdmin, rejectEvents);
router.get('/getAllOrders',isAdmin, getAllOrders);
 
module.exports = router;