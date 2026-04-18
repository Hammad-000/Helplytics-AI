import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Card, Badge } from '../components/UI';
import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const [topHelpers, setTopHelpers] = useState([]);

  useEffect(() => {
    api.get('/users/leaderboard').then(res => setTopHelpers(res.data));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Top Helpers Leaderboard</h1>
        <p className="text-gray-600">Based on Trust Score & Contributions</p>
      </div>

      <div className="space-y-3">
        {topHelpers.map((helper, idx) => (
          <Card key={helper._id} hover className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold w-10">{idx < 3 ? medals[idx] : `${idx+1}th`}</div>
              <div>
                <div className="font-semibold text-lg">{helper.name}</div>
                <div className="flex gap-1 mt-1">
                  {helper.badges?.slice(0, 2).map(b => <Badge key={b.name} variant="secondary">{b.name}</Badge>)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /><span className="font-bold text-xl">{helper.trustScore}</span></div>
              <div className="text-sm text-gray-500">{helper.helpedCount} requests helped</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}