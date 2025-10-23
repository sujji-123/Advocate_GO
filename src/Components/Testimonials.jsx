// Testimonials.jsx
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Small Business Owner",
      content: "AdvocateGO helped me navigate a complex contract dispute. The lawyer I found was professional and affordable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "College Student",
      content: "As a law student, the resources and community here are invaluable. I've learned so much from the advisors.",
      rating: 4,
    },
    {
      id: 3,
      name: "Arjun Reddy",
      role: "IT Professional",
      content: "The SOS feature gave me peace of mind during a legal emergency. Response was quick and helpful.",
      rating: 5,
    },
  ];

  const topColleges = [
    "NALSAR University of Law",
    "National Law School of India University",
    "National Law University, Delhi",
    "West Bengal National University of Juridical Sciences",
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Ratings & Testimonials
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-medium text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Top Law Colleges</h3>
            <ul className="space-y-2">
              {topColleges.map((college, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{college}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Top Rated Lawyers</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">Adv. Meera Krishnan - Corporate Law (4.9★)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">Adv. Rohan Malhotra - Criminal Defense (4.8★)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">Adv. Sunita Rao - Family Law (4.7★)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">Adv. Vikram Joshi - Intellectual Property (4.7★)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;