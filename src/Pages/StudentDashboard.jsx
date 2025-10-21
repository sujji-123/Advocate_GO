// src/Pages/StudentDashboard.jsx
import React from 'react';
import { useAuth } from '../contextprovider/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className='text-3xl font-bold mb-4 text-gray-800'>Student Dashboard</h1>
                    <p className="text-gray-600 mb-8">Welcome, <strong>{user?.name}</strong>!</p>
                    
                    {/* --- MODIFICATION START --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/users/lawyer" className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-green-800">Connect with Lawyers</h2>
                            <p className="text-green-600 mt-2">Find mentors and internship opportunities.</p>
                        </Link>
                         <Link to="/users/student" className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-blue-800">Connect with Students</h2>
                            <p className="text-blue-600 mt-2">Collaborate with your peers.</p>
                        </Link>
                        <Link to="/connections" className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-purple-800">My Connections</h2>
                            <p className="text-purple-600 mt-2">Manage requests and chat.</p>
                        </Link>
                        <Link to="/top-law-colleges" className="block p-6 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-sm transition">
                            <h2 className="text-xl font-semibold text-indigo-800">Top Law Colleges</h2>
                            <p className="text-indigo-600 mt-2">Explore top law colleges in India.</p>
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
export default StudentDashboard;