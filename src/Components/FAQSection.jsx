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
    // Here you would typically send the question to your backend
    alert(`Question submitted: ${question}`);
    setQuestion('');
  };

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg 
                  className={`h-5 w-5 text-gray-500 transform transition ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Have another question?</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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