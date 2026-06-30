import { useState } from "react";
import Logo from "./Logo";

import { Home, User, FolderOpen, Mail, Code, Briefcase, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link, useLocation } from "react-router-dom";

/* =========================
   NAVBAR COMPONENT
========================= */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Logo size="sm" showTagline={false} />

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-slate-600 font-bold">
          <li>
            <Link to="/" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <User size={18} className="group-hover:-translate-y-0.5 transition-transform" /> About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/skills" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <Code size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/services" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <Briefcase size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <FolderOpen size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <Sparkles size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="group flex items-center gap-2 hover:text-indigo-600 transition-colors relative py-2">
              <Mail size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
        </ul>

        {/* CTA Button (Desktop) */}
        <Link 
          to="/contact"
          className="hidden md:inline-flex group relative items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-md hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Hire Me
          <Sparkles size={16} className="text-pink-300 group-hover:rotate-12 transition-transform" />
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-600 hover:text-indigo-600 transition-colors p-2"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-6 animate__animated animate__fadeInDown animate__faster z-40">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><Home size={20}/> Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><User size={20}/> About</Link>
          <Link to="/skills" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><Code size={20}/> Skills</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><Briefcase size={20}/> Services</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><FolderOpen size={20}/> Projects</Link>
          <Link to="/testimonials" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><Sparkles size={20}/> Reviews</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors"><Mail size={20}/> Contact</Link>
          
          <Link 
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Hire Me
            <Sparkles size={16} className="text-pink-300" />
          </Link>
        </div>
      )}
    </nav>
  );
};

/* =========================
   FOOTER COMPONENT
========================= */
export const Footer = () => {
  return (
    <footer className="relative w-full bg-slate-950 text-slate-300 mt-20 overflow-hidden border-t border-slate-800">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Brand */}
        <div className="flex flex-col items-start">
          <Logo size="sm" showTagline={true} className="text-white" />
          <p className="mt-6 text-slate-400 leading-relaxed font-medium max-w-sm">
            Building modern, responsive, and highly premium web experiences. Turning complex ideas into elegant digital realities.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">Quick Links</h3>
          <ul className="space-y-4 font-medium">
            <li><Link to="/" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> Home</Link></li>
            <li><Link to="/about" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> About</Link></li>
            <li><Link to="/skills" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> Skills</Link></li>
            <li><Link to="/services" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> Services</Link></li>
            <li><Link to="/projects" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> Projects</Link></li>
            <li><Link to="/contact" className="group hover:text-indigo-400 flex items-center gap-3 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">Let's Connect</h3>
          <a href="mailto:haideralimangwal786@gmail.com" className="block text-slate-400 hover:text-indigo-400 transition-colors font-medium mb-2">
            haideralimangwal786@gmail.com
          </a>
          <p className="text-slate-400 font-medium mb-8">District Chakwal, Punjab, Pakistan</p>
          
          <div className="flex gap-4">
            <a href="https://github.com/haideralimangwal786-ctrl" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] transition-all duration-300">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/haider-ali-8a008325a/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:bg-blue-900/20 hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_rgba(10,102,194,0.4)] transition-all duration-300">
              <FaLinkedin size={20} />
            </a>
            <a href="https://wa.me/923115609634" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:bg-emerald-900/20 hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_rgba(37,211,102,0.4)] transition-all duration-300">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 text-center py-6 text-sm font-medium text-slate-500 bg-black/20">
        © {new Date().getFullYear()} Haider Ali. All rights reserved.
      </div>
    </footer>
  );
};

/* =========================
   LAYOUT WRAPPER
========================= */
const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

export default Layout;