import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          SmartStudy LET
        </Typography>
        
        {user && (
          <Chip label={`👤 ${user.user_metadata?.full_name || user.email}`} size="small" sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
        )}

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/dashboard')} variant={isActive('/dashboard') ? 'outlined' : 'text'}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/analytics')} variant={isActive('/analytics') ? 'outlined' : 'text'} startIcon={<BarChartIcon />}>Analytics</Button>
          <Button color="inherit" onClick={() => navigate('/mock-exam')} variant={isActive('/mock-exam') ? 'outlined' : 'text'} startIcon={<AssignmentIcon />}>Mock Exam</Button>
          
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;