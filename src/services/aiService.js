// AI Service with keyword-based intelligence
export const aiService = {
  async analyzeRequest(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    
    const categories = {
      'Programming': ['code', 'javascript', 'react', 'python', 'bug', 'api', 'frontend', 'backend'],
      'Design': ['ui', 'ux', 'figma', 'design', 'graphic'],
      'Data Science': ['data', 'analytics', 'ml', 'ai', 'python'],
      'Career': ['resume', 'interview', 'job', 'career'],
      'DevOps': ['docker', 'kubernetes', 'aws', 'cloud'],
      'Mobile': ['ios', 'android', 'react native', 'flutter']
    };
    
    let category = 'General';
    for (const [cat, keywords] of Object.entries(categories)) {
      if (keywords.some(kw => text.includes(kw))) {
        category = cat;
        break;
      }
    }

    const urgencyMap = {
      critical: ['urgent', 'asap', 'deadline', 'emergency', 'critical'],
      high: ['soon', 'today', 'quick', 'fast', 'important'],
      low: ['week', 'later', 'eventually', 'someday']
    };
    
    let urgency = 'medium';
    for (const [level, keywords] of Object.entries(urgencyMap)) {
      if (keywords.some(kw => text.includes(kw))) {
        urgency = level;
        break;
      }
    }

    const commonTags = [
      'javascript', 'react', 'python', 'css', 'html', 'api', 'database',
      'debugging', 'tutorial', 'code-review', 'beginner', 'ui-design', 'figma'
    ];
    
    const tags = [...new Set(text.split(' ').filter(w => commonTags.includes(w)))].slice(0, 4);

    return { category, urgency, tags };
  },

  async getInsights(userId) {
    // Simulate AI insights
    return [
      '💡 You\'ve been very active this week! Keep up the great work.',
      '📈 Your trust score is above average — you\'re a trusted helper!',
      '🎯 Trending: React 19 and AI integration are hot topics',
      '🏆 50 more points to unlock "Expert Helper" badge',
      '🚀 Tip: Adding screenshots increases response rate by 40%'
    ];
  },

  async getOnboardingSuggestions(skills, interests) {
    const suggestions = {
      canHelp: [
        'Share your coding knowledge',
        'Help with debugging',
        'Answer design questions',
        'Provide career advice'
      ],
      needHelp: [
        'Learn modern React patterns',
        'Understand database design',
        'Master Tailwind CSS',
        'Build full-stack apps'
      ]
    };
    return suggestions;
  }
};