// WhyChooseUs.jsx
const features = [
  {
    title: "Multilingual Support",
    description: "Get legal help in Telugu, English, or your regional language, even by voice",
    icon: "🌐",
  },
  {
    title: "Find Local Lawyers",
    description: "Search by specialty, availability, location, or even by name",
    icon: "👨‍⚖️",
  },
  {
    title: "Free Legal Aid Check",
    description: "Instantly check if you're eligible for free legal assistance",
    icon: "💰",
  },
  {
    title: "Anonymous Questions",
    description: "Ask legal questions safely and privately without revealing identity",
    icon: "🕵️",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose AdvocateGO?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;