import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Sparkles, Code2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "animate.css";
import { useProjects } from "../hooks/useProjects";

const ProjectDetails = () => {
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-800">Project Not Found</h2>
        <Link to="/projects" className="ml-4 text-indigo-600 hover:underline font-bold">Go Back</Link>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto animate__animated animate__fadeInUp">
        
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Projects
        </Link>

        {/* Project Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            {project.title}
          </h1>
          <div className="w-24 h-1.5 bg-indigo-500 rounded-full mx-auto"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[3rem] shadow-xl">
          
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-indigo-500" size={24} />
            <h2 className="text-2xl font-black text-slate-900">Overview</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed font-medium mb-10">
            {project.desc}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="text-purple-500" size={24} />
                <h3 className="text-xl font-black text-slate-900">Technologies Used</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <h3 className="text-xl font-black text-slate-900">Key Features</h3>
              </div>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap gap-4 justify-center">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300">
                <ExternalLink size={20} /> Visit Live Site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <FaGithub size={20} /> View Source Code
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectDetails;
