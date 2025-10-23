// CategoryCarousel.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Indian Constitution",
    description: "Learn about the preamble and fundamental structure of India's constitution",
    bgColor: "from-blue-500 to-blue-600",
    icon: "📜"
  },
  {
    id: 2,
    title: "Fundamental Rights",
    description: "Understand your basic rights as an Indian citizen",
    bgColor: "from-green-500 to-emerald-600",
    icon: "⚖️"
  },
  {
    id: 3,
    title: "Legal System",
    description: "How the Indian legal system works and its hierarchy",
    bgColor: "from-purple-500 to-purple-600",
    icon: "🏛️"
  },
  {
    id: 4,
    title: "Criminal Law",
    description: "Know about IPC, CrPC, and criminal justice system",
    bgColor: "from-red-500 to-red-600",
    icon: "🔒"
  },
  {
    id: 5,
    title: "Civil Law",
    description: "Property, contracts, and other civil matters",
    bgColor: "from-yellow-500 to-amber-600",
    icon: "📝"
  },
  {
    id: 6,
    title: "Family Law",
    description: "Marriage, divorce, inheritance, and related matters",
    bgColor: "from-pink-500 to-pink-600",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: 7,
    title: "Consumer Rights",
    description: "Protect yourself against unfair trade practices",
    bgColor: "from-indigo-500 to-indigo-600",
    icon: "🛍️"
  },
  {
    id: 8,
    title: "Labor Laws",
    description: "Rights and protections for employees",
    bgColor: "from-teal-500 to-cyan-600",
    icon: "💼"
  },
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    if (currentIndex < categories.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full -translate-y-36 translate-x-36 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full translate-y-48 -translate-x-48 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Rights & The Law</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore comprehensive legal knowledge and understand your rights as a citizen
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {categories.map((category) => (
                <div key={category.id} className="w-full sm:w-1/2 md:w-1/4 px-4 flex-shrink-0">
                  <Link 
                    to={`/category/${category.id}`}
                    className="group block bg-white rounded-3xl p-1 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`bg-gradient-to-r ${category.bgColor} rounded-2xl p-6 h-full`}>
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-white/80 font-medium group-hover:text-white transition-colors">
                        <span>Learn more</span>
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white rounded-full p-3 shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {currentIndex < categories.length - itemsPerPage && (
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white rounded-full p-3 shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: categories.length - itemsPerPage + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;