import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    default: 'Code2', // Maps to Lucide icons
  },
  colorTheme: {
    type: String,
    default: 'indigo', // Base color for bgGlow, iconBg, etc.
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
