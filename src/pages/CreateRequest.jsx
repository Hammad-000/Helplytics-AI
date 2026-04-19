import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { aiService } from '../services/aiService.js';
import { Sparkles, RefreshCw, Send, AlertCircle, Brain } from 'lucide-react';

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
    if (!form.title || !form.description) {
      setError('Please provide a title and description for AI analysis.');
      return;
    }
    setIsAnalyzing(true);
    setError('');
    try {
      const suggestions = await aiService.analyzeRequest(form.title, form.description);
      setAiSuggestions(suggestions);
    } catch (error) {
      setError('AI analysis failed. Our systems are currently busy.');
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
    try {
      await api.post('/requests', { ...form, category: form.category || 'General' });
      navigate('/explore');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to publish request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1A2624] pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* HEADER SECTION */}
        <div className="bg-[#1A2624] rounded-[2rem] p-12 mb-10 text-white relative overflow-hidden">
          <p className="text-[#0D9488] font-bold uppercase tracking-widest text-xs mb-4">Create Request</p>
          <h1 className="text-5xl font-black tracking-tighter mb-4 max-w-2xl leading-none">
            Turn a rough problem into a clear help request.
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
          </p>
          <Brain className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/5" />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 animate-in slide-in-from-top-2">
            <AlertCircle size={18} />
            <span className="font-bold text-sm">{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          
          {/* LEFT: MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
                <input 
                  className="w-full bg-[#F4F7F6] border-none rounded-xl py-4 px-6 font-bold text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-[#0D9488]/20"
                  placeholder="Need review on my JavaScript quiz app..."
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea 
                  rows="5" 
                  className="w-full bg-[#F4F7F6] border-none rounded-xl py-4 px-6 text-gray-700 leading-relaxed focus:ring-2 focus:ring-[#0D9488]/20"
                  placeholder="Explain the challenge, current progress, and what help would be useful."
                  value={form.description} 
                  onChange={e => setForm({ ...form, description: e.target.value })} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tags</label>
                  <input 
                    className="w-full bg-[#F4F7F6] border-none rounded-xl py-4 px-6 font-bold text-sm" 
                    value={form.tags.join(', ')} 
                    onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })} 
                    placeholder="React, Debugging..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                  <input 
                    className="w-full bg-[#F4F7F6] border-none rounded-xl py-4 px-6 font-bold text-sm"
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="Web Development"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                <button 
                  type="button" 
                  onClick={handleAIAnalyze} 
                  disabled={isAnalyzing}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 text-[#1A2624] font-bold text-xs hover:bg-gray-50 transition-all shadow-sm"
                >
                  <Sparkles size={16} className={`text-[#0D9488] ${isAnalyzing ? 'animate-spin' : ''}`} />
                  {isAnalyzing ? 'Analyzing...' : 'Apply AI suggestions'}
                </button>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-10 py-3 bg-[#0D9488] hover:bg-[#12b3a4] text-white rounded-full font-black text-sm shadow-lg shadow-teal-900/10 flex items-center gap-3 transition-transform hover:scale-[1.02]"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish request'}
                </button>
              </div>
            </div>
          </form>

          {/* RIGHT: AI ASSISTANT PANEL */}
          <aside className="sticky top-24 space-y-6">
            <div className="bg-[#F4F1E8] border border-[#1A2624]/5 rounded-[2rem] p-8">
              <p className="text-[#0D9488] font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                <Sparkles size={14} /> AI Assistant
              </p>
              
              <h3 className="text-3xl font-black tracking-tight mb-8 leading-none">Smart request guidance</h3>

              {aiSuggestions ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center border-b border-[#1A2624]/5 pb-4">
                    <span className="text-gray-400 text-xs font-bold">Suggested category</span>
                    <span className="font-black text-sm">{aiSuggestions.category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#1A2624]/5 pb-4">
                    <span className="text-gray-400 text-xs font-bold">Detected urgency</span>
                    <span className="font-black text-sm text-orange-500 capitalize">{aiSuggestions.urgency}</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-gray-400 text-xs font-bold">Suggested tags</span>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.tags.map(t => (
                        <span key={t} className="bg-white px-3 py-1 rounded-full text-[10px] font-black border border-gray-100">#{t}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={applyAISuggestions}
                    className="w-full mt-4 py-4 bg-[#1A2624] text-white rounded-2xl font-bold text-xs hover:bg-black transition-colors"
                  >
                    Sync suggestions with form
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                    <Brain className="text-gray-300" size={32} />
                  </div>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    Write your title and description, then click "Apply AI suggestions" to see intelligence result.
                  </p>
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}