import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegister) {
        const result = await register(email, password, fullName);
        setSuccess('Registration successful! You can now login.');
        setIsRegister(false);
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          {isRegister ? '📝 Create Account' : '👋 Welcome Back'}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          {isRegister ? 'Start your LET review journey' : 'Login to continue your review'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <TextField fullWidth label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} required />
          )}
          <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} required />
          
          <Button fullWidth variant="contained" type="submit" size="large" disabled={loading} sx={{ mb: 2 }}>
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </Button>
        </form>

        <Button fullWidth variant="text" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">OR</Typography>
          <Button fullWidth variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mt: 1 }}>
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;