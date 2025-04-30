const mongoose = require('mongoose');

const philatelicItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Stamps', 
      'Covers', 
      'Brochures', 
      'Packs', 
      'Souvenirs', 
    //   'PostalStationery', 
    //   'OtherItems'
    ]
  },
  subitem: {
    type: mongoose.Schema.Types.Mixed, // Flexible field for number or string depending on category
    validate: {
      validator: function(value) {
        const categoryToSubitemType = {
          Stamps: ['MintCommemorativeStamps', 'MintDefinitiveStamps', 'TopMarginalBlock', 'BottomMarginalBlock', 'FullSheet'],
          Covers: ['FirstDayCoversAffixed', 'FirstDayCoversBlank', 'FirstDayCoverPack'],
          Brochures: ['InformationBrochureAffixed', 'InformationBrochureBlank'],
          Packs: ['AnnualStampPack', 'ChildrenSpecialAnnualStampPack', 'SpecialCollectorsStampPack'],
          Souvenirs: ['MiniSheet/SouvenirSheet'],
        //   PostalStationery: 'number', // PostalStationery expects a number (e.g., quantity, identifier, postal number)
        //   OtherItems: 'string' // OtherItems expects a string (e.g., name or description of the item)
        };

        // If subitem is not provided, allow it to be empty for some categories
        if (!value) return true; 

        // For PostalStationery, value must be a number
        if (this.category === 'PostalStationery') {
          return typeof value === 'number';
        }

        // For OtherItems, value must be a string
        if (this.category === 'OtherItems') {
          return typeof value === 'string';
        }

        // For other categories, validate against a predefined list of subitems
        return categoryToSubitemType[this.category]?.includes(value);
      },
      message: props => `${props.value} is not a valid subitem for the selected category`
    }
  },
  // postal_circle: { type: mongoose.Schema.Types.ObjectId, ref: 'PostalCircle', required: true }, 
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: {type : String,required :true},
  visibility: {
    type: String,
    enum: ['both', 'normal_users', 'pda_users'],
  },
  notify: {
    type: String,
    enum: ['both', 'normal_users', 'pda_users'],
    required : true
  },
  specifications: {
   year: {
            type: [String], // Array of strings
            required: true,
        },
    // dimensions: {type :String,required :true},
    // rarity: { type: Boolean, default: false }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out_of_stock'],
    default: 'active'
  },
  featured: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PhilatelicItem', philatelicItemSchema);
