import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', protect, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    const io = req.app.get('io');
    if (io) io.emit('projects_updated');
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project by custom 'id'
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    const io = req.app.get('io');
    if (io) io.emit('projects_updated');
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project by custom 'id'
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ id: req.params.id });
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    const io = req.app.get('io');
    if (io) io.emit('projects_updated');
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
