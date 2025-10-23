// LocationTracker.jsx
import { useState } from 'react';

const LocationTracker = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [viewingShared, setViewingShared] = useState(false);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would send this to your backend
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
    // In a real app, you would fetch shared locations from your backend
    setViewingShared(true);
    alert("Showing locations shared with you by authorized contacts.");
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Emergency Location Tracker
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 mb-6">
            In emergency situations, you can share your location with trusted contacts or view locations shared with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleShareLocation}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${isSharing ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {isSharing ? 'Location Sharing Active' : 'Share My Location'}
            </button>
            <button
              onClick={handleViewShared}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${viewingShared ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {viewingShared ? 'Viewing Shared Locations' : 'View Shared Location'}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Only authorized contacts can view your location when you share it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationTracker;