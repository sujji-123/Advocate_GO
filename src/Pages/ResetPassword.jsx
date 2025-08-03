import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true,
});

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        setMessage('');
        setError('');
        try {
            const res = await apiClient.post(`/reset-password/${token}`, { password });
            setMessage(res.data.message + ' You can now log in.');
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border shadow p-6 w-96 bg-white rounded-lg">
                <h1 className='text-2xl font-bold mb-4 text-center'>Reset Your Password</h1>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700 mb-1'>New Password:</label>
                        <input
                            id="password" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                            className='w-full px-3 py-2 border rounded'
                        />
                    </div>
                     <div className="mb-4">
                        <label htmlFor="confirmPassword" className='block text-gray-700 mb-1'>Confirm New Password:</label>
                        <input
                            id="confirmPassword" type="password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} required
                            className='w-full px-3 py-2 border rounded'
                        />
                    </div>
                    <button type="submit" disabled={isLoading || message} className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-teal-400">
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;