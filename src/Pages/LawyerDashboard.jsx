// src/Pages/LawyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaUserTie, FaComments, FaFileAlt, FaClock, FaChartLine, FaGraduationCap, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const LawyerDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({
        pendingProposals: 0,
        activeCases: 0,
        totalEarnings: 0,
        successRate: 0,
        studentConnections: 0,
        clientRating: 0
    });

    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setStats({
            pendingProposals: 3,
            activeCases: 8,
            totalEarnings: 125000,
            successRate: 85,
            studentConnections: 2,
            clientRating: 4.8
        });

        // Simulate proposals data
        setProposals([
            {
                id: 1,
                clientName: "Rajesh Kumar",
                caseType: "Property Dispute",
                description: "Need assistance with property partition case",
                urgency: "High",
                date: "2 hours ago"
            },
            {
                id: 2,
                clientName: "Priya Sharma",
                caseType: "Divorce Case",
                description: "Mutual consent divorce documentation",
                urgency: "Medium",
                date: "1 day ago"
            }
        ]);
        setLoading(false);
    }, []);

    const quickActions = [
        {
            title: "Case Proposals",
            description: "Review new case requests",
            icon: <FaFileAlt className="text-2xl" />,
            path: "/proposals/inbox",
            color: "blue",
            count: stats.pendingProposals
        },
        {
            title: "My Connections",
            description: "Manage client relationships",
            icon: <FaComments className="text-2xl" />,
            path: "/connections",
            color: "purple"
        },
        {
            title: "Find Students",
            description: "Connect with law students",
            icon: <FaGraduationCap className="text-2xl" />,
            path: "/users/student",
            color: "green"
        },
        {
            title: "Earnings",
            description: "View financial dashboard",
            icon: <FaMoneyBillWave className="text-2xl" />,
            path: "/earnings",
            color: "yellow"
        },
        {
            title: "Case Management",
            description: "Manage ongoing cases",
            icon: <FaChartLine className="text-2xl" />,
            path: "/cases",
            color: "indigo"
        },
        {
            title: "My Profile",
            description: "Update professional details",
            icon: <FaUserTie className="text-2xl" />,
            path: "/profile",
            color: "teal"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
            purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
            green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100',
            indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100',
            teal: 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Advocate Dashboard
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                        <p className="text-gray-600 text-lg">
                                            Welcome, <strong>{user?.name}</strong>
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {user?.specialization}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <FaStar className="text-yellow-400" />
                                                <span className="text-gray-700 font-medium">{stats.clientRating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 lg:mt-0">
                                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">Success Rate</p>
                                        <p className="text-2xl font-bold">{stats.successRate}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Pending Proposals</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.pendingProposals}</h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaFileAlt className="text-blue-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Active Cases</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.activeCases}</h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaChartLine className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                                    <h3 className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</h3>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <FaMoneyBillWave className="text-yellow-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Student Assistants</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.studentConnections}</h3>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaGraduationCap className="text-purple-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaClock className="mr-3 text-blue-600" />
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {quickActions.map((action, index) => (
                                    <Link
                                        key={index}
                                        to={action.path}
                                        className={`block p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getColorClasses(action.color)}`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    {action.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                                                    <p className="text-sm opacity-80">{action.description}</p>
                                                </div>
                                            </div>
                                            {action.count > 0 && (
                                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                    {action.count}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Proposals */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaFileAlt className="mr-3 text-gray-600" />
                                Recent Proposals
                            </h2>
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-gray-500">Loading proposals...</p>
                                ) : proposals.length === 0 ? (
                                    <p className="text-gray-500">No new proposals</p>
                                ) : (
                                    proposals.map(proposal => (
                                        <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-900">{proposal.clientName}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    proposal.urgency === 'High' 
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {proposal.urgency}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{proposal.caseType}</p>
                                            <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">{proposal.description}</p>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-xs text-gray-500">{proposal.date}</span>
                                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                                                    Review
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Professional Development */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-bold mb-2">Continue Your Legal Education</h3>
                                <p className="opacity-90">Access latest legal updates, webinars, and professional resources</p>
                            </div>
                            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                                Explore Resources
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LawyerDashboard;