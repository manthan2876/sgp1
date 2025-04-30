// const mongoose = require('mongoose');

// const PDAOrderSchema = new mongoose.Schema({
//   // postalCircle: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'PostalCircle',
//   //   required: true,
//   // },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   selectedCategories: {
//     type: Map, // Key: category
//     of: {
//       subcategories: [String], // Array of selected subcategories
//       quantity: { type: Number, min: 1 }, // Quantity for the category
//     },
//     required: true,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['accepted', 'pending','rejected'],
//     default: 'pending',
//   },
//   reason: {
//     type: String,
//     default: '', // If status is failed, store the reason here
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('PDAOrder', PDAOrderSchema);
