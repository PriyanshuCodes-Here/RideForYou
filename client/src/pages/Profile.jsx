import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Ticket, Bell, Settings, ArrowRight, ShieldCheck } from 'lucide-react';

function Profile() {
  const navigate = useNavigate();

  const user = {
    name: 'Mogi Bisht',
    email: 'mogi@rideforyou.com',
    phone: '+91 98765 43210',
    location: 'Delhi, India',
    joined: 'January 2026',
    totalBookings: 12,
    activeBookings: 2,
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">My Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your account and view your activity.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-sky-500" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Member since {user.joined}</p>
              <div className="mt-4 flex items-center justify-center gap-1 text-sky-500">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">Verified Account</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-4">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-medium truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-medium">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-medium">{user.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-3xl font-black text-slate-900">{user.totalBookings}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">Total Bookings</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-3xl font-black text-sky-500">{user.activeBookings}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">Active Bookings</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">Quick Actions</h3>
              <div className="space-y-3">

                <button
                  onClick={() => navigate('/booking')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5" />
                    <span>Book a New Ride</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5" />
                    <span>My Bookings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/notifications')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-sky-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-sky-500" />
                    <span>View Notifications</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-sky-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-sky-500" />
                    <span>Go to Dashboard</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;