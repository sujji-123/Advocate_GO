// src/Pages/lawdir.jsx

import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
import { useAuth } from "../contextprovider/AuthContext";
import axios from 'axios';

// Create the API client
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Proposal Modal Component
const ProposalModal = ({ lawyer, onClose }) => {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    // Set auth token
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    apiClient.post('/api/proposals', {
      lawyerId: lawyer._id,
      description: description,
    })
    .then(res => {
      setMessage(`Proposal successfully sent to ${lawyer.name}.`);
      setIsLoading(false);
      setTimeout(onClose, 2000);
    })
    .catch(err => {
      setError(err.response?.data?.message || "Failed to send proposal.");
      setIsLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 text-gray-800">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Case Proposal to {lawyer.name}</h2>
        <p className="text-sm text-gray-600 mb-2">Specialization: <span className="font-medium text-teal-700">{lawyer.type}</span></p>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <textarea
            rows="8"
            className="w-full p-3 border rounded-lg text-gray-800"
            placeholder="Describe your case here. Include relevant details, dates, and what you need help with..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-teal-400">
              {isLoading ? "Sending..." : "Send Proposal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Location Permission Modal
const LocationPermissionModal = ({ onAllow, onDeny, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Enable Location Access</h2>
        <p className="text-gray-600 mb-6">
          Allow AdvocateGO to access your location to find lawyers and courts near you. 
          This helps us provide the most relevant legal professionals in your area.
        </p>
        <div className="flex justify-end gap-4">
          <button 
            onClick={onDeny} 
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Deny
          </button>
          <button 
            onClick={onAllow} 
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Location Results Component
const LocationResults = ({ userLocation, onBack, detectedCity, detectedState }) => {
  // Comprehensive lawyers data based on location
  const locationBasedLawyers = {
    "delhi": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1a",
        name: "Adv. Rajesh Kumar",
        type: "Criminal Lawyer",
        location: "Delhi High Court Area",
        distance: "2 km away",
        rating: "4.8",
        experience: "12 years",
        cases: "450+",
        languages: ["Hindi", "English"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1d",
        name: "Adv. Sunil Verma",
        type: "Corporate Lawyer",
        location: "Connaught Place",
        distance: "1.5 km away",
        rating: "4.7",
        experience: "10 years",
        cases: "320+",
        languages: ["Hindi", "English", "Punjabi"],
        image: "https://images.unsplash.com/photo-1589820366362-98e53b26b44f?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1e",
        name: "Adv. Neha Singh",
        type: "Family Lawyer",
        location: "Saket Court Complex",
        distance: "3 km away",
        rating: "4.9",
        experience: "8 years",
        cases: "280+",
        languages: ["Hindi", "English"],
        image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a27",
        name: "Adv. Anil Khanna",
        type: "Property Lawyer",
        location: "Dwarka Court",
        distance: "5 km away",
        rating: "4.6",
        experience: "15 years",
        cases: "520+",
        languages: ["Hindi", "English"],
        image: "https://images.unsplash.com/photo-1565896115195-359bbde49b2a?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a28",
        name: "Adv. Priya Malhotra",
        type: "Cyber Lawyer",
        location: "Cyber Hub, Gurugram",
        distance: "8 km away",
        rating: "4.5",
        experience: "6 years",
        cases: "150+",
        languages: ["Hindi", "English"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a29",
        name: "Adv. Rohit Bajaj",
        type: "Tax Lawyer",
        location: "CBD Belapur",
        distance: "12 km away",
        rating: "4.7",
        experience: "11 years",
        cases: "380+",
        languages: ["Hindi", "English", "Marathi"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      }
    ],
    "mumbai": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1b",
        name: "Adv. Priya Sharma",
        type: "Family Lawyer",
        location: "Bombay High Court",
        distance: "5 km away",
        rating: "4.6",
        experience: "8 years",
        cases: "300+",
        languages: ["Hindi", "English", "Marathi"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1f",
        name: "Adv. Rohan Mehta",
        type: "Corporate Lawyer",
        location: "Nariman Point",
        distance: "2 km away",
        rating: "4.8",
        experience: "15 years",
        cases: "600+",
        languages: ["Hindi", "English", "Gujarati"],
        image: "https://images.unsplash.com/photo-1589820366362-98e53b26b44f?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2a",
        name: "Adv. Sameer Desai",
        type: "Criminal Lawyer",
        location: "Sessions Court",
        distance: "3 km away",
        rating: "4.9",
        experience: "20 years",
        cases: "800+",
        languages: ["Hindi", "English", "Marathi"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2b",
        name: "Adv. Anjali Patil",
        type: "Labour Lawyer",
        location: "Andheri Court",
        distance: "6 km away",
        rating: "4.4",
        experience: "7 years",
        cases: "200+",
        languages: ["Hindi", "English", "Marathi"],
        image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?auto=format&fit=crop&w=400&q=80"
      }
    ],
    "bangalore": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a1c",
        name: "Adv. Amit Patel",
        type: "Corporate Lawyer",
        location: "Karnataka High Court",
        distance: "3 km away",
        rating: "4.9",
        experience: "15 years",
        cases: "550+",
        languages: ["English", "Kannada", "Hindi"],
        image: "https://images.unsplash.com/photo-1589820366362-98e53b26b44f?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a20",
        name: "Adv. Kavya Reddy",
        type: "Cyber Lawyer",
        location: "Electronic City",
        distance: "4 km away",
        rating: "4.5",
        experience: "6 years",
        cases: "180+",
        languages: ["English", "Kannada", "Telugu"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2c",
        name: "Adv. Vikram Raj",
        type: "IP Lawyer",
        location: "Koramangala",
        distance: "2 km away",
        rating: "4.7",
        experience: "9 years",
        cases: "320+",
        languages: ["English", "Kannada", "Tamil"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      }
    ],
    "chennai": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2d",
        name: "Adv. Arjun Iyer",
        type: "Maritime Lawyer",
        location: "Madras High Court",
        distance: "2 km away",
        rating: "4.8",
        experience: "12 years",
        cases: "400+",
        languages: ["Tamil", "English"],
        image: "https://images.unsplash.com/photo-1589820366362-98e53b26b44f?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2e",
        name: "Adv. Lakshmi Narayan",
        type: "Property Lawyer",
        location: "T Nagar",
        distance: "4 km away",
        rating: "4.6",
        experience: "10 years",
        cases: "350+",
        languages: ["Tamil", "English", "Hindi"],
        image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?auto=format&fit=crop&w=400&q=80"
      }
    ],
    "hyderabad": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a2f",
        name: "Adv. Sameer Ahmed",
        type: "Cyber Lawyer",
        location: "HITEC City",
        distance: "3 km away",
        rating: "4.7",
        experience: "8 years",
        cases: "280+",
        languages: ["Telugu", "English", "Hindi"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      },
      {
        _id: "60d5ecb4e7b8b43f0c8e6a30",
        name: "Adv. Priya Reddy",
        type: "Family Lawyer",
        location: "City Civil Court",
        distance: "2 km away",
        rating: "4.9",
        experience: "11 years",
        cases: "420+",
        languages: ["Telugu", "English", "Urdu"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      }
    ],
    "kolkata": [
      {
        _id: "60d5ecb4e7b8b43f0c8e6a31",
        name: "Adv. Amitabh Das",
        type: "Constitutional Lawyer",
        location: "Calcutta High Court",
        distance: "1 km away",
        rating: "4.8",
        experience: "18 years",
        cases: "650+",
        languages: ["Bengali", "English", "Hindi"],
        image: "https://images.unsplash.com/photo-1589820366362-98e53b26b44f?auto=format&fit=crop&w=400&q=80"
      }
    ]
  };

  const lawyers = locationBasedLawyers[userLocation] || [];
  const locationImages = {
    delhi: "https://images.unsplash.com/photo-1580651315530-69c8e0026374?auto=format&fit=crop&w=1200&q=80",
    mumbai: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=1200&q=80",
    bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    chennai: "https://images.unsplash.com/photo-1596178065880-58e4f55e28b9?auto=format&fit=crop&w=1200&q=80",
    hyderabad: "https://images.unsplash.com/photo-1595669168800-6e6c40b38d3c?auto=format&fit=crop&w=1200&q=80",
    kolkata: "https://images.unsplash.com/photo-1580651315530-69c8e0026374?auto=format&fit=crop&w=1200&q=80"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#0b1f3a] text-white px-6 py-5 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">⚖ AdvocateGO</h1>
          <button 
            onClick={onBack}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg mt-2 md:mt-0 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Main
          </button>
        </div>
      </header>

      {/* Location Hero Section */}
      <section
        className="relative text-white text-center py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url('${locationImages[userLocation] || locationImages.delhi}')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Legal Professionals in {detectedCity}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            {detectedState ? `Top-rated lawyers and legal experts in ${detectedState}` : 'Find the best legal assistance near you'}
          </p>
          <div className="bg-yellow-500 text-black inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Location: {detectedCity} {detectedState && `, ${detectedState}`}
          </div>
        </div>
      </section>

      {/* Lawyers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">
            Available Lawyers ({lawyers.length})
          </h3>
          <div className="text-sm text-gray-400">
            Sorted by: <span className="text-yellow-400">Distance & Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-400 overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{lawyer.name}</h3>
                <p className="text-sm text-yellow-400 mb-1">{lawyer.type}</p>
                <p className="text-sm text-gray-300 mb-2">{lawyer.location}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>📍 {lawyer.distance}</span>
                  <span>⭐ {lawyer.rating}</span>
                  <span>⚖️ {lawyer.experience}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {lawyer.languages.map((lang, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>

                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-300 text-center">
                    <span className="text-yellow-400 font-semibold">{lawyer.cases}</span> Cases Handled
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    Book Consultation
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lawyers.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xl font-semibold text-white mb-2">No Lawyers Found</h4>
              <p className="text-gray-400">We couldn't find any lawyers in this location. Try searching in a different area.</p>
            </div>
          </div>
        )}
      </section>

      {/* Location Statistics */}
      <section className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Legal Statistics in {detectedCity}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">{lawyers.length}</div>
              <div className="text-sm text-gray-300">Available Lawyers</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">5+</div>
              <div className="text-sm text-gray-300">Court Complexes</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-sm text-gray-300">Legal Specializations</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">4.7</div>
              <div className="text-sm text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LawyerLocator = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showStateCourts, setShowStateCourts] = useState(false);
  const { user } = useAuth();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  
  // NEW STATES FOR ADDED FEATURES
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [detectedCity, setDetectedCity] = useState('');
  const [detectedState, setDetectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Enhanced lawyers data with more entries
  const lawyers = [
    {
      _id: "60d5ecb4e7b8b43f0c8e6a1a",
      name: "Adv. Rajesh Kumar",
      type: "Criminal Lawyer",
      location: "Delhi",
      distance: "2 km away",
      rating: "4.8",
      experience: "12 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a1b",
      name: "Adv. Priya Sharma",
      type: "Family Lawyer",
      location: "Mumbai",
      distance: "5 km away",
      rating: "4.6",
      experience: "8 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a1c",
      name: "Adv. Amit Patel",
      type: "Corporate Lawyer",
      location: "Bangalore",
      distance: "3 km away",
      rating: "4.9",
      experience: "15 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a21",
      name: "Adv. Sanjay Gupta",
      type: "Property Lawyer",
      location: "Delhi",
      distance: "4 km away",
      rating: "4.4",
      experience: "9 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a22",
      name: "Adv. Meera Iyer",
      type: "Tax Lawyer",
      location: "Chennai",
      distance: "6 km away",
      rating: "4.7",
      experience: "11 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a23",
      name: "Adv. Vikram Joshi",
      type: "Cyber Lawyer",
      location: "Hyderabad",
      distance: "3 km away",
      rating: "4.5",
      experience: "7 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a24",
      name: "Adv. Anjali Desai",
      type: "Medical Lawyer",
      location: "Mumbai",
      distance: "2 km away",
      rating: "4.8",
      experience: "13 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a25",
      name: "Adv. Rohit Malhotra",
      type: "Labour Lawyer",
      location: "Delhi",
      distance: "1 km away",
      rating: "4.6",
      experience: "10 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a26",
      name: "Adv. Priyanka Rao",
      type: "International Lawyer",
      location: "Bangalore",
      distance: "5 km away",
      rating: "4.9",
      experience: "16 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a32",
      name: "Adv. Karthik Nair",
      type: "Environmental Lawyer",
      location: "Kochi",
      distance: "4 km away",
      rating: "4.3",
      experience: "5 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a33",
      name: "Adv. Sneha Kapoor",
      type: "Human Rights Lawyer",
      location: "Kolkata",
      distance: "3 km away",
      rating: "4.7",
      experience: "8 years"
    },
    {
      _id: "60d5ecb4e7b8b43f0c8e6a34",
      name: "Adv. Rajat Singh",
      type: "IP Lawyer",
      location: "Pune",
      distance: "2 km away",
      rating: "4.8",
      experience: "12 years"
    }
  ];

  // Enhanced location detection with city-state mapping
  const cityStateMapping = {
    delhi: { city: "New Delhi", state: "Delhi" },
    mumbai: { city: "Mumbai", state: "Maharashtra" },
    bangalore: { city: "Bangalore", state: "Karnataka" },
    chennai: { city: "Chennai", state: "Tamil Nadu" },
    hyderabad: { city: "Hyderabad", state: "Telangana" },
    kolkata: { city: "Kolkata", state: "West Bengal" },
    kochi: { city: "Kochi", state: "Kerala" },
    pune: { city: "Pune", state: "Maharashtra" }
  };

  // Handle location permission
  const handleUseMyLocation = () => {
    setShowLocationModal(true);
  };

  const handleAllowLocation = () => {
    setShowLocationModal(false);
    // Simulate location detection with major cities
    const cities = ['delhi', 'mumbai', 'bangalore', 'chennai', 'hyderabad', 'kolkata'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    setUserLocation(randomCity);
    setDetectedCity(cityStateMapping[randomCity].city);
    setDetectedState(cityStateMapping[randomCity].state);
    setShowLocationResults(true);
  };

  const handleDenyLocation = () => {
    setShowLocationModal(false);
    // Fallback to manual city selection
    const cities = ['delhi', 'mumbai', 'bangalore'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    setUserLocation(randomCity);
    setDetectedCity(cityStateMapping[randomCity].city);
    setDetectedState(cityStateMapping[randomCity].state);
    setShowLocationResults(true);
  };

  const handleBackToMain = () => {
    setShowLocationResults(false);
    setUserLocation('');
    setDetectedCity('');
    setDetectedState('');
  };

  // Filter lawyers based on search and category
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                           lawyer.type.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenProposal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowProposalModal(true);
  };

  // Connect request handler
  const handleConnect = (lawyer) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    apiClient.post('/api/connections/request', { recipientId: lawyer._id })
      .then(res => {
        alert(`Connection request sent to ${lawyer.name}!`);
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Failed to send request.');
      });
  };

  // FIXED: Corrected stateCourts object with proper string termination
  const stateCourts = {
    "Andhra Pradesh": [
      { name: "High Court of Andhra Pradesh", location: "Amaravati", type: "High Court" },
      { name: "District Court - Visakhapatnam", location: "Visakhapatnam", type: "District Court" }
    ],
    "Telangana": [
      { name: "High Court of Telangana", location: "Hyderabad", type: "High Court" },
      { name: "City Civil Court", location: "Hyderabad", type: "District Court" }
    ],
    "Maharashtra": [
      { name: "Bombay High Court", location: "Mumbai", type: "High Court" },
      { name: "District Court - Pune", location: "Pune", type: "District Court" }
    ],
    "Delhi": [
      { name: "Delhi High Court", location: "New Delhi", type: "High Court" },
      { name: "Tis Hazari Courts", location: "Delhi", type: "District Court" }
    ],
    "Karnataka": [
      { name: "High Court of Karnataka", location: "Bengaluru", type: "High Court" },
      { name: "City Civil Court", location: "Bengaluru", type: "District Court" }
    ],
    "Tamil Nadu": [
      { name: "Madras High Court", location: "Chennai", type: "High Court" },
      { name: "District Court - Coimbatore", location: "Coimbatore", type: "District Court" }
    ],
    "West Bengal": [
      { name: "Calcutta High Court", location: "Kolkata", type: "High Court" },
      { name: "District Court - Howrah", location: "Howrah", type: "District Court" }
    ],
    "Gujarat": [
      { name: "Gujarat High Court", location: "Ahmedabad", type: "High Court" },
      { name: "District Court - Surat", location: "Surat", type: "District Court" }
    ],
    "Uttar Pradesh": [
      { name: "Allahabad High Court", location: "Prayagraj", type: "High Court" },
      { name: "District Court - Lucknow", location: "Lucknow", type: "District Court" }
    ],
    "Rajasthan": [
      { name: "Rajasthan High Court", location: "Jodhpur", type: "High Court" },
      { name: "District Court - Jaipur", location: "Jaipur", type: "District Court" }
    ],
    "Kerala": [
      { name: "Kerala High Court", location: "Kochi", type: "High Court" },
      { name: "District Court - Thiruvananthapuram", location: "Thiruvananthapuram", type: "District Court" }
    ]
  };

  // FIXED: Properly aligned state hotspots coordinates
  const stateHotspots = [
    { state: "Jammu & Kashmir", x: "45%", y: "15%" },
    { state: "Punjab", x: "40%", y: "20%" },
    { state: "Himachal Pradesh", x: "48%", y: "18%" },
    { state: "Uttarakhand", x: "52%", y: "22%" },
    { state: "Delhi", x: "48%", y: "28%" },
    { state: "Rajasthan", x: "35%", y: "35%" },
    { state: "Uttar Pradesh", x: "55%", y: "32%" },
    { state: "Gujarat", x: "28%", y: "45%" },
    { state: "Madhya Pradesh", x: "45%", y: "42%" },
    { state: "Maharashtra", x: "38%", y: "55%" },
    { state: "Goa", x: "32%", y: "60%" },
    { state: "Karnataka", x: "40%", y: "65%" },
    { state: "Telangana", x: "48%", y: "55%" },
    { state: "Andhra Pradesh", x: "52%", y: "60%" },
    { state: "Tamil Nadu", x: "45%", y: "75%" },
    { state: "Kerala", x: "38%", y: "72%" },
    { state: "West Bengal", x: "68%", y: "38%" },
    { state: "Odisha", x: "62%", y: "50%" },
    { state: "Bihar", x: "62%", y: "35%" },
    { state: "Jharkhand", x: "60%", y: "42%" },
    { state: "Assam", x: "75%", y: "32%" },
    { state: "Sikkim", x: "72%", y: "28%" }
  ];

  const handleStateClick = (state) => {
    setSelectedState(state);
    setShowStateCourts(true);
  };

  const resetStateSelection = () => {
    setSelectedState(null);
    setShowStateCourts(false);
  };

  // Render location results page if active
  if (showLocationResults) {
    return <LocationResults userLocation={userLocation} onBack={handleBackToMain} detectedCity={detectedCity} detectedState={detectedState} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
      {/* Render the modals */}
      {showProposalModal && selectedLawyer && (
        <ProposalModal
          lawyer={selectedLawyer}
          onClose={() => setShowProposalModal(false)}
        />
      )}

      {showLocationModal && (
        <LocationPermissionModal
          onAllow={handleAllowLocation}
          onDeny={handleDenyLocation}
          onClose={() => setShowLocationModal(false)}
        />
      )}

      {/* Header */}
      <header className="bg-[#0b1f3a] text-white px-6 py-5 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">⚖ AdvocateGO</h1>
          <p className="text-sm mt-2 md:mt-0">Your trusted legal locator</p>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative text-white text-center py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1470&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Find Trusted Lawyers & Courts Near You
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Use your location to discover top-rated legal professionals in seconds.
          </p>
          <button 
            onClick={handleUseMyLocation}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-xl text-lg shadow-md flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Use My Location
          </button>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search lawyers or courts..."
          className="px-4 py-3 rounded-xl border border-gray-700 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="px-4 py-3 border border-gray-700 rounded-xl w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Criminal Lawyer</option>
          <option>Civil Lawyer</option>
          <option>Family Court</option>
          <option value="corporate">Corporate/Business Lawyer</option>
          <option value="constitutional">Constitutional Lawyer</option>
          <option value="environmental">Environmental Lawyer</option>
          <option value="labour">Labour and Employment Lawyer</option>
          <option value="property">Property/Real Estate Lawyer</option>
          <option value="tax">Tax Lawyer</option>
          <option value="medical">Medical/Healthcare Lawyer</option>
          <option value="cyber">Cyber Lawyer</option>
          <option value="education">Education Lawyer</option>
          <option value="humanRights">Human Rights Lawyer</option>
          <option value="administrative">Administrative Lawyer</option>
          <option value="international">International Lawyer</option>
          <option value="ip">Intellectual Property (IP) Lawyer</option>
        </select>
      </section>

      {/* Search Results Info */}
      {(searchQuery || selectedCategory !== 'All Categories') && (
        <section className="max-w-6xl mx-auto px-6 pb-4">
          <p className="text-yellow-400 text-sm">
            Showing {filteredLawyers.length} results 
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
          </p>
        </section>
      )}

      {/* Horizontal Scrollable Lawyers */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <h2 className="text-2xl font-bold mb-6">
          {searchQuery || selectedCategory !== 'All Categories' ? 'Search Results' : 'Featured Legal Professionals'}
        </h2>
        <h3>
          {searchQuery || selectedCategory !== 'All Categories' 
            ? "Your search results are displayed below." 
            : "Explore our most recommended legal experts near you."}
        </h3>
        <br></br>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6" style={{ minWidth: `${Math.max(filteredLawyers.length, 3) * 320}px` }}>
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer._id}
                  className="flex-shrink-0 w-80 bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-400"
                >
                  <h3 className="text-xl font-bold text-white">{lawyer.name}</h3>
                  <p className="text-sm text-yellow-400 mt-1">{lawyer.type}</p>
                  <p className="text-sm text-gray-300 mt-1">{lawyer.location}</p>
                  <p className="text-xs text-gray-400 mt-1">📍 {lawyer.distance}</p>

                  {/* Conditional Buttons */}
                  <div className="flex flex-col gap-3 mt-5">
                    {user && user.role === 'client' && (
                      <button
                        onClick={() => handleOpenProposal(lawyer)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium w-full"
                      >
                        Send Case Proposal
                      </button>
                    )}
                    {user && user.role !== 'lawyer' && (
                      <button
                        onClick={() => handleConnect(lawyer)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium w-full"
                      >
                        Send Connect Request
                      </button>
                    )}
                    {user && user.role === 'lawyer' && (
                      <p className="text-xs text-gray-400 text-center">You are viewing as a lawyer.</p>
                    )}
                    {!user && (
                      <p className="text-xs text-gray-400 text-center">
                        <Link to="/login" className="underline">Log in</Link> to connect or send a proposal.
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-80 bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
                <p className="text-gray-400">No lawyers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive India Map Section */}
      <section className="py-12 bg-gray-800 border-t border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">State-wise Courts in India</h2>
          <h3>"Locate courts across India with state-wise filtering and smart navigation tools."</h3>
          <br></br>

          {!showStateCourts ? (
            <div className="relative bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/India-map-en.svg/1200px-India-map-en.svg.png"
                  alt="India Map"
                  className="w-full h-auto max-h-[600px] object-contain mx-auto"
                />

                {/* Visual markers for each state - PROPERLY ALIGNED */}
                <div className="absolute inset-0">
                  {stateHotspots.map((hotspot, index) => (
                    <div
                      key={index}
                      className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-150 transition-transform border-2 border-white shadow-lg"
                      style={{ left: hotspot.x, top: hotspot.y }}
                      onClick={() => handleStateClick(hotspot.state)}
                      title={hotspot.state}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-300">Click on any state marker to view its major courts</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-yellow-400">
                  Major Courts in {selectedState}
                </h3>
                <button
                  onClick={resetStateSelection}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Map
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stateCourts[selectedState]?.map((court, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500 hover:bg-gray-700 transition">
                    <h4 className="text-lg font-semibold text-white">{court.name}</h4>
                    <div className="flex items-center mt-2">
                      <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">{court.type}</span>
                    </div>
                    <div className="flex items-center mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-300 text-sm">{court.location}</span>
                    </div>
                  </div>
                ))}
                {!stateCourts[selectedState] && <p className="text-gray-400">No court data available for this state.</p>}
              </div>
            </div>
          )}
        </div>
      </section>








      {/* India Legal Hotspots */}
      <section className="py-12 bg-gray-800 border-t border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Legal Hotspots in India</h2>
          <div className="relative h-64 md:h-96 bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="India map showing legal hotspots"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-black bg-opacity-60 rounded-xl">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">Major Legal Hubs</h3>
                <p className="text-lg">Delhi • Mumbai • Hyderabad • Bangalore • Kolkata</p>
              </div>
            </div>
            {/* Location markers */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2/5 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-3/5 left-3/4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      

{/* Global Legal Network */}
<section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-b border-gray-700">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">Global Legal Network</h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Connecting you with trusted legal professionals across 50+ countries worldwide
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* World Map Visualization */}
      <div className="relative">
        <div className="relative h-96 bg-gray-800 rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            alt="World map showing global legal network coverage"
            className="w-full h-full object-cover opacity-40"
          />
          
          {/* Animated Location Markers */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-1/3 left-3/4 w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-2/3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-3/4 left-1/3 w-4 h-4 bg-red-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
          </div>

          {/* Network Connections */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-green-400 opacity-50 transform rotate-12"></div>
          <div className="absolute top-1/3 left-3/4 w-1/3 h-0.5 bg-blue-400 opacity-50 transform -rotate-6"></div>
          <div className="absolute top-2/3 left-1/2 w-1/4 h-0.5 bg-yellow-400 opacity-50 transform rotate-45"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 bg-gray-900 bg-opacity-90 rounded-2xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">International Coverage</h3>
              <p className="text-lg text-gray-300 mb-4">50+ Countries | 1000+ Legal Experts</p>
              <div className="flex justify-center space-x-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Common Law</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Civil Law</span>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Sharia Law</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-gray-300 font-medium">Countries</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
            <div className="text-gray-300 font-medium">Legal Experts</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-gray-300 font-medium">Legal Support</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2">150+</div>
            <div className="text-gray-300 font-medium">Legal Specializations</div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="text-xl font-semibold text-white mb-4">Global Legal Services</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-gray-300">International Business Law & Corporate Compliance</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-gray-300">Cross-Border Dispute Resolution & Arbitration</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-gray-300">Immigration & Visa Legal Assistance</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-300">International Intellectual Property Protection</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
              <span className="text-gray-300">Maritime & International Trade Law</span>
            </div>
          </div>
        </div>

        {/* Regional Coverage */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="text-xl font-semibold text-white mb-4">Regional Expertise</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="text-yellow-400 font-semibold mb-2">Americas</h5>
              <p className="text-gray-300">USA, Canada, Brazil, Mexico</p>
            </div>
            <div>
              <h5 className="text-yellow-400 font-semibold mb-2">Europe</h5>
              <p className="text-gray-300">UK, Germany, France, Spain</p>
            </div>
            <div>
              <h5 className="text-yellow-400 font-semibold mb-2">Asia-Pacific</h5>
              <p className="text-gray-300">Singapore, Australia, Japan, China</p>
            </div>
            <div>
              <h5 className="text-yellow-400 font-semibold mb-2">Middle East</h5>
              <p className="text-gray-300">UAE, Saudi Arabia, Qatar</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Global Features */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
        <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-white mb-3">Multi-Jurisdictional Support</h4>
        <p className="text-gray-300">
          Expert legal guidance across different legal systems including Common Law, Civil Law, and Sharia Law jurisdictions.
        </p>
      </div>

      <div className="text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-white mb-3">Verified Professionals</h4>
        <p className="text-gray-300">
          All international lawyers are thoroughly vetted, licensed, and experienced in cross-border legal matters.
        </p>
      </div>

      <div className="text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-white mb-3">Rapid Response</h4>
        <p className="text-gray-300">
          Connect with legal experts within hours, regardless of time zones, for urgent international legal matters.
        </p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="text-center mt-12">
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 inline-block">
        <h3 className="text-2xl font-bold text-white mb-4">Need International Legal Assistance?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you're expanding your business overseas, dealing with cross-border disputes, or need immigration assistance, 
          our global network of verified legal professionals is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-colors">
            Find International Lawyer
          </button>
          <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-colors">
            View Country Guides
          </button>
        </div>
      </div>
    </div>
  </div>
</section>





<h2 className="text-center py-6"><b>Law</b> plays a vital role in maintaining justice, equality, and peace across the world. Our Lawyer and Court Locator connects people to trusted legal help, making justice more accessible, one location at a time.</h2>





      {/* Footer */}
      <footer className="bg-[#0b1f3a] text-gray-300 text-center py-6 text-sm border-t border-gray-700">
        <p>© 2025 AdvocateGO.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-yellow-400">Privacy</a>
          <a href="#" className="hover:text-yellow-400">Terms</a>
          <a href="#" className="hover:text-yellow-400">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LawyerLocator;