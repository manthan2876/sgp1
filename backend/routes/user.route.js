const express = require("express");
const multer = require("multer"); // Multer import
const { getOrderHistory, addStampToGallery } = require('../controllers/user.controller');  // Correctly importing the controller

const {
  addToCart,
  updateCartItemQuantity,
  getCartItems,
  removeCartItem,
  updateDeliveryAddress,
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  updateUserProfile,
  getUserById,
} = require("../controllers/user.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/authenticateuser"); //check use
const isAdmin = require("../middlewares/isAdmin");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages"); // Directory for profile images
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
});

// Existing routes
// router.get('/orderHistory',authMiddleware,getOrderHistory);
router.get('/orderHistory', authMiddleware, getOrderHistory);
router.get("/:userId", getUserById);
// In your routes file
// router.get('/order-history', getOrderHistory);
router.get('/cart/items', authMiddleware, getCartItems);
router.post("/cart/add", authMiddleware, addToCart);
router.put("/cart/editItem/:cartItemId", authMiddleware, updateCartItemQuantity);
router.put("/cart/remove/:cartItemId", authMiddleware, removeCartItem);

// http://localhost:5173/items/my-cart/checkout
router.put("/updateDeliveryaddress",authMiddleware,updateDeliveryAddress)
router.get("/wishlist/:id", authMiddleware, getWishlist);
router.post("/wishlist/add", authMiddleware, addProductToWishlist);
router.delete(
  "/wishlist/remove/:productId",
  authMiddleware,
  removeProductFromWishlist
);

// New route for updating user profile with upload
router.put(
  "/profile/update",
  authMiddleware,
  upload.single("profileImage"),
  updateUserProfile
);

// router.post('/update-badges', authMiddleware, updateBadges);

// Route to add a stamp to the user's gallery
router.post('/add-stamp', authMiddleware, addStampToGallery);


module.exports = router;
