import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Card, Badge, Button } from '../components/UI';
import { User, Award, Star, MapPin, Mail, Calendar } from 'lucide-react';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  const userId = id || currentUser?.id;

  useEffect(() => {
    if (userId) {
      api.get(`/users/${userId}`).then(res => setProfile(res.data));
      api.get(`/users/${userId}/stats`).then(res => setStats(res.data));
    }
  }, [userId]);

  if (!profile) return <div className="p-8 text-center">Loading...</div>;

  const isOwnProfile = userId === currentUser?.id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card className="p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {profile.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <div className="flex gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-gray-600"><MapPin size={16} />{profile.location || 'Location not set'}</div>
                  <div className="flex items-center gap-1 text-gray-600"><Mail size={16} />{profile.email}</div>
                  <div className="flex items-center gap-1 text-gray-600"><Calendar size={16} />Joined {new Date(profile.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1"><Star className="text-yellow-500 fill-yellow-500" /><span className="text-2xl font-bold">{profile.trustScore}</span></div>
                <div className="text-sm text-gray-500">Trust Score</div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2"><Award size={18} /> Badges</h3>
              <div className="flex gap-2 flex-wrap">
                {profile.badges?.length > 0 ? profile.badges.map(b => <Badge key={b.name} variant="purple">{b.name}</Badge>) : <span className="text-gray-500">No badges yet</span>}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2"><User size={18} /> Skills</h3>
              <div className="flex gap-2 flex-wrap">{profile.skills?.map(s => <Badge key={s}>{s}</Badge>)}</div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex gap-2 flex-wrap">{profile.interests?.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}</div>
            </div>

            {stats && (
              <div className="mt-6 grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div><div className="text-sm text-gray-600">Contributions</div><div className="text-2xl font-bold">{stats.contributions}</div></div>
                <div><div className="text-sm text-gray-600">People Helped</div><div className="text-2xl font-bold">{stats.helped}</div></div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}