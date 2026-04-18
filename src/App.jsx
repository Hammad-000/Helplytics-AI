// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter from here
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; 
import Navbar from './components/Layout/Navbar.jsx'; 
import Landing from './pages/Landing.jsx'; 
import Auth from './pages/Auth.jsx';  
import Onboarding from './pages/Onboarding.jsx'; 
import Dashboard from './components/Dashboard.jsx'; 
import Explore from './pages/Explore.jsx';
import CreateRequest from './pages/CreateRequest.jsx';  
import RequestDetail from './pages/RequestDetail.jsx';  
import Leaderboard from './pages/Leaderboard.jsx';  
import AICenter from './pages/AICenter.jsx';  
import Notifications from './pages/Notifications.jsx';  
import Profile from './pages/Profile.jsx';  

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          } />
          <Route path="/request/:id" element={
            <ProtectedRoute>
              <RequestDetail />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          <Route path="/ai-center" element={
            <ProtectedRoute>
              <AICenter />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/profile/:id?" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;