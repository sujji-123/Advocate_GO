// src/Components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// This component checks if a user is logged in AND has the correct role
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token || !user) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to so we can send them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user's role is in the list of allowed roles
  if (allowedRoles && allowedRoles.includes(user.role)) {
    // If yes, render the child route (e.g., <ClientDashboard />)
    return <Outlet />;
  } else {
    // If no, send them to an "unauthorized" page or back home
    // For now, let's send them home.
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;