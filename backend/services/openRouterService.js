const axios = require('axios');

class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = 'https://openrouter.ai/api/v1';
    this.primaryModel = process.env.OPENROUTER_MODEL || 'google/gemma-4-26b-a4b-it:free';
    this.fallbackModel = process.env.OPENROUTER_FALLBACK_MODEL || 'google/gemma-4-31b-it:free';
  }

  async makeRequest(prompt, maxTokens = 2000) {
    // Try primary model first
    try {
      return await this.callModel(this.primaryModel, prompt, maxTokens);
    } catch (error) {
      console.log(`Primary model failed, trying fallback...`);
      return await this.callModel(this.fallbackModel, prompt, maxTokens);
    }
  }

  async callModel(model, prompt, maxTokens) {
    const response = await axios.post(
      `${this.baseURL}/chat/completions`,
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert Philippine LET exam question writer. Follow PRC standards and PPST. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'SmartStudy LET'
        }
      }
    );

    return {
      content: response.data.choices[0].message.content,
      model: response.data.model,
      tokensUsed: response.data.usage?.total_tokens || 0
    };
  }

  async generateQuestions(domain, subtopic, count = 5, difficulty = 'medium') {
    console.log(`Generating ${count} ${difficulty} questions for ${domain} - ${subtopic}`);
    
    const prompt = `Generate ${count} multiple-choice questions for the Philippine Licensure Examination for Teachers (LET).

Domain: ${domain}
Topic: ${subtopic || 'General'}
Difficulty: ${difficulty}

Requirements:
- Follow actual LET format
- Questions should test understanding, not just memorization
- Include situational questions where appropriate
- Provide detailed explanations

Return as JSON:
{
  "questions": [
    {
      "question_text": "Clear question here",
      "options": ["A) Option one", "B) Option two", "C) Option three", "D) Option four"],
      "correct_answer": "A",
      "explanation": "Why this is the correct answer",
      "difficulty_level": "medium",
      "subtopic": "Specific topic name"
    }
  ]
}`;

    const result = await this.makeRequest(prompt, 2000);
    
    try {
      const parsed = JSON.parse(result.content);
      return {
        questions: parsed.questions || [],
        modelUsed: result.model,
        tokensUsed: result.tokensUsed
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return { questions: [], modelUsed: result.model, tokensUsed: 0 };
    }
  }

  async generateStudyPlan(weakAreas, domain) {
    console.log(`Generating study plan for ${domain}`);
    
    const prompt = `Create a personalized 7-day study plan for the Philippine LET exam.

Domain: ${domain}
Weak Areas: ${JSON.stringify(weakAreas)}

Create a structured plan with daily focus topics, activities, and practice question targets.

Return as JSON:
{
  "plan_name": "Weekly LET Review Plan",
  "daily_plans": [
    {
      "day": 1,
      "focus_areas": ["Topic 1", "Topic 2"],
      "duration_minutes": 120,
      "activities": ["Review core concepts", "Practice questions", "Self-assessment"],
      "practice_questions": 20
    }
  ],
  "overall_tips": ["Focus on weak areas first", "Practice daily"]
}`;

    const result = await this.makeRequest(prompt, 1500);
    return JSON.parse(result.content);
  }

  async generateExplanation(questionText, correctAnswer, userAnswer) {
    console.log('Generating explanation for wrong answer');
    
    const prompt = `A student answered this LET question incorrectly. Provide a helpful explanation.

Question: ${questionText}
Correct Answer: ${correctAnswer}
Student's Answer: ${userAnswer}

Explain:
1. Why the correct answer is right
2. Why the student's answer is wrong
3. Key concept to remember

Keep it encouraging and educational.`;

    const result = await this.makeRequest(prompt, 500);
    return result.content;
  }

  async checkAvailability() {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const freeModels = response.data.data.filter(model => 
        model.id.includes(':free')
      );

      return {
        available: true,
        freeModelsCount: freeModels.length,
        models: freeModels.map(m => m.id)
      };
    } catch (error) {
      return { available: false, error: error.message };
    }
  }
}

module.exports = new OpenRouterService();