import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Button, Box, Grid, Card, CardContent,
  Chip, LinearProgress, Stepper, Step, StepLabel, Alert, Divider,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Lightbulb as TipIcon,
  School as StudyIcon,
  Timer as TimerIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'https://smartstudy-let-api.onrender.com/api';

function StudyPlan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedDays, setCompletedDays] = useState([]);

  const generatePlan = async (domain) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/study-plan/generate`, {
        userId: user?.id || null,
        domain: domain || 'generalEducation',
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Failed to generate plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🤖 AI Study Plan Generator
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Get a personalized 7-day study plan based on your performance
      </Typography>

      {!plan && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <AIIcon sx={{ fontSize: 64, color: '#7c4dff', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Generate Your Personalized Plan
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Our AI analyzes your quiz performance to create a targeted study schedule
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => generatePlan('generalEducation')}
                disabled={loading}
                startIcon={<AIIcon />}
                sx={{ borderRadius: 2, px: 4, bgcolor: '#7c4dff' }}
              >
                {loading ? 'Generating...' : 'GenEd Study Plan'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => generatePlan('professionalEducation')}
                disabled={loading}
                startIcon={<AIIcon />}
                sx={{ borderRadius: 2, px: 4, bgcolor: '#00c853' }}
              >
                {loading ? 'Generating...' : 'ProfEd Study Plan'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <LinearProgress sx={{ mb: 2, borderRadius: 2 }} />
          <Typography>AI is creating your personalized plan...</Typography>
        </Box>
      )}

      {plan && (
        <>
          {/* Plan Header */}
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold">{plan.plan_name}</Typography>
                <Chip 
                  icon={plan.source === 'ai' ? <AIIcon /> : <TipIcon />}
                  label={plan.source === 'ai' ? 'AI Generated' : 'Template Based'}
                  color={plan.source === 'ai' ? 'secondary' : 'default'}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {completedDays.length}/{plan.daily_plans?.length || 7}
                </Typography>
                <Typography variant="body2">Days Completed</Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(completedDays.length / (plan.daily_plans?.length || 7)) * 100} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Paper>

          {/* Daily Plan Cards */}
          <Grid container spacing={2}>
            {plan.daily_plans?.map((day) => {
              const isCompleted = completedDays.includes(day.day);
              return (
                <Grid item xs={12} key={day.day}>
                  <Card 
                    elevation={isCompleted ? 1 : 2}
                    sx={{ 
                      borderRadius: 3,
                      opacity: isCompleted ? 0.7 : 1,
                      border: isCompleted ? '2px solid #4caf50' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            Day {day.day} - {day.day_name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                            {day.focus_areas?.map((area, i) => (
                              <Chip key={i} label={area} size="small" color="primary" variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                        <Button
                          variant={isCompleted ? "contained" : "outlined"}
                          color={isCompleted ? "success" : "primary"}
                          size="small"
                          onClick={() => toggleDay(day.day)}
                          startIcon={isCompleted ? <CheckIcon /> : null}
                          sx={{ borderRadius: 2 }}
                        >
                          {isCompleted ? 'Done!' : 'Mark Done'}
                        </Button>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="subtitle2" gutterBottom>
                            Activities:
                          </Typography>
                          {day.activities?.map((activity, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <StudyIcon fontSize="small" color="action" />
                              <Typography variant="body2">{activity}</Typography>
                            </Box>
                          ))}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                            <TimerIcon color="primary" />
                            <Typography variant="h6" fontWeight="bold">{day.duration_minutes}min</Typography>
                            <Typography variant="body2">Study Time</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="h6" fontWeight="bold">{day.practice_questions}</Typography>
                            <Typography variant="body2">Questions</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Overall Tips */}
          {plan.overall_tips && (
            <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 3, bgcolor: '#fff8e1' }}>
              <Typography variant="h6" gutterBottom>
                <TipIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#f57c00' }} />
                Study Tips
              </Typography>
              {plan.overall_tips.map((tip, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 1 }}>• {tip}</Typography>
              ))}
            </Paper>
          )}

          {/* Bottom Actions */}
          <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" onClick={() => { setPlan(null); setCompletedDays([]); }}>
              Generate New Plan
            </Button>
            <Button variant="contained" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default StudyPlan;