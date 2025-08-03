import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true,
});

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');
        try {
            const res = await apiClient.post('/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border shadow p-6 w-96 bg-white rounded-lg">
                <h1 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h1>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <p className="mb-4 text-gray-600 text-center">Enter your email address and we will send you a link to reset your password.</p>
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700 mb-1'>Email Address:</label>
                        <input
                            id="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com" required
                            className='w-full px-3 py-2 border rounded'
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-teal-400">
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                 <p className='text-center mt-4'><Link to="/login" className='text-teal-600 hover:underline'>Back to Login</Link></p>
            </div>
        </div>
    );
};

export default ForgotPassword;