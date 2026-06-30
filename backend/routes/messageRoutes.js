import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Send a new message (Public)
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
