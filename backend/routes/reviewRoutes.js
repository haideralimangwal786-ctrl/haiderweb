import express from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review
router.post('/', protect, async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({ id: req.params.id });
    if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
