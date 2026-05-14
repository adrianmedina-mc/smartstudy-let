const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - Allow all origins for now
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Initialize Supabase
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

console.log('✅ Supabase connected');

// Routes
const authRoutes = require('./routes/auth')(supabase);
const quizRoutes = require('./routes/quiz')(supabase);
const analyticsRoutes = require('./routes/analytics')(supabase);
const studyPlanRoutes = require('./routes/studyPlan')(supabase);

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/study-plan', studyPlanRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    supabase: true,
    openrouter: !!process.env.OPENROUTER_API_KEY
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SmartStudy LET Server running on port ${PORT}`);
});