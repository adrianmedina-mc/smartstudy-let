import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  EmojiEvents as TrophyIcon,
  Replay as ReplayIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'https://smartstudy-let-api.onrender.com/api';

function QuizPage() {
  const { domainId } = useParams();
  const [searchParams] = useSearchParams();
  const specialization = searchParams.get('specialization');
  const navigate = useNavigate();
  const { user } = useAuth();

  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  

  const domainNames = {
    1: 'General Education',
    2: 'Professional Education',
     3: specialization ? specialization.charAt(0).toUpperCase() + specialization.slice(1) : 'Specialization',
  };

  useEffect(() => {
    generateQuiz();
  }, [domainId]);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/quiz/generate`, {
        userId: user?.id || null,
        domainId: parseInt(domainId),
        questionCount: 5,
        useAI: false,
        specialization: domainId === '3' ? specialization : null,
      });
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      setError('Failed to generate quiz');
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
    try {
      const formattedAnswers = questions.map((q, index) => ({
        questionId: q.id || index,
        selectedAnswer: answers[index] || '',
      }));

      const response = await axios.post(`${API_URL}/quiz/submit`, {
        userId: user?.id || null,
        answers: formattedAnswers,
        questions,
        domainId: parseInt(domainId),
        timeSpent: 0,
      });

      setScore(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz: ' + error.message);
    }
  };

  // Get option letter from full option string
  const getOptionLetter = (option) => {
    if (!option) return '';
    return option.charAt(0);
  };

  // Get full option text by letter
  const getOptionText = (question, letter) => {
    if (!question || !letter) return '';
    const option = question.options.find(opt => opt.charAt(0) === letter);
    return option || letter;
  };

  // Check if answer is correct
  const isAnswerCorrect = (index) => {
    if (!questions[index] || !answers[index]) return false;
    return answers[index] === questions[index].correct_answer;
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" gutterBottom>Generating your quiz...</Typography>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>Error</Typography>
          <Typography>{error}</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  // Results Page with detailed review
  if (submitted && score) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Score Summary Card */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          {score.passed ? (
            <TrophyIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
          )}
          
          <Typography variant="h3" gutterBottom>
            Quiz Completed!
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h2" sx={{ 
              color: score.passed ? 'success.main' : 'warning.main',
              fontWeight: 'bold'
            }}>
              {score.score.toFixed(1)}%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {score.passed ? '✅ Passed (75% or above)' : '⚠️ Needs Improvement'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3 }}>
            <Box>
              <Typography variant="h5" color="success.main">{score.correctCount}</Typography>
              <Typography variant="body2" color="text.secondary">Correct</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="error.main">{score.totalQuestions - score.correctCount}</Typography>
              <Typography variant="body2" color="text.secondary">Incorrect</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="primary.main">{score.totalQuestions}</Typography>
              <Typography variant="body2" color="text.secondary">Total</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ReplayIcon />}
              onClick={generateQuiz}
            >
              Try New Quiz
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/analytics')}
            >
              View Analytics
            </Button>
          </Box>
        </Paper>

        {/* Detailed Question Review */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            📝 Question Review
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Review each question below. Green = correct, Red = incorrect.
          </Alert>

          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const correct = isAnswerCorrect(index);
            const questionNumber = index + 1;

            return (
              <Accordion 
                key={index}
                sx={{ 
                  mb: 2,
                  border: '2px solid',
                  borderColor: correct ? 'success.light' : 'error.light',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Chip 
                      label={`Q${questionNumber}`}
                      color={correct ? 'success' : 'error'}
                      size="small"
                    />
                    <Typography sx={{ flexGrow: 1 }}>
                      {question.question_text.substring(0, 80)}...
                    </Typography>
                    {correct ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Box sx={{ p: 1 }}>
                    {/* Full Question */}
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {questionNumber}. {question.question_text}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* All Options */}
                    <Typography variant="subtitle2" gutterBottom>
                      Options:
                    </Typography>
                    {question.options.map((option, optIndex) => {
                      const optionLetter = option.charAt(0);
                      const isCorrectOption = optionLetter === question.correct_answer;
                      const isUserChoice = optionLetter === userAnswer;
                      
                      let bgColor = 'transparent';
                      let borderColor = '#e0e0e0';
                      let icon = null;
                      
                      if (isCorrectOption && isUserChoice) {
                        bgColor = '#e8f5e9';
                        borderColor = '#4caf50';
                        icon = <CheckCircleIcon color="success" fontSize="small" />;
                      } else if (isCorrectOption) {
                        bgColor = '#e8f5e9';
                        borderColor = '#4caf50';
                        icon = <CheckCircleIcon color="success" fontSize="small" />;
                      } else if (isUserChoice && !isCorrectOption) {
                        bgColor = '#ffebee';
                        borderColor = '#f44336';
                        icon = <CancelIcon color="error" fontSize="small" />;
                      }

                      return (
                        <Box
                          key={optIndex}
                          sx={{
                            p: 1.5,
                            mb: 0.5,
                            bgcolor: bgColor,
                            border: '1px solid',
                            borderColor: borderColor,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {icon}
                          <Typography variant="body2">
                            {option}
                            {isCorrectOption && ' ✅ (Correct Answer)'}
                            {isUserChoice && !isCorrectOption && ' ❌ (Your Answer)'}
                          </Typography>
                        </Box>
                      );
                    })}

                    <Divider sx={{ my: 2 }} />

                    {/* Your Answer vs Correct Answer */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Your Answer:</strong>{' '}
                        <span style={{ color: correct ? '#4caf50' : '#f44336' }}>
                          {getOptionText(question, userAnswer) || 'No answer'}
                          {correct ? ' ✅' : ' ❌'}
                        </span>
                      </Typography>
                      {!correct && (
                        <Typography variant="body2" gutterBottom>
                          <strong>Correct Answer:</strong>{' '}
                          <span style={{ color: '#4caf50' }}>
                            {getOptionText(question, question.correct_answer)} ✅
                          </span>
                        </Typography>
                      )}
                    </Box>

                    {/* Explanation */}
                    {question.explanation && (
                      <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          💡 Explanation:
                        </Typography>
                        <Typography variant="body2">
                          {question.explanation}
                        </Typography>
                      </Box>
                    )}

                    {/* Difficulty */}
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        label={`Difficulty: ${question.difficulty_level || 'medium'}`}
                        size="small"
                        color={
                          question.difficulty_level === 'easy' ? 'success' :
                          question.difficulty_level === 'hard' ? 'error' : 'warning'
                        }
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Paper>

        {/* Bottom Actions */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ReplayIcon />}
            onClick={generateQuiz}
            sx={{ mr: 2 }}
          >
            Take Another Quiz
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/analytics')}
          >
            View Analytics
          </Button>
        </Box>
      </Container>
    );
  }

  // Quiz Taking Interface
  if (!questions.length) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography>No questions available for this domain.</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {/* Progress Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" fontWeight="bold">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={domainNames[domainId]} size="small" color="primary" />
              <Chip 
                label={question.difficulty_level || 'medium'} 
                size="small"
                color={
                  question.difficulty_level === 'easy' ? 'success' :
                  question.difficulty_level === 'hard' ? 'error' : 'warning'
                }
              />
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={((currentQuestion + 1) / questions.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Question Card */}
        <Card variant="outlined" sx={{ mb: 3, bgcolor: '#fafafa' }}>
          <CardContent>
            <Typography variant="h6">
              {currentQuestion + 1}. {question.question_text}
            </Typography>
          </CardContent>
        </Card>

        {/* Answer Options */}
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
                      backgroundColor: isSelected ? '#e3f2fd' : '#f5f5f5',
                      borderColor: isSelected ? 'primary.main' : '#bdbdbd'
                    },
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        {/* Navigation Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ← Previous
          </Button>
          
          <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
            {Object.keys(answers).length} of {questions.length} answered
          </Typography>

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
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              size="large"
            >
              Submit Quiz
            </Button>
          )}
        </Box>

        {/* Quick Question Navigator */}
        <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {questions.map((_, index) => (
            <Chip
              key={index}
              label={index + 1}
              size="small"
              onClick={() => setCurrentQuestion(index)}
              color={currentQuestion === index ? 'primary' : answers[index] ? 'success' : 'default'}
              variant={currentQuestion === index ? 'filled' : answers[index] ? 'outlined' : 'outlined'}
              sx={{ cursor: 'pointer', minWidth: '40px' }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
}

export default QuizPage;