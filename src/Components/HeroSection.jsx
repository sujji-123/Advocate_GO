// HeroSection.jsx
import { Link } from 'react-router-dom';
import court2 from '../assets/court2.jpg';

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${court2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-ping"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">AdvocateGO</span>!
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          Your one-step solution for legal assistance. Understand your rights, find the right lawyer, 
          and get legal help in your preferred language - all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
          <Link 
            to="/more" 
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center min-w-[180px]"
          >
            <span>Learn More</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            to="/top-law-colleges" 
            className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center min-w-[180px]"
          >
            <span>Top Law Colleges</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;