const express = require('express');
const openRouterService = require('../services/openRouterService');

module.exports = function(supabase) {
  const router = express.Router();

  router.post('/generate', async (req, res) => {
    try {
      const { userId, domain } = req.body;

      // Get user's weak areas if available
      let weakAreas = [];
      if (userId && supabase) {
        try {
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
        } catch (e) {
          console.log('No user mastery data yet');
        }
      }

      // Always try AI first
      if (process.env.OPENROUTER_API_KEY) {
        try {
          const aiPlan = await openRouterService.generateStudyPlan(
            weakAreas, 
            domain || 'generalEducation'
          );
          return res.json({ ...aiPlan, source: 'ai' });
        } catch (aiError) {
          console.log('AI failed, using template:', aiError.message);
        }
      }

      // Fallback template (only if AI completely fails)
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const plan = {
        plan_name: "7-Day LET Review Plan",
        source: 'template',
        daily_plans: days.map((day, i) => ({
          day: i + 1,
          day_name: day,
          focus_areas: ['General Review'],
          duration_minutes: 90,
          activities: [
            "Review core concepts",
            "Answer practice questions",
            "Review explanations",
            "Take a break"
          ],
          practice_questions: 20
        })),
        overall_tips: [
          "Take practice quizzes daily",
          "Review explanations for wrong answers",
          "Focus on your weakest areas first",
          "Get plenty of rest"
        ]
      };

      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};