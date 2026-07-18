import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  // Home Section
  name: { type: String, default: 'Haider Ali' },
  role: { type: String, default: 'Full Stack Developer (MERN)' },
  heroIntro: { type: String, default: 'I build modern, responsive, and scalable web applications using the MERN Stack.' },
  techPills: { type: [String], default: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'] },

  // About Section
  aboutBio: { type: String, default: 'I am a Computer Science student passionate about building modern, scalable, and user-friendly web applications.' },
  aboutMission: { type: String, default: 'To become a professional Full Stack Developer and contribute to impactful software solutions.' },
  aboutStatus: { type: String, default: 'I am actively seeking Internship and Junior Developer opportunities.' },

  // Contact / Social Section
  email: { type: String, default: 'haideralimangwal786@gmail.com' },
  whatsapp: { type: String, default: '+92 311 5609634' },
  location: { type: String, default: 'District Chakwal, Punjab, Pakistan' },
  github: { type: String, default: 'https://github.com/haideralimangwal786-ctrl' },
  linkedin: { type: String, default: 'https://www.linkedin.com/in/haider-ali-8a008325a/' },
  resumeLink: { type: String, default: '/Haider_Ali_Resume.pdf' },
  profileImage: { type: String, default: '' },
  aboutImage: { type: String, default: '' },
  customLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
    iconName: { type: String, default: 'LinkIcon' }
  }]
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
