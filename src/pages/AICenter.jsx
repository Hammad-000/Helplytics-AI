import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { aiService } from '../services/aiService';
import { Card, Button } from '../components/UI';
import { Brain, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react';

export default function AICenter() {
  const { user } = useAuth();
  const [insights, setInsights] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    api.get('/ai/insights').then(res => setInsights(res.data));
    setTrends(['React 19', 'AI Integration', 'Full-stack Development', 'UI/UX Design']);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">AI Intelligence Center</h1>
        <p className="text-gray-600">Smart insights to optimize your learning journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-500" />
            <h2 className="text-xl font-semibold">Personalized Insights</h2>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg text-gray-700">
                {insight}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-green-500" />
            <h2 className="text-xl font-semibold">Trending Topics</h2>
          </div>
          <div className="space-y-2">
            {trends.map(trend => (
              <div key={trend} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{trend}</span>
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                  +{Math.floor(Math.random() * 50) + 20}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="text-blue-500" />
          <h2 className="text-xl font-semibold">AI Recommendations</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="font-semibold">📚 For You to Learn</p>
            <p className="text-gray-600 text-sm">
              Based on your interests, you might enjoy learning about React Hooks and TypeScript
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-semibold">🤝 You Can Help</p>
            <p className="text-gray-600 text-sm">
              There are 12 requests matching your skills. Check them out!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}