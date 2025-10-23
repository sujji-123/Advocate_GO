// src/Pages/CommunityImpact.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Removed Navbar import
// Removed Footer import
import { FaUsers, FaHandHoldingHeart, FaChartLine, FaAward, FaHeart } from 'react-icons/fa';

const CommunityImpact = () => {
    const impactStats = [
        {
            number: "50,000+",
            label: "People Helped",
            description: "Legal guidance provided to citizens",
            icon: <FaUsers className="text-2xl" />
        },
        {
            number: "15,000+",
            label: "Queries Answered",
            description: "Legal questions resolved",
            icon: <FaHandHoldingHeart className="text-2xl" />
        },
        {
            number: "89%",
            label: "Satisfaction Rate",
            description: "User satisfaction with guidance",
            icon: <FaChartLine className="text-2xl" />
        },
        {
            number: "200+",
            label: "Active Advisors",
            description: "Legal professionals volunteering",
            icon: <FaAward className="text-2xl" />
        }
    ];

    const successStories = [
        {
            title: "Property Rights Awareness",
            description: "Helped 500+ families understand their property rights and prevent disputes",
            impact: "Reduced property litigation by 30% in targeted communities"
        },
        {
            title: "Consumer Protection",
            description: "Assisted 1000+ consumers in filing complaints and getting refunds",
            impact: "Recovered ₹50+ lakhs in consumer compensation"
        },
        {
            title: "Legal Aid Camp",
            description: "Organized free legal aid camps in rural areas reaching 2000+ people",
            impact: "Provided free legal assistance to underprivileged communities"
        }
    ];

    return (
        // Removed outer div and Navbar
        // <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        //     <Navbar />
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHeart className="text-orange-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Impact Report</h1>
                            <p className="text-gray-600 text-lg">Making justice accessible to all citizens</p>
                        </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {impactStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <div className="text-orange-600 mb-3">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                                <div className="text-sm text-gray-600">{stat.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Success Stories */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
                        <div className="space-y-6">
                            {successStories.map((story, index) => (
                                <div key={index} className="border-l-4 border-orange-500 pl-6 py-2">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                                    <p className="text-gray-600 mb-3">{story.description}</p>
                                    <div className="bg-orange-50 text-orange-800 px-4 py-2 rounded-lg">
                                        <strong>Impact:</strong> {story.impact}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/dashboard" // Changed to generic dashboard link
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
            // Removed Footer
        // </div>
    );
};

export default CommunityImpact;