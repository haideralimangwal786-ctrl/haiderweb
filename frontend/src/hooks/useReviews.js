import { useState, useEffect } from 'react';

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (review) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(review)
      });
      if (res.ok) fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const updateReview = async (id, updatedData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return { reviews, loading, addReview, updateReview, deleteReview };
};
