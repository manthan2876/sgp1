// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   PhilatelicItem: { type: mongoose.Schema.Types.ObjectId, ref: 'PhilatelicItem' },
//   quantity: { type: Number, min: 1 }
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     name: { type: String, required: true },
//     phone: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: Number,
//       country: String
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin','mediator'],
//       default: 'user'
//     },
//     cart: [cartItemSchema],
//     coins: { type: Number, default: 0 },
//     wallet_balance: { type: Number, default: 0 },
//     isSubscribed: { type: Boolean, default: false },
//     profileImage: { type: String }, 
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now }
//   }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

//prvious one before communnity badge add

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  PhilatelicItem: { type: mongoose.Schema.Types.ObjectId, ref: 'PhilatelicItem' },
  quantity: { type: Number, min: 1 }
});


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: {type:String,required: true},
  address: {
    street: String,
    city: String,
    state: String,
    pincode: Number,
    country: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'mediator'], 
    default: 'user'
  },
  cart: [cartItemSchema],
  wallet_balance: { type: Number, default: 0 },
  isSubscribed: { type: Boolean, default: false },
  isPDA :{ type: Boolean , default : false}, // true means user is PDA  user  otherwise normal user (new added 11/Dec)
  profileImage: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  // New fields for badges, gallery count, and likes
  badges: {
    type: [String],  // Array to hold multiple badges
    enum: ['Top Collector', 'Stamp Enthusiast', 'Philatelist', 'Community Favorite'],
    default: []
  },
  stampGalleryCount: { type: Number, default: 0 }, // Count of stamps in the gallery
  likesCount: { type: Number, default: 0 }, // Total likes received by the user
}, { timestamps: true });

// Middleware to automatically assign badges on save
userSchema.pre('save', function (next) {
  const user = this;

  // Clear current badges and recalculate them
  user.badges = [];

  if (user.stampGalleryCount >= 400) {
    user.badges.push('Philatelist');
  } else if (user.stampGalleryCount >= 200) {
    user.badges.push('Top Collector');
  } else if (user.stampGalleryCount >= 40) {
    user.badges.push('Stamp Enthusiast');
  }

  if (user.likesCount >= 500) {
    user.badges.push('Community Favorite');
  }

  next();
});

// Method to trigger badge reassignment manually
userSchema.methods.assignBadges = async function () {
  const user = this;

  // Clear current badges and recalculate them
  user.badges = [];

  if (user.stampGalleryCount >= 400) {
    user.badges.push('Philatelist');
  } else if (user.stampGalleryCount >= 200) {
    user.badges.push('Top Collector');
  } else if (user.stampGalleryCount >= 40) {
    user.badges.push('Stamp Enthusiast');
  }

  if (user.likesCount >= 500) {
    user.badges.push('Community Favorite');
  }

  return user.save();
};

module.exports = mongoose.model('User', userSchema);
