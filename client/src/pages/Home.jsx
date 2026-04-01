import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, Mail, ShieldCheck, CheckCircle2, ChevronRight,
  Map, Clock, BellRing, Shield, LineChart,
  ArrowRight, Zap, Smartphone, MapPin, Navigation
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <section className="bg-white pt-14 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-4 h-4 text-sky-500" /> Next-Gen Transit Platform
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Precision Tracking <br />
              <span className="text-sky-500">Meets Urban Mobility.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              RideForYou delivers elite transit solutions combining cutting-edge GPS technology with predictive AI. We transform stressful daily commutes into seamless, predictable journeys for everyone.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-sky-500" /> Zero-Latency Updates</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-sky-500" /> AI-Powered ETAs</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-sky-500" /> Official Transit Data</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-sky-500" /> Cloud-Based Sync</span>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/trackbus')}
                className="bg-sky-500 text-white px-8 py-4 rounded-md font-bold hover:bg-sky-400 transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/30"
              >
                Open Live Map <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/booking')}
                className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-md font-bold hover:border-sky-500 hover:text-sky-500 transition-colors"
              >
                Book a Ride
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative h-full min-h-[400px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-slate-400">
              <MapPin className="w-16 h-16 text-sky-300 mb-4" />
              <span className="font-medium">Interactive Map UI</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-slate-950 border-t-4 border-sky-500">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white gap-6">
            <div className="font-bold text-lg">TRUSTED BY <span className="text-sky-400">500K+</span> Commuters</div>
            <div className="flex gap-8 text-sm md:text-base font-medium">
              <span className="flex flex-col items-center"><span className="text-xl font-bold text-sky-400">1M+</span> Routes Saved</span>
              <span className="flex flex-col items-center"><span className="text-xl font-bold text-sky-400">99.9%</span> ETA Accuracy</span>
              <span className="flex flex-col items-center"><span className="text-xl font-bold text-sky-400">24/7</span> Live Sync</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Transit Solutions</h3>
            <p className="text-slate-600 font-medium">From routine daily commutes to complex multi-stop journeys, we provide end-to-end tracking tailored to your city.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Map, title: "Live GPS Tracking", desc: "Watch your bus move on the map in real-time. We aggregate municipal data to deliver zero-latency updates directly to your screen." },
              { icon: Clock, title: "Predictive AI ETAs", desc: "Our machine learning models analyze traffic patterns, weather, and historical data to predict arrivals accurate to the minute." },
              { icon: BellRing, title: "Smart Route Alerts", desc: "Never wait in the rain again. Set custom proximity alerts and get push notifications when your bus is approaching your stop." },
              { icon: Shield, title: "Verified Transit Data", desc: "We integrate directly with official city transit authorities, ensuring the routes, detours, and schedules you see are 100% authentic." },
              { icon: LineChart, title: "Commute Analytics", desc: "Track your transit carbon footprint, money saved versus driving, and time spent commuting with our detailed monthly insights." },
              { icon: Smartphone, title: "Cross-Platform Sync", desc: "Start a route on your desktop, track it on your phone, and get alerts on your smartwatch. A truly unified ecosystem." }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100 transition-all group">
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <a href="#" className="text-sky-500 font-bold text-sm flex items-center gap-1 hover:text-sky-600">
                  Explore Feature <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">How It Works</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">The RideForYou Methodology</h3>
            <p className="text-slate-600 font-medium">A structured, friction-free approach ensuring precision and peace of mind at every step of your journey.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Search & Select", desc: "Enter your destination or select a saved route from your personalized dashboard." },
              { num: "02", title: "Live Connection", desc: "Our servers instantly connect to the specific vehicle's GPS transponder." },
              { num: "03", title: "Track & Monitor", desc: "Watch the vehicle's progress on our interactive, high-fidelity map interface." },
              { num: "04", title: "Board Seamlessly", desc: "Receive your proximity alert and walk to your stop exactly when needed." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-sky-50 mb-4">{step.num}</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 relative z-10">{step.title}</h4>
                <p className="text-slate-600 text-sm relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/booking')}
              className="bg-sky-500 text-white px-10 py-4 rounded-md font-bold hover:bg-sky-400 transition-colors inline-flex items-center gap-2 shadow-lg shadow-sky-500/30"
            >
              Book Your First Ride <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-sky-400 font-bold tracking-wider uppercase text-sm mb-3">Coverage</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Transit Networks We Serve</h3>
              <p className="text-slate-400">Our deep API integrations allow us to provide specialized tracking for diverse transit sectors across the country.</p>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="hidden md:flex bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold transition-colors items-center gap-2 border border-white/20 mt-6 md:mt-0"
            >
              View Supported Cities <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { count: "150+", title: "City Bus Networks", desc: "High-frequency municipal tracking tailored for dense urban environments." },
              { count: "85+", title: "Metro Feeders", desc: "Last-mile connectivity vehicles synced directly with train arrival times." },
              { count: "60+", title: "Intercity Transit", desc: "Long-haul tracking with specialized highway traffic delay estimations." },
              { count: "120+", title: "University Shuttles", desc: "Private campus loops with custom access for registered students." },
              { count: "45+", title: "Corporate Fleets", desc: "Secure employee transport tracking with restricted dashboard access." },
              { count: "75+", title: "Airport Transfers", desc: "Terminal-to-terminal and city-to-airport express route monitoring." }
            ].map((industry, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors">
                <div className="text-3xl font-black text-sky-400 mb-2">{industry.count}</div>
                <h4 className="text-xl font-bold mb-3">{industry.title}</h4>
                <p className="text-slate-400 text-sm">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">RIDE<span className="text-sky-500">.</span></span>
                <span className="text-sm font-bold tracking-widest text-slate-500 leading-none mt-1">FORYOU</span>
              </div>
              <p className="text-slate-600 mb-6 max-w-sm font-medium">
                Precision tracking, predictive AI ETAs, comprehensive urban mobility.
              </p>
              <div className="space-y-2 text-sm text-slate-600 font-medium">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-sky-500" /> +91 1800 555 0199</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-500" /> Mon-Sun, 24/7 Live Data</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-sky-500" /> support@rideforyou.com</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Features</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li><button onClick={() => navigate('/trackbus')} className="hover:text-sky-500">Live GPS Tracking</button></li>
                <li><button onClick={() => navigate('/notifications')} className="hover:text-sky-500">Predictive Alerts</button></li>
                <li><button onClick={() => navigate('/my-bookings')} className="hover:text-sky-500">My Bookings</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-sky-500">Transit Analytics</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-sky-500">All Services</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li><button onClick={() => navigate('/about')} className="hover:text-sky-500">About Us</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-sky-500">Supported Cities</button></li>
                <li><button onClick={() => navigate('/faq')} className="hover:text-sky-500">FAQ</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-sky-500">Contact Support</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">© 2026 RideForYou. All rights reserved.</p>
            <div className="flex gap-6 text-sm font-bold text-slate-400">
              <span>EST. 2026</span>
              <span>•</span>
              <span>DELHI, INDIA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}