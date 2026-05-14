import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Card, CardContent, CardActions, Typography, Button, Box, Paper,
  LinearProgress, Chip, Avatar, Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  AutoAwesome as AIIcon,
  Psychology as PsychologyIcon,
  AutoStories as AutoStoriesIcon,
  Timer as TimerIcon,
  Calculate as MathIcon,
  Biotech as ScienceIcon,
  MenuBook as EnglishIcon,
  Language as FilipinoIcon,
  Public as SocialIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'https://smartstudy-let-api.onrender.com/api';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  const domains = [
    { 
      id: 1, 
      name: 'General Education', 
      subtitle: 'English • Math • Science • Filipino • Social Studies',
      icon: <SchoolIcon sx={{ fontSize: 48, color: 'white' }} />, 
      color: '#1565c0',
      gradient: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
      questions: 40
    },
    { 
      id: 2, 
      name: 'Professional Education', 
      subtitle: 'Teaching Methods • Child Development • Assessment • Curriculum',
      icon: <PsychologyIcon sx={{ fontSize: 48, color: 'white' }} />, 
      color: '#2e7d32',
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
      questions: 35
    },
  ];

  const specializations = [
    { id: 'mathematics', name: 'Mathematics', icon: <MathIcon sx={{ fontSize: 36, color: 'white' }} />, color: '#e65100', questions: 10 },
    { id: 'science', name: 'Science', icon: <ScienceIcon sx={{ fontSize: 36, color: 'white' }} />, color: '#6a1b9a', questions: 10 },
    { id: 'english', name: 'English', icon: <EnglishIcon sx={{ fontSize: 36, color: 'white' }} />, color: '#c62828', questions: 8 },
    { id: 'filipino', name: 'Filipino', icon: <FilipinoIcon sx={{ fontSize: 36, color: 'white' }} />, color: '#00695c', questions: 6 },
    { id: 'socialStudies', name: 'Social Studies', icon: <SocialIcon sx={{ fontSize: 36, color: 'white' }} />, color: '#4527a0', questions: 5 },
  ];

  const fetchStats = async () => {
    setBackendStatus('checking');
    
    const tryConnect = async (attempts = 0) => {
      try {
        const response = await axios.get(`${API_URL}/health`, { timeout: 15000 });
        setStats(response.data);
        setBackendStatus('online');
      } catch (error) {
        if (attempts < 5) {
          setTimeout(() => tryConnect(attempts + 1), (attempts + 1) * 3000);
        } else {
          setBackendStatus('offline');
        }
      }
    };
    
    tryConnect();
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/user/${user.id}`);
      setUserStats(response.data);
    } catch (error) {
      console.log('Could not fetch user stats');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (user) fetchUserStats();
  }, [user]);

  return (
    <Box sx={{ pb: 6 }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {user ? `Welcome back, ${user.user_metadata?.full_name || 'Future LPT'}!` : 'SmartStudy LET'}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          Your AI-Powered LET Review Assistant
        </Typography>
        
        {user && userStats && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Chip 
              icon={<TrophyIcon />} 
              label={`${userStats.overview?.totalQuizzes || 0} Quizzes Taken`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', py: 2.5, px: 1 }}
            />
            <Chip 
              icon={<TrendingUpIcon />} 
              label={`${Number(userStats.overview?.averageScore || 0).toFixed(1)}% Average`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', py: 2.5, px: 1 }}
            />
          </Box>
        )}
      </Paper>

      {/* Status Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Chip 
          size="small" 
          label={`Backend: ${
            backendStatus === 'checking' ? '⏳ Waking up...' : 
            backendStatus === 'online' ? '🟢 Online' : 
            '🔴 Offline'
          }`} 
          variant="outlined" 
          color={backendStatus === 'offline' ? 'error' : 'default'}
        />
        <Chip size="small" label={`AI Engine: ${stats?.openrouter ? '🟢 Ready' : '⚪ Standby'}`} variant="outlined" />
        <Chip size="small" label={`Questions: 120+`} variant="outlined" />
        {user ? (
          <Chip size="small" icon={<PersonIcon />} label={user.email} color="primary" variant="outlined" />
        ) : (
          <Chip size="small" label="Guest Mode" variant="outlined" />
        )}
      </Box>

      {/* Main Domain Cards */}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        📚 Core Domains
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {domains.map((domain) => (
          <Grid item xs={12} md={6} key={domain.id}>
            <Card 
              elevation={3}
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 }
              }}
            >
              <Box sx={{ 
                background: domain.gradient, 
                p: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64 }}>
                  {domain.icon}
                </Avatar>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="h6" fontWeight="bold">{domain.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>{domain.subtitle}</Typography>
                </Box>
              </Box>
              
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h3" fontWeight="bold" sx={{ color: domain.color }}>
                  {domain.questions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions Available
                </Typography>
              </CardContent>
              
              <Divider />
              
              <CardActions sx={{ justifyContent: 'center', p: 2, gap: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/quiz/${domain.id}`)}
                  sx={{ 
                    background: domain.gradient,
                    borderRadius: 2,
                    px: 4,
                    '&:hover': { opacity: 0.9 }
                  }}
                >
                  Practice Quiz
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/mock-exam')}
                  startIcon={<TimerIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Mock Exam
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Specialization Section */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Button 
          variant={showSpecializations ? "contained" : "outlined"}
          color="secondary"
          startIcon={<AutoStoriesIcon />}
          onClick={() => setShowSpecializations(!showSpecializations)}
          size="large"
          sx={{ borderRadius: 3, px: 4, py: 1.5 }}
        >
          {showSpecializations ? 'Hide' : '📖 Browse'} Specialization Modules
        </Button>
      </Box>

      {showSpecializations && (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            🎯 Specialization Areas
          </Typography>
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {specializations.map((spec) => (
              <Grid item xs={6} sm={4} md={2.4} key={spec.id}>
                <Card 
                  elevation={2}
                  sx={{ 
                    borderRadius: 3,
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: 4 }
                  }}
                >
                  <Box sx={{ 
                    bgcolor: spec.color, 
                    py: 2.5,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                      {spec.icon}
                    </Avatar>
                  </Box>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {spec.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {spec.questions} questions
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/quiz/3?specialization=${spec.id}`)}
                      sx={{ 
                        bgcolor: spec.color, 
                        borderRadius: 2,
                        '&:hover': { bgcolor: spec.color, opacity: 0.8 }
                      }}
                    >
                      Start
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Quick Actions */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: '#fafafa' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          ⚡ Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Button 
              fullWidth 
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => navigate('/mock-exam')}
              sx={{ 
                bgcolor: '#e65100', 
                borderRadius: 2, 
                py: 1.5,
                '&:hover': { bgcolor: '#bf360c' }
              }}
            >
              Mock Exam
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button 
              fullWidth 
              variant="contained"
              startIcon={<BarChartIcon />}
              onClick={() => navigate('/analytics')}
              sx={{ 
                bgcolor: '#4527a0', 
                borderRadius: 2, 
                py: 1.5,
                '&:hover': { bgcolor: '#311b92' }
              }}
            >
              Analytics
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button 
              fullWidth 
              variant="contained"
              startIcon={<AIIcon />}
              onClick={() => navigate('/study-plan')}
              sx={{ bgcolor: '#7c4dff', borderRadius: 2, py: 1.5 }}
            >
              AI Study Plan
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button 
              fullWidth 
              variant="outlined"
              startIcon={<TimerIcon />}
              onClick={() => navigate('/quiz/1')}
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Quick GenEd
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button 
              fullWidth 
              variant="outlined"
              startIcon={<TimerIcon />}
              onClick={() => navigate('/quiz/2')}
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Quick ProfEd
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Dashboard;