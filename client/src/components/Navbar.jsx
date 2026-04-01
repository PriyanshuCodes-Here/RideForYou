import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, ShieldCheck, Menu, X, ArrowRight, Bell, Ticket, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed w-full top-0 z-50 flex flex-col">
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-sky-400" /> Support: 1800-RIDE-NOW</span>
            <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-sky-400" /> hello@rideforyou.com</span>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <span className="flex items-center gap-1 text-sky-400"><ShieldCheck className="w-3 h-3" /> Encrypted GPS Data</span>
            <span>24/7 Live Tracking</span>
          </div>
        </div>
      </div>

      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center">

          <Link to="/" className="flex flex-col group">
            <span className="text-xl lg:text-2xl font-black tracking-tighter text-slate-900 leading-none group-hover:text-sky-500 transition-colors">
              RIDE<span className="text-sky-500">.</span>
            </span>
            <span className="text-[10px] lg:text-xs font-bold tracking-widest text-slate-500 leading-none mt-1">
              FORYOU
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            {[
              { name: 'Home', path: '/' },
              { name: 'Live Map', path: '/trackbus' },
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'Book a Ride', path: '/booking' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors hover:text-sky-500 ${isActive(link.path) ? 'text-sky-500 border-b-2 border-sky-500 pb-1' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-slate-600 hover:text-sky-500 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 bg-sky-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="relative p-2 text-slate-600 hover:text-sky-500 transition-colors"
              title="My Bookings"
            >
              <Ticket className="w-5 h-5" />
            </button>
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-sky-500 transition-colors">
              Log In
            </Link>
            <Link to="/booking" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-500 transition-colors shadow-md flex items-center gap-2 group">
              Start Tracking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-slate-600 hover:text-sky-500 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 absolute w-full shadow-xl">
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Live Map', path: '/trackbus' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Book a Ride', path: '/booking' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Notifications', path: '/notifications' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-bold ${isActive(link.path) ? 'text-sky-500 bg-sky-50' : 'text-slate-700 hover:text-sky-500 hover:bg-slate-50'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-200 pt-4 mt-2 flex flex-col gap-3 px-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 text-slate-700 font-bold border border-slate-200 rounded-lg hover:bg-slate-50">
                  Log In
                </Link>
                <Link to="/booking" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 bg-sky-500 text-white font-bold rounded-lg shadow-md hover:bg-sky-400">
                  Start Tracking
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}