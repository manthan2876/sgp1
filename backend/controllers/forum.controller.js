const ForumMessage = require('../models/ForumMessage.model');
const User = require('../models/User.model');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const newMessage = await ForumMessage.create({
      user: req.user._id,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error creating message' });
  }
};

// Get all messages with user details
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ForumMessage.find()
      .populate('user', 'name profileImage badges ')
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
