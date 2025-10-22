// src/Pages/CaseTimelineViewer.jsx
import React, { useState } from 'react';

function CaseTimelineViewer() {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockCaseData = {
    caseNumber: 'CNR-DL-01-2024-123456',
    caseType: 'Civil Suit - Property Dispute',
    court: 'District Court, Delhi',
    judge: 'Honorable Justice Sharma',
    filingDate: '2024-01-15',
    status: 'In Progress',
    parties: [
      { name: 'Rajesh Kumar', type: 'Plaintiff' },
      { name: 'Priya Sharma', type: 'Defendant' }
    ],
    timeline: [
      {
        date: '2024-01-15',
        event: 'Case Filed',
        description: 'Initial complaint filed by plaintiff',
        status: 'completed'
      },
      {
        date: '2024-02-01',
        event: 'First Hearing',
        description: 'Preliminary hearing conducted',
        status: 'completed'
      },
      {
        date: '2024-03-15',
        event: 'Evidence Submission',
        description: 'Both parties submitted evidence',
        status: 'completed'
      },
      {
        date: '2024-04-20',
        event: 'Next Hearing',
        description: 'Witness examination scheduled',
        status: 'upcoming'
      },
      {
        date: '2024-05-30',
        event: 'Final Arguments',
        description: 'Tentative date for final arguments',
        status: 'scheduled'
      }
    ],
    nextHearing: {
      date: '2024-04-20',
      time: '10:30 AM',
      purpose: 'Witness Examination'
    }
  };

  const searchCase = () => {
    if (!caseNumber.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCaseDetails(mockCaseData);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5C4033] mb-4">
            Case Timeline Viewer
          </h1>
          <p className="text-xl text-gray-600">
            Track your case progress and upcoming hearings
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Case Number (e.g., CNR-DL-01-2024-123456)"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            />
            <button
              onClick={searchCase}
              disabled={loading}
              className="bg-[#5C4033] text-white px-6 py-3 rounded-lg hover:bg-[#4b3329] transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Case'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Enter your case number to view detailed timeline and status
          </p>
        </div>

        {caseDetails ? (
          <div className="space-y-8">
            {/* Case Overview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#5C4033]">Case Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Case Number</h3>
                  <p className="text-lg">{caseDetails.caseNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Case Type</h3>
                  <p className="text-lg">{caseDetails.caseType}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Court</h3>
                  <p className="text-lg">{caseDetails.court}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Filing Date</h3>
                  <p className="text-lg">{caseDetails.filingDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Current Status</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {caseDetails.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Presiding Judge</h3>
                  <p className="text-lg">{caseDetails.judge}</p>
                </div>
              </div>

              {/* Parties Involved */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-4">Parties Involved</h3>
                <div className="flex flex-wrap gap-4">
                  {caseDetails.parties.map((party, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{party.name}</p>
                      <p className="text-sm text-gray-600">{party.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Hearing */}
            {caseDetails.nextHearing && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-blue-800">Next Hearing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-2">Date</h3>
                    <p className="text-lg">{caseDetails.nextHearing.date}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-2">Time</h3>
                    <p className="text-lg">{caseDetails.nextHearing.time}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-2">Purpose</h3>
                    <p className="text-lg">{caseDetails.nextHearing.purpose}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Set Reminder
                  </button>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#5C4033]">Case Timeline</h2>
              <div className="space-y-8">
                {caseDetails.timeline.map((event, index) => (
                  <div key={index} className="flex">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'completed' ? 'bg-green-500' : 
                        event.status === 'upcoming' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></div>
                      {index < caseDetails.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    
                    {/* Event content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{event.event}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(event.status)}`}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <p className="text-sm text-gray-500">Date: {event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#5C4033]">Case Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-[#5C4033] text-white p-4 rounded-lg hover:bg-[#4b3329] transition">
                  Download Case File
                </button>
                <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition">
                  Contact Lawyer
                </button>
                <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition">
                  Set Hearing Reminder
                </button>
                <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition">
                  View Related Documents
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && caseNumber && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No case found with the provided number.</p>
            </div>
          )
        )}

        {/* Sample Case Numbers */}
        {!caseDetails && !loading && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h3 className="font-semibold mb-4">Sample Case Numbers for Testing:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>CNR-DL-01-2024-123456</li>
              <li>CNR-MH-02-2024-654321</li>
              <li>CNR-KA-03-2024-789012</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseTimelineViewer;