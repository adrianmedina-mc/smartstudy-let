import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Paper, Typography, Box, Card, CardContent,
  Button, LinearProgress, Chip, List, ListItem, ListItemIcon,
  ListItemText, Alert,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'https://smartstudy-let-api.onrender.com/api';

function Analytics() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        // Get real user data
        const response = await axios.get(`${API_URL}/analytics/user/${user.id}`);
        setData(response.data);
      } else {
        // Fall back to demo data
        const response = await axios.get(`${API_URL}/analytics/demo`);
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Try demo as last resort
      try {
        const response = await axios.get(`${API_URL}/analytics/demo`);
        setData(response.data);
      } catch (e) {
        console.error('Demo also failed:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Loading analytics...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">
          No analytics data available. Take some quizzes first!
        </Alert>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
          Take a Quiz
        </Button>
      </Container>
    );
  }

  const { overview, masteryData, weakAreas, strongAreas, recentQuizzes } = data;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Learning Analytics
      </Typography>

      {!user && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Showing demo data. <Button size="small" onClick={() => navigate('/login')}>Login</Button> to see your real progress!
        </Alert>
      )}

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Quizzes</Typography>
              <Typography variant="h4">{overview?.totalQuizzes || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Average Score</Typography>
              <Typography variant="h4" sx={{ color: (overview?.averageScore || 0) >= 75 ? 'success.main' : 'warning.main' }}>
                {Number(overview?.averageScore || 0).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Weak Areas</Typography>
              <Typography variant="h4" color="error.main">{weakAreas?.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Strong Areas</Typography>
              <Typography variant="h4" color="success.main">{strongAreas?.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Mastery Radar */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Topic Mastery</Typography>
            {masteryData?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={masteryData.map(m => ({ topic: m.subtopic_name, mastery: m.mastery_level, fullMark: 100 }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="topic" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Mastery %" dataKey="mastery" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>Take quizzes to see your mastery levels</Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Quizzes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Quizzes</Typography>
            {recentQuizzes?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={recentQuizzes.slice(0, 10).reverse().map((q, i) => ({
                  name: `Quiz ${i + 1}`,
                  score: q.score_percentage || 0,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#82ca9d" name="Score %" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>Complete quizzes to see your progress</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Weak & Strong Areas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <WarningIcon sx={{ mr: 1, color: 'warning.main', verticalAlign: 'middle' }} />
              Areas to Improve
            </Typography>
            {weakAreas?.length > 0 ? (
              <List>
                {weakAreas.map((area, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                    <ListItemText 
                      primary={area.subtopic_name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress variant="determinate" value={area.mastery_level} color="warning" sx={{ flexGrow: 1 }} />
                          <Typography variant="body2">{area.mastery_level}%</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">No weak areas detected yet. Keep practicing!</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <CheckCircleIcon sx={{ mr: 1, color: 'success.main', verticalAlign: 'middle' }} />
              Strong Areas
            </Typography>
            {strongAreas?.length > 0 ? (
              <List>
                {strongAreas.map((area, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText 
                      primary={area.subtopic_name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress variant="determinate" value={area.mastery_level} color="success" sx={{ flexGrow: 1 }} />
                          <Typography variant="body2">{area.mastery_level}%</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">Complete more quizzes to build strong areas!</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom CTA */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
          Take More Quizzes
        </Button>
      </Box>
    </Container>
  );
}

export default Analytics;