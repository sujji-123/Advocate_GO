import React, { useState } from "react";

const LawyerLocator = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showStateCourts, setShowStateCourts] = useState(false);

  // Sample state-wise courts data
  const stateCourts = {
    "Andhra Pradesh": [
      { name: "High Court of Andhra Pradesh", location: "Amaravati", type: "High Court" },
      { name: "District Court - Visakhapatnam", location: "Visakhapatnam", type: "District Court" }
    ],     
    "Telangana": [
      { name: "High Court of Telangana", location: "Hyderabad", type: "High Court" },
      { name: "City Civil Court", location: "Hyderabad", type: "District Court" }
    ],
    "Maharashtra": [
      { name: "Bombay High Court", location: "Mumbai", type: "High Court" },
      { name: "District Court - Pune", location: "Pune", type: "District Court" }
    ],
    "Delhi": [
      { name: "Delhi High Court", location: "New Delhi", type: "High Court" },
      { name: "Tis Hazari Courts", location: "Delhi", type: "District Court" }
    ],
    "Karnataka": [
      { name: "High Court of Karnataka", location: "Bengaluru", type: "High Court" },
      { name: "City Civil Court", location: "Bengaluru", type: "District Court" }
    ],
    "Tamil Nadu": [
      { name: "Madras High Court", location: "Chennai", type: "High Court" },
      { name: "District Court - Coimbatore", location: "Coimbatore", type: "District Court" }
    ],
    "West Bengal": [
      { name: "Calcutta High Court", location: "Kolkata", type: "High Court" },
      { name: "District Court - Howrah", location: "Howrah", type: "District Court" }
    ],
    "Gujarat": [
      { name: "Gujarat High Court", location: "Ahmedabad", type: "High Court" },
      { name: "District Court - Surat", location: "Surat", type: "District Court" }
    ],
    "Uttar Pradesh": [
      { name: "Allahabad High Court", location: "Prayagraj", type: "High Court" },
      { name: "District Court - Lucknow", location: "Lucknow", type: "District Court" }
    ],
    "Rajasthan": [
      { name: "Rajasthan High Court", location: "Jodhpur", type: "High Court" },
      { name: "District Court - Jaipur", location: "Jaipur", type: "District Court" }
    ],
    "Kerala": [
      { name: "Kerala High Court", location: "Kochi", type: "High Court" },
      { name: "District Court - Thiruvananthapuram", location: "Thiruvananthapuram", type: "District Court" }
    ]
  };

  const lawyers = [
    {
      name: "Adv. Rajesh Kumar",
      type: "Criminal Lawyer",
      location: "Delhi",
      distance: "2 km away",
      rating: "4.8",
      experience: "12 years"
    },
    {
      name: "Adv. Priya Sharma",
      type: "Family Lawyer",
      location: "Mumbai",
      distance: "5 km away",
      rating: "4.6",
      experience: "8 years"
    },
    {
      name: "Adv. Amit Patel",
      type: "Corporate Lawyer",
      location: "Bangalore",
      distance: "3 km away",
      rating: "4.9",
      experience: "15 years"
    },
    {
      name: "Adv. Neha Gupta",
      type: "Property Lawyer",
      location: "Hyderabad",
      distance: "1 km away",
      rating: "4.7",
      experience: "10 years"
    },
    {
      name: "Adv. Sanjay Verma",
      type: "Civil Rights Lawyer",
      location: "Kolkata",
      distance: "4 km away",
      rating: "4.5",
      experience: "9 years"
    },
    {
      name: "Adv. Anjali Singh",
      type: "Tax Lawyer",
      location: "Chennai",
      distance: "7 km away",
      rating: "4.8",
      experience: "11 years"
    }
  ];

  const handleStateClick = (state) => {
    setSelectedState(state);
    setShowStateCourts(true);
  };

  const resetStateSelection = () => {
    setSelectedState(null);
    setShowStateCourts(false);
  };

  // Coordinates for state hotspots on the map image
  const stateHotspots = [
    { state: "Maharashtra", x: "40%", y: "50%" },
    { state: "Delhi", x: "50%", y: "30%" },
    { state: "Karnataka", x: "45%", y: "65%" },
    { state: "Tamil Nadu", x: "50%", y: "75%" },
    { state: "West Bengal", x: "65%", y: "40%" },
    { state: "Gujarat", x: "30%", y: "45%" },
    { state: "Andhra Pradesh", x: "55%", y: "60%" },
    { state: "Telangana", x: "48%", y: "55%" },
    { state: "Uttar Pradesh", x: "55%", y: "35%" },
    { state: "Rajasthan", x: "40%", y: "35%" },
    { state: "Kerala", x: "45%", y: "75%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#0b1f3a] text-white px-6 py-5 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">⚖️ AdvocateGO</h1>
          <p className="text-sm mt-2 md:mt-0">Your trusted legal locator</p>
        </div>
      </header>

      {/* Hero Section with Court View BG Image */}
      <section
        className="relative text-white text-center py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1470&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Find Trusted Lawyers & Courts Near You
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Use your location to discover top-rated legal professionals in seconds.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-xl text-lg shadow-md">
            📍 Use My Location
          </button>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search lawyers or courts..."
          className="px-4 py-3 rounded-xl border border-gray-700 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white"
        />
        <select className="px-4 py-3 border border-gray-700 rounded-xl w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white">
          <option>All Categories</option>
          <option>Criminal Lawyer</option>
          <option>Civil Lawyer</option>
          <option>Family Court</option>
          <option value="corporate">Corporate/Business Lawyer</option>
          <option value="constitutional">Constitutional Lawyer</option>
          <option value="environmental">Environmental Lawyer</option>
          <option value="labour">Labour and Employment Lawyer</option>
          <option value="property">Property/Real Estate Lawyer</option>
          <option value="tax">Tax Lawyer</option>
          <option value="medical">Medical/Healthcare Lawyer</option>
          <option value="cyber">Cyber Lawyer</option>
          <option value="education">Education Lawyer</option>
          <option value="humanRights">Human Rights Lawyer</option>
          <option value="administrative">Administrative Lawyer</option>
          <option value="international">International Lawyer</option>
          <option value="ip">Intellectual Property (IP) Lawyer</option>
        </select>
      </section>

      {/* Horizontal Scrollable Lawyers */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Legal Professionals</h2>
        <h3>"Explore our most recommended legal experts near you."</h3>
        <br></br>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6" style={{ minWidth: `${lawyers.length * 320}px` }}>
            {lawyers.map((lawyer, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-400"
              >
                <h3 className="text-xl font-bold text-white">{lawyer.name}</h3>
                <p className="text-sm text-yellow-400 mt-1">{lawyer.type}</p>
                <p className="text-sm text-gray-300 mt-1">{lawyer.location}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {lawyer.distance}</p>
                <div className="flex gap-3 mt-5">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
                    Call
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm">
                    Directions
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm">
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* Interactive India Map Section */}
       <section className="py-12 bg-gray-800 border-t border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">State-wise Courts in India</h2>
          <h3>"Locate courts across India with state-wise filtering and smart navigation tools."</h3>
          <br></br>
          
          {!showStateCourts ? (
            <div className="relative bg-gray-900 rounded-xl overflow-hidden ml-10">
              <div className="relative h-auto ml-10">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/India-map-en.svg/1200px-India-map-en.svg.png" 
                  alt="India Map" 
                  className="w-full h-auto max-h-[600px] object-contain"
                  useMap="#indiaMap"
                  
                />
                
                {/* Clickable hotspots for each state */}
                <map name="indiaMap">
                  {stateHotspots.map((hotspot, index) => (
                    <area 
                      key={index}
                      shape="circle"
                      coords={`${hotspot.x},${hotspot.y},20`}
                      alt={hotspot.state}
                      title={hotspot.state}
                      onClick={() => handleStateClick(hotspot.state)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </map>
                
                {/* Visual markers for each state */}
                <div className="absolute inset-0">
                  {stateHotspots.map((hotspot, index) => (
                    <div 
                      key={index}
                      className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse cursor-pointer transform -translate-x-2 -translate-y-2"
                      style={{ left: hotspot.x, top: hotspot.y }}
                      onClick={() => handleStateClick(hotspot.state)}
                      title={hotspot.state}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-300">Click on any state to view its major courts</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-yellow-400">
                  Major Courts in {selectedState}
                </h3>
                <button 
                  onClick={resetStateSelection}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Map
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stateCourts[selectedState]?.map((court, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500 hover:bg-gray-700 transition">
                    <h4 className="text-lg font-semibold text-white">{court.name}</h4>
                    <div className="flex items-center mt-2">
                      <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">{court.type}</span>
                    </div>
                    <div className="flex items-center mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-300 text-sm">{court.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


       
      Global Legal Network
      <section className="py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Global Legal Network</h2>
          <div className="relative h-64 md:h-96 bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="World map showing global legal network"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-black bg-opacity-60 rounded-xl">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">International Coverage</h3>
                <p className="text-lg">50+ countries with verified legal professionals</p>
              </div>
            </div>
            {/* Location markers */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* India Legal Hotspots */}
      <section className="py-12 bg-gray-800 border-t border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Legal Hotspots in India</h2>
          <div className="relative h-64 md:h-96 bg-gray-900 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="India map showing legal hotspots"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-black bg-opacity-60 rounded-xl">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">Major Legal Hubs</h3>
                <p className="text-lg">Delhi • Mumbai • Hyderabad • Bangalore • Kolkata</p>
              </div>
            </div>
            {/* Location markers */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2/5 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-3/5 left-3/4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>



      <h2><b>Law</b> plays a vital role in maintaining justice, equality, and peace across the world. Our Lawyer and Court Locator connects people to trusted legal help, making justice more accessible, one location at a time.</h2>

      {/* <div> */}
    {/* <iframe src='https://my.spline.design/worldplanet-DkqEwfnp7Ngyil20BgmItmwr/' frameborder='0' width='100%' height='400%'></iframe> */}
      {/* </div> */}



      Footer
      <footer className="bg-[#0b1f3a] text-gray-300 text-center py-6 text-sm border-t border-gray-700">
        <p>© 2025 AdvocateGO. Built with ❤️ by Devika.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-yellow-400">Privacy</a>
          <a href="#" className="hover:text-yellow-400">Terms</a>
          <a href="#" className="hover:text-yellow-400">Contact</a>
        </div>
      </footer>
    </div>
  );
}; 



export default LawyerLocator;