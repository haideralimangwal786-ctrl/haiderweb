import { useState, useEffect } from 'react';

export const useSkillCategories = () => {
  const [skillCategories, setSkillCategories] = useState([]);

  const fetchSkillCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills`);
      if (res.ok) {
        const data = await res.json();
        setSkillCategories(data);
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
