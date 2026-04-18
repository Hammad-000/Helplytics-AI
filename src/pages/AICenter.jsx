import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Card, Badge, Button } from '../components/UI';
import { Brain, TrendingUp, Lightbulb, BarChart3, Sparkles, ArrowUpRight, Zap, Target } from 'lucide-react';

export default function AICenter() {
  const { user } = useAuth();
  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    // Mocking the AI fetch for immediate visual impact
    setInsights([
      "Your response rate is 20% faster than the community average.",
      "Consider adding 'Tailwind CSS' to your skills to unlock more requests.",
      "Most active helpers in your timezone are online between 6 PM - 9 PM."
    ]);
    setTrends([
      { name: 'React 19', growth: 84 },
      { name: 'AI Agents', growth: 142 },
      { name: 'Full-stack Dev', growth: 45 },
      { name: 'Motion Design', growth: 22 }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624] pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-16">
        
        {/* HERO HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8EFEE] text-[#0D9488] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> Intelligence Engine
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Smart <span className="text-[#0D9488]">Help.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Our AI analyzes community patterns to help you maximize your impact and grow your reputation.
          </p>
        </div>

        {/* TOP ROW: INSIGHTS & TRENDS */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* INSIGHTS CARD */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#F4F7F6] rounded-2xl">
                  <Lightbulb className="text-[#0D9488]" size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Personalized Analysis</h2>
              </div>
              <Badge variant="secondary">Updated Live</Badge>
            </div>

            <div className="space-y-6">
              {insights.map((insight, i) => (
                <div key={i} className="flex gap-4 items-start p-6 bg-[#F9F8F3] rounded-[2rem] border border-gray-50 hover:border-[#0D9488]/30 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-[#0D9488] shadow-sm">
                    {i + 1}
                  </div>
                  <p className="flex-1 font-bold text-[#1A2624] leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                    "{insight}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING CARD */}
          <div className="bg-[#1A2624] rounded-[3rem] p-10 text-white shadow-2xl relative">
            <div className="flex items-center gap-3 mb-10">
              <TrendingUp className="text-[#0D9488]" size={24} />
              <h2 className="text-xl font-black tracking-tight">Market Pulse</h2>
            </div>
            
            <div className="space-y-8">
              {trends.map(trend => (
                <div key={trend.name} className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-default">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#0D9488] tracking-widest mb-1">Topic</p>
                    <p className="text-xl font-black group-hover:translate-x-1 transition-transform">{trend.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="flex items-center gap-1 text-[#0D9488] font-black text-sm">
                      <ArrowUpRight size={14} /> +{trend.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Blob Decoration */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0D9488] rounded-full blur-[60px] opacity-20"></div>
          </div>
        </div>

        {/* BOTTOM ROW: RECOMMENDATIONS */}
        <div className="bg-white rounded-[3.5rem] p-12 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Smart Actionables</h2>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Calculated based on your Trust Score and History</p>
            </div>
            <div className="p-4 bg-[#E8EFEE] rounded-2xl flex items-center gap-4">
               <Zap className="text-[#0D9488]" size={20} />
               <p className="text-xs font-black text-[#1A2624]">AI Readiness: <span className="text-[#0D9488]">High</span></p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-[#F4F7F6] rounded-[2.5rem] border border-gray-50 relative group hover:bg-[#1A2624] hover:text-white transition-all duration-500">
              <Target className="text-[#0D9488] mb-6" size={32} />
              <h4 className="text-xl font-black mb-3 italic">"The Specialist Path"</h4>
              <p className="text-sm font-bold opacity-60 leading-relaxed mb-8">
                Your expertise in React is gaining traction. Helping 5 more users with 'State Management' will promote you to 'Gold Tier Expert'.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#0D9488]">
                View Requests <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="p-10 bg-[#F4F7F6] rounded-[2.5rem] border border-gray-50 relative group hover:bg-[#1A2624] hover:text-white transition-all duration-500">
              <Brain className="text-[#0D9488] mb-6" size={32} />
              <h4 className="text-xl font-black mb-3 italic">"Knowledge Expansion"</h4>
              <p className="text-sm font-bold opacity-60 leading-relaxed mb-8">
                There is a 40% surge in 'Framer Motion' requests. Based on your UI skills, this is your optimal next learning path.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#0D9488]">
                Explore Content <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}