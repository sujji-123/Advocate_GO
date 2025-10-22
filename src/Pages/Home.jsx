import HeroSection from '../Components/HeroSection';
import CategoryCarousel from '../Components/CategoryCarousel';
import WhyChooseUs from '../Components/WhyChooseUs';
import ProfileCarousel from '../Components/ProfileCarousel';
import FAQSection from '../Components/FAQSection';
import LocationTracker from '../Components/LocationTracker';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom'; // ADD THIS IMPORT

// Using random user API for profile images
const lawyers = [
  {
    id: 1,
    name: "Adv. Meera Krishnan",
    specialty: "Corporate Law",
    rating: 5,
    reviews: 128,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Adv. Rohan Malhotra",
    specialty: "Criminal Defense",
    rating: 5,
    reviews: 96,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Adv. Sunita Rao",
    specialty: "Family Law",
    rating: 4,
    reviews: 87,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Adv. Vikram Joshi",
    specialty: "Intellectual Property",
    rating: 4,
    reviews: 72,
    image: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 5,
    name: "Adv. Priyanka Sharma",
    specialty: "Labor Law",
    rating: 4,
    reviews: 65,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const students = [
  {
    id: 1,
    name: "Ananya Gupta",
    specialty: "NALSAR University",
    rating: 5,
    reviews: 42,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 2,
    name: "Rahul Deshpande",
    specialty: "NLU Delhi",
    rating: 5,
    reviews: 38,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Neha Reddy",
    specialty: "NLSIU Bangalore",
    rating: 4,
    reviews: 31,
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 4,
    name: "Arjun Patel",
    specialty: "WBNUJS Kolkata",
    rating: 4,
    reviews: 27,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 5,
    name: "Sanya Verma",
    specialty: "GNLU Gandhinagar",
    rating: 4,
    reviews: 23,
    image: "https://randomuser.me/api/portraits/women/77.jpg",
  },
];

const advisors = [
  {
    id: 1,
    name: "Prof. Rajan Menon",
    specialty: "Constitutional Law Expert",
    rating: 5,
    reviews: 56,
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    id: 2,
    name: "Dr. Sunita Iyer",
    specialty: "Human Rights Specialist",
    rating: 5,
    reviews: 48,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 3,
    name: "Adv. Harish Khanna (Retd.)",
    specialty: "Former High Court Judge",
    rating: 5,
    reviews: 39,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    id: 4,
    name: "Dr. Priya Nair",
    specialty: "International Law",
    rating: 4,
    reviews: 34,
    image: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    id: 5,
    name: "Adv. Sameer Kapoor",
    specialty: "Corporate Law Consultant",
    rating: 4,
    reviews: 29,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      
      {/* --- ADDED: Demo Account Section --- */}
      <section className="text-center py-8 md:py-12 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-t border-teal-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Want to Explore AdvocateGO?
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Create a demo account instantly to experience all features without email verification. 
            Perfect for testing and demonstration purposes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/demo-signup"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-semibold text-sm md:text-base transform hover:scale-105"
            >
              Create Demo Account
            </Link>
            <Link
              to="/register"
              className="border border-teal-500 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition duration-200 ease-in-out font-medium text-sm md:text-base"
            >
              Regular Sign Up
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Demo accounts work with all features but don't require email verification.
          </p>
        </div>
      </section>
      {/* --- END ADDED SECTION --- */}

      <CategoryCarousel />
      <WhyChooseUs />
      <ProfileCarousel 
        title="Meet Our Top Lawyers"
        profiles={lawyers}
        profileType="lawyers"
      />
      <ProfileCarousel 
        title="Connect with Law Students"
        profiles={students}
        profileType="students"
      />
      <ProfileCarousel 
        title="Our Expert Advisors"
        profiles={advisors}
        profileType="advisors"
      />
      <FAQSection />
      <LocationTracker />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;