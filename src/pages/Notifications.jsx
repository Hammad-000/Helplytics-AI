import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Badge } from '../components/UI';
import { Bell, MessageCircle, Award, Info } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'request', title: 'New help request', message: 'Someone needs help with React', read: false, time: '2 min ago' },
    { id: 2, type: 'message', title: 'New message', message: 'John replied to your request', read: false, time: '1 hour ago' },
    { id: 3, type: 'badge', title: 'Badge earned!', message: 'You earned "Quick Responder" badge', read: true, time: 'Yesterday' },
    { id: 4, type: 'system', title: 'Trust score update', message: 'Your trust score increased to 105', read: true, time: '2 days ago' }
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'request': return <MessageCircle className="text-blue-500" />;
      case 'badge': return <Award className="text-yellow-500" />;
      default: return <Info className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Badge variant="purple">{notifications.filter(n => !n.read).length} new</Badge>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
          <Card key={notif.id} className={`p-4 ${!notif.read ? 'border-l-4 border-l-purple-500 bg-purple-50/30' : ''}`}>
            <div className="flex gap-3">
              <div className="mt-1">{getIcon(notif.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{notif.title}</h3>
                  <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}