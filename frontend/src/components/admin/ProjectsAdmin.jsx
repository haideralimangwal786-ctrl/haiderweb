import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { Plus, Edit2, Trash2, X, Save, Link as LinkIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectsAdmin = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(null);

  const defaultFormState = {
    id: '',
    title: '',
    desc: '',
    tech: '',
    features: '',
    github: '',
    liveLink: '',
    image: ''
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleEditClick = (project) => {
    setFormData({
      ...project,
      tech: project.tech.join(', '),
      features: project.features.join('\n')
    });
    setEditingProject(project.id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setFormData(defaultFormState);
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmPopup(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmPopup) {
      deleteProject(deleteConfirmPopup);
      setDeleteConfirmPopup(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setFormData({...formData, image: compressedBase64});
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      id: editingProject ? formData.id : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tech: formData.tech.split(',').map(item => item.trim()).filter(Boolean),
      features: formData.features.split('\n').map(item => item.trim()).filter(Boolean)
    };

    if (editingProject) {
      updateProject(editingProject, processedData);
    } else {
      addProject(processedData);
    }
    
    setIsFormOpen(false);
    setEditingProject(null);
    setFormData(defaultFormState);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Projects</h2>
          <p className="text-slate-500 mt-1">Manage your portfolio projects dynamically.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
          >
            <Plus size={20} /> Add Project
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate__animated animate__fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
            <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="e.g. My Awesome App" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Project Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
              <textarea required rows="2" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="Brief overview of the project..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Technologies (Comma Separated)</label>
              <input required type="text" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="React, Node.js, MongoDB" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Key Features (One per line)</label>
              <textarea required rows="4" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="User Authentication&#10;Real-time Chat&#10;Payment Gateway"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <FaGithub size={16} /> GitHub URL
                </label>
                <input type="text" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <LinkIcon size={16} /> Live Site URL (Optional)
                </label>
                <input type="text" value={formData.liveLink || ''} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="https://..." />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button type="submit" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                <Save size={20} /> {editingProject ? 'Update Project' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate__animated animate__fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="p-4 font-bold">Image</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Tech Stack</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">No projects found. Create one!</td>
                  </tr>
                ) : projects.map((project) => (
                  <tr key={project.id || project._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <img src={project.image} alt={project.title} className="w-16 h-12 object-cover rounded-lg border border-slate-200" />
                    </td>
                    <td className="p-4 font-bold text-slate-800">{project.title}</td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {project.tech.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">{t}</span>
                        ))}
                        {project.tech.length > 3 && <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">+{project.tech.length - 3}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEditClick(project)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mr-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteClick(project.id || project._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate__animated animate__fadeIn">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl animate__animated animate__zoomIn">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Delete Project?</h3>
            <p className="text-center text-slate-500 mb-8 font-medium">This action cannot be undone.</p>
            
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmPopup(null)} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-red-500/30 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
