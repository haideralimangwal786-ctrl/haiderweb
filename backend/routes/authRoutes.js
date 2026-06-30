import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_for_dev', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/login
// @desc    Auth admin & get token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/auth/update
// @desc    Update admin profile
// @access  Private
router.put('/update', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      // Check old password if they want to change password
      if (req.body.oldPassword) {
        if (!(await admin.matchPassword(req.body.oldPassword))) {
          return res.status(401).json({ message: 'Incorrect old password' });
        }
      }

      admin.username = req.body.username || admin.username;
      
      if (req.body.newPassword) {
        admin.password = req.body.newPassword;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        username: updatedAdmin.username,
        token: generateToken(updatedAdmin._id),
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
