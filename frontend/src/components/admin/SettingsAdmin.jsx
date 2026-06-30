import { useState } from 'react';
import { Save, User, Lock, KeyRound } from 'lucide-react';
import "animate.css";

const SettingsAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'New passwords do not match' });
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username || undefined,
          oldPassword: formData.oldPassword || undefined,
          newPassword: formData.newPassword || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        sessionStorage.setItem('adminToken', data.token); // update token
        setFormData({ username: '', oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Update failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate__animated animate__fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900">Admin Profile Settings</h2>
        <p className="text-slate-500 mt-1">Update your username and secure your account with a new password.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 font-bold text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <User size={16} className="text-indigo-500" /> New Username (Optional)
            </label>
            <input 
              type="text" 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" 
              placeholder="Leave blank to keep current" 
            />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <KeyRound size={20} className="text-pink-500" /> Change Password
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={formData.oldPassword} 
                  onChange={e => setFormData({...formData, oldPassword: e.target.value})} 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" 
                  placeholder="Required if changing password" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    value={formData.newPassword} 
                    onChange={e => setFormData({...formData, newPassword: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" 
                    placeholder="Enter new password" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={formData.confirmPassword} 
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" 
                    placeholder="Repeat new password" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <Save size={20} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsAdmin;
