// src/Pages/LegalResources.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaBook, FaVideo, FaFilePdf, FaGraduationCap, FaNewspaper } from 'react-icons/fa';

const LegalResources = () => {
    const resources = [
        {
            title: "Indian Kanoon",
            description: "Comprehensive Indian law database with case laws and statutes",
            link: "https://indiankanoon.org/",
            icon: <FaBook className="text-2xl" />,
            category: "Law Database"
        },
        {
            title: "Supreme Court Cases",
            description: "Latest Supreme Court judgments and case updates",
            link: "https://main.sci.gov.in/",
            icon: <FaGraduationCap className="text-2xl" />,
            category: "Case Law"
        },
        {
            title: "Legal Service India",
            description: "Articles, case studies, and legal research materials",
            link: "https://www.legalserviceindia.com/",
            icon: <FaNewspaper className="text-2xl" />,
            category: "Articles & Research"
        },
        {
            title: "Law Commission Reports",
            description: "Official law commission reports and recommendations",
            link: "https://lawcommissionofindia.nic.in/",
            icon: <FaFilePdf className="text-2xl" />,
            category: "Government Reports"
        },
        {
            title: "Bar Council of India",
            description: "Legal education and professional standards",
            link: "https://www.barcouncilofindia.org/",
            icon: <FaGraduationCap className="text-2xl" />,
            category: "Professional Body"
        },
        {
            title: "Legal Video Lectures",
            description: "Educational videos on various legal topics",
            link: "https://www.youtube.com/results?search_query=indian+law+lectures",
            icon: <FaVideo className="text-2xl" />,
            category: "Video Learning"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Navbar />
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBook className="text-blue-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Education Resources</h1>
                            <p className="text-gray-600 text-lg">Continue your legal education with these trusted resources</p>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {resources.map((resource, index) => (
                            <a
                                key={index}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                            >
                                <div className="text-blue-600 mb-4">
                                    {resource.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                                <p className="text-gray-600 mb-3">{resource.description}</p>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {resource.category}
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link 
                            to="/dashboard/lawyer" 
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LegalResources;