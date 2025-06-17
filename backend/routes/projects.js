import express from 'express';
import Project from '../models/Project.js'; // if routes folder is inside backend

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project (for admin use)
router.post('/', async (req, res) => {
  const { title, description, technologies, githubLink, demoLink, imageUrl } = req.body;
  const newProject = new Project({ title, description, technologies, githubLink, demoLink, imageUrl });
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;