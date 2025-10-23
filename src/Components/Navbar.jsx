// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contextprovider/AuthContext';
import { FaBars, FaSearch, FaTimes, FaChevronDown, FaUser, FaBook, FaBalanceScale, FaGavel, FaQuestionCircle, FaFileAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import GoogleTranslate from './GoogleTranslate';
import logo from '../assets/WhatsApp Image 2025-10-22 at 17.37.29_e24b82ec.jpg';

const WelcomeBanner = () => {
  // ... (WelcomeBanner code remains the same) ...
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('welcomeBannerDismissed');
    if (dismissed) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      handleDismiss();
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('welcomeBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white py-2 px-4 text-center relative z-[1000]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base">
        <p className="mb-1 sm:mb-0">
          Welcome to AdvocateGO! Your one-step solution for legal assistance.
          Understand rights, find lawyers, get help in your language - all in one place.
        </p>
        <button
          onClick={handleDismiss}
          className="ml-0 sm:ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Dismiss welcome message"
        >
          <FaTimes size={18} />
        </button>
      </div>
    </div>
  );
};


const Navbar = ({ setQuery }) => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleLogout = () => {
        logout();
        setActiveDropdown(null);
        setIsMenuOpen(false);
    };

    const closeAllDropdowns = () => {
        setActiveDropdown(null);
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const clientDashboardSubItems = [
        { title: "My Cases", path: "/my-cases", icon: <FaBriefcase className="mr-2" /> },
        { title: "Case Status", path: "/case-status", icon: <FaFileAlt className="mr-2" /> }
    ];

    // --- Check if the current user should see the dashboard sub-items ---
    const showDashboardSubItems = user?.role === 'client';

    const menuItems = [
        {
            title: "Dashboard",
            icon: <FaUser className="mr-2" />,
            path: "/dashboard",
            // Subitems are always defined, but conditionally SHOWN later
            subItems: clientDashboardSubItems
        },
        {
            title: "Legal Resources",
            icon: <FaBook className="mr-2" />,
            subItems: [
                { title: "Find a Lawyer", path: "/lawyer-type-advisor", icon: <FaBalanceScale className="mr-2" /> },
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

            <nav className='sticky top-0 bg-gray-800 text-white shadow-md z-[999]'>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-3">
                        {/* --- MODIFICATION: Group button and logo, ensure button doesn't take space on md+ --- */}
                        <div className="flex items-center space-x-3">
                            {/* Hamburger Button */}
                            <button
                                className='md:hidden text-white' // Only show on screens smaller than md
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                            {/* Logo Link */}
                            <Link
                                to='/'
                                className="flex items-center text-xl font-bold text-white"
                                onClick={() => { closeAllDropdowns(); setIsMenuOpen(false); }}
                            >
                                <img src={logo} alt="AdvocateGO Logo" className="h-8 w-8 mr-2 object-contain" />
                                AdvocateGO
                            </Link>
                        </div>
                        {/* --- END MODIFICATION --- */}


                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            {menuItems.map((menu) => (
                                <div
                                    key={menu.title}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(menu.title)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {/* --- MODIFICATION: Simplified logic for rendering Dashboard item --- */}
                                    {menu.title === "Dashboard" ? (
                                        user ? ( // Only show Dashboard if logged in
                                            showDashboardSubItems ? ( // If it has sub-items for this user
                                                <button
                                                    className="flex items-center px-3 py-2 hover:text-blue-300"
                                                    onClick={() => toggleDropdown(menu.title)}
                                                >
                                                    {menu.icon}
                                                    {menu.title}
                                                    <FaChevronDown className="ml-1 text-xs" />
                                                </button>
                                            ) : ( // If it's just a link
                                                <Link
                                                    to={menu.path}
                                                    className="flex items-center px-3 py-2 hover:text-blue-300"
                                                    onClick={closeAllDropdowns}
                                                >
                                                    {menu.icon}
                                                    {menu.title}
                                                </Link>
                                            )
                                        ) : null // Don't show Dashboard if not logged in
                                    ) : ( // Other menu items (Legal Resources, Help)
                                        <button
                                            className="flex items-center px-3 py-2 hover:text-blue-300"
                                            onClick={() => toggleDropdown(menu.title)}
                                        >
                                            {menu.icon}
                                            {menu.title}
                                            {menu.subItems.length > 0 && <FaChevronDown className="ml-1 text-xs" />}
                                        </button>
                                    )}
                                    {/* --- END MODIFICATION --- */}

                                    {/* Submenu */}
                                    {menu.subItems && menu.subItems.length > 0 && (
                                        // --- MODIFICATION: Conditionally show based on role for Dashboard ---
                                        (menu.title !== "Dashboard" || showDashboardSubItems) && (
                                        // --- END MODIFICATION ---
                                            <div className={`absolute left-0 mt-2 w-56 bg-gray-700 rounded-md shadow-lg z-50 ${activeDropdown === menu.title ? 'block' : 'hidden'} group-hover:block`}>
                                                {menu.subItems.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        to={item.path}
                                                        className="flex items-center w-full px-4 py-3 hover:bg-gray-600 text-white text-sm"
                                                        onClick={closeAllDropdowns}
                                                    >
                                                        {item.icon}
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}

                            {/* Settings Dropdown (Only if logged in) */}
                            {user && (
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown('Settings')}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button
                                        className="flex items-center px-3 py-2 hover:text-blue-300"
                                        onClick={() => toggleDropdown('Settings')}
                                    >
                                        <FaUser className="mr-2" />
                                        Settings
                                        <FaChevronDown className="ml-1 text-xs" />
                                    </button>
                                    <div className={`absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 ${activeDropdown === 'Settings' ? 'block' : 'hidden'} group-hover:block`}>
                                        {settingsItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                className="block w-full text-left px-4 py-3 hover:bg-gray-600 text-white text-sm"
                                                onClick={closeAllDropdowns}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-3 hover:bg-gray-600 text-red-400 text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right side elements */}
                        <div className="flex items-center space-x-3">
                             <div className="hidden sm:block relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type='text'
                                    placeholder="Search..."
                                    className='bg-gray-700 text-white px-3 py-1.5 rounded-full pl-10 w-40 md:w-56 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    onChange={(e) => setQuery(e.target.value)} // Ensure setQuery is passed correctly
                                />
                            </div>

                            <div className="hidden md:block">
                                <GoogleTranslate />
                            </div>

                            {!user && (
                                <div className="hidden md:flex items-center space-x-2">
                                    <Link
                                        to='/login'
                                        className='bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-sm transition'
                                        onClick={closeAllDropdowns}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to='/register'
                                        className='bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded text-sm transition'
                                        onClick={closeAllDropdowns}
                                    >
                                        Signup
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 border-t border-gray-700 shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto">
                        <div className="container mx-auto px-4 py-4 space-y-4">

                            {/* --- Adjusted Mobile Menu Logic --- */}
                            {menuItems.map((menu) => (
                                <div key={menu.title}>
                                    {/* Show Dashboard link if logged in, otherwise skip */}
                                    {menu.title === "Dashboard" && user ? (
                                        <Link
                                            to={menu.path}
                                            className="flex items-center py-2 text-lg font-semibold"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {menu.icon}
                                            {menu.title}
                                        </Link>
                                    ) : menu.title !== "Dashboard" ? ( // Show non-dashboard items always
                                        <h4 className="flex items-center py-2 text-lg font-semibold">
                                            {menu.icon}
                                            {menu.title}
                                        </h4>
                                    ): null}

                                    {/* Render sub-items, conditionally for Dashboard */}
                                    {menu.subItems && menu.subItems.length > 0 && (menu.title !== "Dashboard" || showDashboardSubItems) && (
                                        <ul className="space-y-2 pl-8 pt-2">
                                            {menu.subItems.map((item) => (
                                                <li key={item.title}>
                                                    <Link
                                                        to={item.path}
                                                        className="flex items-center py-1.5 hover:text-blue-300"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {item.icon}
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            {/* --- END MODIFICATION --- */}

                            {user ? (
                                <div>
                                    <h4 className="flex items-center py-2 text-lg font-semibold">
                                        <FaUser className="mr-2" />
                                        Account
                                    </h4>
                                    <ul className="space-y-2 pl-8 pt-2">
                                        {settingsItems.map((item) => (
                                            <li key={item.title}>
                                                <Link
                                                    to={item.path}
                                                    className="block py-1.5 hover:text-blue-300"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-red-400 py-1.5 hover:text-red-300 w-full text-left"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-gray-700 space-y-3">
                                    <Link
                                        to="/login"
                                        className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Signup
                                    </Link>
                                </div>
                            )}
                             <div className="pt-4 border-t border-gray-700">
                                <GoogleTranslate />
                             </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;