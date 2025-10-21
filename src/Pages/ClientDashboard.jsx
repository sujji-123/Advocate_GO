// src/Pages/ClientDashboard.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className='text-3xl font-bold mb-4 text-gray-800'>
                        Welcome, {user?.name || 'Client'}!
                    </h1>
                    <p className="text-gray-600 mb-8">This is your personal dashboard. From here, you can manage your legal needs.</p>
                    
                    {/* --- MODIFICATION START --- */}
                    {/* Changed grid layout and added new links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/lawyer-locator" className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg shadow-sm transition col-span-1 md:col-span-2">
                            <h2 className="text-xl font-semibold text-green-800">Find a Lawyer & Send Case Proposal</h2>
                            <p className="text-green-600 mt-2">Search our directory and send your case details directly.</p>
                        </Link>
                        <Link to="/proposals/sent" className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-blue-800">My Case Proposals</h2>
                            <p className="text-blue-600 mt-2">Track the status of proposals you've sent.</p>
                        </Link>
                        <Link to="/case-status" className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-blue-800">My Case Status</h2>
                            <p className="text-blue-600 mt-2">Track updates on your active cases.</p>
                        </Link>
                         <Link to="/legal-docs" className="block p-6 bg-yellow-50 hover:bg-yellow-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-yellow-800">Upload Documents</h2>
                            <p className="text-yellow-600 mt-2">Securely submit documents for your case.</p>
                        </Link>
                        <Link to="/connections" className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-purple-800">My Connections</h2>
                            <p className="text-purple-600 mt-2">Manage requests and chat with connections.</p>
                        </Link>
                    </div>
                    {/* --- MODIFICATION END --- */}
                    
                    <button 
                        className='bg-red-600 text-white px-6 py-2 rounded-lg mt-10 hover:bg-red-700 transition' 
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ClientDashboard;