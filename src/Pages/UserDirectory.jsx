// src/Pages/UserDirectory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
// Removed Navbar import
// Removed Footer import
import axios from 'axios';
import {
  FaSearch,
  FaSpinner,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaEnvelope,
  FaLink,
  FaCheck,
  FaClock,
  FaUserPlus,
  FaExclamationTriangle
} from 'react-icons/fa';

const UserDirectory = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [realUsers, setRealUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    experience: ''
  });
  const [connectionStatus, setConnectionStatus] = useState({}); // { userId: 'pending' | 'connected' | 'not_connected' }
  const [connectionLoading, setConnectionLoading] = useState({}); // { userId: true/false }

  // API client with auth
  const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Mock data for different user roles (will be shown alongside real users)
  const mockUsersData = {
    lawyer: [
      {
        id: 'dummy_1',
        _id: 'dummy_1',
        name: 'Advocate Rajesh Kumar',
        specialization: 'Criminal Law',
        experience: '12 years',
        location: 'Delhi',
        rating: 4.8,
        cases: 150,
        gender: 'male',
        isDummy: true,
        profile: { bio: 'Experienced criminal lawyer with 12+ years of practice', location: 'Delhi' }
      },
      {
        id: 'dummy_2',
        _id: 'dummy_2',
        name: 'Advocate Priya Sharma',
        specialization: 'Family Law',
        experience: '8 years',
        location: 'Mumbai',
        rating: 4.6,
        cases: 95,
        gender: 'female',
        isDummy: true,
        profile: { bio: 'Family law specialist focused on amicable resolutions', location: 'Mumbai' }
      },
      {
        id: 'dummy_3',
        _id: 'dummy_3',
        name: 'Advocate Amit Patel',
        specialization: 'Corporate Law',
        experience: '15 years',
        location: 'Bangalore',
        rating: 4.9,
        cases: 200,
        gender: 'male',
        isDummy: true,
        profile: { bio: 'Corporate legal advisor for startups and enterprises', location: 'Bangalore' }
      }
    ],
    student: [
      {
        id: 'dummy_4',
        _id: 'dummy_4',
        name: 'Ankit Verma',
        college: 'NLU Delhi',
        year: '3rd Year',
        specialization: 'Corporate Law',
        location: 'Delhi',
        gender: 'male',
        isDummy: true,
        profile: { bio: 'Law student interested in corporate law and internships', location: 'Delhi' }
      },
      {
        id: 'dummy_5',
        _id: 'dummy_5',
        name: 'Neha Gupta',
        college: 'NALSAR Hyderabad',
        year: '2nd Year',
        specialization: 'Human Rights',
        location: 'Hyderabad',
        gender: 'female',
        isDummy: true,
        profile: { bio: 'Passionate about human rights and social justice', location: 'Hyderabad' }
      }
    ],
    client: [
      {
        id: 'dummy_6',
        _id: 'dummy_6',
        name: 'Rohit Mehta',
        requirement: 'Property Dispute',
        location: 'Mumbai',
        gender: 'male',
        isDummy: true,
        profile: { bio: 'Seeking legal assistance for property matters', location: 'Mumbai' }
      }
    ],
    advisor: [
      {
        id: 'dummy_7',
        _id: 'dummy_7',
        name: 'Dr. Sanjay Kapoor',
        expertise: 'Legal Aid & Counseling',
        experience: '20 years',
        location: 'Delhi',
        gender: 'male',
        isDummy: true,
        profile: { bio: 'Legal aid specialist providing free counseling', location: 'Delhi' }
      }
    ]
  };

  // Get role-specific title and icon
  const getRoleConfig = () => {
    switch (role) {
      case 'lawyer':
        return { title: 'Find Lawyers', icon: <FaBriefcase className="text-2xl" />, color: 'blue' };
      case 'student':
        return { title: 'Find Students', icon: <FaGraduationCap className="text-2xl" />, color: 'green' };
      case 'client':
        return { title: 'Find Clients', icon: <FaUser className="text-2xl" />, color: 'purple' };
      case 'advisor':
        return { title: 'Find Advisors', icon: <FaHeart className="text-2xl" />, color: 'orange' };
      default:
        return { title: 'User Directory', icon: <FaUser className="text-2xl" />, color: 'gray' };
    }
  };

  useEffect(() => {
    fetchRealUsers();
    loadDummyUsers();
  }, [role]);

  useEffect(() => {
    combineUsers();
  }, [realUsers, dummyUsers]);

  useEffect(() => {
    filterUsers();
  }, [allUsers, searchTerm, filters]);

  // Fetch real users from backend
  const fetchRealUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(`/users?role=${role}`);
      const users = response.data.map(user => ({
        ...user,
        isDummy: false,
        // Ensure consistent field names
        location: user.profile?.location || '',
        experience: user.experience || '',
        specialization: user.specialization || ''
      }));

      setRealUsers(users);

    } catch (err) {
      console.error('Error fetching real users:', err);
      // Don't set error here - we'll show dummy users as fallback
      setRealUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDummyUsers = () => {
    const users = mockUsersData[role] || [];
    setDummyUsers(users);
  };

  const combineUsers = () => {
    const combined = [...realUsers, ...dummyUsers];
    setAllUsers(combined);
    setFilteredUsers(combined);
  };

  const filterUsers = () => {
    let filtered = allUsers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.specialization && user.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.college && user.college.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.profile?.bio && user.profile.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Additional filters
    if (filters.specialization) {
      filtered = filtered.filter(user => user.specialization === filters.specialization);
    }
    if (filters.location) {
      filtered = filtered.filter(user => user.location === filters.location);
    }
    if (filters.experience) {
      filtered = filtered.filter(user => user.experience === filters.experience);
    }

    setFilteredUsers(filtered);
  };

  // Send connection request to real users
  const handleConnectionRequest = async (targetUserId) => {
    // Don't allow connection requests to dummy users
    const targetUser = allUsers.find(u => u.id === targetUserId);
    if (targetUser?.isDummy) {
      alert('This is a demo profile. Connection requests are only available for real users.');
      return;
    }

    try {
      setConnectionLoading(prev => ({ ...prev, [targetUserId]: true }));

      const response = await apiClient.post('/connections/request', {
        recipientId: targetUserId
      });

      // Update local state
      setConnectionStatus(prev => ({
        ...prev,
        [targetUserId]: 'pending'
      }));

      alert('Connection request sent successfully!');

    } catch (err) {
      console.error('Error sending connection request:', err);
      const errorMessage = err.response?.data?.message || 'Failed to send connection request. Please try again.';
      alert(errorMessage);
    } finally {
      setConnectionLoading(prev => ({ ...prev, [targetUserId]: false }));
    }
  };

  const getConnectionButton = (userItem) => {
    // Don't show connect button for current user
    if (userItem.id === user?.id) {
      return (
        <button
          disabled
          className="flex-1 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed opacity-50"
        >
          Your Profile
        </button>
      );
    }

    // Demo profile button
    if (userItem.isDummy) {
      return (
        <button
          disabled
          className="flex-1 bg-yellow-500 text-white py-2 rounded-lg cursor-not-allowed flex items-center justify-center"
        >
          <FaExclamationTriangle className="h-4 w-4 mr-2" />
          Demo Profile
        </button>
      );
    }

    const status = connectionStatus[userItem.id] || 'not_connected';
    const isLoading = connectionLoading[userItem.id];

    if (isLoading) {
      return (
        <button
          disabled
          className="flex-1 bg-blue-400 text-white py-2 rounded-lg cursor-not-allowed flex items-center justify-center"
        >
          <FaSpinner className="animate-spin h-4 w-4 mr-2" />
          Sending...
        </button>
      );
    }

    switch (status) {
      case 'pending':
        return (
          <button
            disabled
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg cursor-not-allowed flex items-center justify-center"
          >
            <FaClock className="h-4 w-4 mr-2" />
            Request Pending
          </button>
        );
      case 'connected':
        return (
          <button
            disabled
            className="flex-1 bg-green-500 text-white py-2 rounded-lg cursor-not-allowed flex items-center justify-center"
          >
            <FaCheck className="h-4 w-4 mr-2" />
            Connected
          </button>
        );
      default:
        return (
          <button
            onClick={() => handleConnectionRequest(userItem.id)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaUserPlus className="h-4 w-4 mr-2" />
            Connect
          </button>
        );
    }
  };

  const getActionButtons = (userItem) => {
    // For current user's own profile
    if (userItem.id === user?.id) {
      return (
        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          View My Profile
        </button>
      );
    }

    // For connected real users
    if (!userItem.isDummy && connectionStatus[userItem.id] === 'connected') {
      return (
        <div className="flex space-x-3 w-full">
          <button
            onClick={() => navigate(`/chat/${userItem.id}`)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <FaEnvelope className="h-4 w-4 mr-2" />
            Message
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Contact
          </button>
        </div>
      );
    }

    // For non-connected real users and demo users
    return getConnectionButton(userItem);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      specialization: '',
      location: '',
      experience: ''
    });
  };

  const getUniqueSpecializations = () => {
    return [...new Set(allUsers.map(user => user.specialization).filter(Boolean))];
  };

  const getUniqueLocations = () => {
    return [...new Set(allUsers.map(user => user.location).filter(Boolean))];
  };

  const roleConfig = getRoleConfig();

  if (loading) {
    return (
      // Removed outer div and Navbar
      // <div className="min-h-screen bg-gray-50">
      //  <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading {roleConfig.title.toLowerCase()}...</p>
          </div>
        </div>
        // Removed Footer
      // </div>
    );
  }

  return (
    // Removed outer div and Navbar
    // <div className="min-h-screen bg-gray-50">
    //  <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className={`bg-${roleConfig.color}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <div className={`text-${roleConfig.color}-600`}>
                  {roleConfig.icon}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {roleConfig.title}
              </h1>
              <p className="text-gray-600">
                {filteredUsers.length} {role}(s) found
                {realUsers.length > 0 && ` (${realUsers.length} real, ${dummyUsers.length} demo)`}
              </p>
              {realUsers.length === 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    💡 Showing demo profiles. Real users will appear here as they join the platform.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${role}s by name, specialization, or location...`}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Specialization Filter */}
              {getUniqueSpecializations().length > 0 && (
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Specializations</option>
                  {getUniqueSpecializations().map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              )}

              {/* Location Filter */}
              {getUniqueLocations().length > 0 && (
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Locations</option>
                  {getUniqueLocations().map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              )}

              {/* Clear Filters */}
              {(searchTerm || filters.specialization || filters.location || filters.experience) && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchRealUsers}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Users Grid */}
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <FaUser className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No {role}s found</h3>
              <p className="text-gray-600 mb-6">
                {allUsers.length === 0
                  ? `No ${role}s are currently available.`
                  : 'No users match your search criteria.'}
              </p>
              {(searchTerm || filters.specialization || filters.location) && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((userItem) => (
                <div
                  key={userItem.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                    userItem.isDummy ? 'border-2 border-yellow-400' : 'border border-gray-200'
                  }`}
                >
                  {/* Demo Profile Badge */}
                  {userItem.isDummy && (
                    <div className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 text-center">
                      DEMO PROFILE
                    </div>
                  )}

                  {/* Real User Badge */}
                  {!userItem.isDummy && (
                    <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 text-center">
                      REAL USER
                    </div>
                  )}

                  {/* Profile Header */}
                  <div className={`bg-${roleConfig.color}-500 p-6 text-white`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold">
                          {userItem.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{userItem.name}</h3>
                        {userItem.specialization && (
                          <p className="text-blue-100">{userItem.specialization}</p>
                        )}
                        {userItem.role && (
                          <p className="text-blue-100 text-sm capitalize">{userItem.role}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-6">
                    {/* Rating for lawyers */}
                    {userItem.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(userItem.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {userItem.rating} {userItem.cases && `(${userItem.cases} cases)`}
                        </span>
                      </div>
                    )}

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {userItem.experience && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaBriefcase className="h-4 w-4 mr-2" />
                          <span>{userItem.experience} experience</span>
                        </div>
                      )}

                      {userItem.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                          <span>{userItem.location}</span>
                        </div>
                      )}

                      {userItem.college && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaGraduationCap className="h-4 w-4 mr-2" />
                          <span>{userItem.college} - {userItem.year}</span>
                        </div>
                      )}

                      {userItem.profile?.bio && (
                        <div className="text-sm text-gray-600 mt-3">
                          <p className="italic">"{userItem.profile.bio}"</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4">
                      {getActionButtons(userItem)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      // Removed Footer
    // </div>
  );
};

export default UserDirectory;