import { useState } from 'react';
import { Lock, ArrowRight, LayoutDashboard, Wrench, Settings, LogOut, User, Zap, MessageSquare } from 'lucide-react';
import "animate.css";
import ProjectsAdmin from './admin/ProjectsAdmin';
import ServicesAdmin from './admin/ServicesAdmin';
import SettingsAdmin from './admin/SettingsAdmin';
import ProfileAdmin from './admin/ProfileAdmin';
import SkillsAdmin from './admin/SkillsAdmin';
import MessagesAdmin from './admin/MessagesAdmin';
import ReviewsAdmin from './admin/ReviewsAdmin';
import { Star } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('adminToken'));
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'projects', 'services', 'skills', 'messages', 'settings'

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid credentials');
        setPasswordInput('');
      }
    } catch (error) {
      setLoginError('Server error. Backend might be down.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveTab('profile');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 border border-slate-100 animate__animated animate__fadeInUp">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-indigo-600" size={28} />
          </div>
          <h2 className="text-2xl font-black text-center text-slate-900 mb-2">Admin Access</h2>
          <p className="text-center text-slate-500 mb-8 font-medium">Please enter your credentials to manage your portfolio.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
                className={`w-full p-4 rounded-xl border ${loginError ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} focus:ring-2 transition-all outline-none text-center font-bold`}
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className={`w-full p-4 rounded-xl border ${loginError ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} focus:ring-2 transition-all outline-none text-center font-bold tracking-widest`}
                required
              />
              {loginError && <p className="text-red-500 text-sm font-bold text-center mt-2 animate__animated animate__headShake">{loginError}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70">
              {loading ? 'Authenticating...' : 'Unlock Dashboard'} <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">CMS Admin</h1>
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Dashboard</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <User size={20} /> CMS Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'projects' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={20} /> Projects
          </button>
          
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'services' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Wrench size={20} /> Services
          </button>

          <button 
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'skills' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Zap size={20} /> Skills
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <MessageSquare size={20} /> Inbox Messages
          </button>

          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Star size={20} /> Client Reviews
          </button>
        </div>

        <div className="flex flex-col gap-2 pt-6 border-t border-slate-100 mt-6">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Settings size={20} /> Profile Settings
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all mt-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'profile' && <ProfileAdmin />}
          {activeTab === 'projects' && <ProjectsAdmin />}
          {activeTab === 'services' && <ServicesAdmin />}
          {activeTab === 'skills' && <SkillsAdmin />}
          {activeTab === 'messages' && <MessagesAdmin />}
          {activeTab === 'reviews' && <ReviewsAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
