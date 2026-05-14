const express = require('express');
const openRouterService = require('../services/openRouterService');

module.exports = function(supabase) {
  const router = express.Router();

  // Generate AI study plan
  router.post('/generate', async (req, res) => {
    try {
      const { userId, domain } = req.body;

      // Get user's weak areas
      let weakAreas = [];
      if (userId && supabase) {
        const { data: mastery } = await supabase
          .from('user_mastery')
          .select('subtopic_name, mastery_level')
          .eq('user_id', userId)
          .lt('mastery_level', 60)
          .order('mastery_level', { ascending: true });

        weakAreas = mastery?.map(m => ({
          subtopic: m.subtopic_name,
          mastery: m.mastery_level
        })) || [];
      }

      // Try AI generation first
      if (process.env.OPENROUTER_API_KEY) {
        try {
          const aiPlan = await openRouterService.generateStudyPlan(weakAreas, domain || 'generalEducation');
          return res.json({ ...aiPlan, source: 'ai' });
        } catch (aiError) {
          console.log('AI study plan failed, using template');
        }
      }

      // Fallback template
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const plan = {
        plan_name: "7-Day LET Review Plan",
        source: 'template',
        daily_plans: days.map((day, i) => ({
          day: i + 1,
          day_name: day,
          focus_areas: weakAreas.slice(0, 2).map(a => a.subtopic),
          duration_minutes: 90,
          activities: [
            "Review core concepts for 30 minutes",
            "Answer 20 practice questions",
            "Review wrong answers and explanations",
            "Take a 10-minute break"
          ],
          practice_questions: 20
        })),
        overall_tips: [
          "Focus on your weakest areas first",
          "Take practice quizzes daily",
          "Review explanations for wrong answers",
          "Get plenty of rest before study sessions"
        ]
      };

      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};