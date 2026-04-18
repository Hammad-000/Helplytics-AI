import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Shared Logo Component
  const Logo = () => (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#1A2624] transition-colors">
        <span className="text-white font-black text-xl">H</span>
      </div>
      <span className="text-[#1A2624] font-bold text-lg tracking-tight">
        HelpHub AI
      </span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-[#F4F1E8]/60 backdrop-blur-xl border-b border-[#1A2624]/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Logo />

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-2 md:gap-6">
          {!isAuthenticated ? (
            <>
              <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
              <NavLink to="/explore">Explore</NavLink>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
              <NavLink to="/ai-center">AI Center</NavLink>
              
              <div className="hidden md:flex items-center gap-4 ml-4">
                <span className="px-4 py-2 bg-white/80 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5C716E] border border-white">
                  Live community signals
                </span>
                <button 
                  onClick={() => navigate('/auth')}
                  className="px-6 py-2.5 bg-[#0D9488] text-white rounded-full font-bold text-sm hover:bg-[#1A2624] transition-all shadow-lg shadow-teal-900/10"
                >
                  Join the platform
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</NavLink>
              <NavLink to="/explore" active={location.pathname === '/explore'}>Explore</NavLink>
              <NavLink to="/create" active={location.pathname === '/create'} variant="pill">
                Create Request
              </NavLink>
              <NavLink to="/leaderboard" active={location.pathname === '/leaderboard'}>Leaderboard</NavLink>
              
              <div className="h-6 w-px bg-[#1A2624]/10 mx-2" />
              
              <Link to={`/profile/${user?.id}`} className="group flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#DDE5E0] border border-white flex items-center justify-center text-[10px] font-black text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </Link>

              <button 
                onClick={handleLogout}
                className="p-2 text-[#5C716E] hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ to, children, active, variant }) => {
  // Pill variant specifically for "Create Request" or "Home" active state
  if (variant === 'pill' || active) {
    return (
      <Link 
        to={to} 
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
          active 
            ? 'bg-[#CBDAD6] text-[#0D9488]' 
            : 'bg-[#DDE5E0] text-[#5C716E] hover:bg-[#CBDAD6]'
        }`}
      >
        {children}
      </Link>
    );
  }

  // Standard Link
  return (
    <Link 
      to={to} 
      className="px-2 py-1 text-sm font-semibold text-[#5C716E] hover:text-[#1A2624] transition-colors"
    >
      {children}
    </Link>
  );
};