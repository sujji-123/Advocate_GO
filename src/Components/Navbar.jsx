import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contextprovider/AuthContext';
import { FaBars, FaSearch, FaTimes, FaChevronDown, FaUser, FaBook, FaBalanceScale, FaGavel, FaQuestionCircle, FaFileAlt } from 'react-icons/fa';
import GoogleTranslate from './GoogleTranslate'; // Import the new component
import { FaMapMarkerAlt } from 'react-icons/fa';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000); // Auto-dismiss after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white py-2 px-4 text-center relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p>
          Welcome to AdvocateGO! Your one-step solution for legal assistance. 
          Understand your rights, find the right lawyer, and get legal help 
          in your preferred language - all in one place.
        </p>
        <button 
          onClick={handleDismiss}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Dismiss welcome message"
        >
          <FaTimes size={18} />
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ setQuery, onLogout }) => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleLogout = () => {
        logout();
        if (onLogout) onLogout();
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const menuItems = [
        {
            title: "Dashboard",
            icon: <FaUser className="mr-2" />,
            subItems: [
                { title: "My Cases", path: "/my-cases", icon: <FaFileAlt className="mr-2" /> },
                { title: "Case Status", path: "/case-status", icon: <FaFileAlt className="mr-2" /> }
            ]
        },
        {
            title: "Legal Resources",
            icon: <FaBook className="mr-2" />,
            subItems: [
                { title: "Find a Lawyer", path: "/lawyer-type-advisor", icon: <FaBalanceScale className="mr-2" /> }, // Updated path
                { title: "Lawyer Locator", path: "/lawyer-locator", icon: <FaMapMarkerAlt className="mr-2" /> },
                { title: "Legal Documents", path: "/legal-docs", icon: <FaFileAlt className="mr-2" /> },
                { title: "Know Your Rights", path: "/rights", icon: <FaGavel className="mr-2" /> }
            ]
        },
        {
            title: "Help",
            icon: <FaQuestionCircle className="mr-2" />,
            subItems: [
                { title: "FAQs", path: "/faqs", icon: <FaQuestionCircle className="mr-2" /> },
                { title: "Legal Aid", path: "/legal-aid", icon: <FaBalanceScale className="mr-2" /> }
            ]
        }
    ];

    const settingsItems = [
        { title: "Profile", path: "/profile" },
        { title: "Account Settings", path: "/settings" },
        { title: "Notifications", path: "/notifications" }
    ];

    return (
        <>
            <WelcomeBanner />

            <nav className='bg-gray-800 text-white relative z-50'> {/* Added relative and higher z-index */}
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <button 
                                className='md:hidden text-white mr-4'
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <FaBars size={24} />
                            </button>
                            <Link to='/' className="text-xl font-bold text-white">
                                AdvocateGO
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {menuItems.map((menu) => (
                                <div key={menu.title} className="relative group">
                                    <button 
                                        className="flex items-center px-3 py-2 hover:text-blue-300"
                                        onClick={() => toggleDropdown(menu.title)}
                                    >
                                        {menu.icon}
                                        {menu.title}
                                        <FaChevronDown className="ml-1 text-xs" />
                                    </button>
                                    <div className={`absolute left-0 mt-2 w-56 bg-gray-700 rounded-md shadow-lg z-50 ${activeDropdown === menu.title ? 'block' : 'hidden'} group-hover:block`}> {/* Increased z-index */}
                                        {menu.subItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                className="flex items-center px-4 py-3 hover:bg-gray-600"
                                            >
                                                {item.icon}
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {user && (
                                <div className="relative group">
                                    <button 
                                        className="flex items-center px-3 py-2 hover:text-blue-300"
                                        onClick={() => toggleDropdown('Settings')}
                                    >
                                        <FaUser className="mr-2" />
                                        Settings
                                        <FaChevronDown className="ml-1 text-xs" />
                                    </button>
                                    <div className={`absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 ${activeDropdown === 'Settings' ? 'block' : 'hidden'} group-hover:block`}> {/* Increased z-index */}
                                        {settingsItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                className="block px-4 py-3 hover:bg-gray-600"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        <button 
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-3 hover:bg-gray-600 text-red-400"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            
                            <GoogleTranslate />

                            <div className="relative">
                                <FaSearch className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type='text'
                                    placeholder="Search services..."
                                    className='bg-gray-700 px-4 py-2 rounded pl-10 w-full'
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            {!user && (
                                <>
                                    <Link to='/login' className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition'>Login</Link>
                                    <Link to='/register' className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition'>Signup</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-75 z-50">
                        <div className="bg-gray-800 h-full w-3/4 p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold">Menu</h3>
                                <button 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {menuItems.map((menu) => (
                                    <div key={menu.title}>
                                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                                            {menu.icon}
                                            {menu.title}
                                        </h4>
                                        <ul className="space-y-3 pl-8">
                                            {menu.subItems.map((item) => (
                                                <li key={item.title}>
                                                    <Link 
                                                        to={item.path} 
                                                        className="flex items-center py-2"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {item.icon}
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {user ? (
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                                            <FaUser className="mr-2" />
                                            Account
                                        </h4>
                                        <ul className="space-y-3 pl-8">
                                            {settingsItems.map((item) => (
                                                <li key={item.title}>
                                                    <Link 
                                                        to={item.path} 
                                                        className="block py-2"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="text-red-400 py-2"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="pt-4 border-t border-gray-700">
                                        <Link 
                                            to="/login" 
                                            className="block bg-blue-500 text-white text-center py-3 rounded mb-3"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/register" 
                                            className="block bg-green-500 text-white text-center py-3 rounded"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;