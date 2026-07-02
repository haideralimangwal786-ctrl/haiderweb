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

let cachedProjects = null;
let projectsPromise = null;

export const useProjects = () => {
  const [projects, setProjects] = useState(cachedProjects || []);
  const [loading, setLoading] = useState(!cachedProjects);

  // Fetch all projects from API
  const fetchProjects = async () => {
    if (cachedProjects) {
      setProjects(cachedProjects);
      setLoading(false);
      return;
    }

    if (!projectsPromise) {
      projectsPromise = fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(data => {
          const finalData = data.length === 0 ? defaultProjects : data;
          cachedProjects = finalData;
          return finalData;
        })
        .catch(error => {
          console.error('Failed to fetch projects from backend:', error);
          const saved = localStorage.getItem('portfolio_projects');
          const fallback = saved ? JSON.parse(saved) : defaultProjects;
          projectsPromise = null;
          return fallback;
        });
    }

    const data = await projectsPromise;
    if (data) {
      setProjects(data);
    }
    setLoading(false);
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
        const updatedList = [...projects, newProject];
        cachedProjects = updatedList;
        setProjects(updatedList);
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
        const updatedList = projects.map(p => p.id === id ? updated : p);
        cachedProjects = updatedList;
        setProjects(updatedList);
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
        const updatedList = projects.filter(p => p.id !== id);
        cachedProjects = updatedList;
        setProjects(updatedList);
      }
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const getProject = (id) => projects.find(p => p.id === id);

  return { projects, addProject, updateProject, deleteProject, getProject, loading };
};
