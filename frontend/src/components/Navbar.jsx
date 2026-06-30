import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "animate.css";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Logo size="sm" showTagline={false} />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-slate-600 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link to="/skills" className="hover:text-indigo-600 transition-colors">Skills</Link>
          <Link to="/projects" className="hover:text-indigo-600 transition-colors">Projects</Link>
          <Link to="/testimonials" className="hover:text-indigo-600 transition-colors">Reviews</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
        </div>

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
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">About</Link>
          <Link to="/skills" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">Skills</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">Projects</Link>
          <Link to="/testimonials" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">Reviews</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-slate-600 font-black text-lg hover:text-indigo-600 transition-colors">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;