import express from 'express';
import Service from '../models/Service.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/services
// @desc    Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/services
// @desc    Create a new service
router.post('/', protect, async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
