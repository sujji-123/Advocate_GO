// src/Pages/Queries.jsx
import React from 'react';
// Removed Navbar import
// Removed Footer import
import { FaComments } from 'react-icons/fa';

const Queries = () => {
  return (
    // Removed outer div and Navbar
    // <div className="flex flex-col min-h-screen bg-gray-50">
    //  <Navbar />
      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-center bg-white rounded-lg shadow border border-gray-200">
          <FaComments className="mx-auto h-16 w-16 text-orange-500 mb-6" />
          <h1 className='text-2xl font-bold mb-4 text-gray-800'>Advisor Query Management</h1>
          <p className="text-gray-600 mb-6">
            This section is under development. Soon, you'll be able to view and answer legal queries from users here.
          </p>
           <button
             onClick={() => window.history.back()} // Go back to the previous page
             className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
             Go Back
           </button>
        </div>
      </main>
      // Removed Footer
    // </div>
  );
};

export default Queries;