// src/Pages/AdvisorDashboard.jsx
import React from 'react'; // Removed useState, useEffect for simplicity now
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaComments, FaUsers, FaHandHoldingHeart, FaBook, FaHeart, FaQuestionCircle } from 'react-icons/fa'; // Added Icon

const AdvisorDashboard = () => {
    const { user, logout } = useAuth();
     // --- Simulate empty state ---
     const hasPendingQueries = false; // Simulate no queries
     // --- End simulation ---

    const features = [
        {
            title: "Answer Queries",
            description: "Help citizens with legal questions",
            icon: <FaComments className="text-2xl" />,
            path: "/queries", // Make sure this path exists in App.jsx routes
            color: "from-orange-500 to-amber-500"
        },
        {
            title: "My Connections",
            description: "Manage advisory relationships",
            icon: <FaUsers className="text-2xl" />,
            path: "/connections",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "User Outreach",
            description: "Connect with those in need",
            icon: <FaHandHoldingHeart className="text-2xl" />,
            path: "/users/client",
            color: "from-red-500 to-rose-500"
        },
        {
            title: "Legal Aid Resources",
            description: "Access and share legal resources",
            icon: <FaBook className="text-2xl" />,
            path: "/legal-aid", // This path should lead to a relevant page
            color: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
            <Navbar />
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHeart className="text-orange-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Advisor Dashboard
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Welcome, <strong>{user?.name}</strong>
                            </p>
                            <p className="text-gray-500 mt-2">Make a difference in your community</p>
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

                     {/* --- MODIFICATION START: Empty State for Queries --- */}
                     {!hasPendingQueries && (
                        <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
                            <FaQuestionCircle className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No Pending Queries</h3>
                            <p className="mt-1 text-sm text-gray-500">There are currently no user queries waiting for your response.</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/legal-aid" // Example link
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Review Legal Aid Resources
                            </Link>
                             <Link
                                to="/community-impact" // Example link
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                See Community Impact
                            </Link>
                            </div>
                        </div>
                     )}
                     {/* --- MODIFICATION END --- */}

                    {/* Community Impact */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white text-center mb-8"> {/* Added mb-8 */}
                        <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
                        <p className="opacity-90 mb-4">Your guidance helps bridge the justice gap</p>
                        <Link
                            to="/community-impact"
                            className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            View Impact Report
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

export default AdvisorDashboard;