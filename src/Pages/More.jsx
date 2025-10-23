import React, { useRef, useState, useEffect } from 'react';

const lawyerTypesData = [
  { id: 1, title: '⚖️ Civil Law', description: 'Handles non-criminal matters like contract disputes, defamation, and property issues. Includes Property/Real Estate and Consumer Lawyers.', externalLink: 'https://en.wikipedia.org/wiki/Civil_law_(legal_system)' },
  { id: 2, title: '⛓️ Criminal Law', description: 'Defends or prosecutes in cases of theft, assault, and murder. Includes specialists like Cyber, Anti-Corruption, and Extradition Lawyers.', externalLink: 'https://en.wikipedia.org/wiki/Criminal_law' },
  { id: 3, title: '👨‍👩‍👧‍👦 Family & Personal Law', description: 'Deals with divorce, alimony, child custody, and domestic violence. Also includes Elder Law for seniors, covering wills, pensions, and healthcare.', externalLink: 'https://en.wikipedia.org/wiki/Family_law' },
  { id: 4, title: '💼 Corporate & Financial Law', description: 'Advises businesses on contracts, mergers, and compliance. Covers Banking, Tax, and Labour/Employment law for various business operations.', externalLink: 'https://en.wikipedia.org/wiki/Corporate_law' },
  { id: 5, title: '🏛️ Constitutional & Public Law', description: 'Works on cases involving fundamental rights and government actions. Includes Public Interest Litigation (PIL) and Legal Aid lawyers.', externalLink: 'https://en.wikipedia.org/wiki/Constitutional_law' },
  { id: 6, title: '🌿 Environmental & IP Law', description: 'Focuses on pollution, environmental impact, and conservation. Intellectual Property (IP) lawyers protect copyrights, patents, and trademarks.', externalLink: 'https://en.wikipedia.org/wiki/Environmental_law' },
  { id: 7, title: '🤝 Specialized & ADR Law', description: 'ADR Lawyers handle arbitration and mediation. Others include Notary, Election, and Media/Defamation law specialists.', externalLink: 'https://en.wikipedia.org/wiki/Alternative_dispute_resolution' },
  { id: 8, title: '🌍 Immigration & International Law', description: 'Immigration lawyers assist with visas, asylum, and citizenship. International lawyers focus on trade, treaties, and human rights.', externalLink: 'https://en.wikipedia.org/wiki/International_law' },
];

const quickActions = [
  { id: 1, title: '📋 Legal Checklist', description: 'Essential legal documents checklist', icon: '📝' },
  { id: 2, title: '⚡ Emergency Help', description: 'Find immediate legal assistance', icon: '🚨' },
  { id: 3, title: '💰 Legal Aid', description: 'Free legal services information', icon: '💸' },
  { id: 4, title: '📚 Learn More', description: 'Legal education resources', icon: '🎓' },
];

const LawyerCard = ({ title, description, externalLink, isExpanded, onToggle, onLearnMore }) => (
  <div className={`flex-shrink-0 w-80 p-6 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col transition-all duration-300 ${isExpanded ? 'ring-2 ring-orange-500' : ''}`}>
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <button
        onClick={onToggle}
        className="text-orange-500 hover:text-orange-700 text-lg font-bold"
      >
        {isExpanded ? '−' : '+'}
      </button>
    </div>
    
    <p className={`text-gray-600 text-sm mb-4 transition-all duration-300 ${isExpanded ? 'block' : 'line-clamp-2'}`}>
      {description}
    </p>
    
    <div className={`flex gap-2 mt-auto transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={onLearnMore}
        className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
      >
        Learn More
      </button>
      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border border-orange-500 text-orange-500 text-sm rounded-lg hover:bg-orange-50 transition-colors"
      >
        External Resources
      </a>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-left group"
  >
    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </button>
);

const More = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

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

  const handleCardToggle = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleLearnMore = (title) => {
    setModalContent(`Detailed information about ${title} would appear here. This could include career paths, educational requirements, typical cases, and more detailed insights.`);
    setShowModal(true);
  };

  const handleQuickAction = (action) => {
    const actionContents = {
      1: "Legal Checklist:\n• Will/Testament\n• Power of Attorney\n• Property Documents\n• Insurance Policies\n• Identity Proofs\n• Contract Agreements\n• Marriage/Birth Certificates",
      2: "Emergency Legal Help:\n• National Legal Services Authority: 011-23382721\n• Police: 100\n• Women Helpline: 1091\n• Child Helpline: 1098\n• Cyber Crime: 1930",
      3: "Legal Aid Services:\n• Free legal consultation available\n• Income-based eligibility\n• Available for marginalized groups\n• Contact District Legal Services Authority",
      4: "Legal Education:\n• Online law courses\n• Legal workshops\n• Mock trial sessions\n• Legal terminology guides"
    };
    setModalContent(actionContents[action.id]);
    setShowModal(true);
  };

  const filteredLawyers = selectedCategory === 'all' 
    ? lawyerTypesData 
    : lawyerTypesData.filter(lawyer => 
        lawyer.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Legal Expertise Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover various legal specializations in India. Expand cards for detailed information and access helpful legal resources.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'civil', 'criminal', 'family', 'corporate', 'environmental'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Quick Legal Assistance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map(action => (
              <QuickActionCard
                key={action.id}
                {...action}
                onClick={() => handleQuickAction(action)}
              />
            ))}
          </div>
        </div>

        {/* Main Carousel Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Types of Lawyers in India
          </h2>
          
          <div className="relative">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="absolute top-1/2 -left-4 z-10 p-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 space-x-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {filteredLawyers.map((lawyer) => (
                <LawyerCard
                  key={lawyer.id}
                  title={lawyer.title}
                  description={lawyer.description}
                  externalLink={lawyer.externalLink}
                  isExpanded={expandedCard === lawyer.id}
                  onToggle={() => handleCardToggle(lawyer.id)}
                  onLearnMore={() => handleLearnMore(lawyer.title)}
                />
              ))}
            </div>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="absolute top-1/2 -right-4 z-10 p-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need More Help?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleQuickAction({id: 2})}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              🚨 Emergency Legal Help
            </button>
            <a
              href="https://nalsa.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              💼 Legal Aid Services
            </a>
            <button 
              onClick={() => {
                setModalContent("Legal Consultation Booking:\n• Online appointment scheduling\n• Phone consultation: 1800-LEGAL-HELP\n• Walk-in clinics available\n• Virtual meeting options");
                setShowModal(true);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              📅 Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Legal Information</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-600 whitespace-pre-line">
              {modalContent}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default More;