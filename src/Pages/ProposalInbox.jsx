// src/Pages/ProposalInbox.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Removed Navbar import
// Removed Footer import
import { FaCheck, FaTimes } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const ProposalInbox = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [respondingId, setRespondingId] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
     if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    apiClient.get('/api/proposals/inbox')
      .then(res => {
        setProposals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching proposal inbox:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
            setError('Unauthorized or forbidden. Only lawyers can view this. Please log in with a lawyer account.');
        } else {
             setError('Failed to fetch proposals. Please try again later.');
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

   const handleResponse = (proposalId, status) => {
    setRespondingId(proposalId); // Disable buttons for this request
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Authentication error. Please log in again.');
        setRespondingId(null);
        return;
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    apiClient.put(`/api/proposals/respond/${proposalId}`, { status })
      .then(res => {
        // Update the specific proposal's status locally for immediate feedback
        setProposals(prev => prev.map(p =>
            p._id === proposalId ? { ...p, status: status } : p
        ));
        // Optionally refetch all data: fetchData();
      })
      .catch(err => {
        console.error(`Failed to ${status} proposal:`, err);
        alert(`Failed to ${status} proposal. ${err.response?.data?.message || ''}`);
      })
      .finally(() => {
        setRespondingId(null); // Re-enable buttons
      });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'declined': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    // Removed outer div and Navbar
    // <div className="flex flex-col min-h-screen bg-gray-50">
    //  <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className='text-3xl font-bold mb-8 text-center text-gray-800'>Case Proposal Inbox</h1>

           {loading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading proposals...</p>
            </div>
          )}

          {error && (
             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div className="space-y-6">
            {!loading && !error && proposals.length === 0 && (
                 <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                         <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No proposals received</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't received any new case proposals from clients yet.</p>
                </div>
            )}
            {!loading && !error && proposals.map(proposal => (
              <div key={proposal._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">From: {proposal.client?.name || 'Unknown Client'}</h2>
                    <p className="text-sm text-gray-500">{proposal.client?.email || ''}</p>
                  </div>
                   <span className={`mt-2 sm:mt-0 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${getStatusClass(proposal.status)}`}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded mt-4 border border-gray-200 whitespace-pre-wrap">{proposal.description}</p>
                 <p className="text-xs text-gray-500 mt-4">Received on: {new Date(proposal.createdAt).toLocaleDateString()}</p>

                {/* Response Buttons only if pending */}
                {proposal.status === 'pending' && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => handleResponse(proposal._id, 'accepted')}
                            disabled={respondingId === proposal._id}
                            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50 flex items-center"
                            >
                            <FaCheck className="mr-1"/> Accept
                        </button>
                        <button
                            onClick={() => handleResponse(proposal._id, 'declined')}
                            disabled={respondingId === proposal._id}
                            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 disabled:opacity-50 flex items-center"
                            >
                            <FaTimes className="mr-1"/> Decline
                        </button>
                    </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>
      // Removed Footer
    // </div>
  );
};

export default ProposalInbox;