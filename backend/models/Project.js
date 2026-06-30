import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tech: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  github: {
    type: String,
    default: '',
  },
  liveLink: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
