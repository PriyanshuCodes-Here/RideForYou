// src/pages/Services.jsx
import React from 'react';
import { Map, Clock, BellRing, Navigation, BarChart3, Smartphone, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Map, title: "Real-Time GPS Tracking", desc: "Enterprise-grade mapping interface that tracks municipal and private transit vehicles with zero latency." },
    { icon: Clock, title: "Predictive Routing AI", desc: "Machine learning algorithms that factor in live traffic, weather, and historical data to provide exact ETAs." },
    { icon: BellRing, title: "Custom Proximity Alerts", desc: "Set geofenced alerts to receive push notifications when your specific bus is 2, 5, or 10 minutes away." },
    { icon: Navigation, title: "Multi-Modal Journeys", desc: "Seamlessly connect bus routes with metro lines and walking paths for complete end-to-end trip planning." },
    { icon: BarChart3, title: "Transit Analytics Dashboard", desc: "Track your commute times, carbon footprint reduction, and monthly transit expenditure in one place." },
    { icon: Smartphone, title: "Cross-Device Syncing", desc: "Access your saved routes and live maps across our web app, iOS, Android, and supported smartwatches." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Full-Stack Transit Solutions</h3>
          <p className="text-slate-600">Everything you need to navigate the urban jungle, packaged in a beautifully intuitive interface.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 hover:border-sky-500 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
              <button className="text-sky-500 font-bold text-sm flex items-center gap-2 hover:text-sky-600">
                Explore Feature <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}