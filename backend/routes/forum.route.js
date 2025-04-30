const express = require('express');
const { createMessage, getAllMessages, likeMessage } = require('../controllers/forum.controller');
const authenticateUser = require('../middlewares/authenticateuser');

const router = express.Router();

router.post('/messages', authenticateUser, createMessage); // Create a new message
router.get('/messages', authenticateUser, getAllMessages); // Get all messages


module.exports = router;
