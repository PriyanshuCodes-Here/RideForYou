import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Loader2, CheckCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      // Backend handles hashing and sending the email
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setStatus({ type: 'success', msg: res.data.message });
    } catch (err) {
      setStatus({ 
        type: 'error', 
        msg: err.response?.data?.message || "Registration failed. Try a different email." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100 relative overflow-hidden">
        
        {status.type === 'success' ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-slate-900 mb-4">Check Your Inbox!</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              We sent a verification link to <span className="text-blue-600 font-bold">{formData.email}</span>. 
              Verify your email to activate your account.
            </p>
            <Link to="/login" className="mt-8 inline-block text-blue-600 font-bold hover:underline">
              Go to Login Page
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-black mb-2 text-slate-900">Join RideForYou 🚌</h2>
            <p className="text-slate-500 mb-8 font-medium">Create an account to track and save routes.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" placeholder="Full Name" required
                  className="w-full p-4 bg-slate-50 rounded-2xl pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

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
                className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
              </button>
            </form>

            {status.type === 'error' && (
              <div className="mt-6 p-4 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-100 text-center">
                {status.msg}
              </div>
            )}

            <p className="mt-8 text-center text-slate-500 font-medium text-sm">
              Already a member? 
              <Link to="/login" className="text-blue-600 ml-2 font-bold hover:underline">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}