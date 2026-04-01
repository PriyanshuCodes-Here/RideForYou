import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center max-w-md w-full">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold">Verifying your account...</h2>
          </div>
        )}
        {status === 'success' && (
          <div>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">Verified!</h2>
            <p className="text-slate-500 mb-6">Your account is active. You can now login.</p>
            <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg inline-block">Login</Link>
          </div>
        )}
        {status === 'error' && (
          <div>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">Failed</h2>
            <p className="text-slate-500 mb-6">This link is invalid or has expired.</p>
            <Link to="/register" className="text-blue-600 font-bold underline">Try Registering Again</Link>
          </div>
        )}
      </div>
    </div>
  );
}