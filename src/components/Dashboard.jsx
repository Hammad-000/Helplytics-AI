import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Button, Card, Badge } from '../components/UI';
import { Brain, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({ requests: 0, helped: 0, trustScore: 100 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const requestsRes = await api.get('/requests/my');
      console.log('Requests data:', requestsRes.data);
      
      let requests = [];
      if (Array.isArray(requestsRes.data)) {
        requests = requestsRes.data;
      } else if (requestsRes.data.requests && Array.isArray(requestsRes.data.requests)) {
        requests = requestsRes.data.requests;
      } else if (requestsRes.data.data && Array.isArray(requestsRes.data.data)) {
        requests = requestsRes.data.data;
      }
      
      setRecentRequests(requests.slice(0, 5));
      
      try {
        const statsRes = await api.get(`/users/${user.id}/stats`);
        setStats(statsRes.data);
      } catch (error) {
        setStats({
          trustScore: 100,
          helped: requests.filter(r => r.status === 'completed' || r.status === 'helped').length,
          requests: requests.length
        });
      }
      
      try {
        const insightsRes = await api.get('/ai/insights');
        setAiInsights(insightsRes.data);
      } catch (error) {
        setAiInsights([
          "You're doing great! Keep helping others to increase your trust score.",
          "Based on your activity, you might want to focus on technology-related requests.",
          "Your response time is excellent! 👏"
        ]);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'danger',
      critical: 'danger'
    };
    return colors[urgency?.toLowerCase()] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'helped': 'bg-green-100 text-green-800',
      'solved': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

return (
  <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624]">
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* 1. THE HERO HEADER BLOCK - Matches "AI Center" mockup */}
      <header className="mb-10 w-full rounded-[2.5rem] bg-[#1A2624] p-10 md:p-14 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
            Dashboard / Welcome
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome back, <br/>
            <span className="text-[#0D9488]">{user?.name || user?.email || 'User'}</span>.
          </h1>
          <p className="mt-6 text-lg opacity-60 max-w-xl">
            Your community trust is at {stats.trustScore}%. Here is a summary of your impact and active requests needing attention.
          </p>
        </div>
        {/* Subtle decorative circle */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0D9488] opacity-10 blur-3xl"></div>
      </header>

      {/* 2. STATS GRID - Minimalist with large rounding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100/50">
          <TrendingUp className="w-6 h-6 text-[#0D9488] mb-4" />
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Trust Score</div>
          <div className="text-4xl font-black mt-1">{stats.trustScore}%</div>
        </div>
        
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100/50">
          <CheckCircle className="w-6 h-6 text-teal-500 mb-4" />
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Helped</div>
          <div className="text-4xl font-black mt-1">{stats.helped || 0}</div>
        </div>
        
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100/50">
          <Users className="w-6 h-6 text-blue-500 mb-4" />
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Open Tasks</div>
          <div className="text-4xl font-black mt-1">{stats.requests || recentRequests.length}</div>
        </div>
        
        <div className="rounded-[2rem] bg-[#0D9488] p-8 shadow-lg text-white">
          <Clock className="w-6 h-6 text-white/80 mb-4" />
          <div className="text-sm font-bold text-white/60 uppercase tracking-wider">Response Rate</div>
          <div className="text-4xl font-black mt-1">92%</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* 3. AI INSIGHTS - Matches "Smart Request Guidance" card */}
        <section className="lg:col-span-5">
          <div className="sticky top-8 rounded-[2.5rem] bg-white p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Brain className="text-[#0D9488]" /> AI Intelligence
            </h2>
            <div className="space-y-4">
              {aiInsights.map((insight, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-[#F4F7F6] border border-transparent hover:border-[#0D9488]/30 transition-all">
                  <p className="text-[#1A2624] font-medium leading-relaxed">
                    {typeof insight === 'string' ? insight : insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 4. RECENT REQUESTS - Matches the "Explore Feed" style */}
        <section className="lg:col-span-7">
          <h2 className="text-2xl font-black mb-6">Recent community activity</h2>
          <div className="space-y-4">
            {recentRequests.map((req, index) => (
              <Link to={`/request/${req._id}`} key={req._id || index} className="block group">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-[#0D9488]/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#E8EFEE] text-[#0D9488]">
                        {req.category || "General"}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-600`}>
                        {req.urgency || "Normal"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-300">#{index + 1}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#0D9488] transition-colors">
                    {req.title || 'Untitled Request'}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {req.aiSummary || req.description?.substring(0, 120)}...
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1A2624] flex items-center justify-center text-[10px] text-white font-bold">
                        {req.createdBy?.name?.charAt(0) || 'A'}
                      </div>
                      <span className="text-sm font-bold text-[#1A2624] opacity-70">
                        {req.createdBy?.name || 'Community Member'}
                      </span>
                    </div>
                    <div className="text-[#0D9488] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View details <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
)}