import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Card, Button, Badge } from '../components/UI';
import { MessageCircle, CheckCircle, Users } from 'lucide-react';

export default function RequestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    api.get(`/requests/${id}`).then(res => setRequest(res.data));
  }, [id]);

  const handleHelp = async () => {
    await api.post(`/requests/${id}/help`);
    api.get(`/requests/${id}`).then(res => setRequest(res.data));
  };

  const handleSolve = async () => {
    await api.put(`/requests/${id}/solve`);
    api.get(`/requests/${id}`).then(res => setRequest(res.data));
  };

  if (!request) return <div className="p-8 text-center">Loading...</div>;

  const isOwner = request.createdBy?._id === user?.id;
  const isHelper = request.helpers?.some(h => h._id === user?.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card className="p-8">
        <div className="flex gap-2 mb-4">
          <Badge variant="purple">{request.category}</Badge>
          <Badge variant={request.urgency === 'critical' ? 'danger' : 'warning'}>{request.urgency}</Badge>
          <Badge>{request.status}</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{request.title}</h1>
        <p className="text-gray-700 mb-6 whitespace-pre-wrap">{request.description}</p>
        
        {request.aiSummary && (
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <p className="font-semibold">🤖 AI Summary</p>
            <p className="text-gray-700">{request.aiSummary}</p>
          </div>
        )}
        
        <div className="flex gap-2 mb-6">{request.tags?.map(t => <Badge key={t}>{t}</Badge>)}</div>
        
        <div className="border-t pt-6 mt-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Users size={18} /> Helpers ({request.helpers?.length || 0})</h3>
          <div className="space-y-2">
            {request.helpers?.map(helper => (
              <div key={helper._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{helper.name}</span>
                <Badge>Trust: {helper.trustScore}</Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          {!isOwner && !isHelper && request.status === 'open' && (
            <Button onClick={handleHelp}><MessageCircle className="w-4 h-4 mr-2" /> I Can Help</Button>
          )}
          {isHelper && request.status === 'open' && (
            <Button onClick={handleSolve} variant="success"><CheckCircle className="w-4 h-4 mr-2" /> Mark as Solved</Button>
          )}
          <Button variant="outline" onClick={() => navigate('/explore')}>Back to Explore</Button>
        </div>
      </Card>
    </div>
  );
}