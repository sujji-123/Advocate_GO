import React, { useState, useRef } from "react";
import { FileText, Scale, Home, Info, CheckCircle, Upload, X, Eye, Heart, Building, Users, Car, Briefcase, Globe, Shield, Landmark, Book } from "lucide-react";

export default function LegalDocsPage() {
  const [step, setStep] = useState(1);
  const [caseType, setCaseType] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [search, setSearch] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  const cases = [
    {
      title: "Criminal Law",
      icon: <Shield className="w-8 h-8 text-red-600" />,
      docs: [
        { name: "FIR Copy", sample: "#", required: true },
        { name: "Charge Sheet", sample: "#", required: true },
        { name: "Witness Statements", sample: "#", required: true },
        { name: "Accused Details", sample: "#", required: true },
        { name: "Medical Reports", sample: "#", required: false },
        { name: "Forensic Evidence", sample: "#", required: false },
      ],
    },
    {
      title: "Civil Law",
      icon: <Scale className="w-8 h-8 text-blue-600" />,
      docs: [
        { name: "Plaint Petition", sample: "#", required: true },
        { name: "Affidavit", sample: "#", required: true },
        { name: "Proof of Identity", sample: "#", required: true },
        { name: "Supporting Evidence", sample: "#", required: true },
        { name: "Witness List", sample: "#", required: false },
      ],
    },
    {
      title: "Property Law",
      icon: <Home className="w-8 h-8 text-green-600" />,
      docs: [
        { name: "Property Title Deed", sample: "#", required: true },
        { name: "Sale Agreement", sample: "#", required: true },
        { name: "Encumbrance Certificate", sample: "#", required: true },
        { name: "Tax Receipts", sample: "#", required: true },
        { name: "Property Survey Map", sample: "#", required: false },
        { name: "Mutation Documents", sample: "#", required: false },
      ],
    },
    {
      title: "Family Law",
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      docs: [
        { name: "Marriage Certificate", sample: "#", required: true },
        { name: "Birth Certificates", sample: "#", required: true },
        { name: "Income Proof", sample: "#", required: true },
        { name: "Property Details", sample: "#", required: true },
        { name: "Medical Reports", sample: "#", required: false },
        { name: "Photographs", sample: "#", required: false },
      ],
    },
    {
      title: "Corporate Law",
      icon: <Building className="w-8 h-8 text-purple-600" />,
      docs: [
        { name: "Company Registration", sample: "#", required: true },
        { name: "MOA & AOA", sample: "#", required: true },
        { name: "Board Resolutions", sample: "#", required: true },
        { name: "Financial Statements", sample: "#", required: true },
        { name: "Shareholder Agreements", sample: "#", required: false },
        { name: "Tax Returns", sample: "#", required: false },
      ],
    },
    {
      title: "Labor Law",
      icon: <Users className="w-8 h-8 text-orange-600" />,
      docs: [
        { name: "Employment Contract", sample: "#", required: true },
        { name: "Salary Slips", sample: "#", required: true },
        { name: "Appointment Letter", sample: "#", required: true },
        { name: "Termination Notice", sample: "#", required: true },
        { name: "ESI/PF Documents", sample: "#", required: false },
        { name: "Company Policies", sample: "#", required: false },
      ],
    },
    {
      title: "Intellectual Property",
      icon: <Book className="w-8 h-8 text-indigo-600" />,
      docs: [
        { name: "IP Creation Proof", sample: "#", required: true },
        { name: "Design Drawings", sample: "#", required: true },
        { name: "Trademark Application", sample: "#", required: true },
        { name: "Copyright Certificate", sample: "#", required: true },
        { name: "Prior Art Search", sample: "#", required: false },
        { name: "Commercial Use Proof", sample: "#", required: false },
      ],
    },
    {
      title: "Administrative Law",
      icon: <Landmark className="w-8 h-8 text-teal-600" />,
      docs: [
        { name: "Government Order Copy", sample: "#", required: true },
        { name: "Application Copy", sample: "#", required: true },
        { name: "Identity Proof", sample: "#", required: true },
        { name: "Address Proof", sample: "#", required: true },
        { name: "Supporting Documents", sample: "#", required: false },
        { name: "Previous Correspondence", sample: "#", required: false },
      ],
    },
    {
      title: "Tax Law",
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
      docs: [
        { name: "PAN Card", sample: "#", required: true },
        { name: "Income Tax Returns", sample: "#", required: true },
        { name: "Financial Statements", sample: "#", required: true },
        { name: "Bank Statements", sample: "#", required: true },
        { name: "Audit Reports", sample: "#", required: false },
        { name: "Investment Proofs", sample: "#", required: false },
      ],
    },
    {
      title: "Environmental Law",
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
      docs: [
        { name: "Environmental Clearance", sample: "#", required: true },
        { name: "Project Report", sample: "#", required: true },
        { name: "Impact Assessment", sample: "#", required: true },
        { name: "Compliance Certificates", sample: "#", required: true },
        { name: "Monitoring Reports", sample: "#", required: false },
        { name: "Expert Opinions", sample: "#", required: false },
      ],
    },
    {
      title: "Cyber Law",
      icon: <FileText className="w-8 h-8 text-cyan-600" />,
      docs: [
        { name: "Digital Evidence", sample: "#", required: true },
        { name: "Screenshots", sample: "#", required: true },
        { name: "Server Logs", sample: "#", required: true },
        { name: "Email Conversations", sample: "#", required: true },
        { name: "Technical Reports", sample: "#", required: false },
        { name: "Expert Analysis", sample: "#", required: false },
      ],
    },
    {
      title: "Motor Vehicle Law",
      icon: <Car className="w-8 h-8 text-gray-600" />,
      docs: [
        { name: "Driving License", sample: "#", required: true },
        { name: "Vehicle RC", sample: "#", required: true },
        { name: "Insurance Policy", sample: "#", required: true },
        { name: "FIR Copy", sample: "#", required: true },
        { name: "Medical Reports", sample: "#", required: false },
        { name: "Vehicle Photos", sample: "#", required: false },
      ],
    },
    {
      title: "Consumer Law",
      icon: <Users className="w-8 h-8 text-rose-600" />,
      docs: [
        { name: "Purchase Invoice", sample: "#", required: true },
        { name: "Warranty Card", sample: "#", required: true },
        { name: "Complaint Correspondence", sample: "#", required: true },
        { name: "Product Photos", sample: "#", required: true },
        { name: "Expert Opinion", sample: "#", required: false },
        { name: "Service Records", sample: "#", required: false },
      ],
    },
    {
      title: "Immigration Law",
      icon: <Globe className="w-8 h-8 text-violet-600" />,
      docs: [
        { name: "Passport", sample: "#", required: true },
        { name: "Visa Application", sample: "#", required: true },
        { name: "Financial Proof", sample: "#", required: true },
        { name: "Educational Certificates", sample: "#", required: true },
        { name: "Employment Letter", sample: "#", required: false },
        { name: "Travel Itinerary", sample: "#", required: false },
      ],
    },
    {
      title: "Banking Law",
      icon: <Briefcase className="w-8 h-8 text-blue-800" />,
      docs: [
        { name: "Loan Agreement", sample: "#", required: true },
        { name: "Bank Statements", sample: "#", required: true },
        { name: "KYC Documents", sample: "#", required: true },
        { name: "Security Documents", sample: "#", required: true },
        { name: "Financial Projections", sample: "#", required: false },
        { name: "Credit Reports", sample: "#", required: false },
      ],
    }
  ];

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const errors = {};
    
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isValidType) {
        errors.fileType = 'Please upload PDF, JPEG, PNG, DOC, or DOCX files only';
      }
      if (!isValidSize) {
        errors.fileSize = 'File size should be less than 10MB';
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles.map(file => ({
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
        type: file.type,
        url: URL.createObjectURL(file)
      }))]);
      
      setUploaded(true);
    }
    
    setFormErrors(errors);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].url) {
        URL.revokeObjectURL(newFiles[index].url);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
    setUploaded(uploadedFiles.length > 1);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!caseType) {
      errors.caseType = 'Please select a case type';
    }
    
    if (uploadedFiles.length === 0) {
      errors.files = 'Please upload at least one document';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setStep(3);
    }
  };

  const handleQuickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getCurrentCaseDocs = () => {
    return cases.find(c => c.title === caseType)?.docs || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Legal Document Upload Portal
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Upload documents required for your legal case. Choose from various law categories and follow the guided steps.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-12 w-full max-w-3xl">
        {["Select Case Type", "Upload Documents", "Submit"].map((label, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-all duration-300 ${
                step > i + 1 ? "bg-green-600 shadow-lg" : 
                step === i + 1 ? "bg-blue-600 shadow-lg scale-110" : "bg-gray-300"
              }`}
            >
              {step > i + 1 ? <CheckCircle className="w-6 h-6" /> : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step === i + 1 ? "text-blue-600 font-semibold" : "text-gray-600"
            }`}>
              {label}
            </span>
            {i < 2 && (
              <div className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                step > i + 1 ? "bg-green-600" : "bg-gray-300"
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Case Selection */}
      {step === 1 && (
        <div className="w-full max-w-7xl">
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="🔍 Search law categories..."
                className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={handleQuickUpload}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Upload className="w-5 h-5" />
              Quick Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
            />
          </div>

          {/* Cases Grid */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Legal Categories Available
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCases.length > 0 ? (
              filteredCases.map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
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
                    {c.docs.slice(0, 3).map((doc, j) => (
                      <li
                        key={j}
                        className="flex justify-between items-center text-gray-700 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${doc.required ? "font-medium" : "text-gray-500"}`}>
                            {doc.name}
                            {doc.required && <span className="text-red-500 ml-1">*</span>}
                          </span>
                        </div>
                      </li>
                    ))}
                    {c.docs.length > 3 && (
                      <li className="text-blue-600 text-sm font-medium">
                        +{c.docs.length - 3} more documents...
                      </li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No law categories found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Upload Section */}
      {step === 2 && (
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors font-semibold"
          >
            ← Back to Categories
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Upload Documents for {caseType}
            </h2>
            <p className="text-gray-600 mb-6">
              Required documents are marked with <span className="text-red-500">*</span>
            </p>

            {/* Required Documents List */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Required Documents:</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {getCurrentCaseDocs().map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${doc.required ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                    <span className={`flex-1 ${doc.required ? "font-medium text-gray-800" : "text-gray-600"}`}>
                      {doc.name}
                    </span>
                    {doc.required && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                        Required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload Area */}
            <div
              className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer mb-6"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2 text-lg font-medium">
                Drag & drop files here, or click to upload
              </p>
              <p className="text-gray-500 text-sm">
                Supported formats: PDF, JPEG, PNG, DOC, DOCX (Max 10MB each)
              </p>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
              />
            </div>

            {/* Error Messages */}
            {formErrors.fileType && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 font-medium">{formErrors.fileType}</p>
              </div>
            )}
            {formErrors.fileSize && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 font-medium">{formErrors.fileSize}</p>
              </div>
            )}

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-4 text-lg">Uploaded Files:</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size} MB • {file.type.split('/')[1]?.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              className={`mt-8 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                uploaded && !formErrors.files
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!uploaded || formErrors.files}
              onClick={handleSubmit}
            >
              {uploaded ? 'Submit Documents' : 'Upload documents to continue'}
            </button>

            {formErrors.files && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 text-center">
                <p className="text-red-700 font-medium">{formErrors.files}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Submission Success */}
      {step === 3 && (
        <div className="w-full max-w-2xl bg-green-50 border-2 border-green-200 rounded-2xl p-8 shadow-xl text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Documents Submitted Successfully!
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Your documents for <b>{caseType}</b> have been received. Our legal team will review them and get back to you within 24-48 hours.
          </p>
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Uploaded Files:</h3>
            <div className="grid gap-2 text-left">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-sm text-gray-400 ml-auto">{file.size} MB</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setStep(1);
              setCaseType("");
              setUploaded(false);
              setUploadedFiles([]);
              setFormErrors({});
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Upload More Documents
          </button>
        </div>
      )}
    </div>
  );
}
