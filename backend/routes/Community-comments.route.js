// routes/Community-commets.route.js
const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/Community-comments.controller'); // Ensure correct path
const authenticateuser = require('../middlewares/authenticateuser');
const { getCommentsForPost } = require('../controllers/Community-comments.controller'); // Ensure correct path

// POST route to add a comment
router.get('/:postId', getCommentsForPost);  // Pass postId as a URL parameter
router.post('/write',authenticateuser, addComment);  // Ensure addComment is correctly passed here

module.exports = router;
