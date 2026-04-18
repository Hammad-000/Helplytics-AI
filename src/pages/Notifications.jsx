import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, Button } from '../components/UI';
import { Bell, MessageCircle, Award, Info, Check, Zap, ArrowRight } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'request', title: 'New help request', message: 'Someone needs help with React Architecture', read: false, time: '2 min ago' },
    { id: 2, type: 'message', title: 'New message', message: 'John replied to your request', read: false, time: '1 hour ago' },
    { id: 3, type: 'badge', title: 'Badge earned!', message: 'You earned "Quick Responder" badge', read: true, time: 'Yesterday' },
    { id: 4, type: 'system', title: 'Trust score update', message: 'Your trust score increased to 105', read: true, time: '2 days ago' }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'request': return <div className="p-2 bg-teal-50 rounded-lg"><Zap className="text-[#0D9488]" size={18} /></div>;
      case 'badge': return <div className="p-2 bg-orange-50 rounded-lg"><Award className="text-orange-500" size={18} /></div>;
      case 'message': return <div className="p-2 bg-blue-50 rounded-lg"><MessageCircle className="text-blue-500" size={18} /></div>;
      default: return <div className="p-2 bg-gray-50 rounded-lg"><Info className="text-gray-400" size={18} /></div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624] pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFEE] text-[#0D9488] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Bell size={12} /> Live Updates
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Activity</h1>
          </div>
          
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0D9488] hover:opacity-70 transition-opacity"
            >
              <Check size={14} /> Mark all as read
            </button>
          )}
        </div>

        {/* NOTIFICATION LIST */}
        <div className="space-y-4">
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`group relative bg-white rounded-[2rem] p-6 transition-all border ${
                !notif.read ? 'border-[#0D9488]/30 shadow-md translate-x-1' : 'border-gray-100 opacity-80'
              } hover:shadow-lg hover:border-[#0D9488]/50`}
            >
              <div className="flex gap-6 items-center">
                {/* Icon Column */}
                <div className="relative">
                  {getIcon(notif.type)}
                  {!notif.read && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#0D9488] border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-black tracking-tight ${!notif.read ? 'text-[#1A2624]' : 'text-gray-500'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{notif.time}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {/* Interaction Column */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={18} className="text-[#0D9488]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Bell size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="font-black text-gray-300 uppercase tracking-widest text-xs">No new updates</p>
          </div>
        )}
      </div>
    </div>
  );
}