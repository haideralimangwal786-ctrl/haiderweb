import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g. "Frontend"
  iconName: { type: String, default: 'MonitorSmartphone' }, // Lucide icon
  bgGlow: { type: String, default: 'bg-blue-500' }, // Tailwind class
  iconBg: { type: String, default: 'bg-blue-50' }, // Tailwind class
  borderColor: { type: String, default: 'hover:border-blue-300' }, // Tailwind class
  glowColor: { type: String, default: 'hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]' }, // Tailwind class
  
  skills: [{
    name: { type: String, required: true }, // e.g. "React.js"
    iconName: { type: String, default: 'FaReact' }, // react-icons icon name
    iconColor: { type: String, default: 'text-[#61DAFB]' } // Tailwind text color class
  }]
}, { timestamps: true });

const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
export default SkillCategory;
