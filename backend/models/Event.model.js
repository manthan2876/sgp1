// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postal_circle: { type: mongoose.Schema.Types.ObjectId, ref: 'PostalCircle', required: true },
  isApproved: { type: Boolean, default: false },
  image: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String },
  endTime: { type: String },
  location: { type: String },
  registrationLink: { type: String },
  postedDate: { type: Date, default: Date.now },
  lat: { type: Number },
  lng: { type: Number },
  status: {
    type: String,
    enum: ['accept', 'reject','pending'], // Only 'accept' or 'reject' are allowed
    default: 'pending', // Default value if not provided
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

