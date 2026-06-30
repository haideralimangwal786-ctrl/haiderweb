import { Star, ExternalLink, Quote, Loader2 } from "lucide-react";
import "animate.css";
import { useReviews } from "../hooks/useReviews";

const Testimonials = () => {
  const { reviews, loading } = useReviews();

  return (
    <section className="relative w-full bg-slate-50 py-24 px-6 min-h-screen overflow-hidden">

      {/* Background Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center animate__animated animate__fadeInUp max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 text-indigo-700 rounded-full text-sm font-bold shadow-sm mb-6">
            <Star size={18} className="fill-indigo-500 text-indigo-500" />
            Client Reviews
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Clients.</span>
          </h2>
          <p className="mt-8 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            Don't just take my word for it. Here's what my clients say about the websites and apps I've built for them.
          </p>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={48} className="text-indigo-400 animate-spin" />
            <p className="text-slate-500 font-semibold text-lg">Loading Now.....</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={48} className="text-indigo-400 animate-spin" />
            <p className="text-slate-500 font-semibold text-lg">Loading Now.....</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeInUp animate__delay-1s">
            {reviews.map((review, index) => (
              <div
                key={review.id || review._id || index}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)] hover:-translate-y-1.5 transition-all duration-500 p-8 flex flex-col"
              >
                {/* Gradient top bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote + Feedback */}
                <div className="relative flex-grow mb-8">
                  <Quote size={32} className="text-indigo-100 absolute -top-1 -left-1 pointer-events-none" />
                  <p className="text-slate-600 text-base leading-relaxed pl-6 pr-2">
                    {review.feedback}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between">

                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.clientName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center font-black text-lg border-2 border-slate-100 shadow-sm">
                          {review.clientName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm">{review.clientName}</p>
                        {review.company && (
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{review.company}</p>
                        )}
                      </div>
                    </div>

                    {/* Live Site Button */}
                    {review.liveLink && (
                      <a
                        href={review.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        title="Visit Live Site"
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 rounded-xl transition-colors duration-300"
                      >
                        <ExternalLink size={14} />
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
