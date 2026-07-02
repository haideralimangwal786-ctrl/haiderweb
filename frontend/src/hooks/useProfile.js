import { useState, useEffect } from 'react';

let cachedProfile = null;
let profilePromise = null;

export const useProfile = () => {
  const [profile, setProfile] = useState(cachedProfile);
  const [loading, setLoading] = useState(!cachedProfile);

  const fetchProfile = async () => {
    if (cachedProfile) {
      setProfile(cachedProfile);
      setLoading(false);
      return;
    }

    if (!profilePromise) {
      profilePromise = fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(data => {
          cachedProfile = data;
          return data;
        })
        .catch(error => {
          console.error('Failed to fetch profile', error);
          profilePromise = null; // Reset on failure
          return null;
        });
    }

    const data = await profilePromise;
    if (data) {
      setProfile(data);
    }
    setLoading(false);
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
        cachedProfile = data; // Update cache
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
