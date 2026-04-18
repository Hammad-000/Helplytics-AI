import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
      const [requestsRes, statsRes, insightsRes] = await Promise.all([
        api.get('/requests/my'),
        api.get(`/users/${user.id}/stats`),
        api.get('/ai/insights')
      ]);
      
      setRecentRequests(requestsRes.data.slice(0, 5));
      setStats(statsRes.data);
      setAiInsights(insightsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
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

  // Redirect if no user
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your help journey</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90">Trust Score</div>
              <div className="text-3xl font-bold">{stats.trustScore}</div>
            </div>
            <TrendingUp className="w-8 h-8 opacity-90" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            <div>
              <div className="text-sm text-gray-600">Requests Helped</div>
              <div className="text-2xl font-bold">{stats.helped}</div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Open Requests</div>
              <div className="text-2xl font-bold">{stats.requests}</div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-500" />
            <div>
              <div className="text-sm text-gray-600">Response Rate</div>
              <div className="text-2xl font-bold">92%</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-purple-600" /> AI Insights
          </h2>
          <div className="space-y-3">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, i) => (
                <Card key={i} className="border-l-4 border-purple-500">
                  <p className="text-gray-700">{insight}</p>
                </Card>
              ))
            ) : (
              <Card className="text-gray-500 text-center">No insights available</Card>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <div className="space-y-3">
            {recentRequests.length > 0 ? (
              recentRequests.map(req => (
                <Card key={req._id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{req.title}</h3>
                    <Badge>{req.status}</Badge>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </Card>
              ))
            ) : (
              <Card className="text-gray-500 text-center">No requests yet</Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}