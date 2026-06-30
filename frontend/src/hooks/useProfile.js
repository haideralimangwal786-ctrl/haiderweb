import { useState, useEffect } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update profile', error);
      return false;
    }
  };

  return { profile, loading, updateProfile };
};
