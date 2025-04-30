


exports.updatePhilatelicItem = async (req, res) => {
  const { itemID } = req.params; // Extract the item ID from URL parameters
  const updateData = req.body; // The data to be updated
  console.log(itemID, updateData);
  try {
    // Fetch the existing item to validate `subitem` based on the `category`
    const existingItem = await PhilatelicItem.findById(itemID);
    // console.log("item",existingItem); 
    if (!existingItem) {
      return res.status(404).json({ message: 'Philatelic item not found' });
    }

    // Validate `subitem` based on the `category`
    const categoryToSubitemType = {
      Stamps: ['MintCommemorativeStamps', 'MintDefinitiveStamps', 'TopMarginalBlock', 'BottomMarginalBlock', 'FullSheet'],
      Covers: ['FirstDayCoversAffixed', 'FirstDayCoversBlank', 'FirstDayCoverPack'],
      Brochures: ['InformationBrochureAffixed', 'InformationBrochureBlank'],
      Packs: ['AnnualStampPack', 'ChildrenSpecialAnnualStampPack', 'SpecialCollectorsStampPack'],
      Souvenirs: ['MiniSheet/SouvenirSheet'],
      PostalStationery: 'number', // PostalStationery expects a number
      OtherItems: 'string' // OtherItems expects a string
    };

    if (updateData.subitem) {
      const category = updateData.category || existingItem.category; // Use new or existing category
      const subitemType = categoryToSubitemType[category];

      if (category === 'PostalStationery' && typeof updateData.subitem !== 'number') {
        return res.status(400).json({ message: 'Subitem must be a number for PostalStationery category' });
      }

      if (category === 'OtherItems' && typeof updateData.subitem !== 'string') {
        return res.status(400).json({ message: 'Subitem must be a string for OtherItems category' });
      }

      if (Array.isArray(subitemType) && !subitemType.includes(updateData.subitem)) {
        return res.status(400).json({
          message: `Invalid subitem for category ${category}. Allowed values are: ${subitemType.join(', ')}`
        });
      }
    }

    // Update the philatelic item
    const updatedItem = await PhilatelicItem.findByIdAndUpdate(
      itemID,
      updateData,
      { new: true, runValidators: true } // Return the updated item and validate
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Philatelic item not found' });
    }

    res.status(200).json({
      message: 'Philatelic item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating philatelic item:', error);
    res.status(500).json({
      message: 'An error occurred while updating the philatelic item',
      error: error.message
    });
  }
};
const PhilatelicItem = require("../models/PhilatelicItem.model");
exports.getPhilatelicItems = async (req, res) => {
  try {
    // Filter items where featured is true
    const philatelicItems = await PhilatelicItem.find().populate(
      "postal_circle"
    );
    // console.log('Phil', philatelicItems);
    res.status(200).json(philatelicItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPhilatelicItemsByPostCircle = async (req, res) => {
  try {
    const postalCircleId = req.postCircle._id; // Access the postalCircle attached in middleware

    console.log("postalcircle id", postalCircleId);
    // Fetch philatelic items associated with the postal circle
    const philatelicItems = await PhilatelicItem.find({
      postal_circle: postalCircleId,
    });

    if (!philatelicItems || philatelicItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No philatelic items found for this postal circle" });
    }

    res.status(200).json(philatelicItems); // Return the fetched items
  } catch (error) {
    console.error("Error fetching philatelic items:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching philatelic items" });
  }
};
// exports.createPhilatelicItem = async (req, res) => {
//   const postal_circle = req.postalCircleId
//   // console.log("PostCircle ID : ",postal_circle);
//   try {
//     const philatelicItem = new PhilatelicItem({...req.body, postal_circle}); // take postalCircle Id from middleware
//     await philatelicItem.save();
//     res.status(201).json(philatelicItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const PhilatelicItem = require('../models/PhilatelicItem');

// exports.createPhilatelicItem = async (req, res) => {
//   try {
//     const { name, description, category, subitem, price, stock, specifications, status } = req.body;

//     // Check if a file was uploaded
//     let imageUrl = null;
//     if (req.file) {
//       imageUrl = `${req.protocol}://${req.get('host')}/uploads/philatelicItemImg/${encodeURIComponent(req.file.filename)}`;
//     }

//     // Create new philatelic item
//     const philatelicItem = new PhilatelicItem({
//       name,
//       description,
//       category,
//       subitem,
//       price,
//       stock,
//       specifications,
//       image: imageUrl, // Store the uploaded image URL
//       status: status || 'active',
//     });

//     // Save to database
//     await philatelicItem.save();

//     res.status(201).json({
//       message: 'Philatelic item created successfully',
//       philatelicItem,
//     });
//   } catch (error) {
//     console.error('Error creating philatelic item:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

const PDA = require('../models/PDA.model');
exports.getPhilatelicItemsByPref = async (req, res) => {
  try {
    // Retrieve the authenticated user from the request
    const user = req.user;

    // Validate user existence
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch philatelic inventory for the specific user
    const userPhilatelicItems = await PDA.find({user});

    if (user.isPDA) {
      // Respond with user details and their philatelic inventory for PDA users
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          address: user.address,
          isPDA: user.isPDA,
        },
        philatelicItems: userPhilatelicItems,
      });
    } else {
      // Respond with only user details for normal users
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          address: user.address,
          isPDA: user.isPDA,
        },
        philatelicItems: [], // Normal users don't see their inventory
      });
    }
  } catch (error) {
    console.error('Error fetching philatelic items:', error);
    res.status(500).json({ message: 'An error occurred while fetching philatelic items' });
  }
};
