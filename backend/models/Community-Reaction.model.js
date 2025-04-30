const mongoose = require("mongoose");
const Post = require('../models/Community-post.model');  // Correct path


const ReactionSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    reactionType: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", ReactionSchema);
