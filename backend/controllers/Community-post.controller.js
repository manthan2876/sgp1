

//old one before circle id remove complete work 

const Post = require('../models/Community-post.model');  // Correct path
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  try {
    // Extract form data from the request body
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    let mediaUrl = null;
    let mediaType = null;

    // If a file is uploaded, store the media URL and type
    if (req.file) {
      mediaUrl = `${req.protocol}://${req.get('host')}/uploads/postImages/${encodeURIComponent(req.file.filename)}`; // File URL to access it from frontend
      mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    }

    // Create a new post object
    const newPost = new Post({
      userId: req.user.id, // Extract user from middleware (auth)
      content: {
        text: content,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
      },
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json({ 
      message: "Post created successfully", 
      post: savedPost 
    });

  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure the user owns the post
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get posts for feed
exports.getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email"); // Populate user info (name & email)

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Trim any unnecessary whitespace or newline characters
    const trimmedUserId = userId.trim();

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(trimmedUserId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    console.log("Fetching posts for user ID:", trimmedUserId);

    // Fetch posts for the user with the valid userId
    const userPosts = await Post.find({ userId: trimmedUserId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    // Return the user posts
    res.status(200).json(userPosts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
