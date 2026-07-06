import { useSkillCategories } from "../hooks/useSkillCategories";
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

const Skills = () => {
  const { skillCategories } = useSkillCategories();

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] pointer-events-none translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center animate__animated animate__fadeInUp">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm mb-6">
            <LucideIcons.Sparkles size={18} />
            Technical Arsenal
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Skills.</span>
          </h2>
          <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of the technologies and tools I utilize to build modern, scalable, and high-performance web applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 animate__animated animate__fadeInUp animate__delay-1s">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-3xl p-8 lg:p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 ${category.borderColor} ${category.glowColor} overflow-hidden`}
            >
              {/* Decorative top gradient line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${category.bgGlow || 'from-indigo-400 to-purple-400'}`}></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 border-b border-slate-100 pb-8 relative z-10">
                <div className={`p-4 rounded-2xl ${category.iconBg} border border-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <IconRenderer iconName={category.iconName} size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">{category.title}</h3>
                   <p className="text-slate-500 text-sm font-semibold mt-1">Core technologies & tools</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
                {category.skills.map((skillItem, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/60 hover:bg-white border border-slate-100/50 hover:border-slate-200 p-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 group/skill cursor-pointer hover:-translate-y-1">
                    
                    {/* Circle Animation Container */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      {/* Spinning dashed ring */}
                      <div className="absolute -inset-0.5 rounded-full border-[1.5px] border-dashed border-slate-300 group-hover/skill:border-indigo-500 group-hover/skill:animate-spin transition-colors duration-500" style={{ animationDuration: '3s' }}></div>
                      
                      {/* Inner pulsing glow on hover */}
                      <div className={`absolute inset-1 rounded-full opacity-0 group-hover/skill:opacity-20 group-hover/skill:animate-pulse transition-all duration-500 ${category.bgGlow}`}></div>
                      
                      {/* Inner Icon Circle */}
                      <div className="relative z-10 w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-sm group-hover/skill:scale-110 transition-transform duration-300">
                        <IconRenderer iconName={skillItem.iconName} iconColor={skillItem.iconColor} size={20} />
                      </div>
                    </div>

                    <span className="text-sm font-extrabold text-slate-700 group-hover/skill:text-slate-900 transition-colors tracking-tight pr-4">
                      {skillItem.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;