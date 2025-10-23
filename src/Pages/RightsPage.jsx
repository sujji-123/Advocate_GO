// src/Pages/RightsPage.jsx
import { Link } from 'react-router-dom';

const RightsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              &larr; Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Know Your Rights</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Understanding your legal rights is the first step toward justice. Explore various aspects of Indian law and your fundamental rights as a citizen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Fundamental Rights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Right to Equality</li>
                  <li>• Right to Freedom</li>
                  <li>• Right against Exploitation</li>
                  <li>• Right to Freedom of Religion</li>
                  <li>• Cultural and Educational Rights</li>
                  <li>• Right to Constitutional Remedies</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Legal Rights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Right to Legal Aid</li>
                  <li>• Right to Fair Trial</li>
                  <li>• Right to Privacy</li>
                  <li>• Consumer Rights</li>
                  <li>• Women's Rights</li>
                  <li>• Employee Rights</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-yellow-800 mb-4">Emergency Legal Help</h3>
              <p className="text-gray-700 mb-4">
                If you need immediate legal assistance, contact:
              </p>
              <div className="space-y-2">
                <p className="font-semibold">National Legal Services Authority: 1800-123-4567</p>
                <p className="font-semibold">Police Emergency: 100</p>
                <p className="font-semibold">Women's Helpline: 1091</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightsPage; // ADD THIS LINE