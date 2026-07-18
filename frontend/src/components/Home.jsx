import { Sparkles, Code2, Download, FolderGit2, Cpu, CheckCircle, CodeXml, Database } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import "animate.css";
import heroImg from "../assets/hero.png";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import * as LucideIcons from "lucide-react";

const Home = () => {
  const { profile, loading } = useProfile();
  // Resume download is handled by the <a> tag below

  useEffect(() => {
    const hasSeenCelebration = sessionStorage.getItem("hasSeenCelebration");
    if (!hasSeenCelebration) {
      // Fire confetti from the center bottom
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#9333ea', '#ec4899', '#34d399', '#facc15']
      });

      // Small secondary burst from the sides
      setTimeout(() => {
        confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#4f46e5', '#ec4899'] });
        confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#4f46e5', '#ec4899'] });
      }, 500);

      sessionStorage.setItem("hasSeenCelebration", "true");
    }
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 overflow-hidden px-6 py-20">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 -right-10 w-[500px] h-[500px] bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-pink-300/40 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Top: Text & Image Grid */}
        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10 lg:mt-0">
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
            
            {/* Premium Badge */}
            <div className="animate__animated animate__fadeInDown inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-slate-200/50 text-indigo-700 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
              <Sparkles size={16} className="text-indigo-500" />
              {profile ? profile.role : 'Full Stack Developer'}
            </div>

            {/* Heading with Gradient Text */}
            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] animate__animated animate__fadeInUp tracking-tight">
              Hi, I'm <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                {profile ? profile.name : 'Haider Ali'}
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-xl animate__animated animate__fadeInUp animate__delay-1s leading-relaxed">
              {profile ? profile.heroIntro : 'I build modern, responsive, and scalable web applications.'}
            </p>

            {/* Tech Stack Pills - Glassmorphism */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 animate__animated animate__fadeInUp animate__delay-1s">
              {(profile ? profile.techPills : []).map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons & Socials */}
            <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center gap-4 animate__animated animate__fadeInUp animate__delay-1s">
              <Link
                to="/projects"
                className="group relative flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">View Projects</span>
                <FolderGit2 size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </Link>

              <a
                href={profile?.resumeLink || "/Haider_Ali_Resume.pdf"}
                download={!profile?.resumeLink?.startsWith("http")}
                target={profile?.resumeLink?.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="group flex items-center gap-2 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <span>Download Resume</span>
                <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-4 ml-0 sm:ml-2">
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="p-3.5 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-700 rounded-2xl hover:border-indigo-500 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                     <FaGithub size={22} />
                  </a>
                )}
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-3.5 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-700 rounded-2xl hover:border-indigo-500 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                     <FaLinkedin size={22} />
                  </a>
                )}
                {profile?.whatsapp && (
                  <a href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="p-3.5 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-700 rounded-2xl hover:border-emerald-500 hover:text-emerald-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                     <FaWhatsapp size={22} />
                  </a>
                )}
                
                {/* Dynamic Custom Links */}
                {profile?.customLinks?.map((link, idx) => {
                  const Icon = LucideIcons[link.iconName] || LucideIcons.Link;
                  return (
                    <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="p-3.5 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-700 rounded-2xl hover:border-purple-500 hover:text-purple-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center" title={link.platform}>
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end animate__animated animate__fadeInRight order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative group">
              {/* Outer Decorative Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Image Container */}
              <div className="relative z-10 w-72 h-72 md:w-[420px] md:h-[420px] rounded-full p-2 bg-gradient-to-tr from-indigo-100 via-white to-purple-100 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                {loading ? (
                  <div className="w-full h-full rounded-full bg-slate-200 animate-pulse flex items-center justify-center border-4 border-white">
                    <LucideIcons.User className="text-slate-400/60" size={80} />
                  </div>
                ) : (
                  <img 
                    src={profile?.profileImage || heroImg} 
                    alt={profile?.name || "Haider Ali"} 
                    className="w-full h-full object-cover rounded-full border-4 border-white animate__animated animate__fadeIn"
                  />
                )}
              </div>
              
              {/* Floating Element 1 (Top Right) */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Code2 className="text-indigo-600" size={32} />
              </div>
              
              {/* Floating Element 2 (Bottom Left) */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <Sparkles className="text-pink-500" size={32} />
              </div>

              {/* Floating Element 3 (Top Left) */}
              <div className="absolute top-10 -left-10 bg-white p-3 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <CodeXml className="text-purple-600" size={28} />
              </div>

              {/* Floating Element 4 (Bottom Right) */}
              <div className="absolute bottom-10 -right-10 bg-white p-3 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
                <Database className="text-blue-500" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="relative z-10 max-w-6xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          <div className="group bg-white/70 backdrop-blur-lg border border-slate-200/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate__animated animate__fadeInUp">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <CheckCircle className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">3+ Real Projects</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Developed and delivered scalable, real-world MERN stack applications with high performance.
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-lg border border-slate-200/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <Cpu className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">AI-Based System</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Integrated modern AI capabilities and sophisticated backend architectures for smart solutions.
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-lg border border-slate-200/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Code2 className="text-pink-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">Full Stack Developer</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">
              End-to-end development focusing on clean code, RESTful APIs, and responsive UI design.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;