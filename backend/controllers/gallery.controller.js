const Gallery = require('../models/gallery.model');
const path = require('path');
const fs = require('fs');

exports.addImage = async (req, res) => {
  try {
    // Handle file upload using multer
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    // Validate name and description
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }

    // Save the image URL (relative URL)
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/galleryImages/${encodeURIComponent(req.file.filename)}`;

    // Create a new Gallery image
    const newImage = new Gallery({
      userId: req.user.id, // This should be available from the auth middleware
      imageUrl: imageUrl,
      name: name,
      description: description,
    });

    await newImage.save();

    res.status(201).json({ message: 'Image added successfully.', image: newImage });
  } catch (error) {
    console.error('Error adding image:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }

    // Check if the user owns the image
    if (image.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this image.' });
    }

    // Delete the image file from /uploads
    const filePath = path.join(__dirname, '..', image.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the image from the database
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserGallery = async (req, res) => {
  try {
    const { userId } = req.params;

    const images = await Gallery.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching user gallery:', error.message);
    res.status(500).json({ error: error.message });
  }
};
