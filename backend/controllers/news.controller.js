const mongoose = require('mongoose');
const News = require('../models/News.model.js');
const PostalCircleModel = require('../models/PostalCircle.model.js');

// Create a news item (defaults to isApproved: false)
exports.createNews = async (req, res) => {
  try {
    const { postalCircle, ...newsData } = req.body;

    console.log("in api",req.body);
    // Find the postal circle by its name
    const postal_circle = await PostalCircleModel.findOne({ name: postalCircle });

    if (!postal_circle) {
      return res.status(404).json({ message: "Postal Circle not found" });
    }

    // Create the news document with the postal circle ID
    const news = new News({
      ...newsData,
      postal_circle: postal_circle._id, // Use the ID of the found postal circle
      isApproved: false, // Set isApproved to false by default
    });

    // Save the news document
    await news.save();

    // Populate the postal circle name in the response
    await news.populate('postal_circle', 'name');

    // Send the response
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch all new approbed and newly created it handle in UI 
exports.getNews = async (req, res) => {
  try {
    // Fetch news where status is "accept" or "pending" and isApproved is true
    const news = await News.find({ 
      status: { $in: ['accept', 'pending'] },
    }).populate('postal_circle', 'name');
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a news item by ID, only if approved
exports.getNewsById = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const news = await News.findOne({ _id: id, isApproved: true });
    if (!news) return res.status(404).json({ message: 'News not found or not approved' });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a news item by ID
exports.updateNews = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Retrieve the existing news item
    const existingNews = await News.findById(id);
    if (!existingNews) return res.status(404).json({ message: 'News not found' });

    const updateData = { ...req.body };

    // Keep the original isApproved status if not explicitly updated in req.body
    if (req.body.isApproved === undefined) {
      updateData.isApproved = existingNews.isApproved;
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new :true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a news item by ID
exports.deleteNews = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const news = await News.findByIdAndDelete(id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
