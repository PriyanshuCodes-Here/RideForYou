import React from 'react';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      category: "Engineering",
      title: "How We Achieved Zero-Latency GPS Polling",
      excerpt: "A deep dive into our websocket architecture and how we process millions of municipal data points per second without crashing.",
      author: "Sarah Chen",
      date: "Mar 18, 2026",
      readTime: "8 min read",
      image: "bg-gradient-to-br from-slate-800 to-slate-900"
    },
    {
      category: "Company Update",
      title: "RideForYou Expands to 50 New Transit Networks",
      excerpt: "We're bringing predictive AI ETAs to commuters in Chicago, Seattle, and Austin. Here's what you need to know about the rollout.",
      author: "Mogi",
      date: "Mar 15, 2026",
      readTime: "4 min read",
      image: "bg-gradient-to-br from-sky-500 to-blue-600"
    },
    {
      category: "Sustainability",
      title: "Tracking the Carbon Impact of Smart Commuting",
      excerpt: "How optimized bus routes and predictive tracking are quietly reducing urban emissions by keeping cars off the road.",
      author: "David Park",
      date: "Mar 10, 2026",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-teal-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">Insights & Updates</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            The Mobility <span className="text-sky-500">Journal.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Thoughts, engineering deep dives, and company news from the team building the future of urban transit.
          </p>
        </div>

        {/* Featured Post (Hero) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all mb-16 group cursor-pointer flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Product Vision</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Mar 20, 2026</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 10 min read</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-sky-500 transition-colors">
              Solving the "Ghost Bus" Problem with Predictive AI Models
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Why do buses disappear from tracking apps right when you need them? We break down the flaws in legacy GPS systems and how our machine learning pipeline fixes it for good.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Priyanshu</p>
                  <p className="text-xs text-slate-500 font-medium">Lead Engineer</p>
                </div>
              </div>
              <button className="text-sky-500 font-bold flex items-center gap-2 hover:text-sky-600 transition-colors">
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Latest Articles</h3>
          <button className="text-sm font-bold text-sky-500 hover:text-sky-600 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-sky-300 hover:shadow-md transition-all group cursor-pointer flex flex-col">
              {/* Abstract image placeholder to match the tech vibe */}
              <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                 <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                     <Tag className="w-3 h-3" /> {post.category}
                   </span>
                 </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-500 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-slate-900 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-sky-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Never Miss an Update</h3>
            <p className="text-slate-400 mb-8 font-medium">Get the latest transit tech insights delivered straight to your inbox every month.</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <button className="bg-sky-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}