import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Accept up to 20MB originals — sharp will compress them down
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB original upload limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'), false);
    }
  }
});

// @route   GET /api/profile
// @desc    Get profile data
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
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
// @desc    Upload image (auto-compressed to WebP) or PDF — stored as Base64 in MongoDB
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let finalBuffer;
    let mimeType;

    if (req.file.mimetype.startsWith('image/')) {
      // Compress & resize with sharp — max 1200×1200px, WebP at 85% quality
      // This turns a 10MB photo into ~200KB while keeping it sharp and beautiful
      finalBuffer = await sharp(req.file.buffer)
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();
      mimeType = 'image/webp';
    } else {
      // For PDFs — store as-is
      finalBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
    }

    // Convert to Base64 data URL — saved in MongoDB, persists across Render restarts
    const base64 = finalBuffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64}`;

    res.json({ url: dataUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to process image: ' + err.message });
  }
});

export default router;
