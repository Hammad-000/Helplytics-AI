import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card, Badge, Button } from '../components/UI';
import { Search, Filter, Plus } from 'lucide-react';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ category: '', urgency: '', status: 'open', search: '' });

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    api.get(`/requests?${params}`).then(res => setRequests(res.data));
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F9F8F3] font-sans text-[#1A2624]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-[#0D9488] font-bold uppercase tracking-[0.2em] text-xs mb-3">Community Market</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Explore Feed</h1>
          </div>
          <Link to="/create">
            <button className="bg-[#1A2624] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg hover:shadow-[#0D9488]/20">
              <Plus size={20} /> Create Request
            </button>
          </Link>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white rounded-[2rem] p-4 mb-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search help requests..."
              className="w-full bg-[#F4F7F6] border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-[#0D9488]/20 font-medium"
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          
          <div className="flex gap-3">
            <select 
              className="bg-[#F4F7F6] border-none rounded-2xl px-6 py-4 font-bold text-sm"
              value={filters.category} 
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Data Science</option>
            </select>

            <select 
              className="bg-[#F4F7F6] border-none rounded-2xl px-6 py-4 font-bold text-sm text-[#0D9488]"
              value={filters.urgency} 
              onChange={e => setFilters({ ...filters, urgency: e.target.value })}
            >
              <option value="">Urgency: All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* REQUEST FEED */}
        <div className="grid gap-8">
          {requests.map((req, index) => (
            <Link to={`/request/${req._id}`} key={req._id} className="block group">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm group-hover:shadow-xl group-hover:translate-y-[-4px] transition-all duration-300">
                
                {/* Top Row: Badges */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-3">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] bg-[#E8EFEE] text-[#0D9488]">
                      {req.category}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
                      req.urgency === 'high' || req.urgency === 'critical' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-orange-50 text-orange-600'
                    }`}>
                      {req.urgency}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-300 italic">#{index + 101}</span>
                </div>
                
                {/* Title & Description */}
                <h3 className="text-3xl font-black mb-4 group-hover:text-[#0D9488] transition-colors leading-tight">
                  {req.title}
                </h3>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-4xl">
                  {req.aiSummary || req.description.substring(0, 160)}...
                </p>
                
                {/* Footer: Creator & Action */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A2624] flex items-center justify-center text-sm text-white font-bold border-4 border-white shadow-md">
                      {req.createdBy?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-base font-black text-[#1A2624] leading-none mb-1">
                        {req.createdBy?.name || 'Anonymous User'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Community Member • Trust Score: {req.createdBy?.trustScore || 0}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1A2624] text-white px-8 py-3 rounded-full font-bold text-sm group-hover:bg-[#0D9488] transition-all shadow-md">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {requests.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold">No requests found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}