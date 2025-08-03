// src/Pages/AuthPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaBackward } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true,
});

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/login', { email, password });
      const { token, user } = response.data;
      login(user, token); // Update global state via context
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-96 bg-white rounded-lg">
        <button className='bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2' onClick={() => navigate('/')}><FaBackward /><span>Go Back</span></button>
        <h1 className='text-2xl font-bold mb-4 text-center'>AdvocateGO Login</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className='block text-gray-700 mb-1'>Email Address:</label>
            <input
              id="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com" required
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          
          <div className="relative mb-4">
            <label htmlFor="password" className='block text-gray-700 mb-1'>Password:</label>
            <input
              id="password" type={showPassword ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" required
              className='w-full px-3 py-2 border pr-10 rounded'
            />
             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>
          
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-teal-400">
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        
        <p className='text-center mt-4'>Don't have an account? <Link to="/register" className='text-teal-600 hover:underline'>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default AuthPage;