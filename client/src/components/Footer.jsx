import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Info Column */}
          <div className="col-span-2">
            <Link to="/" className="flex flex-col mb-6 group inline-block">
              <span className="text-2xl font-black tracking-tighter text-white leading-none group-hover:text-sky-400 transition-colors">
                RIDE<span className="text-sky-500">.</span>
              </span>
              <span className="text-sm font-bold tracking-widest text-slate-500 leading-none mt-1">
                FORYOU
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm font-medium leading-relaxed">
              Precision tracking, predictive AI ETAs, and comprehensive urban mobility solutions for the modern commuter.
            </p>
            <div className="space-y-3 text-sm text-slate-400 font-medium">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-500" /> +91 1800 555 0199
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-500" /> Mon-Sun, 24/7 Live Data
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-500" /> support@rideforyou.com
              </p>
            </div>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Features</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li><Link to="/track" className="hover:text-sky-400 transition-colors">Live GPS Tracking</Link></li>
              <li><Link to="/track" className="hover:text-sky-400 transition-colors">Predictive Alerts</Link></li>
              <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Saved Routes</Link></li>
              <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Transit Analytics</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition-colors">API Access</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-sky-400 transition-colors">Mobility Blog</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 RideForYou. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold text-slate-600">
            <span>EST. 2026</span>
            <span>•</span>
            <span>DELHI, INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}