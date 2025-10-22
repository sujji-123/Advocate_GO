// src/Pages/CareerOpportunities.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaBriefcase, FaUniversity, FaUserTie, FaBook, FaAward } from 'react-icons/fa';

const CareerOpportunities = () => {
    const opportunities = [
        {
            title: "Internship Portal",
            description: "Find legal internships with top law firms and organizations",
            link: "https://www.internshala.com/law-internships",
            icon: <FaBriefcase className="text-2xl" />,
            type: "Internships"
        },
        {
            title: "Law Firm Careers",
            description: "Career opportunities in leading law firms",
            link: "https://www.lawctopus.com/internships/",
            icon: <FaUserTie className="text-2xl" />,
            type: "Jobs"
        },
        {
            title: "Judicial Services",
            description: "Prepare for judicial service examinations",
            link: "https://www.judiciary.gov.in/",
            icon: <FaAward className="text-2xl" />,
            type: "Government Jobs"
        },
        {
            title: "Legal Research",
            description: "Research positions in legal organizations",
            link: "https://www.legallyindia.com/",
            icon: <FaBook className="text-2xl" />,
            type: "Research"
        },
        {
            title: "Higher Education",
            description: "LLM and PhD programs in law",
            link: "https://www.ugc.ac.in/",
            icon: <FaUniversity className="text-2xl" />,
            type: "Education"
        },
        {
            title: "Skill Development",
            description: "Online courses to enhance legal skills",
            link: "https://www.coursera.org/browse/law",
            icon: <FaAward className="text-2xl" />,
            type: "Courses"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
            <Navbar />
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBriefcase className="text-green-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Development</h1>
                            <p className="text-gray-600 text-lg">Explore opportunities to build your legal career</p>
                        </div>
                    </div>

                    {/* Opportunities Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {opportunities.map((opportunity, index) => (
                            <a
                                key={index}
                                href={opportunity.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                            >
                                <div className="text-green-600 mb-4">
                                    {opportunity.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                                <p className="text-gray-600 mb-3">{opportunity.description}</p>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    {opportunity.type}
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link 
                            to="/dashboard/student" 
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

export default CareerOpportunities;