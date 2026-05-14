const express = require('express');

module.exports = function(supabase) {
  const router = express.Router();

  // Register
  router.post('/register', async (req, res) => {
    try {
      const { email, password, fullName } = req.body;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) throw error;

      res.json({ 
        message: 'Registration successful! Check your email to confirm.', 
        user: data.user 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      res.json({ 
        message: 'Login successful', 
        session: data.session,
        user: data.user 
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  // Get user profile
  router.get('/profile', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No token provided' });

      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error) throw error;

      // Get user stats
      const { data: sessions } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      const totalQuizzes = sessions?.length || 0;
      const averageScore = totalQuizzes > 0 
        ? sessions.reduce((sum, s) => sum + (s.score_percentage || 0), 0) / totalQuizzes 
        : 0;

      res.json({
        user,
        stats: {
          totalQuizzes,
          averageScore: averageScore.toFixed(1),
          totalStudyTime: sessions?.reduce((sum, s) => sum + (s.time_spent || 0), 0) || 0
        }
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  // Logout
  router.post('/logout', async (req, res) => {
    try {
      await supabase.auth.signOut();
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};