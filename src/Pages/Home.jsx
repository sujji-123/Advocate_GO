// src/Pages/Home.jsx
import HeroSection from '../Components/HeroSection';
import CategoryCarousel from '../Components/CategoryCarousel';
import WhyChooseUs from '../Components/WhyChooseUs';
import ProfileCarousel from '../Components/ProfileCarousel';
import FAQSection from '../Components/FAQSection';
import LocationTracker from '../Components/LocationTracker';
import Testimonials from '../Components/Testimonials';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

// Using random user API for profile images with gender information
const lawyers = [
  {
    id: 1,
    name: "Adv. Meera Krishnan",
    specialty: "Corporate Law",
    rating: 5,
    reviews: 128,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    gender: "female",
  },
  {
    id: 2,
    name: "Adv. Rohan Malhotra",
    specialty: "Criminal Defense",
    rating: 5,
    reviews: 96,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    gender: "male",
  },
  {
    id: 3,
    name: "Adv. Sunita Rao",
    specialty: "Family Law",
    rating: 4,
    reviews: 87,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    gender: "female",
  },
  {
    id: 4,
    name: "Adv. Vikram Joshi",
    specialty: "Intellectual Property",
    rating: 4,
    reviews: 72,
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    gender: "male",
  },
  {
    id: 5,
    name: "Adv. Priyanka Sharma",
    specialty: "Labor Law",
    rating: 4,
    reviews: 65,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    gender: "female",
  },
];

const students = [
  {
    id: 1,
    name: "Ananya Gupta",
    specialty: "NALSAR University",
    rating: 5,
    reviews: 42,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    gender: "female",
  },
  {
    id: 2,
    name: "Rahul Deshpande",
    specialty: "NLU Delhi",
    rating: 5,
    reviews: 38,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    gender: "male",
  },
  {
    id: 3,
    name: "Neha Reddy",
    specialty: "NLSIU Bangalore",
    rating: 4,
    reviews: 31,
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    gender: "female",
  },
  {
    id: 4,
    name: "Arjun Patel",
    specialty: "WBNUJS Kolkata",
    rating: 4,
    reviews: 27,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    gender: "male",
  },
  {
    id: 5,
    name: "Sanya Verma",
    specialty: "GNLU Gandhinagar",
    rating: 4,
    reviews: 23,
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    gender: "female",
  },
];

const advisors = [
  {
    id: 1,
    name: "Prof. Rajan Menon",
    specialty: "Constitutional Law Expert",
    rating: 5,
    reviews: 56,
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    gender: "male",
  },
  {
    id: 2,
    name: "Dr. Sunita Iyer",
    specialty: "Human Rights Specialist",
    rating: 5,
    reviews: 48,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    gender: "female",
  },
  {
    id: 3,
    name: "Adv. Harish Khanna (Retd.)",
    specialty: "Former High Court Judge",
    rating: 5,
    reviews: 39,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
    gender: "male",
  },
  {
    id: 4,
    name: "Dr. Priya Nair",
    specialty: "International Law",
    rating: 4,
    reviews: 34,
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    gender: "female",
  },
  {
    id: 5,
    name: "Adv. Sameer Kapoor",
    specialty: "Corporate Law Consultant",
    rating: 4,
    reviews: 29,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    gender: "male",
  },
];

const Home = ({ searchQuery }) => {
  useEffect(() => {
    if (searchQuery) {
      console.log("Search Query in Home:", searchQuery);
    }
  }, [searchQuery]);

  const filteredLawyers = lawyers.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredStudents = students.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAdvisors = advisors.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <HeroSection />

      {/* Demo Account Section - Enhanced Styling */}
      <section className="relative py-16 md:py-20 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Explore <span className="text-yellow-300">AdvocateGO</span>?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience comprehensive legal assistance with our instant demo account. 
            No email verification required - perfect for testing and exploration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              to="/demo-signup"
              className="group bg-white text-teal-600 px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-lg transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center min-w-[200px]"
            >
              <span>Create Demo Account</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/register"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold text-lg transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center min-w-[200px]"
            >
              <span>Regular Sign Up</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
          
          <p className="text-white/70 text-sm font-medium">
            💫 Demo accounts include all features without email verification
          </p>
        </div>
      </section>

      {/* Main Content with Enhanced Sections */}
      {(filteredLawyers.length > 0 || filteredStudents.length > 0 || filteredAdvisors.length > 0 || !searchQuery) ? (
        <div className="space-y-20 md:space-y-24 py-16 md:py-20">
          <CategoryCarousel />
          
          <WhyChooseUs />
          
          {filteredLawyers.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 transform -skew-y-2 -z-10"></div>
              <ProfileCarousel
                title="Meet Our Top Lawyers"
                profiles={filteredLawyers}
                profileType="lawyers"
              />
            </div>
          )}
          
          {filteredStudents.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform skew-y-2 -z-10"></div>
              <ProfileCarousel
                title="Connect with Law Students"
                profiles={filteredStudents}
                profileType="students"
              />
            </div>
          )}
          
          {filteredAdvisors.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 transform -skew-y-2 -z-10"></div>
              <ProfileCarousel
                title="Our Expert Advisors"
                profiles={filteredAdvisors}
                profileType="advisors"
              />
            </div>
          )}
          
          <FAQSection />
          
          <LocationTracker />
          
          <Testimonials />
        </div>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Results Found</h2>
            <p className="text-gray-600 mb-6">Your search for "<span className="font-semibold text-gray-800">"{searchQuery}"</span>" did not match any profiles.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;