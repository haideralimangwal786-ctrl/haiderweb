import { useState } from "react";
import { Plus, Trash2, Edit2, Zap } from "lucide-react";
import { useSkillCategories } from "../../hooks/useSkillCategories";
import * as LucideIcons from "lucide-react";
import * as ReactIconsFa from "react-icons/fa";
import * as ReactIconsSi from "react-icons/si";
import * as ReactIconsVsc from "react-icons/vsc";

const IconRenderer = ({ iconName, iconColor, size = 24 }) => {
  const LucideIcon = LucideIcons[iconName];
  const FaIcon = ReactIconsFa[iconName];
  const SiIcon = ReactIconsSi[iconName];
  const VscIcon = ReactIconsVsc[iconName];

  const colorStyle = iconColor ? { color: iconColor } : {};

  if (LucideIcon) return <LucideIcon size={size} style={colorStyle} />;
  if (FaIcon) return <FaIcon size={size} style={colorStyle} />;
  if (SiIcon) return <SiIcon size={size} style={colorStyle} />;
  if (VscIcon) return <VscIcon size={size} style={colorStyle} />;
  
  return <div style={{ width: size, height: size, background: iconColor || '#cbd5e1', borderRadius: '50%' }}></div>;
};

const SkillsAdmin = () => {
  const { skillCategories, addSkillCategory, updateSkillCategory, deleteSkillCategory } = useSkillCategories();
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (editingCategory._id) {
      updateSkillCategory(editingCategory._id, editingCategory);
    } else {
      addSkillCategory(editingCategory);
    }
    setEditingCategory(null);
  };

  const handleAddSkill = () => {
    setEditingCategory({
      ...editingCategory,
      skills: [...editingCategory.skills, { name: "", iconName: "FaReact", iconColor: "#3b82f6" }]
    });
  };

  const handleUpdateSkill = (index, field, value) => {
    const newSkills = [...editingCategory.skills];
    newSkills[index][field] = value;
    setEditingCategory({ ...editingCategory, skills: newSkills });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = editingCategory.skills.filter((_, i) => i !== index);
    setEditingCategory({ ...editingCategory, skills: newSkills });
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Skills Management</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage skill categories and specific tech skills.</p>
          </div>
        </div>
        {!editingCategory && (
          <button onClick={() => setEditingCategory({ title: "", iconName: "Code", bgGlow: "bg-blue-500", iconBg: "bg-blue-50", borderColor: "hover:border-blue-300", glowColor: "hover:shadow-xl", skills: [] })} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            <Plus size={18} /> Add Category
          </button>
        )}
      </div>

      {editingCategory ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative animate__animated animate__fadeIn">
          <h3 className="text-xl font-bold mb-6 border-b border-slate-100 pb-4">{editingCategory._id ? "Edit Category" : "New Category"}</h3>
          <form onSubmit={handleSaveCategory} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Category Title</label>
                <input type="text" value={editingCategory.title} onChange={(e) => setEditingCategory({...editingCategory, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Category Icon (Lucide Name)</label>
                <input type="text" value={editingCategory.iconName} onChange={(e) => setEditingCategory({...editingCategory, iconName: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none" required />
              </div>
            </div>

            {/* Tailwind styling omitted for brevity, using defaults in schema, but admin could edit them if added here */}

            <div className="border-t border-slate-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Skills List</h4>
                <button type="button" onClick={handleAddSkill} className="text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1.5 rounded-lg">+ Add Skill</button>
              </div>

              <div className="space-y-3">
                {editingCategory.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <input type="text" placeholder="Skill Name" value={skill.name} onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none" required />
                    <input type="text" placeholder="Icon Name (e.g. FaReact, SiMongodb)" value={skill.iconName} onChange={(e) => handleUpdateSkill(idx, 'iconName', e.target.value)} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none" />
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-500 font-bold">Color</label>
                      <input type="color" value={skill.iconColor || '#3b82f6'} onChange={(e) => handleUpdateSkill(idx, 'iconColor', e.target.value)} className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5" title="Pick icon color" />
                    </div>
                    <button type="button" onClick={() => handleRemoveSkill(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button type="button" onClick={() => setEditingCategory(null)} className="px-6 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700">Save Category</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map(cat => (
            <div key={cat._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
               <div className="flex justify-between items-center mb-6 relative z-10">
                 <div className="flex items-center gap-3">
                   <div className={`p-3 ${cat.iconBg} rounded-xl border border-white shadow-sm`}>
                     <IconRenderer iconName={cat.iconName} size={20} />
                   </div>
                   <h3 className="text-xl font-bold">{cat.title}</h3>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => setEditingCategory(cat)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                   <button onClick={() => deleteSkillCategory(cat._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                 </div>
               </div>

               <div className="flex flex-wrap gap-2 relative z-10">
                 {cat.skills.map((s, idx) => (
                   <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-700">
                     <IconRenderer iconName={s.iconName} iconColor={s.iconColor} size={14} />
                     {s.name}
                   </span>
                 ))}
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsAdmin;
