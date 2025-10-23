// src/Pages/ClientDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
// --- MODIFICATION START ---
// Removed Navbar and Footer imports
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// --- MODIFICATION END ---
import { FaSearch, FaFileAlt, FaUsers, FaChartLine, FaBalanceScale } from 'react-icons/fa';

const ClientDashboard = () => {
    const { user, logout } = useAuth();

    const features = [
        {
            title: "Find Lawyers",
            description: "Search and connect with legal experts",
            icon: <FaSearch className="text-2xl" />,
            path: "/lawyer-locator",
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "My Proposals",
            description: "Track your case proposals",
            icon: <FaFileAlt className="text-2xl" />,
            path: "/proposals/sent",
            color: "from-green-500 to-green-600"
        },
        {
            title: "My Connections",
            description: "Manage your legal network",
            icon: <FaUsers className="text-2xl" />,
            path: "/connections",
            color: "from-purple-500 to-purple-600"
        },
        {
            title: "Case Status",
            description: "Monitor your ongoing cases",
            icon: <FaChartLine className="text-2xl" />,
            path: "/case-status",
            color: "from-orange-500 to-orange-600"
        }
    ];

    return (
        // --- MODIFICATION START ---
        // Removed outer div and Navbar/Footer components
        // The main layout is now handled by App.jsx
        // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        //     <Navbar />
            <main className="py-8">
        {/* --- MODIFICATION END --- */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBalanceScale className="text-blue-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Your legal assistance hub is ready to help
                            </p>
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

                    {/* Quick Help */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
                        <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
                        <p className="opacity-90 mb-4">Get quick legal guidance for urgent matters</p>
                        <Link
                            to="/emergency-assistance"
                            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Emergency Assistance
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
        // --- MODIFICATION START ---
        // Removed Footer component
        //    <Footer />
        // </div>
        // --- MODIFICATION END ---
    );
};

export default ClientDashboard;