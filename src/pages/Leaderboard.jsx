import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Card, Badge } from '../components/UI';
import { Trophy, Medal, Star, Crown, TrendingUp } from 'lucide-react';

export default function Leaderboard() {
  const [topHelpers, setTopHelpers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/leaderboard')
      .then(res => setTopHelpers(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Split Top 3 from the rest
  const podium = topHelpers.slice(0, 3);
  const runnersUp = topHelpers.slice(3);

  if (loading) return <div className="p-20 text-center font-bold opacity-20">Loading Champions...</div>;

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* HERO HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8EFEE] text-[#0D9488] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Trophy size={14} /> Community Rankings
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">Top Helpers.</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Honoring the individuals who have made the biggest impact in our community this month.
          </p>
        </div>

        {/* PODIUM SECTION (TOP 3) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {podium.map((helper, idx) => (
            <div 
              key={helper._id} 
              className={`relative rounded-[2.5rem] p-8 text-center transition-transform hover:scale-[1.02] ${
                idx === 0 
                ? 'bg-[#1A2624] text-white shadow-2xl scale-110 z-10 md:-translate-y-4' 
                : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              {idx === 0 && <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 w-12 h-12 drop-shadow-lg" />}
              
              <div className="text-4xl mb-4">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>

              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black border-4 ${
                idx === 0 ? 'bg-[#0D9488] border-white/10' : 'bg-[#F4F7F6] border-white'
              }`}>
                {helper.name?.charAt(0)}
              </div>

              <h3 className="text-xl font-black mb-1">{helper.name}</h3>
              <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${idx === 0 ? 'text-[#0D9488]' : 'text-gray-400'}`}>
                {helper.badges?.[0]?.name || 'Top Contributor'}
              </p>

              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-black">{helper.trustScore}</span>
                </div>
                <p className={`text-[10px] font-bold opacity-60`}>{helper.helpedCount} HELPS</p>
              </div>
            </div>
          ))}
        </div>

        {/* LIST SECTION (4TH AND BEYOND) */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-black text-xl">Honorable Mentions</h2>
            <TrendingUp size={20} className="text-gray-300" />
          </div>
          
          <div className="divide-y divide-gray-50">
            {runnersUp.map((helper, idx) => (
              <div key={helper._id} className="flex items-center justify-between p-6 hover:bg-[#F9F8F3]/50 transition-colors">
                <div className="flex items-center gap-6">
                  <span className="w-8 text-sm font-black text-gray-300">#{idx + 4}</span>
                  <div className="w-10 h-10 rounded-full bg-[#1A2624] text-white flex items-center justify-center font-bold text-xs">
                    {helper.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-[#1A2624]">{helper.name}</p>
                    <div className="flex gap-2 mt-1">
                      {helper.badges?.slice(0, 1).map(b => (
                        <span key={b.name} className="text-[9px] font-black uppercase tracking-tighter text-[#0D9488]">
                          {b.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="font-black text-lg">{helper.trustScore}</span>
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{helper.helpedCount} Requests</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}