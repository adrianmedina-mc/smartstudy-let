import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  LinearProgress,
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'https://smartstudy-let-api.onrender.com/api';

function MockExam() {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  
  const [domain, setDomain] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const domainNames = {
    1: 'General Education',
    2: 'Professional Education',
    3: 'Specialization',
  };

  // Timer countdown
  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 60 && prev > 0) {
            setShowTimeWarning(true);
          }
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  // Format time
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const startMockExam = async (domainId) => {
    setDomain(domainId);
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/quiz/mock-exam`, {
        domainId,
        userId: 'demo-user',
      });

      setQuestions(response.data.questions);
      setTimeLimit(response.data.timeLimit * 60); // Convert to seconds
      setTimeLeft(response.data.timeLimit * 60);
      setInstructions(response.data.instructions[domainId === 1 ? 'generalEducation' : 'professionalEducation'] || []);
      setLoading(false);
      setStarted(true);
    } catch (error) {
      console.error('Error starting mock exam:', error);
      alert('Failed to start mock exam');
      setLoading(false);
    }
  };

  const handleAnswer = (index, answer) => {
    setAnswers({
      ...answers,
      [index]: answer,
    });
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    setShowSubmitDialog(false);
    setLoading(true);

    try {
      const formattedAnswers = questions.map((q, index) => ({
        questionId: q.id || index,
        selectedAnswer: answers[index] || '',
      }));

      const response = await axios.post(`${API_URL}/quiz/submit`, {
        answers: formattedAnswers,
        questions,
      });

      setScore(response.data);
      setSubmitted(true);
      setStarted(false);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting exam:', error);
      setLoading(false);
    }
  };

  // Count unanswered questions
  const unansweredCount = questions.length - Object.keys(answers).length;
  const answeredCount = Object.keys(answers).length;

  // Selection screen before exam starts
  if (!started && !submitted) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            📝 LET Mock Examination
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Simulate the real LET exam experience with timed conditions
          </Typography>

          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="subtitle2" gutterBottom>Important Reminders:</Typography>
            <ul>
              <li>Each exam has 150 questions with a 2-hour time limit</li>
              <li>Passing score is 75% (same as actual LET)</li>
              <li>Timer starts immediately - you cannot pause</li>
              <li>You can navigate between questions freely</li>
              <li>Unanswered questions count as wrong answers</li>
            </ul>
          </Alert>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Select Domain:
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                }}
                onClick={() => startMockExam(1)}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h5" gutterBottom>General Education</Typography>
                  <Typography variant="body2" color="text.secondary">
                    150 Questions • 2 Hours
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Start GenEd Mock Exam
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                }}
                onClick={() => startMockExam(2)}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h5" gutterBottom>Professional Education</Typography>
                  <Typography variant="body2" color="text.secondary">
                    150 Questions • 2 Hours
                  </Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                    Start ProfEd Mock Exam
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button 
            variant="outlined" 
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 4 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  // Loading state
  if (loading && !submitted) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5">Preparing your exam...</Typography>
          <LinearProgress sx={{ mt: 2 }} />
        </Box>
      </Container>
    );
  }

  // Results page
  if (submitted && score) {
    const timeSpent = timeLimit - timeLeft;
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          {score.passed ? (
            <TrophyIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
          )}

          <Typography variant="h3" gutterBottom>
            Mock Exam Completed!
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h2" sx={{ 
              color: score.passed ? 'success.main' : 'warning.main',
              fontWeight: 'bold'
            }}>
              {score.score.toFixed(1)}%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {score.passed ? '✅ Congratulations! You passed!' : '⚠️ Keep practicing to reach 75%'}
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                <Typography variant="h5" color="success.main">{score.correctCount}</Typography>
                <Typography variant="body2">Correct</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
                <Typography variant="h5" color="error.main">{score.totalQuestions - score.correctCount}</Typography>
                <Typography variant="body2">Incorrect</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
                <Typography variant="h5" color="warning.main">
                  {questions.length - answeredCount}
                </Typography>
                <Typography variant="body2">Unanswered</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
                <Typography variant="h5" color="primary.main">{formatTime(timeSpent)}</Typography>
                <Typography variant="body2">Time Used</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={() => {
              setSubmitted(false);
              setScore(null);
              setAnswers({});
              setCurrentQuestion(0);
              setStarted(false);
            }}>
              Take Another Mock Exam
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/analytics')}>
              View Analytics
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Active exam interface
  const question = questions[currentQuestion];
  const timePercentage = (timeLeft / timeLimit) * 100;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Timer Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000,
          bgcolor: timeLeft < 300 ? '#ffebee' : timeLeft < 600 ? '#fff3e0' : 'white',
          transition: 'background-color 0.3s'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" component="span">
                {domainNames[domain]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                LET Mock Examination
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Chip 
                label={`${answeredCount}/${questions.length} answered`}
                color={answeredCount === questions.length ? 'success' : 'warning'}
                size="small"
              />
              
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimerIcon color={timeLeft < 300 ? 'error' : timeLeft < 600 ? 'warning' : 'primary'} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: timeLeft < 300 ? 'error.main' : timeLeft < 600 ? 'warning.main' : 'primary.main'
                    }}
                  >
                    {formatTime(timeLeft)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={timePercentage} 
                  color={timeLeft < 300 ? 'error' : timeLeft < 600 ? 'warning' : 'primary'}
                  sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                />
              </Box>

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => setShowSubmitDialog(true)}
                disabled={answeredCount === 0}
              >
                Finish Exam
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Time Warning Alert */}
      {showTimeWarning && timeLeft > 0 && (
        <Alert 
          severity="warning"
          sx={{ borderRadius: 0 }}
          onClose={() => setShowTimeWarning(false)}
        >
          ⚠️ Less than {timeLeft > 60 ? '5 minutes' : '1 minute'} remaining! Review your answers quickly.
        </Alert>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Question Area */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 4 }}>
              {/* Progress */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Question {currentQuestion + 1} of {questions.length}
                  </Typography>
                  <Chip 
                    label={question.difficulty_level || 'medium'} 
                    size="small"
                    color={
                      question.difficulty_level === 'easy' ? 'success' :
                      question.difficulty_level === 'hard' ? 'error' : 'warning'
                    }
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={((currentQuestion + 1) / questions.length) * 100}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>

              {/* Question */}
              <Card variant="outlined" sx={{ mb: 3, bgcolor: '#fafafa' }}>
                <CardContent>
                  <Typography variant="h6">
                    {currentQuestion + 1}. {question.question_text}
                  </Typography>
                </CardContent>
              </Card>

              {/* Options */}
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
                >
                  {question.options.map((option, index) => {
                    const optionLetter = option.charAt(0);
                    const isSelected = answers[currentQuestion] === optionLetter;
                    
                    return (
                      <FormControlLabel
                        key={index}
                        value={optionLetter}
                        control={<Radio />}
                        label={option}
                        sx={{
                          mb: 1,
                          p: 1.5,
                          border: '2px solid',
                          borderColor: isSelected ? 'primary.main' : '#e0e0e0',
                          borderRadius: 1,
                          width: '100%',
                          bgcolor: isSelected ? '#e3f2fd' : 'transparent',
                          '&:hover': { 
                            backgroundColor: isSelected ? '#e3f2fd' : '#f5f5f5'
                          },
                        }}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              {/* Navigation */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  ← Previous
                </Button>
                
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Review & Submit
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Question Navigator Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h6" gutterBottom>
                Question Navigator
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Click a number to jump to that question
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {questions.map((_, index) => (
                  <Chip
                    key={index}
                    label={index + 1}
                    size="small"
                    onClick={() => setCurrentQuestion(index)}
                    color={currentQuestion === index ? 'primary' : answers[index] ? 'success' : 'default'}
                    variant={currentQuestion === index ? 'filled' : answers[index] ? 'outlined' : 'outlined'}
                    sx={{ 
                      cursor: 'pointer', 
                      minWidth: '45px',
                      fontWeight: currentQuestion === index ? 'bold' : 'normal'
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 16, height: 16, bgcolor: 'success.main', borderRadius: 0.5 }} />
                  <Typography variant="body2">Answered ({answeredCount})</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, bgcolor: 'grey.300', borderRadius: 0.5 }} />
                  <Typography variant="body2">Unanswered ({unansweredCount})</Typography>
                </Box>
              </Box>

              {unansweredCount > 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  You have {unansweredCount} unanswered questions!
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <DialogTitle>
          <WarningIcon sx={{ mr: 1, color: 'warning.main', verticalAlign: 'middle' }} />
          Submit Exam?
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to submit your exam?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              ✅ Answered: {answeredCount} questions
            </Typography>
            <Typography variant="body2" color="warning.main">
              ⚠️ Unanswered: {unansweredCount} questions
            </Typography>
            {timeLeft > 0 && (
              <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>
                ⏱ Time remaining: {formatTime(timeLeft)}
              </Typography>
            )}
          </Box>
          {unansweredCount > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Unanswered questions will be marked as incorrect!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>
            Return to Exam
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleSubmit}
          >
            Submit Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MockExam;
