// src/Pages/ClientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaSearch, FaUserTie, FaComments, FaFileAlt, FaClock, FaChartLine, FaBook, FaBalanceScale } from 'react-icons/fa';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({
        activeCases: 0,
        pendingProposals: 0,
        totalConnections: 0,
        unreadMessages: 0
    });

    useEffect(() => {
        // Simulate fetching user stats
        setStats({
            activeCases: 2,
            pendingProposals: 1,
            totalConnections: 5,
            unreadMessages: 3
        });
    }, []);

    const quickActions = [
        {
            title: "Find Lawyers",
            description: "Search and connect with legal experts",
            icon: <FaSearch className="text-2xl" />,
            path: "/lawyer-locator",
            color: "green"
        },
        {
            title: "Legal Advisors",
            description: "Get guidance from legal advisors",
            icon: <FaUserTie className="text-2xl" />,
            path: "/users/advisor",
            color: "blue"
        },
        {
            title: "Case Proposals",
            description: "Track your sent proposals",
            icon: <FaFileAlt className="text-2xl" />,
            path: "/proposals/sent",
            color: "yellow"
        },
        {
            title: "My Connections",
            description: "Manage your legal network",
            icon: <FaComments className="text-2xl" />,
            path: "/connections",
            color: "purple"
        },
        {
            title: "Case Status",
            description: "Monitor ongoing cases",
            icon: <FaClock className="text-2xl" />,
            path: "/case-status",
            color: "indigo"
        },
        {
            title: "Legal Resources",
            description: "Access legal documents & guides",
            icon: <FaBook className="text-2xl" />,
            path: "/legal-docs",
            color: "teal"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
            blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100',
            purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
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
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Welcome back, {user?.name || 'Client'}!
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        Your legal assistance hub - manage cases, connect with experts, and track progress
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">Member Since</p>
                                        <p className="font-semibold">2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaFileAlt className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeCases}</h3>
                            <p className="text-gray-600 text-sm">Active Cases</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaClock className="text-yellow-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingProposals}</h3>
                            <p className="text-gray-600 text-sm">Pending Proposals</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaUserTie className="text-green-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalConnections}</h3>
                            <p className="text-gray-600 text-sm">Connections</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaComments className="text-purple-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.unreadMessages}</h3>
                            <p className="text-gray-600 text-sm">Unread Messages</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <FaChartLine className="mr-3 text-blue-600" />
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quickActions.map((action, index) => (
                                <Link
                                    key={index}
                                    to={action.path}
                                    className={`block p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getColorClasses(action.color)}`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            {action.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                                            <p className="text-sm opacity-80">{action.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <FaClock className="mr-3 text-gray-600" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <FaUserTie className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">New connection request</p>
                                        <p className="text-sm text-gray-600">From Advocate Sharma</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">2 hours ago</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <FaFileAlt className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Case status updated</p>
                                        <p className="text-sm text-gray-600">Case #CS-2024-001</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">1 day ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Help Section */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <FaBalanceScale className="text-red-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-900">Emergency Legal Help</h3>
                                    <p className="text-red-700">Need immediate legal assistance? Contact emergency services.</p>
                                </div>
                            </div>
                            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                                Get Help Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ClientDashboard;