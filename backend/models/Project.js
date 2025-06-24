import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// 🔁 Automatically generate slug from title
ProjectSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove special chars
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/--+/g, '-');        // Remove duplicate dashes
  }
  next();
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
