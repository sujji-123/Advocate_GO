// DummySignup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaBalanceScale, FaBook, FaUserTie, FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const lawyerSpecializations = [
  'Criminal Lawyer', 'Civil Lawyer', 'Family Court', 'Corporate/Business Lawyer',
  'Constitutional Lawyer', 'Environmental Lawyer', 'Labour and Employment Lawyer',
  'Property/Real Estate Lawyer', 'Tax Lawyer', 'Medical/Healthcare Lawyer',
  'Cyber Lawyer', 'Education Lawyer', 'Human Rights Lawyer', 'Administrative Lawyer',
  'International Lawyer', 'Intellectual Property (IP) Lawyer', 'Other'
];

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

// Role Selector Component
const RoleSelector = ({ role, setRole }) => {
  const roles = [
    { value: 'client', label: 'Citizen / Client', icon: <FaUser /> },
    { value: 'lawyer', label: 'Lawyer / Advocate', icon: <FaBalanceScale /> },
    { value: 'student', label: 'Law Student', icon: <FaBook /> },
    { value: 'advisor', label: 'Advisor / NGO', icon: <FaUserTie /> },
  ];
  return (
    <div className="mb-5">
      <label className="block text-gray-700 text-sm font-semibold mb-2">Select Your Role:*</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((r) => (
          <label
            key={r.value}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-150 ease-in-out ${
              role === r.value
                ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-300'
                : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <input
              type="radio" name="role" value={r.value} checked={role === r.value}
              onChange={(e) => setRole(e.target.value)} className="hidden"
              aria-labelledby={`role-label-${r.value}`}
            />
            <div className={`text-lg ${role === r.value ? 'text-teal-700' : 'text-gray-500'}`}>{r.icon}</div>
            <span id={`role-label-${r.value}`} className={`text-sm font-medium ${role === r.value ? 'text-teal-800' : 'text-gray-700'}`}>{r.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const DummySignup = () => {
  const [role, setRole] = useState('client');
  const [specialization, setSpecialization] = useState(lawyerSpecializations[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (role === 'lawyer' && !specialization) {
      setError('Please select a specialization for the lawyer role.');
      return;
    }

    setIsLoading(true);

    // Prepare payload
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      location: location.trim(),
    };
    
    if (role === 'lawyer') {
      payload.specialization = specialization;
    }

    try {
      console.log("Creating demo account:", payload);
      
      const response = await apiClient.post('/dummy-auth/create-dummy-account', payload);

      console.log("Demo account created:", response.data);
      setSuccess('Demo account created successfully! Redirecting to login...');

      // Clear form
      setName(''); 
      setEmail(''); 
      setPassword(''); 
      setConfirmPassword(''); 
      setLocation('');

      // Redirect to login after delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Demo Account Creation Error:", err.response || err);
      
      if (err.response) {
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Network error: Could not connect to server.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-4'>
      <div className='border border-gray-300 shadow-xl p-6 md:p-8 w-full max-w-lg bg-white rounded-lg'>
        {/* Back Link */}
        <Link to="/" className='text-teal-600 hover:text-teal-800 text-sm mb-4 inline-block transition duration-150 ease-in-out'>
           &larr; Back to Home
        </Link>

        {/* Title and Description */}
        <h1 className='text-2xl md:text-3xl font-bold mb-3 text-center text-gray-800'>Create Demo Account</h1>
        <p className="text-center text-gray-500 text-xs md:text-sm mb-6 px-4">
            (No Email Verification Required - For Testing/Demo Purposes)
        </p>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md mb-4 text-sm flex items-start" role="alert">
            <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0"/>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md mb-4 text-sm flex items-center justify-center" role="alert">
            <FaCheckCircle className="mr-2"/>
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
                <RoleSelector role={role} setRole={setRole} />

                {/* Conditional Specialization */}
                {role === 'lawyer' && (
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-1">Specialization:*</label>
                    <select
                      id="specialization" value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white"
                    >
                      {lawyerSpecializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Name */}
                <div>
                    <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-1'>Full Name:*</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" required className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'/>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-1'>Email Address:*</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@example.com" required className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'/>
                </div>

                {/* Location */}
                 <div>
                    <label htmlFor="location" className='block text-sm font-semibold text-gray-700 mb-1'>Location (City, State):</label>
                    <div className="relative">
                         <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"><FaMapMarkerAlt/></span>
                         <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Hyderabad, Telangana" className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'/>
                    </div>
                </div>

                {/* Password */}
                <div className='relative'>
                    <label htmlFor="password" className='block text-sm font-semibold text-gray-700 mb-1'>Set Password:*</label>
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" required minLength="6" className='w-full px-3 py-2 border border-gray-300 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Show password">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className='relative'>
                    <label htmlFor="confirmPassword" className='block text-sm font-semibold text-gray-700 mb-1'>Confirm Password:*</label>
                    <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required minLength="6" className='w-full px-3 py-2 border border-gray-300 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'/>
                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Show confirm password">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Submit Button */}
                <button type='submit' disabled={isLoading} className='w-full mt-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2.5 rounded-md shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out font-semibold flex items-center justify-center text-base'>
                    {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                    {isLoading ? 'Creating Demo Account...' : 'Create Demo Account'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Note: This creates a demo account for testing purposes. No email verification required.
                </p>
            </form>
        )}
      </div>
    </div>
  );
};

export default DummySignup;