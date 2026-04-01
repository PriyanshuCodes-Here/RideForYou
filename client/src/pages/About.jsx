// src/pages/About.jsx
import React from 'react';
import { Target, TrendingUp, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Redefining <span className="text-sky-500">Urban Mobility.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          RideForYou started with a simple frustration: the anxiety of waiting for a bus that never comes. Today, we are bridging the gap between municipal transit data and the daily commuter.
        </p>
      </div>

      {/* Two Column Story (Phoenix Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="bg-slate-900 p-10 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
            To build the digital infrastructure that makes public transportation the most reliable, predictable, and stress-free way to move through your city. We believe technology should serve the commuter first.
          </p>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3"><CheckCircle2 className="text-sky-400 w-5 h-5" /> 100% Data Accuracy Goal</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-sky-400 w-5 h-5" /> Zero-Latency Processing</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-sky-400 w-5 h-5" /> User-Privacy First</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Users, stat: "500K+", label: "Active Commuters" },
            { icon: Target, stat: "99.9%", label: "ETA Accuracy" },
            { icon: TrendingUp, stat: "12M+", label: "Routes Tracked" },
            { icon: ShieldCheck, stat: "24/7", label: "Server Uptime" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-sky-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{item.stat}</div>
              <div className="text-sm font-medium text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}