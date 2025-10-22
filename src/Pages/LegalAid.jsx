import React, { useState } from 'react';
import { FaBalanceScale, FaUserCheck, FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LegalAid = () => {
  const [formData, setFormData] = useState({
    income: '',
    familyMembers: '',
    category: '',
    caseType: '',
    assets: '',
    state: ''
  });
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkEligibility = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isEligible = 
        parseInt(formData.income) < 300000 && 
        formData.category !== 'general';
      
      setEligibilityResult({
        eligible: isEligible,
        message: isEligible 
          ? 'Congratulations! You are eligible for free legal aid under the Legal Services Authorities Act, 1987.'
          : 'Based on the information provided, you may not be eligible for free legal aid. However, you can still consult with our network lawyers at discounted rates.',
        benefits: isEligible ? [
          'Free legal consultation',
          'Court representation by appointed lawyer',
          'Document preparation assistance',
          'Case filing support',
          'Regular case updates'
        ] : [
          'Discounted consultation fees',
          'Payment plans available',
          'Pro bono opportunities',
          'Legal education resources'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  const incomeBrackets = [
    { max: 100000, label: 'Below ₹1 Lakh' },
    { max: 300000, label: '₹1-3 Lakhs' },
    { max: 500000, label: '₹3-5 Lakhs' },
    { max: 1000000, label: '₹5-10 Lakhs' },
    { max: 9999999, label: 'Above ₹10 Lakhs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FaBalanceScale className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Legal Aid Eligibility Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check if you qualify for free legal assistance under the Legal Services Authorities Act, 1987
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Eligibility Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaUserCheck className="mr-3 text-blue-600" />
              Check Your Eligibility
            </h2>
            
            <form onSubmit={checkEligibility} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Family Income *
                </label>
                <select
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Income Bracket</option>
                  {incomeBrackets.map((bracket, index) => (
                    <option key={index} value={bracket.max}>
                      {bracket.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Family Members *
                </label>
                <input
                  type="number"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of dependents"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="sc-st">SC/ST</option>
                  <option value="obc">OBC</option>
                  <option value="minority">Minority</option>
                  <option value="women">Women</option>
                  <option value="disabled">Person with Disability</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Legal Issue *
                </label>
                  <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Case Type</option>
                  <option value="criminal">Criminal Case</option>
                  <option value="civil">Civil Dispute</option>
                  <option value="family">Family Matter</option>
                  <option value="property">Property Issue</option>
                  <option value="labor">Labor/Employment</option>
                  <option value="consumer">Consumer Complaint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Union Territory *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="andhra">Andhra Pradesh</option>
                  <option value="telangana">Telangana</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold"
              >
                {isLoading ? 'Checking Eligibility...' : 'Check Eligibility'}
              </button>
            </form>
          </div>

          {/* Results & Information */}
          <div className="space-y-6">
            {eligibilityResult ? (
              <div className={`bg-white rounded-xl shadow-lg p-6 ${
                eligibilityResult.eligible ? 'border-l-4 border-green-500' : 'border-l-4 border-orange-500'
              }`}>
                <div className="flex items-center mb-4">
                  {eligibilityResult.eligible ? (
                    <FaCheckCircle className="text-3xl text-green-500 mr-3" />
                  ) : (
                    <FaTimesCircle className="text-3xl text-orange-500 mr-3" />
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {eligibilityResult.eligible ? 'Eligible for Legal Aid' : 'Alternative Options Available'}
                  </h3>
                </div>
                
                <p className="text-gray-700 mb-6">{eligibilityResult.message}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {eligibilityResult.eligible ? 'Available Benefits:' : 'Suggested Options:'}
                  </h4>
                  <ul className="space-y-2">
                    {eligibilityResult.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    {eligibilityResult.eligible ? 'Apply for Legal Aid' : 'View Affordable Lawyers'}
                  </button>
                  <button 
                    onClick={() => setEligibilityResult(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Check Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaFileAlt className="mr-3 text-blue-600" />
                  About Legal Aid
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    The Legal Services Authorities Act, 1987 provides free legal services to eligible persons. 
                    Legal aid includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Payment of court and process fees
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Legal advice and consultation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Drafting of legal documents
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Representation by lawyer in courts
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaClock className="mr-3" />
                Did You Know?
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-sm opacity-90">of Indians eligible for legal aid</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5M+</div>
                  <div className="text-sm opacity-90">people helped annually</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAid;