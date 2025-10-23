// CategoryCarousel.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Indian Constitution",
    description: "Learn about the preamble and fundamental structure of India's constitution",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Fundamental Rights",
    description: "Understand your basic rights as an Indian citizen",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Legal System",
    description: "How the Indian legal system works and its hierarchy",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    title: "Criminal Law",
    description: "Know about IPC, CrPC, and criminal justice system",
    bgColor: "bg-red-100",
  },
  {
    id: 5,
    title: "Civil Law",
    description: "Property, contracts, and other civil matters",
    bgColor: "bg-yellow-100",
  },
  {
    id: 6,
    title: "Family Law",
    description: "Marriage, divorce, inheritance, and related matters",
    bgColor: "bg-pink-100",
  },
  {
    id: 7,
    title: "Consumer Rights",
    description: "Protect yourself against unfair trade practices",
    bgColor: "bg-indigo-100",
  },
  {
    id: 8,
    title: "Labor Laws",
    description: "Rights and protections for employees",
    bgColor: "bg-teal-100",
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
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Know Your Rights & The Law
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {categories.map((category) => (
                <div key={category.id} className="w-full sm:w-1/2 md:w-1/4 px-4 flex-shrink-0">
                  <Link 
                    to={`/category/${category.id}`}
                    className={`block ${category.bgColor} rounded-xl p-6 h-full hover:shadow-lg transition`}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                    <div className="mt-4 text-blue-600 font-medium">Learn more →</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {currentIndex > 0 && (
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {currentIndex < categories.length - itemsPerPage && (
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
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

export default CategoryCarousel;