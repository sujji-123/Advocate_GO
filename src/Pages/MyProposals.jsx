// src/Pages/MyProposals.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.get('/api/proposals/sent')
      .then(res => {
        setProposals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch proposals.');
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'declined': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className='text-3xl font-bold mb-8 text-gray-800'>My Sent Case Proposals</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="space-y-6">
            {!loading && proposals.length === 0 && <p className="text-gray-600">You have not sent any proposals.</p>}
            {proposals.map(proposal => (
              <div key={proposal._id} className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">To: {proposal.lawyer.name}</h2>
                    <p className="text-sm text-teal-700">{proposal.lawyer.specialization}</p>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusClass(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded mt-4">{proposal.description}</p>
                <p className="text-xs text-gray-500 mt-4">Sent on: {new Date(proposal.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProposals;