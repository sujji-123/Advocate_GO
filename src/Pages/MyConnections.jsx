// src/Pages/MyConnections.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const MyConnections = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = () => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    Promise.all([
      apiClient.get('/api/connections/pending'),
      apiClient.get('/api/connections/accepted')
    ])
    .then(([pendingRes, acceptedRes]) => {
      setPending(pendingRes.data);
      setAccepted(acceptedRes.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to fetch connections.');
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResponse = (requestId, status) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.put(`/api/connections/respond/${requestId}`, { status })
      .then(res => {
        // Refresh all data
        fetchData();
      })
      .catch(err => {
        alert(`Failed to ${status} request.`);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className='text-3xl font-bold mb-8 text-gray-800'>My Connections</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          {/* Pending Requests */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Pending Requests ({pending.length})</h2>
            <div className="space-y-4">
              {!loading && pending.length === 0 && <p className="text-gray-600">No new connection requests.</p>}
              {pending.map(req => (
                <div key={req._id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{req.requester.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{req.requester.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleResponse(req._id, 'accepted')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleResponse(req._id, 'declined')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accepted Connections */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">My Connections ({accepted.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!loading && accepted.length === 0 && <p className="text-gray-600">You have no connections yet.</p>}
              {accepted.map(friend => (
                <div key={friend._id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{friend.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{friend.role}</p>
                  </div>
                  <Link
                    to={`/chat/${friend._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Chat
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyConnections;