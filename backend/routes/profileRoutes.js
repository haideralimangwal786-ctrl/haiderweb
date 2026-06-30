import express from 'express';
import multer from 'multer';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Use memory storage — no disk needed, works on Render free tier
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// @route   GET /api/profile
// @desc    Get profile data
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    // If no profile exists, create a default one
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/profile
// @desc    Update profile data
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/profile/upload
// @desc    Upload an image or resume — stored as Base64 in MongoDB (no disk needed)
// @access  Private
router.post('/upload', protect, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Convert to Base64 data URL — stored in MongoDB, survives Render restarts
  const base64 = req.file.buffer.toString('base64');
  const mimeType = req.file.mimetype;
  const dataUrl = `data:${mimeType};base64,${base64}`;
  res.json({ url: dataUrl });
});

export default router;

