// src/Pages/NearbyLawyerFinder.jsx
import React, { useState, useEffect } from 'react';

function NearbyLawyerFinder() {
  const [userLocation, setUserLocation] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState('');

  const specializations = [
    'Family Law',
    'Criminal Law',
    'Corporate Law',
    'Property Law',
    'Intellectual Property',
    'Tax Law',
    'Labor Law',
    'All Specializations'
  ];

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockLawyers = [
      {
        id: 1,
        name: 'Adv. Rajesh Kumar',
        specialization: 'Family Law',
        distance: '1.2 km',
        rating: 4.8,
        experience: '12 years',
        address: '123 Legal Lane, Downtown',
        available: true,
        phone: '+91 9876543210'
      },
      {
        id: 2,
        name: 'Adv. Priya Sharma',
        specialization: 'Criminal Law',
        distance: '2.5 km',
        rating: 4.9,
        experience: '8 years',
        address: '456 Justice Street, City Center',
        available: true,
        phone: '+91 9876543211'
      },
      {
        id: 3,
        name: 'Adv. Amit Patel',
        specialization: 'Property Law',
        distance: '3.1 km',
        rating: 4.7,
        experience: '15 years',
        address: '789 Law Avenue, Business District',
        available: false,
        phone: '+91 9876543212'
      }
    ];
    setLawyers(mockLawyers);
  }, []);

  const getLocation = () => {
    setLoading(true);
    // Simulate location detection
    setTimeout(() => {
      setUserLocation({
        lat: 28.6139,
        lng: 77.2090,
        address: 'New Delhi, India'
      });
      setLoading(false);
    }, 2000);
  };

  const filteredLawyers = specialization && specialization !== 'All Specializations' 
    ? lawyers.filter(lawyer => lawyer.specialization === specialization)
    : lawyers;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5C4033] mb-4">
            Nearby Lawyer Finder
          </h1>
          <p className="text-xl text-gray-600">
            Find qualified lawyers near your location
          </p>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Your Location</h2>
              {userLocation ? (
                <p className="text-gray-600">{userLocation.address}</p>
              ) : (
                <p className="text-gray-500">Location not detected</p>
              )}
            </div>
            <button
              onClick={getLocation}
              disabled={loading}
              className="bg-[#5C4033] text-white px-6 py-3 rounded-lg hover:bg-[#4b3329] transition disabled:opacity-50"
            >
              {loading ? 'Detecting Location...' : 'Use My Location'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Search lawyers..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
              />
            </div>
          </div>
        </div>

        {/* Lawyers List */}
        <div className="space-y-6">
          {filteredLawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                      <p className="text-gray-600">{lawyer.specialization}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded mr-2">
                        {lawyer.distance}
                      </span>
                      {lawyer.available ? (
                        <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                          Busy
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Rating: {lawyer.rating}/5
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                      </svg>
                      Experience: {lawyer.experience}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {lawyer.address}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button className="bg-[#5C4033] text-white px-4 py-2 rounded-lg hover:bg-[#4b3329] transition text-sm">
                    Book Appointment
                  </button>
                  <button className="border border-[#5C4033] text-[#5C4033] px-4 py-2 rounded-lg hover:bg-[#5C4033]/10 transition text-sm">
                    View Profile
                  </button>
                  <a 
                    href={`tel:${lawyer.phone}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm text-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lawyers found matching your criteria.</p>
          </div>
        )}

        {/* Map Section - Placeholder */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#5C4033]">Lawyers Near You</h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Interactive Map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NearbyLawyerFinder;