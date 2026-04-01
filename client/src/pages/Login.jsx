import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // withCredentials: true is CRITICAL for saving the JWT cookie
      const res = await axios.post('http://localhost:5000/api/auth/login', formData, { 
        withCredentials: true 
      });
      
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/trackbus'); // Redirect to map after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-black mb-2 text-slate-900">Welcome Back 👋</h2>
        <p className="text-slate-500 mb-8 font-medium">Log in to access your saved buses.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full p-4 bg-slate-50 rounded-2xl pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="password" placeholder="Password" required
              className="w-full p-4 bg-slate-50 rounded-2xl pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-100 text-center">
            {error}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-500 font-medium text-sm">
            Don't have an account? 
            <Link to="/register" className="text-blue-600 ml-2 font-bold hover:underline">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}