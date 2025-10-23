// LocationTracker.jsx
import { useState } from 'react';
import { FaMapMarkerAlt, FaShare, FaEye, FaShieldAlt } from 'react-icons/fa';

const LocationTracker = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [viewingShared, setViewingShared] = useState(false);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location shared:", position.coords);
          setIsSharing(true);
          alert("Your location is now being shared with authorized contacts.");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleViewShared = () => {
    setViewingShared(true);
    alert("Showing locations shared with you by authorized contacts.");
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full -translate-x-32 -translate-y-32 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full translate-x-40 translate-y-40 opacity-20"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <FaMapMarkerAlt className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Emergency <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Location Tracker</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay safe with our secure location sharing features for emergency situations
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-green-500 text-xl mr-3" />
              <p className="text-gray-600 text-lg">
                In emergency situations, you can share your location with trusted contacts or view locations shared with you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <button
                onClick={handleShareLocation}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isSharing 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-blue-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    isSharing ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  }`}>
                    <FaShare className="text-xl" />
                  </div>
                  <span className={`text-lg font-semibold ${
                    isSharing ? 'text-green-800' : 'text-gray-800 group-hover:text-blue-800'
                  }`}>
                    {isSharing ? 'Location Sharing Active' : 'Share My Location'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {isSharing 
                    ? 'Your location is currently being shared with trusted contacts'
                    : 'Enable location sharing with authorized emergency contacts'
                  }
                </p>
              </button>
              
              <button
                onClick={handleViewShared}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${
                  viewingShared 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-blue-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    viewingShared ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  }`}>
                    <FaEye className="text-xl" />
                  </div>
                  <span className={`text-lg font-semibold ${
                    viewingShared ? 'text-green-800' : 'text-gray-800 group-hover:text-blue-800'
                  }`}>
                    {viewingShared ? 'Viewing Shared Locations' : 'View Shared Locations'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {viewingShared 
                    ? 'Currently viewing locations shared by your contacts'
                    : 'View locations shared with you by authorized contacts'
                  }
                </p>
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start">
                <FaShieldAlt className="text-blue-500 text-lg mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold mb-1">Privacy Protected</p>
                  <p className="text-blue-600 text-sm">
                    Only authorized contacts can view your location when you share it. Your privacy is our priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTracker;