import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Re-use the same API client configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    // This effect runs on app startup to keep the user logged in
    if (token) {
      // Set the token for all future apiClient requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data if we have a token but no user object
      apiClient.get('/me').then(response => {
        setUser(response.data.user);
      }).catch(() => {
        // If token is invalid, log out
        logout();
      });
    }
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    // Optional: Call the backend logout to clear the cookie
    apiClient.post('/logout'); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};