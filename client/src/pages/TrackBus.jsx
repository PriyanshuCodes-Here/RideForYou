import React, { useState, useEffect } from 'react';
import { Search, Navigation, MapPin, Clock, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const socket = io('http://localhost:5000', { withCredentials: true });

const customBusIcon = L.divIcon({
  className: 'custom-bus-marker',
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40"></div>
      <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10 shadow-[0_0_10px_rgba(37,99,235,0.6)]"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Component to handle map movement
const MapHandler = ({ buses }) => {
  const map = useMap();
  useEffect(() => {
    if (buses.length > 0 && buses[0].pos) {
      // Smoothly pans to the first bus in the list
      map.panTo([buses[0].pos.lat, buses[0].pos.lng]);
    }
  }, [buses, map]);
  return null;
};

export default function TrackBus() {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    socket.on('busLocation', (data) => {
      setBuses(data);
    });
    return () => socket.off('busLocation');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 sm:px-6 lg:px-8 pb-8 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">RideForYou <span className="text-blue-600 text-2xl">Live</span></h1>
            <p className="text-slate-500 font-medium italic text-sm">Real-time fleet tracking</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Route ID..." 
              className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 shadow-sm focus:border-blue-500 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
          
          <div className="w-full lg:w-[380px] flex flex-col gap-4 overflow-y-auto max-h-[650px] pr-2 custom-scrollbar">
            {buses.length > 0 ? (
              buses.map((bus) => (
                <div key={bus.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all shrink-0 group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-lg">{bus.id}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                      <p className="text-sm font-bold text-slate-800 leading-tight">{bus.route}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <p className="text-xs font-semibold text-slate-500">
                        Status: <span className={bus.status.includes('Delayed') ? 'text-red-500' : 'text-blue-600'}>{bus.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">Scanning for GPS signals...</p>
              </div>
            )}
          </div>


          <div className="flex-1 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl relative min-h-[450px] z-0">
            <MapContainer 
              center={[28.6304, 77.2177]} 
              zoom={14} 
              className="w-full h-full"
              zoomControl={false}
            >

              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri'
              />
              
              {buses.map((bus) => (
                <Marker 
                  key={bus.id}
                  position={[bus.pos.lat, bus.pos.lng]} 
                  icon={customBusIcon} 
                />
              ))}
              
              <MapHandler buses={buses} />
            </MapContainer>


            <div className="absolute bottom-6 right-6 z-[1000]">
              <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-700 hover:text-blue-600 transition-transform active:scale-95">
                <Navigation className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}