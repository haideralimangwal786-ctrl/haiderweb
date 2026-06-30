import { useState } from "react";
import { Mail, User, MessageSquare, Send, MapPin, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import "animate.css";
import { useProfile } from "../hooks/useProfile";
import { useMessages } from "../hooks/useMessages";

const Contact = () => {
  const { profile } = useProfile();
  const { sendMessage } = useMessages();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const success = await sendMessage(form);
    if (success) {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center animate__animated animate__fadeInUp">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm mb-6">
            <Sparkles size={18} />
            Let's Connect
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Touch.</span>
          </h2>
          <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or looking to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start animate__animated animate__fadeInUp animate__delay-1s">
          
          {/* Contact Details (Left side, takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            <a href={`mailto:${profile?.email}`} className="group flex items-center gap-6 p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-indigo-100">
               <div className="min-w-[4rem] w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <Mail size={28} />
               </div>
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                 <h4 className="text-lg font-bold text-slate-900 truncate">{profile ? profile.email : 'Loading...'}</h4>
               </div>
            </a>

            <a href={`https://wa.me/${profile?.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="group flex items-center gap-6 p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-emerald-100">
               <div className="min-w-[4rem] w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <FaWhatsapp size={32} />
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp</p>
                 <h4 className="text-xl font-bold text-slate-900">{profile ? profile.whatsapp : 'Loading...'}</h4>
               </div>
            </a>

            <div className="group flex items-center gap-6 p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-pink-100 cursor-default">
               <div className="min-w-[4rem] w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin size={28} />
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                 <h4 className="text-[1.1rem] font-bold text-slate-900 leading-tight whitespace-pre-wrap">{profile ? profile.location : 'Loading...'}</h4>
               </div>
            </div>

            {/* Social & Custom Links Row */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-4 bg-white/60 backdrop-blur-md border border-white text-slate-700 rounded-2xl hover:border-indigo-200 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center shadow-md" title="GitHub">
                  <FaGithub size={24} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/60 backdrop-blur-md border border-white text-slate-700 rounded-2xl hover:border-blue-200 hover:text-blue-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center shadow-md" title="LinkedIn">
                  <FaLinkedin size={24} />
                </a>
              )}
              {profile?.customLinks?.map((link, idx) => {
                const Icon = LucideIcons[link.iconName] || LucideIcons.Link;
                return (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="p-4 bg-white/60 backdrop-blur-md border border-white text-slate-700 rounded-2xl hover:border-purple-200 hover:text-purple-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center shadow-md" title={link.platform}>
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Form (Right side, takes 3 columns) */}
          <div className="lg:col-span-3 bg-white/70 backdrop-blur-2xl p-10 lg:p-12 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
             
             {/* Form internal glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <h3 className="text-3xl font-black text-slate-900 mb-8 relative z-10">Send a Message</h3>
             
             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <User size={16} className="text-indigo-500" /> Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 font-medium text-slate-900"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold ml-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <Mail size={16} className="text-indigo-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 font-medium text-slate-900"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                    <MessageSquare size={16} className="text-indigo-500" /> Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 font-medium text-slate-900 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs font-bold ml-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  Send Message 
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;