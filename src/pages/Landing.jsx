import { Link } from 'react-router-dom';
import { Users, Award, Zap, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Helplytics AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect, Learn, and Grow Together — AI-powered community platform
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/auth" className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Get Started
            </Link>
            <button className="px-8 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-900/50 transition">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Users, label: 'Active Learners', value: '2,847', change: '+23%' },
            { icon: Award, label: 'Top Helpers', value: '156', change: '+12' },
            { icon: Zap, label: 'Requests Solved', value: '3,421', change: '+18%' },
            { icon: TrendingUp, label: 'Trust Score Avg', value: '94.2', change: '+5.2' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <stat.icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="text-green-400 text-xs mt-2">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}