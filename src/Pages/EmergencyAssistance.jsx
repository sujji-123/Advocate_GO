// src/Pages/EmergencyAssistance.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Removed Navbar import
// Removed Footer import
import { FaPhone, FaShieldAlt, FaAmbulance, FaUserMd, FaBalanceScale } from 'react-icons/fa';

const EmergencyAssistance = () => {
    const emergencyContacts = [
        {
            name: "National Emergency Number",
            number: "112",
            description: "All-in-one emergency number",
            icon: <FaPhone className="text-2xl" />,
            color: "from-red-500 to-red-600"
        },
        {
            name: "Police",
            number: "100",
            description: "Police emergency services",
            icon: <FaShieldAlt className="text-2xl" />,
            color: "from-blue-500 to-blue-600"
        },
        {
            name: "Ambulance",
            number: "108",
            description: "Medical emergency services",
            icon: <FaAmbulance className="text-2xl" />,
            color: "from-green-500 to-green-600"
        },
        {
            name: "Women Helpline",
            number: "1091",
            description: "Women in distress help",
            icon: <FaUserMd className="text-2xl" />,
            color: "from-pink-500 to-pink-600"
        }
    ];

    const legalResources = [
        {
            title: "Legal Aid Services",
            description: "Free legal assistance for eligible citizens",
            link: "https://nalsa.gov.in/",
            type: "Government Portal"
        },
        {
            title: "Human Rights Commission",
            description: "Protection of human rights violations",
            link: "https://nhrc.nic.in/",
            type: "Government Body"
        },
        {
            title: "Consumer Forum",
            description: "Consumer protection and grievances",
            link: "https://consumerhelpline.gov.in/",
            type: "Helpline"
        }
    ];

    return (
        // Removed outer div and Navbar
        // <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        //     <Navbar />
            <main className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBalanceScale className="text-red-600 text-3xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Legal Assistance</h1>
                            <p className="text-gray-600 text-lg">Immediate help and resources for urgent legal matters</p>
                        </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Contacts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {emergencyContacts.map((contact, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                                        {contact.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.name}</h3>
                                    <div className="text-2xl font-bold text-gray-800 mb-2">{contact.number}</div>
                                    <p className="text-gray-600">{contact.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal Resources */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Legal Resources</h2>
                        <div className="space-y-4">
                            {legalResources.map((resource, index) => (
                                <a
                                    key={index}
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                                            <p className="text-gray-600">{resource.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {resource.type}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/dashboard" // Changed to generic dashboard link, Dashboard.jsx will redirect
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

export default EmergencyAssistance;