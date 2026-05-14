import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import MockExam from './pages/MockExam';
import StudyPlan from './pages/StudyPlan';

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#2e7d32' },
    background: { default: '#f5f5f5' },
  },
});

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/mock-exam" element={<MockExam />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/quiz/:domainId" element={<QuizPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/results" element={<Results />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/study-plan" element={<StudyPlan />} />
              </Routes>
            </Container>
          </>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;