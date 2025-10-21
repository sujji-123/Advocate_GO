// src/Pages/LawyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios'; // We need axios for API calls

// Create the API client
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const LawyerDashboard = () => {
    const { user, logout } = useAuth();
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch pending proposals when component mounts
    useEffect(() => {
      // Set token for this client
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      
      apiClient.get('/api/proposals/inbox')
        .then(res => {
          setProposals(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch case proposals.');
          setLoading(false);
        });
    }, []);

    // Handler to accept/decline proposals
    const handleProposalResponse = (proposalId, responseStatus) => {
      apiClient.put(`/api/proposals/respond/${proposalId}`, { status: responseStatus })
        .then(res => {
          // Update the UI: find the proposal and change its status
          setProposals(prev => 
            prev.map(p => 
              p._id === proposalId ? { ...p, status: responseStatus } : p
            )
          );
        })
        .catch(err => {
          console.error(err);
          alert(`Failed to ${responseStatus} proposal.`);
        });
    };

    const pendingProposals = proposals.filter(p => p.status === 'pending');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className='text-3xl font-bold mb-2 text-gray-800'>Lawyer Dashboard</h1>
                    <p className="text-gray-600 mb-2">Welcome, <strong>{user?.name}</strong>!</p>
                    <p className="text-sm text-teal-700 font-medium mb-8">Your Specialization: {user?.specialization}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Column 1: Proposals */}
                      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-2xl font-semibold mb-4">Pending Case Proposals ({pendingProposals.length})</h2>
                        {loading && <p>Loading proposals...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {!loading && pendingProposals.length === 0 && (
                            <p className="text-gray-500">You have no new case proposals.</p>
                          )}
                          {pendingProposals.map(proposal => (
                            <div key={proposal._id} className="border p-4 rounded-lg">
                              <h3 className="text-lg font-semibold">{proposal.client.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{proposal.client.email}</p>
                              <p className="text-gray-700 bg-gray-50 p-3 rounded">{proposal.description}</p>
                              <div className="flex gap-4 mt-3">
                                <button 
                                  onClick={() => handleProposalResponse(proposal._id, 'accepted')}
                                  className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={() => handleProposalResponse(proposal._id, 'declined')}
                                  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Quick Links */}
                      <div className="space-y-4">
                        <Link to="/connections" className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-purple-800">My Connections</h2>
                            <p className="text-purple-600 mt-2">Manage requests and chat.</p>
                        </Link>
                        <Link to="/users/student" className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-blue-800">Find Students</h2>
                            <p className="text-blue-600 mt-2">Connect with law students for assistance.</p>
                        </Link>
                        <Link to="/profile/me" className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
                            <p className="text-gray-600 mt-2">Update your specialization and bio.</p>
                        </Link>
                      </div>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 rounded-lg mt-10' onClick={logout}>
                        Logout
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default LawyerDashboard;