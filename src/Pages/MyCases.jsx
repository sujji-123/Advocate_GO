// src/Pages/MyCases.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

const MyCases = () => {
  // Placeholder data - replace with actual case data fetching later
  const cases = [
    // { id: 1, title: 'Property Dispute vs. Neighbor', status: 'Hearing Scheduled', nextDate: '2025-11-10' },
    // { id: 2, title: 'Consumer Complaint - Defective Product', status: 'Evidence Submitted', nextDate: '2025-11-25' },
  ];

  return (
    <main className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-blue-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Cases
            </h1>
            <p className="text-gray-600 text-lg">
              Track and manage your legal cases.
            </p>
          </div>
        </div>

        {cases.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200">
            <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Active Cases</h3>
            <p className="mt-1 text-sm text-gray-500">You do not have any active cases listed here yet.</p>
            <div className="mt-6">
              <Link
                to="/users/lawyer" // Link to find lawyers
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Find a Lawyer to Start a Case
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <li key={caseItem.id} className="p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                      <p className="text-lg font-medium text-blue-700 truncate">{caseItem.title}</p>
                      <p className="text-sm text-gray-500">
                        Status: <span className="font-semibold">{caseItem.status}</span>
                      </p>
                    </div>
                    <div className="flex-shrink-0 sm:ml-4">
                       <p className="text-sm text-gray-600">Next Hearing: {caseItem.nextDate || 'TBD'}</p>
                       <Link
                         to={`/case-status`} // Link to the detailed status page (could pass case ID later)
                         className="mt-1 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                       >
                         View Details
                       </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-8">
            <Link
                to="/dashboard"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
            >
                Back to Dashboard
            </Link>
        </div>
      </div>
    </main>
  );
};

export default MyCases;