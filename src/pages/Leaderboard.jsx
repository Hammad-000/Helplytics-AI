import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Trophy, Star, Crown, TrendingUp, ChevronUp } from 'lucide-react';

export default function Leaderboard() {
  const [topHelpers, setTopHelpers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/leaderboard')
      .then(res => setTopHelpers(res.data))
      .catch(err => console.error("Error fetching champions", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#F9F8F3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Summoning Champions...</p>
      </div>
    </div>
  );

  // Logic to arrange podium as: [2nd, 1st, 3rd] for visual balance
  const first = topHelpers[0];
  const second = topHelpers[1];
  const third = topHelpers[2];
  
  // Create the visual array, filtering out nulls if data is short
  const podium = [second, first, third].filter(Boolean);
  const runnersUp = topHelpers.slice(3);

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624] pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* HERO HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 mt-4 py-2 rounded-full bg-[#E8EFEE] text-[#0D9488] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Trophy size={14} /> Global Rankings
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            The <span className="text-[#0D9488]">Elite.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Recognizing the experts driving the community forward through pure collective intelligence.
          </p>
        </div>

        {/* PODIUM SECTION */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-20">
          {podium.map((helper) => {
            const isFirst = helper?._id === first?._id;
            const isSecond = helper?._id === second?._id;
            
            return (
              <div 
                key={helper?._id} 
                className={`relative flex-1 w-full rounded-[3rem] p-10 text-center transition-all duration-500 hover:-translate-y-2 ${
                  isFirst 
                  ? 'bg-[#1A2624] text-white shadow-[0_40px_80px_-15px_rgba(26,38,36,0.3)] z-10 py-16' 
                  : 'bg-white border border-gray-100 py-10'
                }`}
              >
                {isFirst && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <Crown className="text-yellow-400 w-16 h-16 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  </div>
                )}

                <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black border-8 ${
                  isFirst ? 'bg-[#0D9488] border-[#2A3B38]' : 'bg-[#F4F7F6] border-[#F9F8F3]'
                }`}>
                  {helper?.name?.charAt(0)}
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-1">{helper?.name}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-8 ${isFirst ? 'text-[#0D9488]' : 'text-gray-400'}`}>
                   Level {Math.floor(helper?.trustScore / 10)} Expert
                </p>

                <div className="bg-[#F9F8F3]/5 rounded-2xl p-4 inline-block min-w-[120px]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-3xl font-black tracking-tighter">{helper?.trustScore}</span>
                  </div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Trust Score</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIST SECTION */}
        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-white">
            <h2 className="font-black text-2xl tracking-tight">Rising Contributors</h2>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#0D9488] tracking-widest">
              <TrendingUp size={16} /> Live Momentum
            </div>
          </div>
          
          <div className="divide-y divide-gray-50">
            {runnersUp.map((helper, idx) => (
              <div key={helper._id} className="group flex items-center justify-between p-8 hover:bg-[#F9F8F3] transition-all cursor-default">
                <div className="flex items-center gap-8">
                  <span className="w-6 text-sm font-black text-gray-200 group-hover:text-[#0D9488] transition-colors">
                    {idx + 4}
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-[#1A2624] text-white flex items-center justify-center font-black text-sm transition-transform group-hover:rotate-6">
                      {helper.name?.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-lg text-[#1A2624] leading-tight">{helper.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-[#E8EFEE] rounded text-[9px] font-black text-[#0D9488] uppercase">
                        {helper.badges?.[0]?.name || 'Contributor'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="hidden md:block text-right">
                    <p className="text-lg font-black text-[#1A2624]">{helper.helpedCount}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Solved Requests</p>
                  </div>
                  <div className="w-24 text-right">
                    <div className="flex items-center gap-1 justify-end text-[#0D9488]">
                      <span className="font-black text-xl tracking-tighter">{helper.trustScore}</span>
                      <ChevronUp size={16} />
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}