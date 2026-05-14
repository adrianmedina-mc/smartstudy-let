const express = require('express');
const { AdaptiveQuizGenerator } = require('../data/questionBank');
const openRouterService = require('../services/openRouterService');

module.exports = function(supabase) {
  const router = express.Router();
  const quizGenerator = new AdaptiveQuizGenerator();

  // Generate quiz
  router.post('/generate', async (req, res) => {
    try {
      const { userId, domainId, questionCount = 10, useAI = false, specialization } = req.body;

      const domainMap = { 1: 'generalEducation', 2: 'professionalEducation', 3: 'specialization' };
      const domain = domainMap[domainId] || 'generalEducation';

      let weakSubtopics = [];
      if (userId) {
        const { data: mastery } = await supabase
          .from('user_mastery')
          .select('subtopic_name')
          .eq('user_id', userId)
          .lt('mastery_level', 60);
        weakSubtopics = mastery?.map(m => m.subtopic_name) || [];
      }

      let questions = quizGenerator.generateAdaptiveQuiz(domain, weakSubtopics, questionCount, specialization);

      if (questions.length < questionCount && useAI) {
        try {
          const aiResult = await openRouterService.generateQuestions(
            domain, specialization || 'General', questionCount - questions.length
          );
          questions = [...questions, ...(aiResult.questions || [])];
        } catch (e) { console.log('AI fallback failed'); }
      }

      if (userId) {
        await supabase.from('quiz_sessions').insert({
          user_id: userId,
          domain_id: domainId,
          quiz_type: 'practice',
          total_questions: Math.min(questions.length, questionCount),
          completed_at: new Date()
        });
      }

      res.json({
        sessionId: `quiz-${Date.now()}`,
        questions: questions.slice(0, questionCount),
        aiEnhanced: questions.some(q => q.created_by === 'openrouter')
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Submit quiz
  router.post('/submit', async (req, res) => {
    try {
      const { userId, answers, questions, domainId, timeSpent } = req.body;

      const scoredAnswers = answers.map((a, i) => ({
        ...a,
        isCorrect: questions[i]?.correct_answer === a.selectedAnswer
      }));

      const correctCount = scoredAnswers.filter(a => a.isCorrect).length;
      const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

      // Save to Supabase if user logged in
      if (userId) {
        // Update or create quiz session
        await supabase.from('quiz_sessions').insert({
          user_id: userId,
          domain_id: domainId || 1,
          quiz_type: 'practice',
          total_questions: questions.length,
          correct_answers: correctCount,
          score_percentage: score,
          time_spent: timeSpent || 0,
          completed_at: new Date()
        });

        // Update mastery per subtopic
        const subtopicPerformance = {};
        questions.forEach((q, i) => {
          const subtopic = detectSubtopic(q.question_text);
          if (!subtopicPerformance[subtopic]) {
            subtopicPerformance[subtopic] = { correct: 0, total: 0 };
          }
          subtopicPerformance[subtopic].total++;
          if (scoredAnswers[i]?.isCorrect) subtopicPerformance[subtopic].correct++;
        });

        const domainMap = { 1: 'generalEducation', 2: 'professionalEducation', 3: 'specialization' };
        const domain = domainMap[domainId] || 'generalEducation';

        for (const [subtopic, stats] of Object.entries(subtopicPerformance)) {
          const mastery = Math.round((stats.correct / stats.total) * 100);
          
          await supabase.from('user_mastery').upsert({
            user_id: userId,
            subtopic_name: subtopic,
            domain: domain,
            mastery_level: mastery,
            questions_attempted: stats.total,
            questions_correct: stats.correct,
            last_attempted_at: new Date(),
            updated_at: new Date()
          }, { onConflict: 'user_id, subtopic_name' });
        }
      }

      res.json({
        score,
        correctCount,
        totalQuestions: questions.length,
        passed: score >= 75
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mock exam
  router.post('/mock-exam', async (req, res) => {
    try {
      const { userId, domainId } = req.body;
      const domainMap = { 1: 'generalEducation', 2: 'professionalEducation' };
      const domain = domainMap[domainId] || 'generalEducation';
      const specs = { totalQuestions: 30, timeLimit: 30 }; // 30 for demo, change to 150 for real

      let questions = quizGenerator.generateAdaptiveQuiz(domain, [], specs.totalQuestions);
      
      // Duplicate if not enough
      while (questions.length < specs.totalQuestions) {
        questions = [...questions, ...questions].slice(0, specs.totalQuestions);
      }
      questions = questions.sort(() => Math.random() - 0.5);

      if (userId) {
        await supabase.from('quiz_sessions').insert({
          user_id: userId,
          domain_id: domainId,
          quiz_type: 'mock_exam',
          total_questions: specs.totalQuestions,
          completed_at: new Date()
        });
      }

      res.json({
        sessionId: `mock-${Date.now()}`,
        questions,
        totalQuestions: specs.totalQuestions,
        timeLimit: specs.timeLimit,
        isMockExam: true
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/ai-status', async (req, res) => {
    const status = await openRouterService.checkAvailability();
    res.json({ configured: !!process.env.OPENROUTER_API_KEY, ...status });
  });

  return router;
};

function detectSubtopic(text) {
  const keywords = {
    'English': ['sentence', 'grammar', 'synonym', 'vocabulary', 'reading', 'spell'],
    'Mathematics': ['solve', 'equation', 'percent', 'fraction', 'algebra', 'probability', 'area'],
    'Science': ['organism', 'cell', 'energy', 'planet', 'chemical', 'biology', 'atmosphere'],
    'Filipino': ['wika', 'panitikan', 'tula', 'pangungusap', 'pandiwa'],
    'Social Studies': ['history', 'president', 'constitution', 'government', 'economics'],
    'Child Development': ['piaget', 'erikson', 'vygotsky', 'development', 'cognitive', 'stage'],
    'Teaching Methods': ['method', 'teaching', 'learning', 'instruction', 'classroom'],
    'Assessment': ['assessment', 'evaluation', 'test', 'rubric', 'validity'],
    'Curriculum': ['curriculum', 'k-12', 'design', 'spiral'],
    'Educational Technology': ['technology', 'digital', 'online', 'lms', 'synchronous'],
    'Foundations': ['philosophy', 'constitution', 'education', 'law', 'policy']
  };

  const lower = text.toLowerCase();
  for (const [subtopic, words] of Object.entries(keywords)) {
    if (words.some(w => lower.includes(w))) return subtopic;
  }
  return 'General';
}