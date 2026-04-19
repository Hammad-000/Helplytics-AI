import { Link } from 'react-router-dom';
import { Users, Award, Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export default function Landing() {
  const stats = [
    { icon: Users, label: 'Active Learners', value: '2,847', change: '+23%' },
    { icon: Award, label: 'Top Helpers', value: '156', change: '+12' },
    { icon: Zap, label: 'Requests Solved', value: '3,421', change: '+18%' },
    { icon: TrendingUp, label: 'Trust Score Avg', value: '94.2', change: '+5.2' }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1A2624] font-sans pb-24 pt-24">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8EFEE] text-[#0D9488] text-[10px] font-black uppercase tracking-[0.2em] mb-10">
          <Sparkles size={14} /> The Future of Collective Intelligence
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10">
          Connect. Help.<br />
          <span className="text-[#0D9488]">Level Up Together.</span>
        </h1>
        
        <p className="text-xl text-[#5C716E] max-w-2xl mx-auto font-medium mb-16 leading-relaxed">
          HelpHub AI connects people who need assistance with those who have the answers, 
          powered by real-time AI categorization and verified trust metrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/auth"
            className="px-10 py-5 bg-[#1A2624] text-white rounded-full font-black text-lg hover:bg-[#0D9488] transition-all flex items-center gap-3 shadow-xl shadow-teal-900/20 group"
          >
            Start Helping Now 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/explore"
            className="px-10 py-5 bg-white border border-[#1A2624]/10 text-[#1A2624] rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-sm"
          >
            Explore Feed
          </Link>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4F1E8] rounded-full blur-[100px] opacity-40 -z-10" />
      </section>

      {/* 2. STATS & LIVE SIGNALS */}
      <section className="bg-[#1A2624] text-white py-24 rounded-[4rem] mx-6 mb-20 overflow-hidden relative shadow-2xl shadow-teal-900/20">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex items-center gap-3 mb-5 pt-3 border-t border-white/10 group-hover:border-[#0D9488] transition-colors">
                  <stat.icon className="w-5 h-5 text-[#0D9488]" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                </div>
                
                <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-[#0D9488] transition-colors tracking-tighter">
                  {stat.value}
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[#0D9488] text-[10px] font-bold">
                  {stat.change} (This Week)
                </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* Decorative central light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0D9488] rounded-full blur-[120px] opacity-20" />
      </section>

      {/* 3. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-white rounded-[4rem] p-16 md:p-24 border border-[#1A2624]/5 shadow-inner">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-10 max-w-4xl mx-auto">
            Your journey toward becoming a<br/> 
            <span className="text-[#0D9488]">verified community expert</span> starts here.
          </h2>
          <Link to="/auth">
            <button className="bg-[#1A2624] text-white px-12 py-6 rounded-full font-black text-xl shadow-2xl shadow-teal-900/10 hover:bg-[#0D9488] transition-all group flex items-center gap-4 mx-auto">
              Get Started for Free <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
      
      <footer className="py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest border-t border-[#1A2624]/5 mt-20">
        &copy; 2026 HelpHub AI • Built for the collective good
      </footer>
    </div>
  );
}