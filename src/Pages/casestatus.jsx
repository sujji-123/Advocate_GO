// src/Pages/casestatus.jsx
import React, { useState } from "react";
// No Navbar or Footer needed here

const CaseStatus = () => {
  const [client] = useState({
    name: "Ravi Kumar",
    clientId: "CL-2025-00123",
    email: "ravi.kumar@example.com",
    phone: "+91 98765 43210",
    cases: [
      {
        caseId: "C-2025-10001",
        title: "Murder Case: State vs. Ravi Kumar",
        court: "Hyderabad High Court",
        advocate: "Adv. Meera Sharma",
        status: "In Progress",
        nextHearing: "5th September 2025",
        progress: 40,
        updates: [
          { date: "01 Aug 2025", update: "FIR registered" },
          { date: "10 Aug 2025", update: "Charge sheet filed" },
          { date: "22 Aug 2025", update: "First hearing scheduled" },
        ],
      },
      {
        caseId: "C-2025-10002",
        title: "Property Dispute: Ravi Kumar vs. Family",
        court: "Hyderabad Civil Court",
        advocate: "Adv. Rajesh Kumar",
        status: "In Progress",
        nextHearing: "15th September 2025",
        progress: 60,
        updates: [
          { date: "02 Aug 2025", update: "Case registered" },
          { date: "14 Aug 2025", update: "Evidence submission ongoing" },
          { date: "21 Aug 2025", update: "Cross examination scheduled" },
        ],
      },
      {
        caseId: "C-2025-10003",
        title: "Missing Person: Anil Kumar",
        court: "Hyderabad Sessions Court",
        advocate: "Adv. Priya Menon",
        status: "Under Investigation",
        nextHearing: "20th September 2025",
        progress: 25,
        updates: [
          { date: "03 Aug 2025", update: "Complaint lodged" },
          { date: "18 Aug 2025", update: "Police investigation ongoing" },
        ],
      },
    ],
  });

  return (
    // Replaced outer div with main tag as Navbar/Footer are in App.jsx
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Header (can be kept as a page-specific header if needed) */}
      <header className="bg-[#0b1f3a] text-white px-6 py-5 shadow-md border-b border-gray-700 rounded-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">⚖ AdvocateGO</h1>
          <p className="text-sm mt-2 md:mt-0">Client Case Dashboard</p>
        </div>
      </header>

      {/* Client Info */}
      <section className="max-w-6xl mx-auto mt-10 bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Client: {client.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <p><span className="font-semibold text-yellow-300">Client ID:</span> {client.clientId}</p>
          <p><span className="font-semibold text-yellow-300">Email:</span> {client.email}</p>
          <p><span className="font-semibold text-yellow-300">Phone:</span> {client.phone}</p>
        </div>
      </section>

      {/* Cases Section */}
      <section className="max-w-6xl mx-auto mt-8 space-y-8">
        {client.cases.map((caseItem, index) => (
          <div key={index} className="bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400 mb-2">
              {caseItem.title}
            </h2>
            <p className="text-gray-400 mb-4">Case ID: {caseItem.caseId}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><span className="font-semibold text-yellow-300">Court:</span> {caseItem.court}</p>
              <p><span className="font-semibold text-yellow-300">Advocate:</span> {caseItem.advocate}</p>
              <p>
                <span className="font-semibold text-yellow-300">Status:</span>{" "}
                <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs">
                  {caseItem.status}
                </span>
              </p>
              <p><span className="font-semibold text-yellow-300">Next Hearing:</span> {caseItem.nextHearing}</p>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Case Progress</p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${caseItem.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Updates */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Recent Updates</h3>
              <ul className="space-y-3">
                {caseItem.updates.map((u, i) => (
                  <li key={i} className="p-4 bg-gray-700 rounded-lg border-l-4 border-yellow-500">
                    <span className="font-medium text-gray-100">{u.date}:</span>{" "}
                    <span className="text-gray-300">{u.update}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Flowchart */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Case Flow</h3>
              <div className="flex items-center justify-center">
                <svg className="w-full max-w-xl" viewBox="0 0 500 150">
                  <g fill="none" stroke="yellow" strokeWidth="2">
                    <circle cx="50" cy="75" r="20" fill="gray" />
                    <text x="50" y="80" textAnchor="middle" fill="white" fontSize="10">Filed</text>
                    <line x1="70" y1="75" x2="150" y2="75" />
                    <circle cx="170" cy="75" r="20" fill="gray" />
                    <text x="170" y="80" textAnchor="middle" fill="white" fontSize="10">Hearing</text>
                    <line x1="190" y1="75" x2="270" y2="75" />
                    <circle cx="290" cy="75" r="20" fill="gray" />
                    <text x="290" y="80" textAnchor="middle" fill="white" fontSize="10">Evidence</text>
                    <line x1="310" y1="75" x2="390" y2="75" />
                    <circle cx="410" cy="75" r="20" fill="gray" />
                    <text x="410" y="80" textAnchor="middle" fill="white" fontSize="10">Judgment</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer (This can be removed if App.jsx handles it, but kept here as it's custom) */}
      <footer className="bg-[#0b1f3a] text-gray-300 text-center py-6 text-sm border-t border-gray-700 mt-10 rounded-lg">
        <p>© 2025 AdvocateGO.</p>
      </footer>
    </main>
  );
};

export default CaseStatus;