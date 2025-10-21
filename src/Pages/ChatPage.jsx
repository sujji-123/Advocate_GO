// src/Pages/ChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../contextprovider/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const ChatPage = () => {
  const { otherUserId } = useParams();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null); // To auto-scroll

  // Function to fetch messages
  const fetchMessages = () => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    Promise.all([
      apiClient.get(`/api/chat/${otherUserId}`),
      apiClient.get(`/api/users/profile/${otherUserId}`)
    ])
    .then(([messagesRes, userRes]) => {
      setMessages(messagesRes.data);
      setOtherUser(userRes.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMessages();
    // Poll for new messages every 5 seconds (this is NOT efficient, WebSocket is better)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [otherUserId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.post('/api/chat/send', {
      recipientId: otherUserId,
      content: content,
    })
    .then(res => {
      setMessages([...messages, res.data.sentMessage]);
      setContent('');
    })
    .catch(err => {
      alert('Failed to send message.');
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!otherUser) return <div>User not found.</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col bg-gray-100">
        {/* Chat Header */}
        <div className="bg-white p-4 shadow-md border-b">
          <Link to="/connections" className="text-teal-600 mb-2 block">&larr; Back to Connections</Link>
          <h1 className="text-2xl font-bold text-gray-800">Chat with {otherUser.name}</h1>
          <p className="text-sm text-gray-600 capitalize">{otherUser.role}</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                  msg.sender === currentUser.id 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t shadow-inner">
          <div className="flex gap-4">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="submit" className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700">
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </main>
      {/* We skip Footer here to make a full-screen chat */}
    </div>
  );
};

export default ChatPage;