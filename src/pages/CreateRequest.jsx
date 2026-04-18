import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { aiService } from '../services/aiService';  // Named import
import { Button, Card, Badge } from '../components/UI';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function CreateRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    tags: [], 
    category: '', 
    urgency: 'medium' 
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIAnalyze = async () => {
    if (!form.title && !form.description) {
      alert('Please enter a title and description first');
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const suggestions = await aiService.analyzeRequest(form.title, form.description);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyAISuggestions = () => {
    if (aiSuggestions) {
      setForm(prev => ({ 
        ...prev, 
        category: aiSuggestions.category, 
        urgency: aiSuggestions.urgency, 
        tags: aiSuggestions.tags 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', form);
      navigate('/explore');
    } catch (error) {
      console.error('Failed to create request:', error);
      alert('Failed to create request. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Create Help Request</h1>
      <p className="text-gray-600 mb-8">Get help from the community — AI will assist you</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input 
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              rows="5" 
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })} 
              required 
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleAIAnalyze} 
            variant="secondary"
            disabled={isAnalyzing}
          >
            <Sparkles className="w-4 h-4 mr-2" /> 
            {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
          </Button>

          {aiSuggestions && (
            <div className="bg-purple-50 rounded-lg p-4 space-y-3">
              <p className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Suggestions:
              </p>
              <div className="space-y-2">
                <p><strong>Category:</strong> <Badge variant="purple">{aiSuggestions.category}</Badge></p>
                <p><strong>Urgency:</strong> <Badge variant="warning">{aiSuggestions.urgency}</Badge></p>
                <p><strong>Tags:</strong> {aiSuggestions.tags.map(t => <Badge key={t} className="mr-1">{t}</Badge>)}</p>
              </div>
              <Button size="sm" onClick={applyAISuggestions}>
                <RefreshCw className="w-3 h-3 mr-1" /> Apply All
              </Button>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input 
                className="w-full border rounded-lg p-3" 
                value={form.category} 
                onChange={e => setForm({ ...form, category: e.target.value })} 
                placeholder="e.g., Programming, Design"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Urgency</label>
              <select 
                className="w-full border rounded-lg p-3" 
                value={form.urgency} 
                onChange={e => setForm({ ...form, urgency: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input 
              className="w-full border rounded-lg p-3" 
              value={form.tags.join(', ')} 
              onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })} 
              placeholder="react, javascript, help"
            />
          </div>

          <Button type="submit" className="w-full">Post Request →</Button>
        </form>
      </Card>
    </div>
  );
}