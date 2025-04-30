// models/PostalCircle.js
const mongoose = require('mongoose');

const postalCircleSchema = new mongoose.Schema({
  unique_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  // if two admin then we know that which admin created this postCircle
  region: { type: String, required: true },
  state: { type: String, required: true },
  address: {
    street: String,
    city: String,
    pincode: String
  },
  bank_details: {
    account_number: String,
    ifsc_code: String,
    bank_name: String,
    branch_name: String
  },
  coin_rules: [{
    minimum_order_amount: Number,
    coins_to_give: Number
  }],
  total_revenue: { type: Number, default: 0 }, // like wallet
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PostalCircle', postalCircleSchema);
