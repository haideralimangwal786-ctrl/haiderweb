import { useState, useEffect } from 'react';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async (service) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(service)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices([...services, newService]);
      }
    } catch (error) {
      console.error('Failed to add service', error);
    }
  };

  const updateService = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updated = await res.json();
        setServices(services.map(s => s._id === id ? updated : s));
      }
    } catch (error) {
      console.error('Failed to update service', error);
    }
  };

  const deleteService = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setServices(services.filter(s => s._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete service', error);
    }
  };

  return { services, addService, updateService, deleteService, loading };
};
