import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password, form.role);
      }
      navigate('/dashboard'); // Adjusted from onboarding to dashboard for better flow
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1A2624] font-sans flex items-center justify-center px-6">
      <div className="max-w-[480px] w-full">
        
        {/* BRANDING HEADER */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0D9488] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-900/10">
            <span className="text-white font-black text-3xl italic">H</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            {isLogin ? 'Welcome back.' : 'Join the collective.'}
          </h1>
          <p className="text-gray-500 font-medium">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your journey with HelpHub AI today.'}
          </p>
        </div>

        {/* AUTH CARD */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          
          {/* TOGGLE SWITCH */}
          <div className="flex bg-[#F4F7F6] p-1.5 rounded-full mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white text-[#0D9488] shadow-sm' : 'text-gray-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white text-[#0D9488] shadow-sm' : 'text-gray-400'}`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-6 flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold text-gray-700 focus:ring-2 focus:ring-[#0D9488]/20 transition-all" 
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                  required 
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold text-gray-700 focus:ring-2 focus:ring-[#0D9488]/20 transition-all" 
                value={form.email} 
                onChange={e => setForm({ ...form, email: e.target.value })} 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold text-gray-700 focus:ring-2 focus:ring-[#0D9488]/20 transition-all" 
                value={form.password} 
                onChange={e => setForm({ ...form, password: e.target.value })} 
                required 
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Primary Intent</label>
                <select 
                  className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold text-gray-700 focus:ring-2 focus:ring-[#0D9488]/20 transition-all appearance-none" 
                  value={form.role} 
                  onChange={e => setForm({ ...form, role: e.target.value })}
                >
                  <option value="need-help">I am looking for help</option>
                  <option value="can-help">I want to provide help</option>
                  <option value="both">Both (Contributor & Requester)</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#1A2624] hover:bg-[#0D9488] text-white py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-2 group mt-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center mt-8 text-xs font-bold text-gray-400 flex items-center justify-center gap-2 uppercase tracking-tighter">
          <ShieldCheck size={14} className="text-[#0D9488]" /> 
          Secure authentication powered by HelpHub AI
        </p>
      </div>
    </div>
  );
}