// const Comment = require("../models/Community-Comment.model");
// const Post = require('../models/Community-post.model'); // Ensure the path is correct

// // Add a comment to a post
// const addComment = async (req, res) => {
//     console.log("addComment API called"); // Debugging log
//     try {
//         const { postId, commentText } = req.body;

//         // Validate input
//         if (!postId || !commentText) {
//             console.error("Validation failed: Post ID or comment text missing"); // Debugging log
//             return res.status(400).json({ message: "Post ID and comment text are required" });
//         }

//         // Check if the post exists
//         const post = await Post.findById(postId);
//         if (!post) {
//             console.error(`Post not found for ID: ${postId}`); // Debugging log
//             return res.status(404).json({ message: "Post not found" });
//         }

//         // Create a new comment
//         const newComment = new Comment({
//             postId,
//             userId: req.user._id, // Assuming `req.user` is populated by authentication middleware
//             commentText,
//         });

//         // Save the comment
//         await newComment.save();

//         // Increment comments count on the post
//         post.commentsCount++;
//         await post.save();

//         console.log("Comment added successfully:", newComment); // Debugging log
//         res.status(201).json({
//             message: "Comment added successfully",
//             comment: newComment,
//         });
//     } catch (error) {
//         console.error("Error in addComment API:", error); // Debugging log
//         res.status(500).json({ error: error.message });
//     }
// };

// // Add this for logging during export
// console.log("Exporting addComment function:", typeof exports.addComment);

// module.exports = {
//     addComment,
// };



const Comment = require("../models/Community-Comments.model");
const Post = require('../models/Community-post.model'); // Ensure the path is correct

// Add a comment to a post
const addComment = async (req, res) => {
    console.log("addComment API called"); // Debugging log
    try {
        const { postId, commentText } = req.body;

        // Validate input
        if (!postId || !commentText) {
            console.error("Validation failed: Post ID or comment text missing");
            return res.status(400).json({ message: "Post ID and comment text are required" });
        }

        // Check if the user is authenticated
        if (!req.user || !req.user._id) {
            console.error("Unauthorized access: req.user is undefined");
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            console.error(`Post not found for ID: ${postId}`);
            return res.status(404).json({ message: "Post not found" });
        }

        // Create a new comment
        const newComment = new Comment({
            postId,
            userId: req.user._id, // Assuming `req.user` is populated by authentication middleware
            commentText,
        });

        // Save the comment
        await newComment.save();

        // Increment comments count on the post
        if (typeof post.commentsCount !== 'number') {
            post.commentsCount = 0; // Initialize if not present
        }
        post.commentsCount++;
        await post.save();

        console.log("Comment added successfully:", newComment);
        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error in addComment API:", error);
        res.status(500).json({ error: error.message });
    }
};
// Fetch comments for a specific post
const getCommentsForPost = async (req, res) => {
    // console.log("getCommentsForPost API called"); // Debugging log
    try {
        const { postId } = req.params; // Get postId from URL parameters

        // Validate input
        if (!postId) {
            console.error("Validation failed: Post ID missing");
            return res.status(400).json({ message: "Post ID is required" });
        }

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            console.error(`Post not found for ID: ${postId}`);
            return res.status(404).json({ message: "Post not found" });
        }

        // Fetch comments for the given post
        const comments = await Comment.find({ postId }).populate('userId', 'name email'); // Populate user details

        // Return the comments for the post
        res.status(200).json({
            message: "Comments fetched successfully",
            comments: comments,
        });
    } catch (error) {
        console.error("Error in getCommentsForPost API:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addComment,
    getCommentsForPost,
};

// Log export for debugging
// console.log("Exporting addComment function:", typeof addComment);
