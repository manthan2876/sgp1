// // models/Community-post.model.js

// const mongoose = require('mongoose');

// // Define the Post schema
// const PostSchema = new mongoose.Schema({
//   userId: { 
//     type: String, 
//     required: true,  // This field is mandatory to track which user created the post
//   },
//   content: { 
//     type: Object, 
//     required: true,  // The content of the post (textual content)
//   },
//   mediaUrl: { 
//     type: String, 
//     default: null,  // URL of the media file (optional)
//   },
//   likesCount: { 
//     type: Number, 
//     default: 0,  // Initially, the post will have 0 likes
//   },
//   dislikesCount: { 
//     type: Number, 
//     default: 0,  // Initially, the post will have 0 dislikes
//   },
//   commentsCount: { 
//     type: Number, 
//     default: 0,  // Initially, the post will have 0 comments
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now,  // Automatically sets the date when the post is created
//   },
//   updatedAt: { 
//     type: Date, 
//     default: Date.now,  // Automatically sets the date when the post is updated
//   },
// });

// // Create a method to update the post's updatedAt field whenever it is modified
// PostSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Create and export the Post model based on the schema
// const Post = mongoose.model('Post', PostSchema);

// module.exports = Post;


const mongoose = require('mongoose');

// Define the Post schema
const PostSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  // Changed to ObjectId
    ref: 'User',  // Reference to the User model
    required: true,  // This field is mandatory to track which user created the post
  },
  content: { 
    type: Object, 
    required: true,  // The content of the post (textual content)
  },
  mediaUrl: { 
    type: String, 
    default: null,  // URL of the media file (optional)
  },
  likesCount: { 
    type: Number, 
    default: 0,  // Initially, the post will have 0 likes
  },
  dislikesCount: { 
    type: Number, 
    default: 0,  // Initially, the post will have 0 dislikes
  },
  commentsCount: { 
    type: Number, 
    default: 0,  // Initially, the post will have 0 comments
  },
  createdAt: { 
    type: Date, 
    default: Date.now,  // Automatically sets the date when the post is created
  },
  updatedAt: { 
    type: Date, 
    default: Date.now,  // Automatically sets the date when the post is updated
  },
});

// Create a method to update the post's updatedAt field whenever it is modified
PostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Post model based on the schema
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
