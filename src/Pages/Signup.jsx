// src/Pages/Signup.jsx
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

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + Details
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');
    try {
      await apiClient.post('/signup-request-otp', { email });
      setInfo('An OTP has been sent to your email.');
      setStep(2); // Move to the next step
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/signup-complete', { name, email, password, otp });
      const { token, user } = response.data;
      login(user, token); // Log the user in via context
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='border shadow p-6 w-96 bg-white rounded-lg'>
        <button className='bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2' onClick={() => navigate('/')}><FaBackward /><span>Go Back</span></button>
        <h1 className='text-2xl font-bold mb-4 text-center'>Create Your AdvocateGO Account</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {info && <p className="text-green-500 text-center mb-4">{info}</p>}

        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <h2 className='text-xl font-semibold mb-2'>Step 1: Verify Your Email</h2>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700'>Email Address:</label>
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <button type='submit' disabled={isLoading} className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-teal-400'>
              {isLoading ? 'Sending OTP...' : 'Send Verification OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCompleteSignup}>
            <h2 className='text-xl font-semibold mb-2'>Step 2: Complete Your Profile</h2>
            <p className="mb-4 text-sm text-center">An OTP was sent to <strong>{email}</strong>.</p>
            
            <div className='mb-4'>
              <label htmlFor="otp" className='block text-gray-700'>Verification OTP:</label>
              <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" required className='w-full px-3 py-2 border rounded'/>
            </div>
            
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700'>Full Name:</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required className='w-full px-3 py-2 border rounded'/>
            </div>

            <div className='relative mb-4'>
              <label htmlFor="password" className='block text-gray-700'>Set Password:</label>
              <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" required className='w-full px-3 py-2 border pr-10 rounded'/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type='submit' disabled={isLoading} className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-teal-400'>
              {isLoading ? 'Creating Account...' : 'Create Account & Login'}
            </button>
          </form>
        )}

        <p className='text-center mt-4'>Already have an account? <Link to="/login" className='text-teal-600 hover:underline'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;