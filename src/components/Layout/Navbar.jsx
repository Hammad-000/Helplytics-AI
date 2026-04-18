import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../UI/Button';
import { Home, Compass, PlusCircle, Trophy, Brain, Bell, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Show landing page navbar for unauthenticated users
  if (!isAuthenticated) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Helplytics AI
          </Link>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/auth')}>Login / Signup</Button>
          </div>
        </div>
      </nav>
    );
  }

  // Show main navbar for authenticated users
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Helplytics
          </Link>
          
          <div className="flex gap-1">
            <NavLink to="/dashboard" icon={<Home size={18} />}>Dashboard</NavLink>
            <NavLink to="/explore" icon={<Compass size={18} />}>Explore</NavLink>
            <NavLink to="/create" icon={<PlusCircle size={18} />}>Create</NavLink>
            <NavLink to="/leaderboard" icon={<Trophy size={18} />}>Leaderboard</NavLink>
            <NavLink to="/ai-center" icon={<Brain size={18} />}>AI Center</NavLink>
            <NavLink to="/notifications" icon={<Bell size={18} />}>Alerts</NavLink>
            <NavLink to={`/profile/${user?.id}`} icon={<User size={18} />}>Profile</NavLink>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 rounded-lg transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ to, children, icon }) => (
  <Link to={to} className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition">
    {icon} {children}
  </Link>
);