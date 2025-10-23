// src/Components/ProfileCarousel.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileCarousel = ({ title, profiles, profileType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    if (currentIndex < profiles.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to generate empty profile placeholder based on gender
  const getEmptyProfileImage = (profile) => {
    const initials = profile.name.split(' ').map(word => word[0]).join('').toUpperCase();
    
    // Auto-detect gender from name if not provided
    let gender = profile.gender;
    if (!gender) {
      const nameLower = profile.name.toLowerCase();
      if (nameLower.includes('adv.') || nameLower.includes('prof.') || nameLower.includes('dr.')) {
        // For professionals, check name patterns
        const firstName = profile.name.split(' ')[1] || '';
        if (firstName.toLowerCase().endsWith('a') || nameLower.includes('female') || 
            nameLower.includes('priya') || nameLower.includes('meera') || nameLower.includes('sunita') ||
            nameLower.includes('ananya') || nameLower.includes('neha') || nameLower.includes('sanya')) {
          gender = 'female';
        } else {
          gender = 'male';
        }
      } else {
        // For students, check common female name patterns
        const firstName = profile.name.split(' ')[0] || '';
        if (firstName.toLowerCase().endsWith('a') || 
            ['priya', 'meera', 'sunita', 'ananya', 'neha', 'sanya'].some(name => 
              firstName.toLowerCase().includes(name))) {
          gender = 'female';
        } else {
          gender = 'male';
        }
      }
    }
    
    if (gender === 'female') {
      return (
        <div className="w-full h-48 bg-pink-100 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-pink-300 flex items-center justify-center">
            <span className="text-pink-700 text-4xl font-bold">{initials}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-48 bg-blue-100 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center">
            <span className="text-blue-700 text-4xl font-bold">{initials}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section className={`py-12 px-6 ${profileType === 'lawyers' ? 'bg-amber-100' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {profiles.map((profile) => (
                <div key={profile.id} className="w-full sm:w-1/2 md:w-1/4 px-4 flex-shrink-0 mb-4">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full">
                    {getEmptyProfileImage(profile)}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{profile.specialty}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`h-4 w-4 ${i < profile.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-gray-600 text-xs ml-1">({profile.reviews})</span>
                      </div>
                      <Link 
                        to={`/${profileType}/${profile.id}`}
                        className="inline-block mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 transition"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {currentIndex > 0 && (
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {currentIndex < profiles.length - itemsPerPage && (
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileCarousel;