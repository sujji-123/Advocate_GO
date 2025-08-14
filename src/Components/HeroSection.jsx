import { Link } from 'react-router-dom';
import court2 from '../assets/court2.jpg';

const HeroSection = () => {
  return (
    <section 
      className="relative py-16 px-6 h-screen"
      style={{
        backgroundImage: `url(${court2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to AdvocateGO!
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
          Your one-step solution for legal assistance. Understand your rights, find the right lawyer, 
          and get legal help in your preferred language - all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/more" 
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-medium mb-4"
          >
            Learn More
          </Link>
          <button 
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-medium flex items-center justify-center gap-2 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM10 11a1 1 0 100-2 1 1 0 000 2zm0 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            SOS Emergency
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;