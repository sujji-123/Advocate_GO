// src/Components/Sidebar.jsx
import React from 'react';

const Menubar = () => {
  return (
    // The 'aside' tag is semantically correct for a sidebar.
    // 'flex-shrink-0' prevents the sidebar from shrinking.
    <aside className="w-64 bg-gray-800 text-white p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav>
        <ul>
          <li className="mb-3">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
          </li>
          <li className="mb-3">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">My Cases</a>
          </li>
          <li className="mb-3">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Find a Lawyer</a>
          </li>
          <li className="mb-3">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menubar;