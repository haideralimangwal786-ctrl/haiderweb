import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists inside backend folder
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ storage: storage });

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
// @desc    Upload an image or resume file
// @access  Private
router.post('/upload', protect, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;
