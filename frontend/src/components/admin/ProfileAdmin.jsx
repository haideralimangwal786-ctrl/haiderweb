import { useState, useEffect } from "react";
import { Save, User, FileText, Link as LinkIcon, MapPin, Briefcase, RotateCcw } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";

const ProfileAdmin = () => {
  const { profile, loading, updateProfile, resetProfile } = useProfile();
  const [formData, setFormData] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  if (loading || !formData) return <p>Loading profile data...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        },
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({ ...formData, [field]: data.url });
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      alert("Error uploading file");
    }
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, techPills: [...formData.techPills, techInput.trim()] });
      setTechInput("");
    }
  };

  const handleRemoveTech = (index) => {
    const updated = formData.techPills.filter((_, i) => i !== index);
    setFormData({ ...formData, techPills: updated });
  };

  const handleAddCustomLink = () => {
    setFormData({ 
      ...formData, 
      customLinks: [...(formData.customLinks || []), { platform: "New Platform", url: "https://", iconName: "LinkIcon" }] 
    });
  };

  const handleUpdateCustomLink = (index, field, value) => {
    const updatedLinks = [...(formData.customLinks || [])];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, customLinks: updatedLinks });
  };

  const handleRemoveCustomLink = (index) => {
    const updatedLinks = (formData.customLinks || []).filter((_, i) => i !== index);
    setFormData({ ...formData, customLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const success = await updateProfile(formData);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all profile data back to defaults? This cannot be undone.")) {
      const success = await resetProfile();
      if (success) {
        alert("Profile reset successfully.");
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage content for your Home, About, and Contact pages.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        
        {/* Home Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-100 pb-2 flex items-center gap-2">
            <User size={18} className="text-slate-400"/> Home Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Role Title</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Hero Introduction</label>
            <textarea name="heroIntro" value={formData.heroIntro} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Tech Stack Pills (Hero)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.techPills.map((tech, idx) => (
                <span key={idx} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100">
                  {tech}
                  <button type="button" onClick={() => handleRemoveTech(idx)} className="text-indigo-400 hover:text-indigo-900">&times;</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())} placeholder="Add tech (e.g. React.js)" className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              <button type="button" onClick={handleAddTech} className="bg-slate-200 px-4 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-300">Add</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Profile Image (Upload)</label>
            <div className="flex items-center gap-4">
              {formData.profileImage && (
                <img src={formData.profileImage} alt="Profile" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'profileImage')} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
            </div>
            <p className="text-xs text-slate-500 italic">Current: {formData.profileImage || "Default Image"}</p>
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-100 pb-2 flex items-center gap-2">
            <FileText size={18} className="text-slate-400"/> About Section
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Full Biography</label>
            <textarea name="aboutBio" value={formData.aboutBio} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Mission Statement</label>
            <textarea name="aboutMission" value={formData.aboutMission} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Current Status (e.g. looking for internships)</label>
            <input type="text" name="aboutStatus" value={formData.aboutStatus} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
        </section>

        {/* Contact/Social Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-100 pb-2 flex items-center gap-2">
            <LinkIcon size={18} className="text-slate-400"/> Contact & Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">WhatsApp Number</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">GitHub Link</label>
              <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">LinkedIn Link</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-bold text-slate-700">Resume PDF (Upload)</label>
              <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resumeLink')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
              <p className="text-xs text-slate-500 italic mt-1">Current: {formData.resumeLink || "Default Resume"}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-slate-700">Custom Web Links</label>
              <button type="button" onClick={handleAddCustomLink} className="text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1.5 rounded-lg">+ Add Link</button>
            </div>
            
            <div className="space-y-3">
              {(formData.customLinks || []).map((link, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input type="text" placeholder="Platform (e.g. Portfolio)" value={link.platform} onChange={(e) => handleUpdateCustomLink(idx, 'platform', e.target.value)} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none" required />
                  <input type="url" placeholder="https://..." value={link.url} onChange={(e) => handleUpdateCustomLink(idx, 'url', e.target.value)} className="flex-[2] px-3 py-2 border border-slate-200 rounded-lg outline-none" required />
                  <input type="text" placeholder="Lucide Icon (e.g. Globe)" value={link.iconName} onChange={(e) => handleUpdateCustomLink(idx, 'iconName', e.target.value)} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none" required />
                  <button type="button" onClick={() => handleRemoveCustomLink(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                     <span className="font-bold">&times;</span>
                  </button>
                </div>
              ))}
              {(!formData.customLinks || formData.customLinks.length === 0) && (
                 <p className="text-slate-400 text-sm italic">No custom web links added yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50">
              <Save size={18} />
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
            {saveSuccess && <span className="text-emerald-500 font-bold flex items-center gap-2 animate__animated animate__fadeIn">✓ Profile Updated!</span>}
          </div>
          
          <button type="button" onClick={handleReset} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors">
            <RotateCcw size={18} />
            Reset to Defaults
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProfileAdmin;
