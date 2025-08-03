import React, { useRef, useState, useEffect } from 'react';

const lawyerTypesData = [
  { id: 1, title: '⚖️ Civil Law', description: 'Handles non-criminal matters like contract disputes, defamation, and property issues. Includes Property/Real Estate and Consumer Lawyers.' },
  { id: 2, title: '⛓️ Criminal Law', description: 'Defends or prosecutes in cases of theft, assault, and murder. Includes specialists like Cyber, Anti-Corruption, and Extradition Lawyers.' },
  { id: 3, title: '👨‍👩‍👧‍👦 Family & Personal Law', description: 'Deals with divorce, alimony, child custody, and domestic violence. Also includes Elder Law for seniors, covering wills, pensions, and healthcare.' },
  { id: 4, title: '💼 Corporate & Financial Law', description: 'Advises businesses on contracts, mergers, and compliance. Covers Banking, Tax, and Labour/Employment law for various business operations.' },
  { id: 5, title: '🏛️ Constitutional & Public Law', description: 'Works on cases involving fundamental rights and government actions. Includes Public Interest Litigation (PIL) and Legal Aid lawyers.' },
  { id: 6, title: '🌿 Environmental & IP Law', description: 'Focuses on pollution, environmental impact, and conservation. Intellectual Property (IP) lawyers protect copyrights, patents, and trademarks.' },
  { id: 7, title: '🤝 Specialized & ADR Law', description: 'ADR Lawyers handle arbitration and mediation. Others include Notary, Election, and Media/Defamation law specialists.' },
  { id: 8, title: '🌍 Immigration & International Law', description: 'Immigration lawyers assist with visas, asylum, and citizenship. International lawyers focus on trade, treaties, and human rights.' },
];

const LawyerCard = ({ title, description }) => (
  <div className="flex-shrink-0 w-80 h-48 p-6 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col justify-center">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const More = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
        checkScrollability();
        container.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability);

        return () => {
            container.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 344;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  return (
    <div className="bg-orange-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Types of Lawyers in India
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Use the arrows to explore various legal specializations.
        </p>

        <div className="relative">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="absolute top-1/2 -left-4 z-10 p-2 bg-white rounded-full shadow-lg transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 space-x-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {lawyerTypesData.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                title={lawyer.title}
                description={lawyer.description}
              />
            ))}
          </div>

          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className="absolute top-1/2 -right-4 z-10 p-2 bg-white rounded-full shadow-lg transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default More;