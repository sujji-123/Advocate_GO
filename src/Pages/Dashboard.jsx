// src/Pages/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
import { FaBackward } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='border shadow p-6 w-100 bg-white rounded-lg'>
                <button className='bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 mb-4' onClick={() => navigate('/')}>
                    <FaBackward /><span>Go Home</span>
                </button>
                <h1 className='text-2xl font-bold mb-4 mt-4'>Welcome, {user?.name || user?.email || 'User'}!</h1>
                <p className="mb-4">You are successfully logged in.</p>
                <button className='bg-red-600 text-white px-4 py-2 rounded w-full' onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;