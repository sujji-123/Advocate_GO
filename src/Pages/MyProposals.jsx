// src/Pages/MyProposals.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaSpinner, FaExclamationTriangle, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
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
        const response = await apiClient.get('/api/proposals/sent');
        
        console.log("Sent proposals:", response.data);
        setProposals(response.data);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to fetch proposals. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-yellow-800 bg-yellow-100 border-yellow-200',
          icon: <FaClock className="text-yellow-600" />,
          text: 'Pending Review'
        };
      case 'accepted':
        return {
          color: 'text-green-800 bg-green-100 border-green-200',
          icon: <FaCheck className="text-green-600" />,
          text: 'Accepted'
        };
      case 'declined':
        return {
          color: 'text-red-800 bg-red-100 border-red-200',
          icon: <FaTimes className="text-red-600" />,
          text: 'Declined'
        };
      default:
        return {
          color: 'text-gray-800 bg-gray-100 border-gray-200',
          icon: <FaPaperPlane className="text-gray-600" />,
          text: 'Sent'
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Case Proposals</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your sent case proposals and their status with legal professionals
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading your proposals...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
              <FaExclamationTriangle className="text-red-500 text-2xl mx-auto mb-2" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && proposals.length === 0 && (
            <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPaperPlane className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Proposals Sent Yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                You haven't sent any case proposals to lawyers. Start by finding legal professionals who match your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/users/lawyer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Find Lawyers
                </Link>
                <Link
                  to="/dashboard"
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {proposals.map(proposal => {
              const statusConfig = getStatusConfig(proposal.status);
              
              return (
                <div key={proposal.id || proposal._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {proposal.lawyer?.name?.charAt(0).toUpperCase() || 'L'}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">
                              To: {proposal.lawyer?.name || 'Lawyer'}
                            </h2>
                            {proposal.lawyer?.specialization && (
                              <p className="text-blue-600 font-medium">
                                {proposal.lawyer.specialization}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${statusConfig.color}`}>
                          {statusConfig.icon}
                          <span className="font-medium text-sm">{statusConfig.text}</span>
                        </div>
                      </div>
                    </div>

                    {/* Proposal Description */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Case Description</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {proposal.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                        Sent on {formatDate(proposal.createdAt)}
                      </div>
                      {proposal.status === 'accepted' && (
                        <Link
                          to={`/chat/${proposal.lawyer?.id || proposal.lawyer?._id}`}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
                        >
                          <FaPaperPlane className="mr-2" />
                          Start Chat
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {proposals.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/users/lawyer"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg inline-flex items-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Another Proposal
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProposals;