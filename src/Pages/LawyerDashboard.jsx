// src/Pages/LawyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextprovider/AuthContext';
// --- MODIFICATION START ---
// Removed Navbar and Footer imports
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// --- MODIFICATION END ---
import { Link } from 'react-router-dom';
import { FaFileAlt, FaUsers, FaGraduationCap, FaUserTie, FaBriefcase, FaSpinner, FaInbox } from 'react-icons/fa';

const LawyerDashboard = () => {
    const { user, logout } = useAuth();
    const [pendingProposalsCount, setPendingProposalsCount] = useState(0);
    const [isLoadingProposals, setIsLoadingProposals] = useState(true);

    useEffect(() => {
        setIsLoadingProposals(true);
        setTimeout(() => {
            setPendingProposalsCount(0);
            setIsLoadingProposals(false);
        }, 1500);
    }, []);


    const features = [
        {
            title: "Case Proposals",
            description: "Review client case requests",
            icon: <FaFileAlt className="text-2xl" />,
            path: "/proposals/inbox",
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "My Connections",
            description: "Manage client relationships",
            icon: <FaUsers className="text-2xl" />,
            path: "/connections",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Find Students",
            description: "Connect with law students",
            icon: <FaGraduationCap className="text-2xl" />,
            path: "/users/student",
            color: "from-green-500 to-teal-500"
        },
        {
            title: "My Profile",
            description: "Update professional details",
            icon: <FaUserTie className="text-2xl" />,
            path: "/profile",
            color: "from-orange-500 to-red-500"
        }
    ];

    return (
        // --- MODIFICATION START ---
        // Removed outer div and Navbar/Footer components
        // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        //     <Navbar />
            <main className="py-8">
        {/* --- MODIFICATION END --- */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBriefcase className="text-teal-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Advocate Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Welcome, <strong>{user?.name}</strong>
                            </p>
                            {user?.specialization && (
                                <div className="mt-3">
                                    <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
                                        {user.specialization}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <Link
                                key={index}
                                to={feature.path}
                                className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
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
                                                    {feature.title === "Case Proposals" && !isLoadingProposals && pendingProposalsCount > 0 && (
                                                         <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            {pendingProposalsCount} New
                                                         </span>
                                                    )}
                                                     {feature.title === "Case Proposals" && isLoadingProposals && (
                                                        <FaSpinner className="animate-spin inline-block ml-2 text-gray-400" />
                                                     )}
                                                </h3>
                                                <p className="text-gray-600 mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State for Proposals */}
                     {!isLoadingProposals && pendingProposalsCount === 0 && (
                        <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
                            <FaInbox className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Proposal Inbox Empty</h3>
                            <p className="mt-1 text-sm text-gray-500">You currently have no pending case proposals from clients.</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/profile"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Update Your Profile to Attract Clients
                            </Link>
                            <Link
                                to="/users/student"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Find Students for Assistance
                            </Link>
                            </div>
                        </div>
                     )}

                    {/* Professional Growth */}
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white text-center mb-8">
                        <h3 className="text-xl font-semibold mb-2">Continue Your Legal Education</h3>
                        <p className="opacity-90 mb-4">Access latest legal updates and resources</p>
                        <Link
                            to="/legal-resources"
                            className="inline-block bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Explore Resources
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
        //     <Footer />
        // </div>
        // --- MODIFICATION END ---
    );
};

export default LawyerDashboard;