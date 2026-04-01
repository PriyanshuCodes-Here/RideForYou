import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Star, ChevronRight, Settings, Clock, Ticket, Bell, MapPin, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const savedRoutes = [
    { id: "543A", from: "Central Station", to: "Tech Park", time: "10 mins", status: "On Time" },
    { id: "912", from: "Downtown", to: "Airport", time: "25 mins", status: "Delayed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, Mogi</h1>
            <p className="text-slate-600 font-medium">Here's your mobility overview for today.</p>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-bold hover:border-sky-500 hover:text-sky-500 transition-colors flex items-center gap-2 shadow-sm">
            <Settings className="w-4 h-4" /> Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mb-4 relative z-10">
                  <Activity className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1 relative z-10">12</div>
                <div className="text-sm font-medium text-slate-500 relative z-10">Commutes This Week</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-sky-300 transition-colors">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">4</div>
                <div className="text-sm font-medium text-slate-500">Saved Routes</div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => navigate('/booking')}
                  className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white p-5 rounded-xl shadow-sm transition-all group flex flex-col gap-2"
                >
                  <Ticket className="w-6 h-6" />
                  <p className="font-bold text-lg">Book a Ride</p>
                  <p className="text-sky-100 text-sm">Reserve your seat now</p>
                  <ArrowRight className="w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => navigate('/my-bookings')}
                  className="cursor-pointer bg-white hover:border-sky-300 text-slate-800 p-5 rounded-xl border border-slate-200 shadow-sm transition-all group flex flex-col gap-2"
                >
                  <Ticket className="w-6 h-6 text-sky-500" />
                  <p className="font-bold text-lg">My Bookings</p>
                  <p className="text-slate-400 text-sm">View & cancel rides</p>
                  <ArrowRight className="w-4 h-4 mt-1 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => navigate('/notifications')}
                  className="cursor-pointer bg-white hover:border-sky-300 text-slate-800 p-5 rounded-xl border border-slate-200 shadow-sm transition-all group flex flex-col gap-2"
                >
                  <Bell className="w-6 h-6 text-sky-500" />
                  <p className="font-bold text-lg">Notifications</p>
                  <p className="text-slate-400 text-sm">Alerts & updates</p>
                  <ArrowRight className="w-4 h-4 mt-1 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">Your Saved Routes</h2>
                <button className="text-sm font-bold text-sky-500 hover:text-sky-600">Add New +</button>
              </div>
              <div className="space-y-4">
                {savedRoutes.map((route, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-sky-300 cursor-pointer transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-sky-50 flex items-center justify-center border border-sky-100 group-hover:bg-sky-500 transition-colors">
                        <span className="font-black text-sky-600 group-hover:text-white text-lg">{route.id}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          {route.from} <ChevronRight className="w-4 h-4 text-slate-400" /> {route.to}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                          Next arrival in <span className={`font-bold ${route.status === 'On Time' ? 'text-green-500' : 'text-orange-500'}`}>{route.time}</span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-5 flex gap-4 hover:bg-slate-50 transition-colors">
                    <div className="mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-sky-50" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Boarded Route <span className="text-sky-500">78B</span> at Downtown
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {i === 0 ? 'Today, 8:45 AM' : 'Yesterday, 6:30 PM'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full py-4 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors border-t border-slate-200"
              >
                View Full History
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}