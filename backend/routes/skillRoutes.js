import express from 'express';
import SkillCategory from '../models/SkillCategory.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skill categories
router.get('/', async (req, res) => {
  try {
    const categories = await SkillCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/skills
// @desc    Create a new skill category
router.post('/', protect, async (req, res) => {
  try {
    const category = new SkillCategory(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update a skill category
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedCategory = await SkillCategory.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Skill Category not found' });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete a skill category
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedCategory = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Skill Category not found' });
    res.json({ message: 'Skill Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
