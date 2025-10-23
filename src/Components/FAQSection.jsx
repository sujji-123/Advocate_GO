// FAQSection.jsx
import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [question, setQuestion] = useState('');

  const faqs = [
    {
      question: "How do I use the app?",
      answer: "Simply sign up, browse through our services, and connect with legal professionals or access legal resources based on your needs."
    },
    {
      question: "How do I contact a lawyer?",
      answer: "You can search for lawyers in the 'Find a Lawyer' section, view their profiles, and send them a consultation request."
    },
    {
      question: "Is the legal aid free?",
      answer: "Some lawyers offer pro bono (free) services. You can check eligibility for free legal aid in your profile settings."
    },
    {
      question: "Can I ask questions anonymously?",
      answer: "Yes, you can post questions anonymously in our community section without revealing your identity."
    },
    {
      question: "What languages are supported?",
      answer: "We currently support English, Telugu, Hindi, and several other regional languages with more coming soon."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Question submitted: ${question}`);
    setQuestion('');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-slate-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-200 rounded-full opacity-20"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our legal services
          </p>
        </div>
        
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200 group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <svg 
                  className={`h-6 w-6 text-gray-400 transform transition-all duration-300 group-hover:text-blue-600 ${
                    activeIndex === index ? 'rotate-180 text-blue-600' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-blue-100 opacity-90">We're here to help you get the answers you need</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full px-6 py-4 border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 resize-none"
              rows="3"
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;