// src/Pages/MyConnections.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaCheck, FaTimes, FaCommentDots, FaSpinner, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const MyConnections = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [respondingId, setRespondingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const [pendingRes, acceptedRes] = await Promise.all([
        apiClient.get('/api/connections/pending'),
        apiClient.get('/api/connections/accepted')
      ]);

      console.log("Pending connections:", pendingRes.data);
      console.log("Accepted connections:", acceptedRes.data);

      setPending(pendingRes.data);
      setAccepted(acceptedRes.data);
    } catch (err) {
      console.error("Error fetching connections:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to fetch connections. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResponse = async (requestId, status) => {
    setRespondingId(requestId);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication error. Please log in again.');
        setRespondingId(null);
        return;
      }

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await apiClient.put(`/api/connections/respond/${requestId}`, { status });
      
      fetchData(); // Refresh data
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
      alert(`Failed to ${status} request. ${err.response?.data?.message || ''}`);
    } finally {
      setRespondingId(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'lawyer': return <FaBriefcase className="text-blue-500" />;
      case 'student': return <FaUserPlus className="text-green-500" />;
      case 'advisor': return <FaUserPlus className="text-purple-500" />;
      default: return <FaUserPlus className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Connections</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your professional network and build meaningful relationships
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading your connections...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
              <FaTimes className="text-red-500 text-2xl mx-auto mb-2" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Pending Requests Section */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <FaUserPlus className="text-yellow-500 mr-3" />
                Pending Connection Requests
                <span className="ml-3 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  {pending.length} pending
                </span>
              </h2>
              <p className="text-gray-600 mb-6">Review and respond to connection requests</p>

              <div className="space-y-4">
                {!loading && !error && pending.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <FaUserPlus className="text-gray-400 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No pending connection requests</p>
                    <p className="text-gray-400 text-sm mt-2">Your connection requests will appear here</p>
                  </div>
                )}

                {pending.map(req => (
                  <div key={req.id || req._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {req.requester?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{req.requester?.name}</h3>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center space-x-1">
                              {getRoleIcon(req.requester?.role)}
                              <span className="text-sm text-gray-600 capitalize">{req.requester?.role}</span>
                            </div>
                            {req.requester?.role === 'lawyer' && req.requester?.specialization && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {req.requester.specialization}
                              </span>
                            )}
                          </div>
                          {req.requester?.profile?.location && (
                            <div className="flex items-center text-gray-500 mt-2">
                              <FaMapMarkerAlt className="text-gray-400 mr-1 text-sm" />
                              <span className="text-sm">{req.requester.profile.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleResponse(req.id || req._id, 'accepted')}
                          disabled={respondingId === (req.id || req._id)}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                        >
                          {respondingId === (req.id || req._id) ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                            <FaCheck className="mr-2" />
                          )}
                          Accept
                        </button>
                        <button
                          onClick={() => handleResponse(req.id || req._id, 'declined')}
                          disabled={respondingId === (req.id || req._id)}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                        >
                          <FaTimes className="mr-2" />
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Accepted Connections Section */}
          <section>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <FaUsers className="text-green-500 mr-3" />
                My Connections
                <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {accepted.length} connected
                </span>
              </h2>
              <p className="text-gray-600 mb-6">Your professional network</p>

              <div className="space-y-4">
                {!loading && !error && accepted.length === 0 && (
                  <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 border-2 border-dashed border-green-200">
                    <FaUsers className="text-green-400 text-5xl mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Your Network</h3>
                    <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                      Connect with legal professionals, students, and advisors to expand your professional circle
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/users/lawyer"
                        className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
                      >
                        Find Lawyers
                      </Link>
                      <Link
                        to="/users/student"
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                      >
                        Find Students
                      </Link>
                      <Link
                        to="/users/advisor"
                        className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
                      >
                        Find Advisors
                      </Link>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accepted.map(friend => (
                    <div key={friend.id || friend._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {friend.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{friend.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {getRoleIcon(friend.role)}
                              <span className="text-sm text-gray-600 capitalize">{friend.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {friend.role === 'lawyer' && friend.specialization && (
                        <div className="mb-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {friend.specialization}
                          </span>
                        </div>
                      )}

                      {friend.profile?.location && (
                        <div className="flex items-center text-gray-600 mb-4">
                          <FaMapMarkerAlt className="text-gray-400 mr-2" />
                          <span className="text-sm">{friend.profile.location}</span>
                        </div>
                      )}

                      <Link
                        to={`/chat/${friend.id || friend._id}`}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                      >
                        <FaCommentDots className="mr-2" />
                        Start Chat
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyConnections;