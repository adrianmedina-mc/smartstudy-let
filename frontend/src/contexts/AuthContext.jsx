import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('smartstudy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const userData = { ...response.data.user, session: response.data.session };
    setUser(userData);
    localStorage.setItem('smartstudy_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (email, password, fullName) => {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password, fullName });
    return response.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartstudy_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}