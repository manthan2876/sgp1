
const express = require('express');
const {
  getNews,
  createNews,
  getNewsById,
  updateNews,
  deleteNews
} = require('../controllers/news.controller');
// const authenticatePostalCircle = require('../middlewares/authenticatePostalCircle');
const isMediator = require('../middlewares/isMediator');
const router = express.Router();

router.get('/', getNews);
router.post('/',createNews);
router.get('/:id', getNewsById);
router.put('/:id',updateNews);
router.delete('/:id',deleteNews);

module.exports = router;
