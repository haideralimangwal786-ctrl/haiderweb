import { useState, useEffect } from 'react';

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  useEffect(() => {
    // Only fetch if admin token exists
    if (sessionStorage.getItem('adminToken')) {
      fetchMessages();
    }
  }, []);

  const sendMessage = async (messageData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });
      return res.ok;
    } catch (error) {
      console.error('Failed to send message', error);
      return false;
    }
  };

  const deleteMessage = async (id) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  return { messages, sendMessage, deleteMessage };
};
