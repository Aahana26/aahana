import express from 'express';
import About from '../models/About.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// GET about info
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne().sort({ _id: -1 });
    if (!about) {
      return res.status(404).json({ message: 'About info not found' });
    }
    console.log(about);
    return res.json(about);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// Update about (requires token)
router.put('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({ content });
    } else {
      about.content = content;
    }
    await about.save();
    res.json({ message: 'About info updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
