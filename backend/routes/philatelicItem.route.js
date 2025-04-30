// routes/philatelicItemRoutes.js
const express = require('express');
const { getPhilatelicItems, createPhilatelicItem,getPhilatelicItemsByPostCircle,updatePhilatelicItem,getPhilatelicItemsByPref } = require('../controllers/philatelicItem.controller');
// const authenticatePostalCircle = require('../middlewares/authenticatePostalCircle');
const authMiddleware = require('../middlewares/authenticateuser');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();
router.get('/',getPhilatelicItems); // without login items can retrive so middleware is not  used
// router.get('/postalcircle',authenticatePostalCircle,getPhilatelicItemsByPostCircle);
router.get('/prefrence-data',authMiddleware,getPhilatelicItemsByPref);
// router.post('/create-item', aut,upload.single('imageFile'), createPhilatelicItem);
// router.put('/:itemID',authenticatePostalCircle,updatePhilatelicItem);

module.exports = router;
