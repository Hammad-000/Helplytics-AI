import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Card, Button, Badge } from '../components/UI/Badge';
import { Brain, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

 function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ requests: 0, helped: 0, trustScore: 100 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/requests/my').then(res => setRecentRequests(res.data.slice(0, 5)));
      api.get(`/users/${user.id}/stats`).then(res => setStats(res.data));
      api.get('/ai/insights').then(res => setAiInsights(res.data));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your help journey</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div><div className="text-sm opacity-90">Trust Score</div><div className="text-3xl font-bold">{stats.trustScore}</div></div>
            <TrendingUp className="w-8 h-8 opacity-90" />
          </div>
        </Card>
        <Card><div className="flex items-center gap-3"><CheckCircle /><div><div className="text-sm text-gray-600">Requests Helped</div><div className="text-2xl font-bold">{stats.helped}</div></div></div></Card>
        <Card><div className="flex items-center gap-3"><Users /><div><div className="text-sm text-gray-600">Open Requests</div><div className="text-2xl font-bold">{stats.requests}</div></div></div></Card>
        <Card><div className="flex items-center gap-3"><Clock /><div><div className="text-sm text-gray-600">Response Rate</div><div className="text-2xl font-bold">92%</div></div></div></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Brain className="text-purple-600" /> AI Insights</h2>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <Card key={i} className="border-l-4 border-purple-500"><p className="text-gray-700">{insight}</p></Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <div className="space-y-3">
            {recentRequests.map(req => (
              <Card key={req._id} className="flex justify-between items-center">
                <div><h3 className="font-semibold">{req.title}</h3><Badge>{req.status}</Badge></div>
                <Button size="sm" variant="outline">View</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;