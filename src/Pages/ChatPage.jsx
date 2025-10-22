// src/Pages/ChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from '../Components/Navbar';
import { useAuth } from '../contextprovider/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  timeout: 10000,
});

const SOCKET_URL = 'http://localhost:8000';
let socket = null;

const ChatPage = () => {
  const { otherUserId } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Get the correct user ID - MongoDB uses _id, not id
  const currentUserId = currentUser?._id || currentUser?.id;
  
  console.log('=== CHATPAGE DEBUG ===');
  console.log('currentUser object:', currentUser);
  console.log('currentUser._id:', currentUser?._id);
  console.log('currentUser.id:', currentUser?.id);
  console.log('currentUserId (resolved):', currentUserId);
  console.log('otherUserId:', otherUserId);
  console.log('=====================');

  // Simple fetch function
  const fetchMessages = async () => {
    console.log('🔄 fetchMessages called');
    
    if (!currentUserId) {
      console.log('❌ No current user ID found');
      setError('User not loaded properly');
      setLoading(false);
      return;
    }

    if (!otherUserId) {
      console.log('❌ No otherUserId');
      setError('Invalid chat URL');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    console.log('🔑 Token exists:', !!token);
    
    if (!token) {
      setError('Please log in again');
      setLoading(false);
      navigate('/login');
      return;
    }

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      console.log('📡 Making API calls...');
      
      const [messagesRes, userRes] = await Promise.all([
        apiClient.get(`/api/chat/${otherUserId}`),
        apiClient.get(`/api/users/profile/${otherUserId}`)
      ]);
      
      console.log('✅ API Responses received');
      console.log('Messages count:', messagesRes.data?.length);
      console.log('User data:', userRes.data);

      setMessages(messagesRes.data || []);
      setOtherUser(userRes.data);
      setError('');
      setLoading(false);
      
    } catch (err) {
      console.error('💥 FETCH ERROR:', err);
      
      let errorMessage = 'Failed to load chat';
      
      if (err.response?.status === 401) {
        errorMessage = 'Please log in again';
        localStorage.removeItem('token');
        navigate('/login');
      } else if (err.response?.status === 404) {
        errorMessage = 'User not found';
      } else if (!err.response) {
        errorMessage = 'Cannot connect to server';
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  // Initialize socket
  useEffect(() => {
    if (currentUserId && otherUserId && !loading && !error) {
      console.log('🔌 Initializing socket with user:', currentUserId);
      
      if (socket) {
        socket.disconnect();
      }

      socket = io(SOCKET_URL, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('✅ Socket connected');
        setIsConnected(true);
        // Register with the correct user ID
        socket.emit('registerUser', currentUserId);
        socket.emit('joinChat', otherUserId, currentUserId);
      });

      socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setIsConnected(false);
      });

      socket.on('receiveMessage', (newMessage) => {
        console.log('📨 New message received');
        setMessages(prev => {
          const exists = prev.some(msg => msg._id === newMessage._id);
          if (exists) return prev;
          
          // Replace optimistic message
          const filtered = prev.filter(msg => 
            !(msg.isOptimistic && msg.tempId === newMessage.tempClientOriginId)
          );
          return [...filtered, newMessage];
        });
      });

      socket.on('messageError', (errorData) => {
        console.error('❌ Message error:', errorData);
        setMessages(prev => prev.filter(msg => !msg.isOptimistic));
        setError(`Failed to send: ${errorData.message}`);
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [currentUserId, otherUserId, loading, error]);

  // Fetch messages
  useEffect(() => {
    console.log('🏁 useEffect triggered');
    fetchMessages();
  }, [currentUserId, otherUserId]);

  // Auto-scroll
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!content.trim() || !socket || !isConnected || !currentUserId) return;

    const tempId = `temp-${Date.now()}`;
    const messageData = {
      senderId: currentUserId, // Use the correct user ID
      recipientId: otherUserId,
      content: content.trim(),
      tempClientOriginId: tempId
    };

    console.log('📤 Sending message:', messageData);
    socket.emit('sendMessage', messageData);

    // Optimistic update
    setMessages(prev => [...prev, {
      _id: tempId,
      sender: currentUserId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isOptimistic: true,
      tempId: tempId
    }]);
    
    setContent('');
  };

  const handleRetry = () => {
    setLoading(true);
    setError('');
    setTimeout(() => fetchMessages(), 100);
  };

  // Show loading with debug info
  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Chat...</h3>
          <div className="text-sm text-gray-600 text-center space-y-1">
            <p>Current User ID: {currentUserId ? '✅ Loaded' : '❌ Missing'}</p>
            <p>Other User ID: {otherUserId ? '✅ Provided' : '❌ Missing'}</p>
            <p>User Object: {currentUser ? '✅ Present' : '❌ Missing'}</p>
            <p>Check browser console for user object details</p>
          </div>
          {error && (
            <button 
              onClick={handleRetry}
              className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
            >
              Retry Loading
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <h3 className="font-bold text-lg mb-2">Error Loading Chat</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 mr-2"
            >
              Try Again
            </button>
            <Link 
              to="/connections" 
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Connections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show user not found
  if (!otherUser) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-xl text-gray-600 mb-4">User not found</p>
          <Link to="/connections" className="text-teal-600 hover:text-teal-700">
            Back to Connections
          </Link>
        </div>
      </div>
    );
  }

  // Main chat interface
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
        <div className="bg-white p-4 shadow-md border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/connections" className="text-teal-600 hover:text-teal-700">
                &larr; Back to Connections
              </Link>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Chat with {otherUser.name}</h1>
                  <p className="text-sm text-gray-600 capitalize">{otherUser.role}</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {isConnected ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isCurrentUserSender = msg.sender === currentUserId || 
                                        (msg.sender && msg.sender._id === currentUserId);

              return (
                <div 
                  key={msg._id} 
                  className={`flex ${isCurrentUserSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-xs lg:max-w-md break-words ${
                      isCurrentUserSender 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white text-gray-800 shadow-sm border'
                    } ${msg.isOptimistic ? 'opacity-70 animate-pulse' : ''}`}
                  >
                    <p>{msg.content}</p>
                    <div className={`text-xs mt-1 ${isCurrentUserSender ? 'text-teal-100' : 'text-gray-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.isOptimistic && ' • Sending...'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t shadow-inner">
          <div className="flex gap-2 md:gap-4">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isConnected ? "Type your message..." : "Connecting..."}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
              autoComplete="off"
              disabled={!isConnected}
            />
            <button 
              type="submit" 
              disabled={!content.trim() || !isConnected}
              className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors aspect-square flex items-center justify-center"
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;