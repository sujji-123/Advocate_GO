// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contextprovider/AuthContext';
import { FaBars, FaSearch, FaTimes, FaChevronDown, FaUser, FaBook, FaBalanceScale, FaGavel, FaQuestionCircle, FaFileAlt, FaMapMarkerAlt, FaBell } from 'react-icons/fa'; // Added FaBell
import GoogleTranslate from './GoogleTranslate';

// Welcome Banner Component (remains the same)
const WelcomeBanner = () => { /* ... */ };


const Navbar = ({ setQuery, onLogout }) => { // setQuery might not be needed if search is handled differently
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleLogout = () => {
        logout();
        if (onLogout) onLogout();
        // Close mobile menu on logout if open
        setIsMenuOpen(false);
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    // --- Define Menu Items with Correct Paths ---
    const menuItems = [
        // Dashboard Link (Points to the redirector)
        { title: "Dashboard", path: "/dashboard", icon: <FaUser className="mr-2" />, isDirectLink: true },

        // Legal Resources Dropdown
        {
            title: "Legal Resources", icon: <FaBook className="mr-2" />, isDirectLink: false,
            subItems: [
                { title: "Lawyer Type Advisor", path: "/lawyer-type-advisor", icon: <FaBalanceScale className="mr-2" /> },
                { title: "Lawyer Locator", path: "/lawyer-locator", icon: <FaMapMarkerAlt className="mr-2" /> },
                { title: "Legal Documents", path: "/legal-docs", icon: <FaFileAlt className="mr-2" /> },
                // { title: "Know Your Rights", path: "/rights", icon: <FaGavel className="mr-2" /> } // Uncomment if you create /rights page
            ]
        },
        // Help Dropdown
        {
            title: "Help", icon: <FaQuestionCircle className="mr-2" />, isDirectLink: false,
            subItems: [
                { title: "FAQs", path: "/faqs", icon: <FaQuestionCircle className="mr-2" /> }, // Updated path
                { title: "Legal Aid", path: "/legal-aid", icon: <FaBalanceScale className="mr-2" /> } // Updated path
            ]
        }
    ];

    // Settings Dropdown Items (Only shown when logged in)
    const settingsItems = [
        { title: "Profile", path: "/profile", icon: <FaUser className="mr-2" /> }, // Updated path
        { title: "Account Settings", path: "/settings", icon: <FaUser className="mr-2" /> }, // Updated path
        { title: "Notifications", path: "/notifications", icon: <FaBell className="mr-2" /> } // Updated path
    ];

    // Function to close dropdowns and mobile menu
    const closeAllMenus = () => {
        setActiveDropdown(null);
        setIsMenuOpen(false);
    };


    return (
        <>
            {/* <WelcomeBanner /> */} {/* Temporarily commented out if causing issues */}

            <nav className='bg-gray-800 text-white relative z-50'>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Left Side: Hamburger & Logo */}
                        <div className="flex items-center">
                            <button
                                className='md:hidden text-white mr-4'
                                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle directly
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                            <Link to='/' className="text-xl font-bold text-white" onClick={closeAllMenus}>
                                AdvocateGO
                            </Link>
                        </div>

                        {/* Center: Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            {menuItems.map((menu) => (
                                <div key={menu.title} className="relative group">
                                    {menu.isDirectLink ? (
                                         <Link
                                            to={menu.path}
                                            className="flex items-center px-3 py-2 hover:text-blue-300"
                                            onClick={() => setActiveDropdown(null)} // Close other dropdowns
                                        >
                                            {menu.icon}
                                            {menu.title}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                className="flex items-center px-3 py-2 hover:text-blue-300"
                                                onClick={() => toggleDropdown(menu.title)}
                                                aria-haspopup="true"
                                                aria-expanded={activeDropdown === menu.title}
                                            >
                                                {menu.icon}
                                                {menu.title}
                                                <FaChevronDown className={`ml-1 text-xs transition-transform ${activeDropdown === menu.title ? 'rotate-180' : ''}`} />
                                            </button>
                                            {/* Dropdown Content */}
                                            <div className={`absolute left-0 mt-2 w-56 bg-gray-700 rounded-md shadow-lg z-[60] ${activeDropdown === menu.title ? 'block' : 'hidden'} group-hover:block`}>
                                                {menu.subItems.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        to={item.path}
                                                        className="flex w-full items-center px-4 py-3 hover:bg-gray-600 text-sm" // Added text-sm
                                                        onClick={() => setActiveDropdown(null)} // Close dropdown on click
                                                    >
                                                        {item.icon}
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                            {/* Settings Dropdown (Logged In Only) */}
                            {user && (
                                <div className="relative group">
                                    <button
                                        className="flex items-center px-3 py-2 hover:text-blue-300"
                                        onClick={() => toggleDropdown('Settings')}
                                         aria-haspopup="true"
                                         aria-expanded={activeDropdown === 'Settings'}
                                    >
                                        <FaUser className="mr-2" />
                                        Settings
                                        <FaChevronDown className={`ml-1 text-xs transition-transform ${activeDropdown === 'Settings' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-[60] ${activeDropdown === 'Settings' ? 'block' : 'hidden'} group-hover:block`}>
                                        {settingsItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                className="flex w-full items-center px-4 py-3 hover:bg-gray-600 text-sm" // Added text-sm
                                                onClick={() => setActiveDropdown(null)} // Close dropdown
                                            >
                                                {item.icon}
                                                {item.title}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogout} // Calls logout and closes dropdown
                                            className="flex w-full items-center text-left px-4 py-3 hover:bg-gray-600 text-red-400 text-sm" // Added text-sm
                                        >
                                            {/* Optional: Add Logout Icon */}
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Translate, Search, Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            <GoogleTranslate />

                            {/* Search (kept for structure, functionality pending) */}
                            <div className="relative hidden md:block">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type='text'
                                    placeholder="Search..."
                                    className='bg-gray-700 px-3 py-2 rounded-md pl-10 w-full text-sm'
                                    onChange={(e) => setQuery && setQuery(e.target.value)} // Check if setQuery exists
                                />
                            </div>
                            {/* Auth Buttons (Logged Out Only) */}
                            {!user && (
                                <div className="hidden md:flex items-center space-x-2">
                                    <Link to='/login' className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition'>Login</Link>
                                    <Link to='/register' className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm transition'>Signup</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Mobile Menu --- */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 border-t border-gray-700 z-40 p-4">
                        <nav className="flex flex-col space-y-3">
                             {/* Mobile Search */}
                             <div className="relative mb-3">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input type='text' placeholder="Search..."
                                    className='bg-gray-700 px-3 py-2 rounded-md pl-10 w-full text-sm'
                                    onChange={(e) => setQuery && setQuery(e.target.value)}
                                />
                             </div>

                             {/* Mobile Menu Links */}
                             {menuItems.map((menu) => (
                                <div key={menu.title + "-mobile"}>
                                    {menu.isDirectLink ? (
                                         <Link to={menu.path} className="flex items-center py-2 text-white hover:text-blue-300" onClick={closeAllMenus}>
                                             {menu.icon} {menu.title}
                                         </Link>
                                    ): (
                                        <>
                                         <button className="flex items-center justify-between w-full py-2 text-white hover:text-blue-300" onClick={() => toggleDropdown(menu.title + "-mobile")}>
                                            <span className="flex items-center">{menu.icon} {menu.title}</span>
                                            <FaChevronDown className={`ml-1 text-xs transition-transform ${activeDropdown === (menu.title + "-mobile") ? 'rotate-180' : ''}`} />
                                         </button>
                                         {activeDropdown === (menu.title + "-mobile") && (
                                            <div className="pl-4 border-l border-gray-700 ml-2 py-1 space-y-1">
                                                 {menu.subItems.map(item => (
                                                     <Link key={item.title + "-mobile"} to={item.path} className="flex items-center py-1 text-gray-300 hover:text-white text-sm" onClick={closeAllMenus}>
                                                         {item.icon} {item.title}
                                                     </Link>
                                                 ))}
                                             </div>
                                         )}
                                        </>
                                    )}

                                </div>
                             ))}

                             {/* Mobile Settings/Auth */}
                              {user ? (
                                <>
                                    <button className="flex items-center justify-between w-full py-2 text-white hover:text-blue-300" onClick={() => toggleDropdown("Settings-mobile")}>
                                            <span className="flex items-center"><FaUser className="mr-2"/> Settings</span>
                                            <FaChevronDown className={`ml-1 text-xs transition-transform ${activeDropdown === "Settings-mobile" ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeDropdown === "Settings-mobile" && (
                                        <div className="pl-4 border-l border-gray-700 ml-2 py-1 space-y-1">
                                            {settingsItems.map(item => (
                                                <Link key={item.title + "-mobile"} to={item.path} className="flex items-center py-1 text-gray-300 hover:text-white text-sm" onClick={closeAllMenus}>
                                                    {item.icon} {item.title}
                                                </Link>
                                            ))}
                                            <button onClick={handleLogout} className="flex items-center py-1 text-red-400 hover:text-red-300 text-sm w-full">
                                                {/* Logout Icon Optional */} Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                               ) : (
                                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                                    <Link to='/login' className='bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 rounded text-sm transition' onClick={closeAllMenus}>Login</Link>
                                    <Link to='/register' className='bg-green-500 hover:bg-green-600 text-center px-4 py-2 rounded text-sm transition' onClick={closeAllMenus}>Signup</Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;