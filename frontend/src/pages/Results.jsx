import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || {};

  if (!score) {
    return (
      <Container>
        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">No results available</Typography>
          <Button onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Go to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Quiz Results</Typography>
        <Typography variant="h2" sx={{ color: score.passed ? 'success.main' : 'error.main' }}>
          {score.score.toFixed(1)}%
        </Typography>
        <Button onClick={() => navigate('/dashboard')} sx={{ mt: 3 }}>
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
}

export default Results;