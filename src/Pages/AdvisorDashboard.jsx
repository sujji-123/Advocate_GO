// src/Pages/AdvisorDashboard.jsx
import React from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const AdvisorDashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className='text-3xl font-bold mb-4 text-gray-800'>Advisor Dashboard</h1>
                    <p className="text-gray-600 mb-8">Welcome, <strong>{user?.name}</strong>!</p>
                    
                    {/* --- MODIFICATION START --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="block p-6 bg-yellow-50 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-yellow-800">Answer Queries</h2>
                            <p className="text-yellow-600 mt-2">Help citizens by answering anonymous questions. (Feature coming soon)</p>
                        </div>
                         <Link to="/connections" className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-purple-800">My Connections</h2>
                            <p className="text-purple-600 mt-2">Manage requests and chat with users.</p>
                        </Link>
                    </div>
                    {/* --- MODIFICATION END --- */}

                    <button className='bg-red-600 text-white px-6 py-2 rounded-lg mt-10' onClick={logout}>
                        Logout
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default AdvisorDashboard;