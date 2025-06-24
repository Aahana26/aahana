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
  const { title, description, technologies, githubLink, demoLink, imageUrl } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  const newProject = new Project({ title, description, technologies, githubLink, demoLink, imageUrl });
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

// DELETE a project by ID (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.remove();
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
