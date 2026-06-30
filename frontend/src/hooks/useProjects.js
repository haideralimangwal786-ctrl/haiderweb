import { useState, useEffect } from 'react';

const defaultProjects = [
  {
    id: "homedify",
    title: "Homedify – AI Powered Marketplace",
    desc: "A full-stack marketplace platform featuring AI-based verification, secure authentication, role-based dashboards, and modern web architecture. This platform connects buyers and sellers seamlessly while ensuring maximum security.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    features: [
      "AI Verification System",
      "Role Based User Dashboards",
      "Secure JWT Authentication",
      "Escrow Payment Integration",
      "Real-time Chat Support",
      "Dynamic Search & Filtering"
    ],
    github: "https://github.com/haideralimangwal786-ctrl",
    image: "/homedify.png"
  },
  {
    id: "wallnest",
    title: "WallNest",
    desc: "Wallpaper application powered by Pexels API with search, categories, favorites, and wallpaper setting functionality. Built with performance in mind to deliver high-resolution images instantly.",
    tech: ["Flutter", "Dart", "Pexels API", "Provider"],
    features: [
      "Infinite Scrolling",
      "High-Res Image Downloads",
      "Save to Favorites",
      "Dynamic Categories"
    ],
    github: "https://github.com/haideralimangwal786-ctrl",
    image: "/wallnest.jpg"
  },
  {
    id: "premium-naat-player",
    title: "Premium Naat Player",
    desc: "Multi-user audio streaming platform with authentication, IndexedDB storage, and advanced audio controls. Users can enjoy seamless offline and online listening.",
    tech: ["HTML", "CSS", "JavaScript", "IndexedDB", "Web Audio API"],
    features: [
      "Offline Playback via IndexedDB",
      "Custom Audio Visualizers",
      "User Authentication",
      "Playlist Management"
    ],
    github: "https://github.com/haideralimangwal786-ctrl",
    image: "/naatplayer.png"
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects from API
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        // If database is empty, we can optionally seed it here or just set empty
        if (data.length === 0) {
          setProjects(defaultProjects);
        } else {
          setProjects(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects from backend:', error);
      // Fallback to local storage if backend is down
      const saved = localStorage.getItem('portfolio_projects');
      if (saved) setProjects(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (project) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects([...projects, newProject]);
      }
    } catch (error) {
      console.error('Failed to add project', error);
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p.id === id ? updated : p));
      }
    } catch (error) {
      console.error('Failed to update project', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const getProject = (id) => projects.find(p => p.id === id);

  return { projects, addProject, updateProject, deleteProject, getProject, loading };
};
