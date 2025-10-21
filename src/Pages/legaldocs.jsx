import React, { useState } from "react";
import { FileText, Scale, Home, Info, CheckCircle } from "lucide-react";

export default function LegalDocsPage() {
  const [step, setStep] = useState(1);
  const [caseType, setCaseType] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [search, setSearch] = useState("");

  const cases = [
    {
      title: "Criminal Case",
      icon: <FileText className="w-8 h-8 text-red-600" />,
      docs: [
        { name: "FIR Copy", sample: "#" },
        { name: "Charge Sheet", sample: "#" },
        { name: "Witness Statements", sample: "#" },
        { name: "Accused Details", sample: "#" },
      ],
    },
    {
      title: "Civil Case",
      icon: <Scale className="w-8 h-8 text-blue-600" />,
      docs: [
        { name: "Plaint Petition", sample: "#" },
        { name: "Affidavit", sample: "#" },
        { name: "Proof of Identity", sample: "#" },
        { name: "Supporting Evidence", sample: "#" },
      ],
    },
    {
      title: "Property Case",
      icon: <Home className="w-8 h-8 text-green-600" />,
      docs: [
        { name: "Property Title Deed", sample: "#" },
        { name: "Sale Agreement", sample: "#" },
        { name: "Encumbrance Certificate", sample: "#" },
        { name: "Tax Receipts", sample: "#" },
      ],
    },
  ];

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Legal Document Upload
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mb-10">
        Upload documents required for your legal case. Follow the guided steps
        below to complete the process.
      </p>

      {/* Progress Bar */}
      <div className="flex items-center mb-10 w-full max-w-3xl">
        {["Select Case", "Upload Docs", "Submit"].map((label, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                step > i ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              {step > i ? <CheckCircle className="w-6 h-6" /> : i + 1}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {label}
            </span>
            {i < 2 && <div className="flex-1 h-1 bg-gray-300 mx-4"></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Demo & Case Selection */}
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="🔍 Search case type..."
            className="w-full max-w-md mb-6 p-3 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Demo: Required Documents
          </h2>
          <div className="grid gap-6 md:grid-cols-3 w-full max-w-5xl">
            {filteredCases.map((c, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl hover:scale-105 transition cursor-pointer"
                onClick={() => {
                  setCaseType(c.title);
                  setStep(2);
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {c.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {c.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {c.docs.map((doc, j) => (
                    <li
                      key={j}
                      className="flex justify-between items-center text-gray-700"
                    >
                      <span>{doc.name}</span>
                      <a
                        href={doc.sample}
                        className="text-blue-600 text-sm underline"
                      >
                        Sample
                      </a>
                      <Info className="w-4 h-4 text-gray-400 ml-2" title="Why needed?" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Upload Section */}
      {step === 2 && (
        <div className="mt-6 w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Documents for {caseType}
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50">
            <p className="text-gray-600 mb-3">
              Drag & drop files here, or click to upload
            </p>
            <input
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files.length > 0) setUploaded(true);
              }}
            />
          </div>
          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            disabled={!uploaded}
            onClick={() => setStep(3)}
          >
            Continue to Submit
          </button>
        </div>
      )}

      {/* Step 3: Submission */}
      {step === 3 && (
        <div className="mt-6 w-full max-w-xl bg-green-50 p-6 rounded-xl shadow-md text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Documents Submitted Successfully!
          </h2>
          <p className="text-gray-700">
            Your documents for <b>{caseType}</b> have been received. Our legal
            team will review them and get back to you shortly.
          </p>
        </div>
      )}
      
    </div>
  );
}