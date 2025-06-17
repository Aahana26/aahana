import express from 'express';
import About from '../models/About.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aboutData = await About.find();
    console.log(aboutData,"about data")
    
    if (!aboutData) {
      return res.status(404).json({ message: 'About data not found' });
    }
    res.json(aboutData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
