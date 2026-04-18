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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || user?.email || 'User'}!</h1>
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
              <div className="text-2xl font-bold">{stats.helped || 0}</div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Open Requests</div>
              <div className="text-2xl font-bold">{stats.requests || recentRequests.length}</div>
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
                  <p className="text-gray-700">{typeof insight === 'string' ? insight : insight.message || insight.text}</p>
                </Card>
              ))
            ) : (
              <Card className="text-gray-500 text-center py-8">
                <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No insights available yet</p>
                <p className="text-sm">Start helping others to get AI insights!</p>
              </Card>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <div className="space-y-4">
            {recentRequests.length > 0 ? (
              recentRequests.map((req, index) => (
                <Link to={`/request/${req._id}`} key={req._id || index}>
                  <Card className="hover:border-purple-300 transition-all hover:shadow-md cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2 flex-wrap">
                          {req.category && (
                            <Badge variant="purple">{req.category}</Badge>
                          )}
                          {req.urgency && (
                            <Badge variant={getUrgencyColor(req.urgency)}>{req.urgency}</Badge>
                          )}
                          <Badge className={getStatusColor(req.status || req.state)}>
                            {req.status || req.state || 'pending'}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">
                          {req.title || req.name || 'Untitled Request'}
                        </h3>
                        
                        <p className="text-gray-600 mb-3">
                          {req.aiSummary || req.description?.substring(0, 150) || 'No description provided'}
                          {(req.description?.length > 150 || req.aiSummary?.length > 150) && '...'}
                        </p>
                        
                        {req.tags && req.tags.length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-2">
                            {req.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline">{tag}</Badge>
                            ))}
                            {req.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{req.tags.length - 3} more</span>
                            )}
                          </div>
                        )}
                        
                        <div className="mt-3 text-sm text-gray-500">
                          Posted by {req.createdBy?.name || req.createdBy?.email || 'Anonymous'} 
                          {req.createdBy?.trustScore && (
                            <> • Trust Score: {req.createdBy.trustScore}</>
                          )}
                          {req.createdAt && (
                            <> • {new Date(req.createdAt).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>
                      
                      <Button size="sm" className="ml-4">
                        View Details
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="text-gray-500 text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No requests yet</p>
                <Link to="/create">
                  <Button className="mt-3">Create Your First Request</Button>
                </Link>
              </Card>
            )}
          </div>
          
          {recentRequests.length > 0 && (
            <div className="mt-4 text-center">
              <Link to="/explore">
                <Button variant="outline">View All Requests →</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}