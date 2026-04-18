import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { aiService } from '../services/aiService.js';
import { Button, Card, Badge } from '../components/UI/index.js';
import { Sparkles, RefreshCw, Send, AlertCircle } from 'lucide-react';

export default function CreateRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    tags: [], 
    category: '', 
    urgency: 'medium' 
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAIAnalyze = async () => {
    if (!form.title && !form.description) {
      setError('Please enter a title and description first');
      return;
    }
    
    setIsAnalyzing(true);
    setError('');
    try {
      const suggestions = await aiService.analyzeRequest(form.title, form.description);
      setAiSuggestions(suggestions);
    } catch (error) {
      setError('AI analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyAISuggestions = () => {
    if (aiSuggestions) {
      setForm(prev => ({ 
        ...prev, 
        category: aiSuggestions.category, 
        urgency: aiSuggestions.urgency, 
        tags: aiSuggestions.tags 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await api.post('/requests', {
        ...form,
        category: form.category || 'General'
      });
      navigate('/explore');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-[#0D9488] font-bold uppercase tracking-[0.2em] text-xs mb-3">Community Support</p>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Create Request</h1>
          <p className="text-gray-500 text-lg">Describe what you need. Our AI will help categorize and tag it for the right experts.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-3xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={20} />
            <span className="font-bold text-sm">{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-1 gap-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* MAIN INPUT CARD */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Request Title</label>
                  <input 
                    className="w-full bg-[#F4F7F6] border-none rounded-2xl py-5 px-6 text-xl font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                    placeholder="What do you need help with?"
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Full Description</label>
                  <textarea 
                    rows="6" 
                    className="w-full bg-[#F4F7F6] border-none rounded-2xl py-5 px-6 text-lg leading-relaxed placeholder:text-gray-300 focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                    placeholder="Provide details, context, and any specific requirements..."
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })} 
                    required 
                  />
                </div>

                <button 
                  type="button" 
                  onClick={handleAIAnalyze} 
                  disabled={isAnalyzing}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#1A2624] text-white font-bold text-sm hover:bg-[#0D9488] transition-all disabled:opacity-50 shadow-lg shadow-teal-900/10"
                >
                  <Sparkles size={18} className={isAnalyzing ? 'animate-spin' : ''} />
                  {isAnalyzing ? 'AI is Thinking...' : 'Analyze with HelpHub AI'}
                </button>
              </div>
            </div>

            {/* AI SUGGESTIONS PANEL - Only shows when available */}
            {aiSuggestions && (
              <div className="bg-[#1A2624] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <Sparkles className="text-[#0D9488]" /> AI Intelligence Result
                    </h3>
                    <button 
                      type="button"
                      onClick={applyAISuggestions}
                      className="bg-[#0D9488] hover:bg-teal-500 text-white px-6 py-2 rounded-full font-bold text-xs transition-colors flex items-center gap-2"
                    >
                      <RefreshCw size={14} /> Apply All
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Predicted Category</p>
                      <p className="text-xl font-bold text-[#0D9488]">{aiSuggestions.category}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Urgency Level</p>
                      <p className="text-xl font-bold text-orange-400 capitalize">{aiSuggestions.urgency}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Generated Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.tags.map(t => (
                          <span key={t} className="text-xs font-bold px-2 py-1 bg-white/10 rounded-md">#{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#0D9488] opacity-20 blur-[100px]"></div>
              </div>
            )}

            {/* ADDITIONAL META DATA */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Manual Category</label>
                  <input 
                    className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold"
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })} 
                    placeholder="e.g., Development"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Select Urgency</label>
                  <select 
                    className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold appearance-none"
                    value={form.urgency} 
                    onChange={e => setForm({ ...form, urgency: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="mt-10">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Keywords / Tags</label>
                <input 
                  className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 px-6 font-bold" 
                  value={form.tags.join(', ')} 
                  onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })} 
                  placeholder="react, tailwind, help..."
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0D9488] hover:bg-teal-600 text-white py-6 rounded-full font-black text-xl shadow-xl shadow-teal-900/20 transition-all flex items-center justify-center gap-4 group"
            >
              {isSubmitting ? 'Publishing...' : (
                <>
                  Post Request <Send size={24} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}