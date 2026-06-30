import { Code2, MonitorSmartphone, Server, Database, PenTool, Wrench, Sparkles, Globe, Cpu, Cloud, Smartphone, Layout, Shield } from "lucide-react";
import "animate.css";
import { useServices } from "../hooks/useServices";

// Icon mapping object to convert string names to components
const IconMap = {
  Code2: Code2,
  MonitorSmartphone: MonitorSmartphone,
  Server: Server,
  Database: Database,
  PenTool: PenTool,
  Wrench: Wrench,
  Globe: Globe,
  Cpu: Cpu,
  Cloud: Cloud,
  Smartphone: Smartphone,
  Layout: Layout,
  Shield: Shield
};

const colorConfig = {
  indigo: { bgGlow: "bg-indigo-500", iconBg: "bg-indigo-50", borderColor: "hover:border-indigo-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(79,70,229,0.3)]", iconColor: "text-indigo-600", textGlow: "group-hover:from-indigo-600 group-hover:to-purple-600" },
  blue: { bgGlow: "bg-blue-500", iconBg: "bg-blue-50", borderColor: "hover:border-blue-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]", iconColor: "text-blue-600", textGlow: "group-hover:from-blue-600 group-hover:to-cyan-500" },
  emerald: { bgGlow: "bg-emerald-500", iconBg: "bg-emerald-50", borderColor: "hover:border-emerald-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]", iconColor: "text-emerald-600", textGlow: "group-hover:from-emerald-600 group-hover:to-teal-500" },
  amber: { bgGlow: "bg-amber-500", iconBg: "bg-amber-50", borderColor: "hover:border-amber-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.3)]", iconColor: "text-amber-600", textGlow: "group-hover:from-amber-600 group-hover:to-orange-500" },
  pink: { bgGlow: "bg-pink-500", iconBg: "bg-pink-50", borderColor: "hover:border-pink-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(236,72,153,0.3)]", iconColor: "text-pink-600", textGlow: "group-hover:from-pink-600 group-hover:to-rose-500" },
  purple: { bgGlow: "bg-purple-500", iconBg: "bg-purple-50", borderColor: "hover:border-purple-300", glowColor: "hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)]", iconColor: "text-purple-600", textGlow: "group-hover:from-purple-600 group-hover:to-fuchsia-500" },
};

const Services = () => {
  const { services } = useServices();

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-pink-200/20 rounded-full blur-[150px] pointer-events-none translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center animate__animated animate__fadeInUp max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm mb-6">
            <Sparkles size={18} />
            What I Do
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Services.</span>
          </h2>
          <p className="mt-8 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            I provide web development solutions focused on performance, scalability, and modern user experience. From responsive frontend interfaces to secure backend systems, I help transform ideas into functional digital products using modern technologies and best development practices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeInUp animate__delay-1s">
          {services.map((service, index) => {
            const IconComponent = IconMap[service.iconName] || Wrench;
            const theme = colorConfig[service.colorTheme] || colorConfig.indigo;
            return (
              <div 
                key={service._id || index} 
                className={`group bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white transition-all duration-500 hover:-translate-y-3 shadow-lg relative overflow-hidden ${theme.borderColor} ${theme.glowColor}`}
              >
                {/* Internal subtle glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none ${theme.bgGlow}`}></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${theme.iconBg} border border-white shadow-md flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent size={32} className={theme.iconColor} />
                  </div>
                  
                  <h3 className={`text-2xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${theme.textGlow} transition-all duration-300`}>{service.title}</h3>
                  
                  <p className="text-slate-600 font-medium leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
