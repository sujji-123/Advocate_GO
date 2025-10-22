// src/Pages/StudentDashboard.jsx
import React from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaUserTie, FaGraduationCap, FaUsers, FaBook, FaUniversity, FaLink } from 'react-icons/fa'; // Added FaLink

const StudentDashboard = () => {
    const { user, logout } = useAuth();
     // --- Simulate empty state (e.g., no connections yet) ---
     // In a real app, you might fetch connection count or check local state
     const hasConnections = false; // Simulate no connections
     // --- End simulation ---

    const features = [
        {
            title: "Find Mentors",
            description: "Connect with experienced lawyers",
            icon: <FaUserTie className="text-2xl" />,
            path: "/users/lawyer",
            color: "from-green-500 to-emerald-500"
        },
        {
            title: "Student Network",
            description: "Connect with other students",
            icon: <FaUsers className="text-2xl" />,
            path: "/users/student",
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "My Connections",
            description: "Manage your network",
            icon: <FaGraduationCap className="text-2xl" />, // Changed Icon
            path: "/connections",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Law Colleges",
            description: "Explore educational opportunities",
            icon: <FaUniversity className="text-2xl" />,
            path: "/top-law-colleges",
            color: "from-orange-500 to-red-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
            <Navbar />
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBook className="text-green-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Student Dashboard
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Welcome, <strong>{user?.name}</strong>
                            </p>
                            <p className="text-gray-500 mt-2">Build your legal career with us</p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <Link
                                key={index}
                                to={feature.path}
                                className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className={`p-1 rounded-2xl bg-gradient-to-r ${feature.color}`}>
                                    <div className="bg-white rounded-xl p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600 mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                     {/* --- MODIFICATION START: Empty State for Connections --- */}
                     {!hasConnections && (
                        <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
                            <FaLink className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Build Your Network</h3>
                            <p className="mt-1 text-sm text-gray-500">You haven't connected with anyone yet. Start building your professional network!</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/users/lawyer"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                Find Lawyer Mentors
                            </Link>
                             <Link
                                to="/users/student"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Connect with Peers
                            </Link>
                            </div>
                        </div>
                     )}
                     {/* --- MODIFICATION END --- */}

                    {/* Career Development */}
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white text-center mb-8"> {/* Added mb-8 */}
                        <h3 className="text-xl font-semibold mb-2">Start Your Legal Journey</h3>
                        <p className="opacity-90 mb-4">Access internships, resources, and career guidance</p>
                        <Link
                            to="/career-opportunities"
                            className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Explore Opportunities
                        </Link>
                    </div>

                    <button
                        className="w-full mt-8 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StudentDashboard;