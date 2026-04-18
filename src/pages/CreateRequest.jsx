import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { aiService } from '../services/aiService';
import { Button, Card } from '../components/UI';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function CreateRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', tags: [], category: '', urgency: 'medium' });
  const [aiSuggestions, setAiSuggestions] = useState({ category: '', tags: [], urgency: '' });

  const handleAIAnalyze = async () => {
    const suggestions = await aiService.analyzeRequest(form.title, form.description);
    setAiSuggestions(suggestions);
    setForm(prev => ({ ...prev, category: suggestions.category, urgency: suggestions.urgency, tags: suggestions.tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/requests', form);
    navigate('/explore');
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Create Help Request</h1>
      <p className="text-gray-600 mb-8">Get help from the community — AI will assist you</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><label className="block text-sm font-medium mb-2">Title</label><input className="w-full border rounded-lg p-3" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
          <div><label className="block text-sm font-medium mb-2">Description</label><textarea rows="5" className="w-full border rounded-lg p-3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
          
          <Button type="button" onClick={handleAIAnalyze} variant="secondary"><Sparkles className="w-4 h-4 mr-2" /> Analyze with AI</Button>

          {aiSuggestions.category && (
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              <p><strong>🤖 AI Suggestions:</strong></p>
              <p>Category: <Badge>{aiSuggestions.category}</Badge></p>
              <p>Urgency: <Badge>{aiSuggestions.urgency}</Badge></p>
              <p>Tags: {aiSuggestions.tags.map(t => <Badge key={t}>{t}</Badge>)}</p>
              <Button size="sm" onClick={() => setForm({ ...form, category: aiSuggestions.category, urgency: aiSuggestions.urgency, tags: aiSuggestions.tags })}><RefreshCw className="w-3 h-3 mr-1" /> Apply All</Button>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div><label>Category</label><input className="w-full border rounded-lg p-3" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            <div><label>Urgency</label><select className="w-full border rounded-lg p-3" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}><option>low</option><option>medium</option><option>high</option><option>critical</option></select></div>
          </div>

          <Button type="submit">Post Request →</Button>
        </form>
      </Card>
    </div>
  );
}