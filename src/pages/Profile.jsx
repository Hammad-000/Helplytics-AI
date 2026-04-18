import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Card, Badge, Button } from '../components/UI';
import { 
  User, Award, Star, MapPin, Mail, Calendar, 
  Briefcase, Heart, ThumbsUp, MessageCircle, 
  Share2, Edit2, Trophy, TrendingUp, Clock, CheckCircle, Zap, ExternalLink
} from 'lucide-react';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = id || currentUser?.id;
  const isOwnProfile = userId === currentUser?.id;

  useEffect(() => {
    if (userId) fetchProfileData();
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [profileRes, statsRes, activityRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/users/${userId}/stats`),
        api.get(`/users/${userId}/recent-activity`).catch(() => ({ data: [] }))
      ]);
      setProfile(profileRes.data);
      setStats(statsRes.data);
      setRecentActivity(activityRes.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F9F8F3] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-[#0D9488]/20 rounded-full mb-4"></div>
        <p className="font-black text-[#1A2624] tracking-widest uppercase text-xs">Syncing Profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624] pb-20">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="relative bg-[#1A2624] rounded-[3rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl shadow-teal-900/20">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-[#0D9488] border-8 border-white/10 flex items-center justify-center text-5xl font-black shadow-inner">
                {profile.name?.charAt(0)}
              </div>
              {profile.verified && (
                <div className="absolute bottom-2 right-2 bg-white text-[#1A2624] p-2 rounded-full shadow-lg">
                  <CheckCircle size={20} className="fill-[#0D9488] text-white" />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <h1 className="text-5xl font-black tracking-tighter leading-none">{profile.name}</h1>
                {isOwnProfile ? (
                  <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                    Edit Profile
                  </button>
                ) : (
                  <button className="bg-[#0D9488] hover:bg-teal-500 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg">
                    Message Member
                  </button>
                )}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-white/60 mb-8 uppercase tracking-widest">
                <span className="flex items-center gap-2"><MapPin size={14} className="text-[#0D9488]" /> {profile.location || 'Remote'}</span>
                <span className="flex items-center gap-2"><Calendar size={14} className="text-[#0D9488]" /> Joined {new Date(profile.createdAt).getFullYear()}</span>
                <span className="flex items-center gap-2"><Award size={14} className="text-[#0D9488]" /> Verified Expert</span>
              </div>

              <p className="text-xl text-white/80 max-w-2xl leading-relaxed italic">
                "{profile.bio || "Connecting the dots through technology and community support."}"
              </p>
            </div>

            {/* Large Trust Score Display */}
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 flex flex-col items-center justify-center min-w-[180px]">
               <Star className="text-yellow-400 fill-yellow-400 mb-2" size={32} />
               <span className="text-6xl font-black">{profile.trustScore}</span>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D9488] mt-2">Trust Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar: Stats & Skills */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Activity Cards */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Performance Metrics</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Total Helps</p>
                  <p className="text-3xl font-black">{stats?.helped || 0}</p>
                </div>
                <div className="h-10 w-24 bg-[#E8EFEE] rounded-lg overflow-hidden flex items-end px-1 gap-1">
                  {[4,7,5,9,6].map((h, i) => <div key={i} style={{height: `${h*10}%`}} className="flex-1 bg-[#0D9488]/40 rounded-t-sm"></div>)}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Success Rate</p>
                  <p className="text-3xl font-black">{stats?.successRate || 100}%</p>
                </div>
                <Zap className="text-[#0D9488]" size={24} />
              </div>
            </div>
          </div>

          {/* Skills Pill Box */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Area of Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {(profile.skills || ['React', 'System Design', 'UI/UX']).map(skill => (
                <span key={skill} className="px-5 py-2 bg-[#F4F7F6] text-[#1A2624] rounded-full font-bold text-xs border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Activity & Timeline */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Badges Gallery */}
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-10 text-center">Achievement Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(profile.badges || [{name: 'Early Adopter'}, {name: 'Top 100'}]).map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-2xl bg-[#F9F8F3] group-hover:bg-[#1A2624] transition-all flex items-center justify-center mb-3 shadow-sm border border-gray-50 group-hover:rotate-6">
                    <Trophy className="text-[#0D9488] group-hover:text-white" size={32} />
                  </div>
                  <p className="font-black text-[10px] uppercase tracking-tighter text-gray-500 group-hover:text-[#1A2624] transition-colors">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Recent Contributions</h3>
               <button className="text-[10px] font-black uppercase text-[#0D9488] hover:underline flex items-center gap-1">View All <ExternalLink size={12}/></button>
             </div>
             
             <div className="space-y-12 relative">
               {/* Vertical Line */}
               <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
               
               {(recentActivity.length > 0 ? recentActivity : [
                 { description: 'Solved a critical bug in the Design System request', createdAt: new Date() },
                 { description: 'Earned the "Mentor of the Month" badge', createdAt: new Date() }
               ]).map((activity, idx) => (
                 <div key={idx} className="relative pl-10 flex flex-col gap-1">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-[#0D9488] z-10 shadow-sm"></div>
                    <p className="text-lg font-bold leading-tight text-[#1A2624]">{activity.description}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {new Date(activity.createdAt).toLocaleDateString()} • System Log
                    </p>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}