import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
});


const Project = mongoose.model('Project', ProjectSchema);
export default Project;