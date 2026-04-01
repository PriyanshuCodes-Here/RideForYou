import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">Support</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Get in Touch</h3>
          <p className="text-slate-600">Facing an issue with a route? Want to partner your fleet with RideForYou? Our team is available 24/7.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Side */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 items-start">
              <div className="bg-sky-50 p-3 rounded-lg"><Phone className="w-6 h-6 text-sky-500" /></div>
              <div>
                <h4 className="font-bold text-slate-900">Phone Support</h4>
                <p className="text-sm text-slate-500 mt-1">+91 1800 555 0199</p>
                <p className="text-xs text-sky-500 font-medium mt-1">Mon-Fri, 9AM-6PM</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 items-start">
              <div className="bg-sky-50 p-3 rounded-lg"><Mail className="w-6 h-6 text-sky-500" /></div>
              <div>
                <h4 className="font-bold text-slate-900">Email Us</h4>
                <p className="text-sm text-slate-500 mt-1">support@rideforyou.com</p>
                <p className="text-xs text-sky-500 font-medium mt-1">24/7 Response Time</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 items-start">
              <div className="bg-sky-50 p-3 rounded-lg"><MapPin className="w-6 h-6 text-sky-500" /></div>
              <div>
                <h4 className="font-bold text-slate-900">Headquarters</h4>
                <p className="text-sm text-slate-500 mt-1">Tech Hub, Sector 62<br/>Delhi NCR, India</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-sm">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none" placeholder="Write your message here..."></textarea>
              </div>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-sky-500 transition-colors flex items-center gap-2 w-full justify-center">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}