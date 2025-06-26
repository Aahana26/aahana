import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken } from '../middleware/auth.js'; // your JWT verification middleware
import slugify from 'slugify';

const router = express.Router();

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project (admin only)
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const newProject = new Project({ title, description, slug });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(500).json({ message: 'Server error while saving project' });
  }
});


// PUT update an existing project by ID (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    ['title', 'description', 'technologies', 'githubLink', 'demoLink', 'imageUrl'].forEach(field => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
