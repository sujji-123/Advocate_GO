// src/contextprovider/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      apiClient.get('/me').then(response => {
        // --- MODIFICATION ---
        // response.data.user now contains { id, name, email, role, specialization }
        setUser(response.data.user);
        // --- END MODIFICATION ---
      }).catch(() => {
        logout();
      });
    }
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    // --- MODIFICATION ---
    // userData now contains { id, name, email, role, specialization }
    setUser(userData);
    // --- END MODIFICATION ---
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    apiClient.post('/logout'); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};