// src/Pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FaUserTie, FaComments, FaBook, FaGraduationCap, FaChartLine, FaSearch, FaStar, FaAward } from 'react-icons/fa';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({
        mentorConnections: 0,
        peerConnections: 0,
        completedProjects: 0,
        skillLevel: "Beginner"
    });

    const [learningResources, setLearningResources] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        setStats({
            mentorConnections: 3,
            peerConnections: 8,
            completedProjects: 5,
            skillLevel: "Intermediate"
        });

        setLearningResources([
            {
                id: 1,
                title: "Constitutional Law Basics",
                type: "Course",
                progress: 75,
                duration: "4 hours"
            },
            {
                id: 2,
                title: "Legal Research Methodology",
                type: "Guide",
                progress: 100,
                duration: "2 hours"
            },
            {
                id: 3,
                title: "Courtroom Etiquette",
                type: "Video",
                progress: 30,
                duration: "1 hour"
            }
        ]);
    }, []);

    const quickActions = [
        {
            title: "Find Mentors",
            description: "Connect with experienced lawyers",
            icon: <FaUserTie className="text-2xl" />,
            path: "/users/lawyer",
            color: "green"
        },
        {
            title: "Student Network",
            description: "Collaborate with peers",
            icon: <FaGraduationCap className="text-2xl" />,
            path: "/users/student",
            color: "blue"
        },
        {
            title: "My Connections",
            description: "Manage your network",
            icon: <FaComments className="text-2xl" />,
            path: "/connections",
            color: "purple"
        },
        {
            title: "Learning Resources",
            description: "Access study materials",
            icon: <FaBook className="text-2xl" />,
            path: "/legal-docs",
            color: "yellow"
        },
        {
            title: "Internship Opportunities",
            description: "Find practical experience",
            icon: <FaSearch className="text-2xl" />,
            path: "/internships",
            color: "indigo"
        },
        {
            title: "College Directory",
            description: "Explore law colleges",
            icon: <FaAward className="text-2xl" />,
            path: "/top-law-colleges",
            color: "teal"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
            blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
            purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
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
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Student Dashboard
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                        <p className="text-gray-600 text-lg">
                                            Welcome, <strong>{user?.name}</strong>
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {stats.skillLevel} Level
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <FaStar className="text-yellow-400" />
                                                <span className="text-gray-700 font-medium">4.2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 lg:mt-0">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">Learning Progress</p>
                                        <p className="text-2xl font-bold">68%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaUserTie className="text-green-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.mentorConnections}</h3>
                            <p className="text-gray-600 text-sm">Mentors</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaGraduationCap className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.peerConnections}</h3>
                            <p className="text-gray-600 text-sm">Peers</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaBook className="text-yellow-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completedProjects}</h3>
                            <p className="text-gray-600 text-sm">Projects</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaAward className="text-purple-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
                            <p className="text-gray-600 text-sm">Certificates</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaChartLine className="mr-3 text-blue-600" />
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        {/* Learning Progress */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaBook className="mr-3 text-gray-600" />
                                Learning Progress
                            </h2>
                            <div className="space-y-4">
                                {learningResources.map(resource => (
                                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {resource.type}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Progress</span>
                                                <span>{resource.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-green-600 h-2 rounded-full" 
                                                    style={{ width: `${resource.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>{resource.duration}</span>
                                            {resource.progress === 100 ? (
                                                <span className="text-green-600 font-medium">Completed</span>
                                            ) : (
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Continue
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Career Development */}
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-bold mb-2">Build Your Legal Career</h3>
                                <p className="opacity-90">Access internship opportunities, skill assessments, and career guidance</p>
                            </div>
                            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                                Explore Opportunities
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StudentDashboard;