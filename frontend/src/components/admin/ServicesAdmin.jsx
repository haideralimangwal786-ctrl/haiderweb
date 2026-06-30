import { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const ServicesAdmin = () => {
  const { services, addService, updateService, deleteService } = useServices();
  const [editingService, setEditingService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(null);

  const defaultFormState = {
    title: '',
    description: '',
    iconName: 'Code2',
    colorTheme: 'indigo'
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleEditClick = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      colorTheme: service.colorTheme
    });
    setEditingService(service._id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setFormData(defaultFormState);
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmPopup(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmPopup) {
      deleteService(deleteConfirmPopup);
      setDeleteConfirmPopup(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService, formData);
    } else {
      addService(formData);
    }
    setIsFormOpen(false);
    setEditingService(null);
    setFormData(defaultFormState);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Services</h2>
          <p className="text-slate-500 mt-1">Manage your service offerings.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
          >
            <Plus size={20} /> Add Service
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate__animated animate__fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{editingService ? 'Edit Service' : 'Create New Service'}</h2>
            <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Service Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="e.g. Frontend Development" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Lucide Icon Name</label>
                <select value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white">
                  <option value="Code2">Code2</option>
                  <option value="MonitorSmartphone">MonitorSmartphone</option>
                  <option value="Server">Server</option>
                  <option value="Database">Database</option>
                  <option value="PenTool">PenTool</option>
                  <option value="Wrench">Wrench</option>
                  <option value="Globe">Globe</option>
                  <option value="Cpu">Cpu</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Layout">Layout</option>
                  <option value="Shield">Shield</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Color Theme</label>
                <select value={formData.colorTheme} onChange={e => setFormData({...formData, colorTheme: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white">
                  <option value="indigo">Indigo</option>
                  <option value="blue">Blue</option>
                  <option value="emerald">Emerald</option>
                  <option value="amber">Amber</option>
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="Service description..."></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button type="submit" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                <Save size={20} /> {editingService ? 'Update Service' : 'Save Service'}
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
                  <th className="p-4 font-bold">Icon Name</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Theme</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">No services found. Create one!</td>
                  </tr>
                ) : services.map((service) => (
                  <tr key={service._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-600">{service.iconName}</td>
                    <td className="p-4 font-bold text-slate-800">{service.title}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md bg-${service.colorTheme}-50 text-${service.colorTheme}-600 capitalize`}>
                        {service.colorTheme}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEditClick(service)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mr-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteClick(service._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
            <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Delete Service?</h3>
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

export default ServicesAdmin;
