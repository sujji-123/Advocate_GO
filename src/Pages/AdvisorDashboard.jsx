// src/Pages/AdvisorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaComments, FaUserTie, FaChartLine, FaHandHoldingHeart, FaLightbulb, FaBook, FaUsers, FaAward } from 'react-icons/fa';

const AdvisorDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({
        answeredQueries: 0,
        pendingQueries: 0,
        helpedUsers: 0,
        satisfactionRate: 0,
        communityImpact: 0,
        resourcesCreated: 0
    });

    const [recentQueries, setRecentQueries] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        setStats({
            answeredQueries: 47,
            pendingQueries: 3,
            helpedUsers: 156,
            satisfactionRate: 94,
            communityImpact: 89,
            resourcesCreated: 12
        });

        setRecentQueries([
            {
                id: 1,
                user: "Anonymous User",
                question: "What are my rights as a tenant?",
                category: "Property Law",
                date: "2 hours ago",
                urgency: "Medium"
            },
            {
                id: 2,
                user: "Anonymous User",
                question: "How to file a consumer complaint?",
                category: "Consumer Law",
                date: "1 day ago",
                urgency: "High"
            }
        ]);
    }, []);

    const quickActions = [
        {
            title: "Answer Queries",
            description: "Help citizens with legal questions",
            icon: <FaComments className="text-2xl" />,
            path: "/queries",
            color: "yellow",
            count: stats.pendingQueries
        },
        {
            title: "My Connections",
            description: "Manage advisory relationships",
            icon: <FaUserTie className="text-2xl" />,
            path: "/connections",
            color: "purple"
        },
        {
            title: "Community Impact",
            description: "View your contribution metrics",
            icon: <FaChartLine className="text-2xl" />,
            path: "/impact",
            color: "green"
        },
        {
            title: "Legal Aid Resources",
            description: "Create and manage resources",
            icon: <FaBook className="text-2xl" />,
            path: "/legal-aid",
            color: "blue"
        },
        {
            title: "User Outreach",
            description: "Connect with those in need",
            icon: <FaUsers className="text-2xl" />,
            path: "/users/client",
            color: "indigo"
        },
        {
            title: "Training Materials",
            description: "Access advisor resources",
            icon: <FaLightbulb className="text-2xl" />,
            path: "/training",
            color: "teal"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100',
            purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
            green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
            blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
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
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Legal Advisor Dashboard
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                        <p className="text-gray-600 text-lg">
                                            Welcome, <strong>{user?.name}</strong>
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                                Community Advisor
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <FaAward className="text-yellow-500" />
                                                <span className="text-gray-700 font-medium">Expert</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 lg:mt-0">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">Satisfaction Rate</p>
                                        <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
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
                                    <p className="text-gray-600 text-sm mb-1">Answered Queries</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.answeredQueries}</h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaComments className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Pending Queries</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.pendingQueries}</h3>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <FaHandHoldingHeart className="text-yellow-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Users Helped</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.helpedUsers}</h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaUsers className="text-blue-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Resources Created</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.resourcesCreated}</h3>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaBook className="text-purple-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaChartLine className="mr-3 text-orange-600" />
                                Advisory Tools
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

                        {/* Recent Queries */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaComments className="mr-3 text-gray-600" />
                                Recent Queries
                            </h2>
                            <div className="space-y-4">
                                {recentQueries.length === 0 ? (
                                    <p className="text-gray-500">No pending queries</p>
                                ) : (
                                    recentQueries.map(query => (
                                        <div key={query.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-900">{query.user}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    query.urgency === 'High' 
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {query.urgency}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{query.category}</p>
                                            <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-3">{query.question}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">{query.date}</span>
                                                <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors">
                                                    Answer
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Community Impact */}
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-bold mb-2">Make a Difference in Your Community</h3>
                                <p className="opacity-90">Your guidance helps bridge the justice gap. Continue making legal awareness accessible to all.</p>
                            </div>
                            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                                View Impact Report
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdvisorDashboard;