import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "animate.css";
import { useProjects } from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center animate__animated animate__fadeInUp max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm mb-6">
            <Sparkles size={18} />
            Portfolio
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Projects.</span>
          </h2>
          <p className="mt-8 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            A collection of projects that showcase my skills in full-stack web development, API integration, and modern application design.
          </p>
        </div>

        {/* Projects Grid (Premium UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 animate__animated animate__fadeInUp animate__delay-1s">
          {projects.map((project, index) => (
            <div key={index} className="w-full max-w-[380px] mx-auto md:max-w-none group relative rounded-3xl bg-white backdrop-blur-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(79,70,229,0.22),0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full">
              
              {/* Product Image Header */}
              <div className="relative w-full h-48 md:h-36 overflow-hidden bg-slate-100 p-3">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out shadow-sm" />
                
                {/* Floating "View" overlay (Ecommerce style hover) */}
                <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur-sm text-indigo-700 px-3 py-1.5 rounded-full font-bold text-xs translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                     Quick View
                   </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-4 flex flex-col flex-grow relative z-10 bg-white/40">
                {/* Title */}
                <h3 className="text-lg md:text-base font-extrabold text-slate-900 line-clamp-1 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-[11px] line-clamp-3 md:line-clamp-2 mb-3">
                  {project.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 md:px-2 md:py-0.5 bg-slate-100 text-slate-600 text-xs md:text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200/50">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-xs md:text-[9px] font-bold rounded">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Action Buttons (Bottom) */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-slate-100">
                  <Link to={`/project/${project.id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white px-4 py-2.5 md:px-3 md:py-2 rounded-lg text-sm md:text-[11px] font-bold shadow-md hover:bg-indigo-600 hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all duration-300">
                    Details <ArrowRight size={14} />
                  </Link>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 bg-white text-slate-700 border border-slate-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 shadow-sm" title="Source Code">
                      <FaGithub size={16} />
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 bg-white text-emerald-600 border border-emerald-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 shadow-sm" title="Live Site">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;