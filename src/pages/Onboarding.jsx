import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/aiService';
import { Button, Card } from '../components/UI';
import { Sparkles } from 'lucide-react';

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ skills: [], interests: [], location: '' });
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [suggestions, setSuggestions] = useState(null);

  const handleAISuggestions = async () => {
    const aiSuggestions = await aiService.getOnboardingSuggestions(form.skills, form.interests);
    setSuggestions(aiSuggestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(form);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-gray-600 mb-6">Tell us about yourself to get better help matches</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Skills (What can you help with?)</label>
            <div className="flex gap-2 mb-2">
              <input className="flex-1 border rounded-lg p-2" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g., React, Python, Design" />
              <Button type="button" size="sm" onClick={() => { if(skillInput) setForm({ ...form, skills: [...form.skills, skillInput] }); setSkillInput(''); }}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">{form.skills.map(s => <span key={s} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{s}</span>)}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Interests (What do you want to learn?)</label>
            <div className="flex gap-2 mb-2">
              <input className="flex-1 border rounded-lg p-2" value={interestInput} onChange={e => setInterestInput(e.target.value)} placeholder="e.g., Web Dev, AI, UX" />
              <Button type="button" size="sm" onClick={() => { if(interestInput) setForm({ ...form, interests: [...form.interests, interestInput] }); setInterestInput(''); }}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">{form.interests.map(i => <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{i}</span>)}</div>
          </div>

          <div><label className="block text-sm font-medium mb-2">Location</label><input className="w-full border rounded-lg p-3" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>

          <Button type="button" onClick={handleAISuggestions} variant="secondary"><Sparkles className="w-4 h-4 mr-2" /> Get AI Suggestions</Button>

          {suggestions && (
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="font-semibold mb-2">🤖 AI Suggestions:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div><p className="text-sm font-medium">You can help with:</p><ul className="text-sm text-gray-600">{suggestions.canHelp.slice(0,3).map(s => <li key={s}>• {s}</li>)}</ul></div>
                <div><p className="text-sm font-medium">You may need help with:</p><ul className="text-sm text-gray-600">{suggestions.needHelp.slice(0,3).map(s => <li key={s}>• {s}</li>)}</ul></div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">Complete Setup →</Button>
        </form>
      </Card>
    </div>
  );
}