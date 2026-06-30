import { User, Layers, Rocket, MonitorSmartphone, Server, Database, Wrench, Briefcase, Mail, Store, Smartphone, Music, Lightbulb, CheckCircle2 } from "lucide-react";
import "animate.css";
import { Link } from "react-router-dom";
import myImage from "../assets/hero.png";
import { useProfile } from "../hooks/useProfile";

const About = () => {
  const { profile } = useProfile();
  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-pink-200/30 rounded-full blur-[150px] translate-y-1/2 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-32">

        {/* 1. Header & Intro */}
        <div className="grid lg:grid-cols-2 gap-16 items-center animate__animated animate__fadeInUp">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm">
              <User size={18} />
              Full Stack MERN Developer
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Designing the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                Future Web.
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
              {profile ? profile.aboutBio : 'Loading bio...'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
               <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200/50 text-slate-700 font-semibold shadow-sm">
                  <CheckCircle2 className="text-emerald-500" size={20} /> Clean Code
               </div>
               <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200/50 text-slate-700 font-semibold shadow-sm">
                  <CheckCircle2 className="text-indigo-500" size={20} /> Scalable Apps
               </div>
               <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200/50 text-slate-700 font-semibold shadow-sm">
                  <CheckCircle2 className="text-purple-500" size={20} /> Modern UI
               </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative hidden lg:block">
             <div className="aspect-square rounded-full bg-gradient-to-tr from-indigo-300 to-purple-300 animate-[spin_15s_linear_infinite] absolute inset-0 blur-3xl opacity-40"></div>
             <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 p-4 rounded-[3rem] shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
               <div className="w-full aspect-square rounded-[2.5rem] shadow-inner overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-50 border-4 border-white/60 group/img">
                  <img src={profile?.profileImage || myImage} alt={profile?.name || "Haider Ali"} className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700" />
               </div>
               
               {/* Floating Badge */}
               <div className="absolute -left-8 top-20 bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </span>
                  <span className="font-extrabold text-slate-800">Available to Hire</span>
               </div>
             </div>
          </div>

        </div>

        {/* 2. Projects Experience */}
        <div className="animate__animated animate__fadeInUp animate__delay-1s relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="p-4 bg-white shadow-md text-indigo-600 rounded-2xl mb-6 border border-slate-100">
              <Briefcase size={32} />
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Projects Experience</h3>
            <p className="text-center text-slate-600 mt-4 text-lg max-w-2xl">
              I have practical experience through multiple personal and academic projects.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group relative bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <Store size={32} />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Homedify</h4>
                <p className="text-sm font-bold text-indigo-600 mb-5 tracking-widest uppercase">AI Marketplace</p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Built a full-stack marketplace with authentication, role-based dashboards, AI-based verification, and secure backend systems.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                  <Smartphone size={32} />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-2">WallNest</h4>
                <p className="text-sm font-bold text-purple-600 mb-5 tracking-widest uppercase">Mobile App</p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Developed a Flutter-based mobile application integrated with Pexels API for browsing, searching, and downloading wallpapers.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                  <Music size={32} />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Naat Player</h4>
                <p className="text-sm font-bold text-pink-600 mb-5 tracking-widest uppercase">Web Player</p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Created a feature-rich audio streaming web app with authentication, IndexedDB storage, and advanced player controls.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center justify-center gap-3 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 p-2 rounded-full">
                 <Lightbulb className="text-amber-500" size={24} />
              </div>
              <span className="text-slate-700 font-bold text-lg">
                Gained strong experience in full-stack dev, APIs, & databases.
              </span>
            </div>
          </div>
        </div>

        {/* 3. Tech Stack */}
        <div className="animate__animated animate__fadeInUp animate__delay-1s relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="p-4 bg-white shadow-md text-indigo-600 rounded-2xl mb-6 border border-slate-100">
              <Layers size={32} />
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Tech Stack</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="group flex items-center gap-6 p-8 bg-white/70 backdrop-blur-lg rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-5 bg-blue-50 text-blue-600 rounded-[1.5rem] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <MonitorSmartphone size={36} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-1">Frontend</h4>
                <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider">React.js, JS, Tailwind</p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-8 bg-white/70 backdrop-blur-lg rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-5 bg-emerald-50 text-emerald-600 rounded-[1.5rem] group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Server size={36} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-1">Backend</h4>
                <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Node.js, Express, REST</p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-8 bg-white/70 backdrop-blur-lg rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-5 bg-yellow-50 text-yellow-600 rounded-[1.5rem] group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                <Database size={36} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-1">Database</h4>
                <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider">MongoDB, Mongoose</p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-8 bg-white/70 backdrop-blur-lg rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-5 bg-slate-100 text-slate-700 rounded-[1.5rem] group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
                <Wrench size={36} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-1">Tools</h4>
                <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Git, GitHub, Postman</p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Goal & Call to Action */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl animate__animated animate__fadeInUp animate__delay-1s relative overflow-hidden">
          {/* Abstract Glass shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Rocket className="mx-auto mb-8 opacity-90" size={64} />
            <h3 className="text-4xl md:text-5xl font-black mb-6">My Mission</h3>
            <p className="text-indigo-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium whitespace-pre-wrap">
              {profile ? profile.aboutMission : 'Loading mission...'}
            </p>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 mb-12 max-w-4xl mx-auto shadow-2xl">
              <p className="text-white font-semibold text-xl leading-relaxed">
                {profile ? profile.aboutStatus : 'Loading status...'}
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-indigo-900 font-black px-12 py-6 rounded-2xl hover:bg-indigo-50 hover:-translate-y-2 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.7)] text-xl tracking-wide uppercase"
            >
              Contact Me <Mail size={24} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;