const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://smartstudy-let.vercel.app',  // Your Vercel URL
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

console.log('✅ Supabase connected');

// Routes
app.use('/api/auth', require('./routes/auth')(supabase));
app.use('/api/quiz', require('./routes/quiz')(supabase));
app.use('/api/analytics', require('./routes/analytics')(supabase));
app.use('/api/study-plan', require('./routes/studyPlan')(supabase));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    supabase: true,
    openrouter: !!process.env.OPENROUTER_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`✅ SmartStudy LET Server running on http://localhost:${PORT}`);
});