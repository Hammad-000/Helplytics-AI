import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card, Badge, Button } from '../components/UI';
import { Search, Filter } from 'lucide-react';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ category: '', urgency: '', status: 'open' });

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    api.get(`/requests?${params}`).then(res => setRequests(res.data));
  }, [filters]);

  const urgencyColors = { low: 'success', medium: 'warning', high: 'danger', critical: 'danger' };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Help Requests</h1>
        <Link to="/create"><Button>+ Create Request</Button></Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex gap-4 flex-wrap">
        <select className="border rounded-lg p-2" value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}><option value="">All Categories</option><option>Programming</option><option>Design</option><option>Data Science</option><option>Career</option></select>
        <select className="border rounded-lg p-2" value={filters.urgency} onChange={e => setFilters({ ...filters, urgency: e.target.value })}><option value="">All Urgency</option><option>low</option><option>medium</option><option>high</option><option>critical</option></select>
        <select className="border rounded-lg p-2" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}><option value="open">Open</option><option value="in-progress">In Progress</option><option value="solved">Solved</option></select>
      </div>

      <div className="space-y-4">
        {requests.map(req => (
          <Link to={`/request/${req._id}`} key={req._id}>
            <Card hover className="hover:border-purple-300 transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="purple">{req.category}</Badge>
                    <Badge variant={urgencyColors[req.urgency]}>{req.urgency}</Badge>
                    <Badge>{req.status}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{req.title}</h3>
                  <p className="text-gray-600 mb-3">{req.aiSummary || req.description.substring(0, 150)}</p>
                  <div className="flex gap-2">{req.tags?.map(t => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="mt-3 text-sm text-gray-500">Posted by {req.createdBy?.name} • Trust Score: {req.createdBy?.trustScore}</div>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}