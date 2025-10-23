// HeroSection.jsx
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
          <Link to="/top-law-colleges" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-medium" type='button'>
            Top Law Colleges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;