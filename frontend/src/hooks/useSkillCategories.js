import { useState, useEffect } from 'react';

const defaultSkills = [
  {
    title: "Frontend Excellence",
    iconName: "MonitorSmartphone",
    bgGlow: "bg-blue-500",
    iconBg: "bg-blue-50 text-blue-600",
    borderColor: "hover:border-blue-300",
    glowColor: "hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]",
    skills: [
      { name: "React.js", iconName: "FaReact", iconColor: "#61DAFB" },
      { name: "Tailwind CSS", iconName: "SiTailwindcss", iconColor: "#38B2AC" },
      { name: "JavaScript", iconName: "SiJavascript", iconColor: "#F7DF1E" },
      { name: "HTML5", iconName: "FaHtml5", iconColor: "#E34F26" },
      { name: "CSS3", iconName: "FaCss3Alt", iconColor: "#1572B6" }
    ]
  },
  {
    title: "Backend Engineering",
    iconName: "Server",
    bgGlow: "bg-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-600",
    borderColor: "hover:border-emerald-300",
    glowColor: "hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]",
    skills: [
      { name: "Node.js", iconName: "FaNodeJs", iconColor: "#339933" },
      { name: "Express.js", iconName: "SiExpress", iconColor: "#000000" },
      { name: "MongoDB", iconName: "SiMongodb", iconColor: "#47A248" },
      { name: "Python", iconName: "FaPython", iconColor: "#3776AB" },
      { name: "SQL", iconName: "FaDatabase", iconColor: "#336791" }
    ]
  },
  {
    title: "Tools & DevOps",
    iconName: "Wrench",
    bgGlow: "bg-purple-500",
    iconBg: "bg-purple-50 text-purple-600",
    borderColor: "hover:border-purple-300",
    glowColor: "hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)]",
    skills: [
      { name: "Git", iconName: "FaGitAlt", iconColor: "#F05032" },
      { name: "GitHub", iconName: "FaGithub", iconColor: "#181717" },
      { name: "Docker", iconName: "FaDocker", iconColor: "#2496ED" },
      { name: "VS Code", iconName: "VscVscode", iconColor: "#007ACC" },
      { name: "Figma", iconName: "SiFigma", iconColor: "#F24E1E" }
    ]
  }
];

export const useSkillCategories = () => {
  const [skillCategories, setSkillCategories] = useState(defaultSkills);

  const fetchSkillCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setSkillCategories(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch skills', error);
    }
  };

  useEffect(() => {
    fetchSkillCategories();
  }, []);

  const addSkillCategory = async (category) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
      });
      if (res.ok) {
        const newCategory = await res.json();
        setSkillCategories([...skillCategories, newCategory]);
      }
    } catch (error) {
      console.error('Failed to add skill category', error);
    }
  };

  const updateSkillCategory = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updated = await res.json();
        setSkillCategories(skillCategories.map(s => s._id === id ? updated : s));
      }
    } catch (error) {
      console.error('Failed to update skill category', error);
    }
  };

  const deleteSkillCategory = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setSkillCategories(skillCategories.filter(s => s._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete skill category', error);
    }
  };

  return { skillCategories, addSkillCategory, updateSkillCategory, deleteSkillCategory };
};
