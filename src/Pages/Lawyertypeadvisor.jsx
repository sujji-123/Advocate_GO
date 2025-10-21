import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function LawyerTypeAdvisorPage() {
  const [query, setQuery] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("text");
  const [advisors, setAdvisors] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setQuery(prev => prev + " " + result);
    },
  });

  // Mock data - would come from API in real implementation
  useEffect(() => {
    const mockAdvisors = [
      {
        id: 1,
        name: "Adv. Rajesh Kumar",
        specialty: "Family Law",
        rating: 4.8,
        reviews: 124,
        education: "LLM, National Law School",
        languages: ["English", "Hindi"],
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Adv. Priya Sharma",
        specialty: "Property Disputes",
        rating: 4.9,
        reviews: 89,
        education: "LLB, Delhi University",
        languages: ["English", "Hindi"],
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 3,
        name: "Adv. Amit Patel",
        specialty: "Criminal Law",
        rating: 4.7,
        reviews: 156,
        education: "LLB, Mumbai University",
        languages: ["English", "Hindi", "Gujarati"],
        image: "https://randomuser.me/api/portraits/men/51.jpg"
      }
    ];
    setAdvisors(mockAdvisors);
  }, []);

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError("Please describe your legal issue");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on query content
      const mockResponse = generateMockResponse(query);
      setResponse(mockResponse);
    } catch (err) {
      setError("Failed to get advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (queryText) => {
    const queryLower = queryText.toLowerCase();
    
    if (queryLower.includes("divorce") || queryLower.includes("marriage")) {
      return {
        lawyerType: "Family Lawyer",
        nextSteps: "1. Schedule a consultation\n2. Gather marriage certificates\n3. Document financial details",
        documents: ["ID Proof", "Marriage Certificate", "Financial Statements"],
        timeline: "2-3 weeks for notice, 6 months minimum separation required",
        sections: ["Hindu Marriage Act, 1955", "Section 13B", "Special Marriage Act, 1954"],
        description: "Family lawyers handle divorce, child custody, and marital issues. They can guide you through mediation or court proceedings."
      };
    } else if (queryLower.includes("property") || queryLower.includes("land")) {
      return {
        lawyerType: "Real Estate Lawyer",
        nextSteps: "1. Collect property documents\n2. Document any disputes\n3. Verify title history",
        documents: ["Property Deed", "Sale Agreement", "Title Documents"],
        timeline: "Varies by case complexity (typically 3-6 months)",
        sections: ["Transfer of Property Act, 1882", "Registration Act, 1908"],
        description: "Real estate lawyers handle property disputes, transactions, and land ownership issues."
      };
    } else if (queryLower.includes("criminal") || queryLower.includes("arrest")) {
      return {
        lawyerType: "Criminal Lawyer",
        nextSteps: "1. Document all evidence\n2. Avoid discussing the case publicly\n3. Prepare witness statements",
        documents: ["FIR Copy", "Bail Documents", "Witness Statements"],
        timeline: "Depends on court schedule (initial hearings within weeks)",
        sections: ["IPC Sections relevant to your case", "CrPC provisions"],
        description: "Criminal lawyers defend clients against charges and navigate the criminal justice system."
      };
    } else if (queryLower.includes("employment") || queryLower.includes("job")) {
      return {
        lawyerType: "Labor/Employment Lawyer",
        nextSteps: "1. Gather employment contract\n2. Document incidents\n3. Collect pay stubs",
        documents: ["Employment Contract", "Pay Slips", "Termination Notice"],
        timeline: "30-90 days for most employment disputes",
        sections: ["Industrial Disputes Act, 1947", "Shops and Establishment Act"],
        description: "Employment lawyers handle workplace disputes, wrongful termination, and labor law violations."
      };
    } else {
      return {
        lawyerType: "General Practice Lawyer",
        nextSteps: "1. Schedule a consultation\n2. Bring all related documents\n3. Prepare a timeline of events",
        documents: ["Any relevant contracts", "Government-issued ID", "Correspondence"],
        timeline: "Varies based on issue complexity",
        sections: ["Depends on your specific legal issue"],
        description: "A general practice lawyer can assess your situation and refer you to a specialist if needed."
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-red-600 mb-4">Emergency Legal Assistance</h3>
            <p className="mb-4">Call the National Legal Services Authority helpline immediately:</p>
            <a href="tel:15100" className="text-blue-600 font-bold block text-lg mb-4">15100</a>
            <p className="mb-4">Or contact your nearest police station.</p>
            <button 
              onClick={() => setShowEmergency(false)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-[#5C4033] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Not Sure What Type of Lawyer You Need?</h1>
          <p className="text-xl mb-8">Describe your problem. Get legal direction. Talk to a real advisor.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById("ask-section").scrollIntoView({behavior: "smooth"})}
              className="bg-white text-[#5C4033] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Legal Guidance
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Speak or type your issue</h3>
              <p className="text-gray-600">Describe your legal situation in simple terms</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Get matched with a legal advisor</h3>
              <p className="text-gray-600">Our system connects you with the right legal expert</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Receive guidance on next steps</h3>
              <p className="text-gray-600">Get clear advice on documents, timelines and legal process</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Ask Section */}
      <div id="ask-section" className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-6">Ask a Legal Advisor</h2>
          
          {/* Input Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === "text" ? "border-b-2 border-[#5C4033] text-[#5C4033]" : "text-gray-500"}`}
              onClick={() => setActiveTab("text")}
            >
              Text
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "voice" ? "border-b-2 border-[#5C4033] text-[#5C4033]" : "text-gray-500"}`}
              onClick={() => setActiveTab("voice")}
            >
              Voice
            </button>
          </div>
          
          {/* Text Input */}
          {activeTab === "text" && (
            <div className="mb-6">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Explain your legal issue (e.g., 'I need help with a divorce' or 'I have a property dispute with my neighbor')..."
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4033] mb-2 resize-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}
          
          {/* Voice Input */}
          {activeTab === "voice" && (
            <div className="mb-6">
              <div className="p-4 border border-gray-300 rounded-lg">
                <button
                  onClick={listening ? stop : listen}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${listening ? 'bg-red-100 text-red-700' : 'bg-[#5C4033] text-white'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  {listening ? "Stop Recording" : "Start Recording"}
                </button>
                {listening && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    Listening...
                  </div>
                )}
                {query && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-gray-800">{query}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Anonymity Toggle */}
          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
              className="w-5 h-5 accent-[#5C4033] rounded focus:ring-[#5C4033]"
            />
            <span className="text-sm text-gray-700">
              Ask Anonymously (your query will be visible to advisors but not linked to your account)
            </span>
          </label>
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-[#5C4033] text-white px-6 py-3 rounded-lg hover:bg-[#4b3329] transition mb-6 w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : 'Ask an Advisor'}
          </button>
          
          {/* Emergency Button */}
          <button
            onClick={() => setShowEmergency(true)}
            className="text-red-600 text-sm underline mb-6 block"
          >
            Emergency Legal Assistance
          </button>
          
          {/* Response Area */}
          {response && (
            <div className="bg-amber-50 p-6 rounded-xl shadow mt-6 border border-amber-200 animate-fade-in">
              <div className="flex items-start mb-4">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">
                    Suggested Lawyer Type: <span className="text-amber-700">{response.lawyerType}</span>
                  </h3>
                  <p className="text-gray-600 mb-3 whitespace-pre-line">{response.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Timeline
                  </h4>
                  <p className="text-gray-600">{response.timeline}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    Relevant Sections
                  </h4>
                  <p className="text-gray-600">{response.sections.join(", ")}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                    Documents Needed
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {response.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Next Steps
                  </h4>
                  <p className="text-gray-600 whitespace-pre-line">{response.nextSteps}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-amber-200">
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#5C4033] text-white px-6 py-2 rounded-lg hover:bg-[#4b3329] transition">
                    Book a Lawyer
                  </button>
                  <button className="border border-[#5C4033] text-[#5C4033] px-6 py-2 rounded-lg hover:bg-[#5C4033]/10 transition">
                    Check Legal Aid Eligibility
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Disclaimer: This is general information only, not legal advice. Consult a qualified lawyer for your specific situation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trusted Advisors Carousel */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Top Trusted Advisors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map(advisor => (
              <div key={advisor.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img className="w-16 h-16 rounded-full object-cover mr-4" src={advisor.image} alt={advisor.name} />
                    <div>
                      <h3 className="font-bold text-lg">{advisor.name}</h3>
                      <p className="text-gray-600 text-sm">{advisor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(advisor.rating) ? 'fill-current text-amber-400' : 'fill-none stroke-current text-amber-400'}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">{advisor.rating} ({advisor.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{advisor.education}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {advisor.languages.map(lang => (
                      <span key={lang} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{lang}</span>
                    ))}
                  </div>
                  <button className="w-full bg-[#5C4033] text-white py-2 rounded-lg hover:bg-[#4b3329] transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Basics Section */}
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Legal Basics Everyone Should Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">Basic Rights</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Right to equality</li>
                <li>Right against exploitation</li>
                <li>Right to constitutional remedies</li>
                <li>Right to freedom of religion</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">Types of Lawyers</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Criminal Lawyers</li>
                <li>Civil Litigation Lawyers</li>
                <li>Corporate Lawyers</li>
                <li>Family Lawyers</li>
                <li>Intellectual Property Lawyers</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">How Courts Work</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Hierarchy of courts</li>
                <li>Filing a case</li>
                <li>Court procedures</li>
                <li>Alternative dispute resolution</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#5C4033] text-white px-6 py-3 rounded-lg hover:bg-[#4b3329] transition">
              Read More in Legal Education Hub
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Access Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex flex-col items-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5C4033]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="mt-2 text-sm">Legal Self-Diagnosis</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex flex-col items-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5C4033]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              <span className="mt-2 text-sm">Top Law Colleges</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex flex-col items-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5C4033]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="mt-2 text-sm">Case Timeline Viewer</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex flex-col items-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5C4033]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="mt-2 text-sm">Nearby Lawyer Finder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerTypeAdvisorPage;