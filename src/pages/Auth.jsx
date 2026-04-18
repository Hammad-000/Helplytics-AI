import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components/UI';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password, form.role);
      }
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 flex items-center justify-center px-6">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-gray-600 mt-2">{isLogin ? 'Login to continue' : 'Join the community'}</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          )}
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          
          {!isLogin && (
            <select className="w-full p-3 border rounded-lg" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="need-help">I Need Help</option>
              <option value="can-help">I Can Help</option>
              <option value="both">Both</option>
            </select>
          )}

          <Button type="submit" className="w-full">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-purple-600 hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </Card>
    </div>
  );
}