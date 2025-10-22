import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaBook, FaBalanceScale, FaUserGraduate, FaGavel } from 'react-icons/fa';

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = {
    general: {
      title: 'General Questions',
      icon: <FaBook className="text-blue-600" />,
      questions: [
        {
          question: 'What is AdvocateGO?',
          answer: 'AdvocateGO is a comprehensive legal platform that connects citizens with legal professionals, provides legal education, and offers tools for legal self-diagnosis and case management.'
        },
        {
          question: 'Is AdvocateGO free to use?',
          answer: 'Yes, basic features including legal information, lawyer search, and educational resources are completely free. Some advanced features may have associated costs.'
        },
        {
          question: 'How do I find the right lawyer for my case?',
          answer: 'Use our Lawyer Type Advisor tool to identify the appropriate specialization based on your legal issue, then browse verified lawyers in our directory.'
        }
      ]
    },
    legal: {
      title: 'Legal Procedures',
      icon: <FaBalanceScale className="text-green-600" />,
      questions: [
        {
          question: 'What should I do if I receive a legal notice?',
          answer: 'Do not ignore it. Consult a lawyer immediately, understand the allegations, and respond within the stipulated time frame.'
        },
        {
          question: 'How long does a typical court case take in India?',
          answer: 'Case duration varies widely - from months for simple matters to years for complex litigation. Civil cases average 3-5 years, criminal cases 5-8 years.'
        }
      ]
    },
    technical: {
      title: 'Technical Support',
      icon: <FaUserGraduate className="text-purple-600" />,
      questions: [
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your email.'
        },
        {
          question: 'Is my data secure on AdvocateGO?',
          answer: 'Yes, we use industry-standard encryption and follow strict data protection protocols to ensure your information remains confidential.'
        }
      ]
    }
  };

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredQuestions = Object.values(faqCategories)
    .flatMap(category => category.questions)
    .filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about legal procedures, platform usage, and getting the most out of AdvocateGO.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(faqCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeCategory === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {searchTerm ? (
            // Search Results
            <div className="divide-y divide-gray-100">
              {filteredQuestions.map((item, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleItem(`search-${index}`)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    {openItems[`search-${index}`] ? (
                      <FaChevronUp className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems[`search-${index}`] && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
              {filteredQuestions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No questions found matching your search.
                </div>
              )}
            </div>
          ) : (
            // Category Results
            <div className="divide-y divide-gray-100">
              {faqCategories[activeCategory].questions.map((item, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleItem(`${activeCategory}-${index}`)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    {openItems[`${activeCategory}-${index}`] ? (
                      <FaChevronUp className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems[`${activeCategory}-${index}`] && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <FaGavel className="mx-auto text-4xl text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our legal support team is here to help you with any additional questions.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;