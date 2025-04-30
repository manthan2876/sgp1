// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [{
//     philatelicItem: { type: mongoose.Schema.Types.ObjectId, ref: 'PhilatelicItem', required: true },
//     quantity: { type: Number, required: true },
//     fulfilledQuantity: { type: Number, default: 0 }, // Quantity fulfilled by admin
//     price: { type: Number, required: true },
//   }],
//   totalAmount: { type: Number, required: true },
//   paymentMethod: { type: String, enum: ['wallet'], required: true },
//   paymentStatus: { type: String, enum: ['paid'], default: 'paid' }, // Default as 'paid' since it's wallet
//   orderStatus: { type: String, enum: ['processing', 'partially_fulfilled', 'fulfilled', 'cancelled'], default: 'processing' },
//   fulfilledByAdmin: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Order', orderSchema);
