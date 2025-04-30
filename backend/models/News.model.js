const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  postal_circle: { type: mongoose.Schema.Types.ObjectId, ref: 'PostalCircle', required: true },
  isApproved: { type: Boolean, default: false },
  postedTime: { type: Date, default: Date.now },
  youtubeUrl: { type: String }, // Field for YouTube URL
  status: {
    type: String,
    enum: ['accept', 'reject','pending'], // Only 'accept' or 'reject' are allowed
    default: 'pending', // Default to 'reject' if not explicitly set
  }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
