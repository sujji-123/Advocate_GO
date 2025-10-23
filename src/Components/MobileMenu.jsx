// src/Components/MobileMenu.jsx
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '../contextprovider/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();

    if (!isOpen) return null;

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="bg-gray-800 h-full w-3/4 p-6 text-white">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Menu</h3>
                    <button 
                        onClick={onClose}
                        className="text-white"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Dashboard</h4>
                        <ul className="space-y-2 pl-4">
                            <li>
                                <Link to="/my-cases" className="block py-2 hover:text-blue-400" onClick={onClose}>My Cases</Link>
                            </li>
                            <li>
                                <Link to="/find-lawyer" className="block py-2 hover:text-blue-400" onClick={onClose}>Find a Lawyer</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Settings</h4>
                        <ul className="space-y-2 pl-4">
                            <li>
                                <Link to="/profile" className="block py-2 hover:text-blue-400" onClick={onClose}>Profile</Link>
                            </li>
                            <li>
                                <Link to="/settings" className="block py-2 hover:text-blue-400" onClick={onClose}>Account Settings</Link>
                            </li>
                        </ul>
                    </div>

                    {!user ? (
                        <div className="pt-4 border-t border-gray-700">
                            <Link 
                                to="/login" 
                                className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2"
                                onClick={onClose}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="block text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                onClick={onClose}
                            >
                                Signup
                            </Link>
                        </div>
                    ) : (
                        <button 
                            className="w-full bg-red-500 py-2 rounded mt-4 hover:bg-red-600 transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;