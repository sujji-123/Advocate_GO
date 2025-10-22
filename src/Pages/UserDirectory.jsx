// src/Pages/UserDirectory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../contextprovider/AuthContext';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const UserDirectory = () => {
  const { role } = useParams();
  const { user: currentUser } = useAuth(); // Get the currently logged-in user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const title = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Users';

  useEffect(() => {
    // --- DEBUGGING ---
    console.log("UserDirectory Effect: currentUser:", currentUser); 
    // --- END DEBUGGING ---

    if (!currentUser || !currentUser.id) { // Added check for currentUser.id
      console.log("UserDirectory Effect: currentUser or currentUser.id is missing. Waiting.");
      setLoading(false); // Stop loading if no user
      // setError("Could not identify current user."); // Optional: show an error
      return; // Don't proceed if we don't know who the current user is
    }

    // --- DEBUGGING ---
    console.log(`UserDirectory Effect: Fetching users for role '${role}'. Current user ID: ${currentUser.id}`);
    // --- END DEBUGGING ---

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.get(`/api/users?role=${role}`)
      .then(res => {
        // --- DEBUGGING ---
        console.log("UserDirectory Effect: API Response Data:", res.data);
        // --- END DEBUGGING ---

        // Filter out the current user
        const otherUsers = res.data.filter(u => {
          // --- DEBUGGING ---
          // console.log(`Comparing API user ID (${u._id}) type: ${typeof u._id} with Current user ID (${currentUser.id}) type: ${typeof currentUser.id}`);
          // --- END DEBUGGING ---
          // Explicitly compare, sometimes IDs might be objects vs strings
          return String(u._id) !== String(currentUser.id); 
        });
        
        // --- DEBUGGING ---
        console.log("UserDirectory Effect: Filtered Users (excluding self):", otherUsers);
        // --- END DEBUGGING ---

        setUsers(otherUsers);
        setLoading(false);
      })
      .catch(err => {
        console.error("UserDirectory Fetch Error:", err); // Log the actual error
        setError(`Failed to fetch ${role}s.`);
        setLoading(false);
      });
      // Added currentUser.id to dependencies as well
  }, [role, currentUser]); // currentUser object itself is the dependency

  const handleConnect = (recipientId, name) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.post('/api/connections/request', { recipientId })
      .then(res => {
        alert(`Connection request sent to ${name}!`);
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Failed to send request.');
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className='text-3xl font-bold mb-8 text-gray-800'>Connect with {title}s</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && users.length === 0 && (
              <p className="text-gray-600 col-span-full">No other {role}s found.</p>
            )}
            {users.map(user => (
              <div key={user._id} className="bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                {user.role === 'lawyer' && (
                  <p className="text-sm text-teal-700 font-medium">{user.specialization}</p>
                )}
                {user.profile?.location && (
                  <p className="text-sm text-gray-500 mt-1">{user.profile.location}</p>
                )}
                <button
                  onClick={() => handleConnect(user._id, user.name)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mt-4 hover:bg-blue-700"
                >
                  Send Connect Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDirectory;