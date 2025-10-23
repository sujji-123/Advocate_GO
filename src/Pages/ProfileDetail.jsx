// src/Pages/ProfileDetail.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileDetail = () => {
  const { profileType, id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Complete mock data for all profiles
  const mockProfiles = {
    lawyers: [
      {
        id: 1,
        name: "Adv. Meera Krishnan",
        specialty: "Corporate Law",
        rating: 5,
        reviews: 128,
        experience: "12 years",
        education: "LLM, Harvard Law School",
        languages: ["English", "Hindi", "Tamil"],
        description: "Specialized in corporate law with extensive experience in M&A and corporate governance. Successfully handled over 500 corporate cases with a 95% success rate.",
        contact: "meera.k@lawfirm.com",
        phone: "+91 9876543210",
        address: "123 Corporate Tower, Mumbai",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        hourlyRate: "₹2,500",
        availability: "Available for consultation",
        barCouncilNo: "MH/1254/2010"
      },
      {
        id: 2,
        name: "Adv. Rohan Malhotra",
        specialty: "Criminal Defense",
        rating: 5,
        reviews: 96,
        experience: "15 years",
        education: "LLB, National Law School of India University",
        languages: ["English", "Hindi", "Punjabi"],
        description: "Renowned criminal defense lawyer with successful track record in high-profile cases. Former public prosecutor with deep understanding of criminal justice system.",
        contact: "rohan.m@defense.com",
        phone: "+91 9876543211",
        address: "456 Justice Road, Delhi",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        hourlyRate: "₹3,000",
        availability: "Available next week",
        barCouncilNo: "DL/0897/2008"
      },
      {
        id: 3,
        name: "Adv. Sunita Rao",
        specialty: "Family Law",
        rating: 4,
        reviews: 87,
        experience: "10 years",
        education: "LLM, NALSAR University",
        languages: ["English", "Hindi", "Telugu"],
        description: "Expert in family law matters including divorce, child custody, and property disputes. Known for compassionate approach and successful mediations.",
        contact: "sunita.rao@familylaw.com",
        phone: "+91 9876543212",
        address: "789 Family Court Road, Hyderabad",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        hourlyRate: "₹2,000",
        availability: "Available this week",
        barCouncilNo: "TS/3456/2013"
      },
      {
        id: 4,
        name: "Adv. Vikram Joshi",
        specialty: "Intellectual Property",
        rating: 4,
        reviews: 72,
        experience: "8 years",
        education: "LLB, NLSIU Bangalore",
        languages: ["English", "Hindi", "Kannada"],
        description: "Specialized in intellectual property rights, patents, trademarks, and copyright law. Worked with several tech startups and established companies.",
        contact: "vikram.j@iplaw.com",
        phone: "+91 9876543213",
        address: "321 Tech Park, Bangalore",
        image: "https://randomuser.me/api/portraits/men/68.jpg",
        hourlyRate: "₹3,500",
        availability: "Available for consultation",
        barCouncilNo: "KA/5678/2015"
      },
      {
        id: 5,
        name: "Adv. Priyanka Sharma",
        specialty: "Labor Law",
        rating: 4,
        reviews: 65,
        experience: "7 years",
        education: "LLB, GNLU Gandhinagar",
        languages: ["English", "Hindi", "Gujarati"],
        description: "Expert in labor laws, employment disputes, and workplace regulations. Successfully represented both employees and employers in various cases.",
        contact: "priyanka.s@laborlaw.com",
        phone: "+91 9876543214",
        address: "654 Industry Zone, Ahmedabad",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        hourlyRate: "₹2,200",
        availability: "Available next week",
        barCouncilNo: "GJ/7890/2016"
      }
    ],
    students: [
      {
        id: 1,
        name: "Ananya Gupta",
        specialty: "NALSAR University",
        rating: 5,
        reviews: 42,
        year: "3rd Year",
        interests: ["Constitutional Law", "Human Rights"],
        achievements: ["Gold Medalist", "Moot Court Champion"],
        description: "Passionate about constitutional law and human rights advocacy. Active participant in legal aid clinics and pro bono initiatives.",
        contact: "ananya.g@nalsar.ac.in",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        skills: ["Legal Research", "Drafting", "Client Counseling"],
        internships: ["Supreme Court Intern", "Human Rights Commission"]
      },
      {
        id: 2,
        name: "Rahul Deshpande",
        specialty: "NLU Delhi",
        rating: 5,
        reviews: 38,
        year: "4th Year",
        interests: ["Corporate Law", "Mergers & Acquisitions"],
        achievements: ["Dean's List", "Corporate Law Competition Winner"],
        description: "Focused on corporate law with internship experience in top law firms. Strong analytical and negotiation skills.",
        contact: "rahul.d@nlud.ac.in",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        skills: ["Contract Drafting", "Due Diligence", "Corporate Compliance"],
        internships: ["Amarchand Mangaldas", "Khaitan & Co"]
      },
      {
        id: 3,
        name: "Neha Reddy",
        specialty: "NLSIU Bangalore",
        rating: 4,
        reviews: 31,
        year: "2nd Year",
        interests: ["Criminal Law", "Legal Technology"],
        achievements: ["Tech Law Competition Finalist", "Legal Aid Volunteer"],
        description: "Combining legal expertise with technology. Interested in cyber law and legal innovation.",
        contact: "neha.r@nls.ac.in",
        image: "https://randomuser.me/api/portraits/women/55.jpg",
        skills: ["Legal Research", "Tech Analysis", "Client Interaction"],
        internships: ["Cyber Cell Intern", "Legal Tech Startup"]
      },
      {
        id: 4,
        name: "Arjun Patel",
        specialty: "WBNUJS Kolkata",
        rating: 4,
        reviews: 27,
        year: "5th Year",
        interests: ["International Law", "Arbitration"],
        achievements: ["International Moot Court", "Research Paper Publication"],
        description: "Specializing in international law and dispute resolution. Fluent in multiple languages.",
        contact: "arjun.p@wbujs.ac.in",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        skills: ["Arbitration", "International Law", "Research"],
        internships: ["Permanent Court of Arbitration", "International Law Firm"]
      },
      {
        id: 5,
        name: "Sanya Verma",
        specialty: "GNLU Gandhinagar",
        rating: 4,
        reviews: 23,
        year: "3rd Year",
        interests: ["Environmental Law", "Climate Justice"],
        achievements: ["Environmental Law Competition", "Green Initiative Lead"],
        description: "Dedicated to environmental protection and climate justice. Active in sustainability initiatives.",
        contact: "sanya.v@gnlu.ac.in",
        image: "https://randomuser.me/api/portraits/women/77.jpg",
        skills: ["Environmental Law", "Policy Analysis", "Advocacy"],
        internships: ["Ministry of Environment", "Environmental NGO"]
      }
    ],
    advisors: [
      {
        id: 1,
        name: "Prof. Rajan Menon",
        specialty: "Constitutional Law Expert",
        rating: 5,
        reviews: 56,
        experience: "25 years",
        position: "Professor Emeritus",
        description: "Former Supreme Court advocate and constitutional law expert. Authored several books on constitutional law and served as legal advisor to government bodies.",
        contact: "rajan.menon@law.edu",
        image: "https://randomuser.me/api/portraits/men/60.jpg",
        consultation: "Available for academic guidance",
        expertise: ["Constitutional Law", "Administrative Law", "Legal Education"]
      },
      {
        id: 2,
        name: "Dr. Sunita Iyer",
        specialty: "Human Rights Specialist",
        rating: 5,
        reviews: 48,
        experience: "20 years",
        position: "Human Rights Commissioner",
        description: "Internationally recognized human rights expert. Worked with UN agencies and international organizations on human rights protection.",
        contact: "sunita.iyer@rights.org",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
        consultation: "Available for human rights cases",
        expertise: ["Human Rights Law", "International Law", "Social Justice"]
      },
      {
        id: 3,
        name: "Adv. Harish Khanna (Retd.)",
        specialty: "Former High Court Judge",
        rating: 5,
        reviews: 39,
        experience: "35 years",
        position: "Former High Court Judge",
        description: "Retired High Court judge with extensive experience in civil and criminal matters. Now serves as legal advisor and mediator.",
        contact: "harish.khanna@legaladvisor.com",
        image: "https://randomuser.me/api/portraits/men/70.jpg",
        consultation: "Available for mediation and advice",
        expertise: ["Civil Law", "Criminal Law", "Mediation", "Judicial Process"]
      },
      {
        id: 4,
        name: "Dr. Priya Nair",
        specialty: "International Law",
        rating: 4,
        reviews: 34,
        experience: "15 years",
        position: "International Law Professor",
        description: "Expert in international law, treaties, and cross-border disputes. Regular speaker at international legal forums.",
        contact: "priya.nair@intlaw.edu",
        image: "https://randomuser.me/api/portraits/women/40.jpg",
        consultation: "Available for international matters",
        expertise: ["International Law", "Treaty Law", "Diplomatic Relations"]
      },
      {
        id: 5,
        name: "Adv. Sameer Kapoor",
        specialty: "Corporate Law Consultant",
        rating: 4,
        reviews: 29,
        experience: "18 years",
        position: "Corporate Legal Consultant",
        description: "Seasoned corporate lawyer turned consultant. Specializes in business compliance, governance, and strategic legal advice.",
        contact: "sameer.kapoor@consultant.com",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
        consultation: "Available for corporate consulting",
        expertise: ["Corporate Governance", "Business Compliance", "Strategic Advice"]
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProfile = mockProfiles[profileType]?.find(p => p.id === parseInt(id));
      setProfile(foundProfile);
      setLoading(false);
    }, 500);
  }, [profileType, id]);

  const handleBookConsultation = () => {
    alert(`Consultation request sent to ${profile?.name}. They will contact you shortly.`);
  };

  const handleSendMessage = () => {
    alert(`Message dialog opened for ${profile?.name}. This would connect to chat system in real app.`);
  };

  const handleDownloadProfile = () => {
    alert(`Profile details for ${profile?.name} would be downloaded as PDF in real app.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Profile not found</div>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center -mt-16">
              <img 
                src={profile.image} 
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="md:ml-6 mt-4 md:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-xl text-blue-600 font-semibold">{profile.specialty}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-5 w-5 ${i < profile.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-2">({profile.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                <div className="space-y-3">
                  {profile.experience && (
                    <div>
                      <span className="font-medium text-gray-700">Experience:</span>
                      <span className="ml-2 text-gray-600">{profile.experience}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div>
                      <span className="font-medium text-gray-700">Education:</span>
                      <span className="ml-2 text-gray-600">{profile.education}</span>
                    </div>
                  )}
                  {profile.languages && (
                    <div>
                      <span className="font-medium text-gray-700">Languages:</span>
                      <span className="ml-2 text-gray-600">{profile.languages.join(', ')}</span>
                    </div>
                  )}
                  {profile.year && (
                    <div>
                      <span className="font-medium text-gray-700">Year:</span>
                      <span className="ml-2 text-gray-600">{profile.year}</span>
                    </div>
                  )}
                  {profile.hourlyRate && (
                    <div>
                      <span className="font-medium text-gray-700">Hourly Rate:</span>
                      <span className="ml-2 text-gray-600">{profile.hourlyRate}</span>
                    </div>
                  )}
                  {profile.availability && (
                    <div>
                      <span className="font-medium text-gray-700">Availability:</span>
                      <span className="ml-2 text-green-600">{profile.availability}</span>
                    </div>
                  )}
                  {profile.barCouncilNo && (
                    <div>
                      <span className="font-medium text-gray-700">Bar Council No:</span>
                      <span className="ml-2 text-gray-600">{profile.barCouncilNo}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  {profile.contact && (
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">{profile.contact}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">{profile.phone}</span>
                    </div>
                  )}
                  {profile.address && (
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <span className="ml-2 text-gray-600">{profile.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {profile.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
                <p className="text-gray-600 leading-relaxed">{profile.description}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4 flex-wrap">
              <button 
                onClick={handleBookConsultation}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Book Consultation
              </button>
              <button 
                onClick={handleSendMessage}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Send Message
              </button>
              <button 
                onClick={handleDownloadProfile}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition font-medium"
              >
                Download Profile
              </button>
              <Link 
                to="/"
                className="border border-gray-600 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;