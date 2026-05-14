const express = require('express');

module.exports = function(supabase) {
  const router = express.Router();

  // Real user analytics
  router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;

      const { data: sessions } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      const { data: mastery } = await supabase
        .from('user_mastery')
        .select('*')
        .eq('user_id', userId);

      const totalQuizzes = sessions?.length || 0;
      const averageScore = totalQuizzes > 0
        ? sessions.reduce((sum, s) => sum + (s.score_percentage || 0), 0) / totalQuizzes
        : 0;

      res.json({
        overview: {
          totalQuizzes,
          averageScore: averageScore.toFixed(1),
          totalStudyTime: sessions?.reduce((sum, s) => sum + (s.time_spent || 0), 0) || 0,
        },
        masteryData: mastery || [],
        recentQuizzes: sessions?.slice(0, 10) || [],
        weakAreas: mastery?.filter(m => m.mastery_level < 60) || [],
        strongAreas: mastery?.filter(m => m.mastery_level >= 80) || []
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Demo data (no login needed)
  router.get('/demo', (req, res) => {
    res.json({
      overview: { totalQuizzes: 12, averageScore: "72.5", totalStudyTime: 1440 },
      masteryData: [
        { subtopic_name: 'English', mastery_level: 85 },
        { subtopic_name: 'Mathematics', mastery_level: 62 },
        { subtopic_name: 'Science', mastery_level: 78 },
        { subtopic_name: 'Child Development', mastery_level: 55 },
        { subtopic_name: 'Teaching Methods', mastery_level: 68 },
        { subtopic_name: 'Assessment', mastery_level: 45 }
      ],
      weakAreas: [
        { subtopic_name: 'Assessment', mastery_level: 45 },
        { subtopic_name: 'Child Development', mastery_level: 55 }
      ],
      strongAreas: [
        { subtopic_name: 'English', mastery_level: 85 },
        { subtopic_name: 'Science', mastery_level: 78 }
      ]
    });
  });

  return router;
};