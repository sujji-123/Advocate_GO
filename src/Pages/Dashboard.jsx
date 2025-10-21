// src/Pages/Dashboard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        // This shouldn't happen if routes in App.jsx are set up, but as a fallback
        return <Navigate to="/login" />;
    }

    // This component now ONLY handles redirection
    switch (user.role) {
        case 'client':
            return <Navigate to="/dashboard/client" replace />;
        case 'lawyer':
            return <Navigate to="/dashboard/lawyer" replace />;
        case 'student':
            return <Navigate to="/dashboard/student" replace />;
        case 'advisor':
            return <Navigate to="/dashboard/advisor" replace />;
        default:
            // Fallback for any unknown role
            return <Navigate to="/" replace />;
    }
};

export default Dashboard;