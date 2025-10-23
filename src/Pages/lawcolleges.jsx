import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

export default function TopLawCollegesPage() {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  
  const colleges = [
    { rank: 1, name: 'National Law School of India University', location: 'Bengaluru', approxfee: 'INR 2,50,000 - 3,00,000', avgpackage: 'INR 15,00,000 - 20,00,000', ratings: '4.8/5', reviews: 'Premier law school with excellent faculty and placement opportunities.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601369886phpVU8ZaO.jpeg', address: 'Gnana Bharathi Main Rd, Bengaluru', established: '1987', type: 'Public', campus: '23 acres', founder: 'N. R. Madhava Menon', chancellor: 'Chief Justice of India', totalenrollment: '700 students', website: 'https://www.nls.ac.in/' },
    { rank: 2, name: 'NALSAR University of Law', location: 'Hyderabad', approxfee: 'INR 2,20,000 - 2,80,000', avgpackage: 'INR 12,00,000 - 18,00,000', ratings: '4.7/5', reviews: 'Excellent academic environment with strong research focus.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601369948phpW01p6u.jpeg', address: 'Justice City, Shameerpet, Hyderabad', established: '1998', type: 'Public', campus: '55 acres', founder: 'Government of Andhra Pradesh', chancellor: 'Chief Justice of Telangana High Court', totalenrollment: '800 students', website: 'https://www.nalsar.ac.in/' },
    { rank: 3, name: 'West Bengal National University of Juridical Sciences', location: 'Kolkata', approxfee: 'INR 2,00,000 - 2,50,000', avgpackage: 'INR 10,00,000 - 16,00,000', ratings: '4.6/5', reviews: 'Known for diverse curriculum and moot court competitions.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370006phpy6V4c9.jpeg', address: 'Salt Lake City, Kolkata', established: '1999', type: 'Public', campus: 'Urban campus', founder: 'Government of West Bengal', chancellor: 'Chief Justice of Calcutta High Court', totalenrollment: '600 students', website: 'https://www.nujs.edu/' },
    { rank: 4, name: 'National Law University', location: 'New Delhi', approxfee: 'INR 2,40,000 - 2,90,000', avgpackage: 'INR 14,00,000 - 22,00,000', ratings: '4.7/5', reviews: 'Strong industry connections in corporate law.', eligibility: '10+2 with 50% marks and AILET score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370064php6r5Z5j.jpeg', address: 'Sector 14, Dwarka, New Delhi', established: '2008', type: 'Public', campus: 'Modern campus', founder: 'Government of Delhi', chancellor: 'Chief Justice of Delhi High Court', totalenrollment: '900 students', website: 'https://nludelhi.ac.in/' },
    { rank: 5, name: 'Symbiosis Law School', location: 'Pune', approxfee: 'INR 3,00,000 - 4,00,000', avgpackage: 'INR 8,00,000 - 12,00,000', ratings: '4.4/5', reviews: 'Excellent infrastructure and industry-oriented curriculum.', eligibility: '10+2 with 45% marks and SLAT score', scholarship: 'Merit-based scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370122phpK4k8k8.jpeg', address: 'Senapati Bapat Road, Pune', established: '1977', type: 'Private', campus: 'Urban campus', founder: 'Dr. S. B. Mujumdar', chancellor: 'Dr. S. B. Mujumdar', totalenrollment: '1200 students', website: 'https://www.symlaw.ac.in/' },
    { rank: 6, name: 'Gujarat National Law University', location: 'Gandhinagar', approxfee: 'INR 1,80,000 - 2,20,000', avgpackage: 'INR 7,00,000 - 12,00,000', ratings: '4.3/5', reviews: 'Focus on interdisciplinary legal education.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370180phpT9t9t9.jpeg', address: 'Knowledge Corridor, Gandhinagar', established: '2003', type: 'Public', campus: '50 acres', founder: 'Government of Gujarat', chancellor: 'Chief Justice of Gujarat High Court', totalenrollment: '800 students', website: 'https://www.gnlu.ac.in/' },
    { rank: 7, name: 'National Law University', location: 'Jodhpur', approxfee: 'INR 2,10,000 - 2,60,000', avgpackage: 'INR 9,00,000 - 15,00,000', ratings: '4.5/5', reviews: 'Strong focus on corporate law programs.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370240phpM1m1m1.jpeg', address: 'NH 65, Mandore, Jodhpur', established: '1999', type: 'Public', campus: '50 acres', founder: 'Government of Rajasthan', chancellor: 'Chief Justice of Rajasthan High Court', totalenrollment: '700 students', website: 'https://www.nlujodhpur.ac.in/' },
    { rank: 8, name: 'Rajiv Gandhi National University of Law', location: 'Patiala', approxfee: 'INR 1,90,000 - 2,30,000', avgpackage: 'INR 6,00,000 - 10,00,000', ratings: '4.2/5', reviews: 'Good infrastructure and dedicated faculty.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370300phpN2n2n2.jpeg', address: 'Patiala, Punjab', established: '2006', type: 'Public', campus: 'Urban campus', founder: 'Government of Punjab', chancellor: 'Chief Justice of Punjab and Haryana High Court', totalenrollment: '600 students', website: 'https://www.rgnul.ac.in/' },
    { rank: 9, name: 'National Law University', location: 'Odisha', approxfee: 'INR 1,70,000 - 2,10,000', avgpackage: 'INR 5,00,000 - 9,00,000', ratings: '4.1/5', reviews: 'Growing institution with good potential.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370360phpO3o3o3.jpeg', address: 'Kathajodi Campus, Cuttack', established: '2009', type: 'Public', campus: 'Campus in Cuttack', founder: 'Government of Odisha', chancellor: 'Chief Justice of Odisha High Court', totalenrollment: '500 students', website: 'https://www.nluo.ac.in/' },
    { rank: 10, name: 'Hidayatullah National Law University', location: 'Raipur', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 8,00,000', ratings: '4.0/5', reviews: 'Good regional law university.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://images.shiksha.com/mediadata/images/1601370420phpP4p4p4.jpeg', address: 'Naya Raipur, Chhattisgarh', established: '2003', type: 'Public', campus: 'Campus in Naya Raipur', founder: 'Government of Chhattisgarh', chancellor: 'Chief Justice of Chhattisgarh High Court', totalenrollment: '550 students', website: 'https://www.hnlu.ac.in/' },
    { rank: 11, name: 'National Law University', location: 'Lucknow', approxfee: 'INR 1,80,000 - 2,20,000', avgpackage: 'INR 6,00,000 - 11,00,000', ratings: '4.2/5', reviews: 'Good academic programs and facilities.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Gomti Nagar, Lucknow', established: '2005', type: 'Public', campus: 'Urban campus', founder: 'Government of Uttar Pradesh', chancellor: 'Chief Justice of Allahabad High Court', totalenrollment: '650 students', website: 'https://www.rmlnlu.ac.in/' },
    { rank: 12, name: 'National Law University', location: 'Mumbai', approxfee: 'INR 2,50,000 - 3,00,000', avgpackage: 'INR 12,00,000 - 18,00,000', ratings: '4.4/5', reviews: 'Excellent location with industry connections.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Vashi, Navi Mumbai', established: '2010', type: 'Public', campus: 'Urban campus', founder: 'Government of Maharashtra', chancellor: 'Chief Justice of Bombay High Court', totalenrollment: '700 students', website: 'https://www.nlumumbai.edu.in/' },
    { rank: 13, name: 'National Law University', location: 'Ranchi', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 5,00,000 - 9,00,000', ratings: '4.0/5', reviews: 'Focus on tribal and regional laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Nagri, Ranchi', established: '2010', type: 'Public', campus: 'Campus in Nagri', founder: 'Government of Jharkhand', chancellor: 'Chief Justice of Jharkhand High Court', totalenrollment: '500 students', website: 'https://www.nluranchi.ac.in/' },
    { rank: 14, name: 'Damodaram Sanjivayya National Law University', location: 'Visakhapatnam', approxfee: 'INR 1,50,000 - 1,90,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.9/5', reviews: 'Good regional law university.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Sabbavaram, Visakhapatnam', established: '2008', type: 'Public', campus: 'Campus in Sabbavaram', founder: 'Government of Andhra Pradesh', chancellor: 'Chief Justice of Andhra Pradesh High Court', totalenrollment: '450 students', website: 'https://www.dsnlu.ac.in/' },
    { rank: 15, name: 'National Law University', location: 'Shimla', approxfee: 'INR 1,40,000 - 1,80,000', avgpackage: 'INR 4,00,000 - 6,00,000', ratings: '3.8/5', reviews: 'Beautiful campus location.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Shimla, Himachal Pradesh', established: '2010', type: 'Public', campus: 'Campus in Shimla', founder: 'Government of Himachal Pradesh', chancellor: 'Chief Justice of Himachal Pradesh High Court', totalenrollment: '400 students', website: 'https://www.hpnlu.ac.in/' },
    { rank: 16, name: 'National Law University', location: 'Nagpur', approxfee: 'INR 1,70,000 - 2,10,000', avgpackage: 'INR 5,00,000 - 8,00,000', ratings: '4.0/5', reviews: 'Good infrastructure and programs.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Nagpur, Maharashtra', established: '2015', type: 'Public', campus: 'Urban campus', founder: 'Government of Maharashtra', chancellor: 'Chief Justice of Bombay High Court', totalenrollment: '350 students', website: 'https://www.nlsnagpur.ac.in/' },
    { rank: 17, name: 'National Law University', location: 'Bhopal', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.9/5', reviews: 'Focus on environmental laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Bhopal, Madhya Pradesh', established: '2018', type: 'Public', campus: 'Urban campus', founder: 'Government of Madhya Pradesh', chancellor: 'Chief Justice of Madhya Pradesh High Court', totalenrollment: '300 students', website: 'https://www.nlibhopal.ac.in/' },
    { rank: 18, name: 'National Law University', location: 'Surat', approxfee: 'INR 1,80,000 - 2,20,000', avgpackage: 'INR 5,00,000 - 9,00,000', ratings: '4.1/5', reviews: 'Good industry connections.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Surat, Gujarat', established: '2019', type: 'Public', campus: 'Urban campus', founder: 'Government of Gujarat', chancellor: 'Chief Justice of Gujarat High Court', totalenrollment: '280 students', website: 'https://www.nlusurat.ac.in/' },
    { rank: 19, name: 'National Law University', location: 'Thiruvananthapuram', approxfee: 'INR 1,50,000 - 1,90,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.8/5', reviews: 'Focus on maritime laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Thiruvananthapuram, Kerala', established: '2020', type: 'Public', campus: 'Urban campus', founder: 'Government of Kerala', chancellor: 'Chief Justice of Kerala High Court', totalenrollment: '250 students', website: 'https://www.nlutnl.ac.in/' },
    { rank: 20, name: 'National Law University', location: 'Dehradun', approxfee: 'INR 1,70,000 - 2,10,000', avgpackage: 'INR 5,00,000 - 8,00,000', ratings: '4.0/5', reviews: 'Beautiful Himalayan campus.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Dehradun, Uttarakhand', established: '2012', type: 'Public', campus: 'Campus in Dehradun', founder: 'Government of Uttarakhand', chancellor: 'Chief Justice of Uttarakhand High Court', totalenrollment: '320 students', website: 'https://www.nludel.ac.in/' },
    { rank: 21, name: 'National Law University', location: 'Amritsar', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.9/5', reviews: 'Focus on human rights laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Amritsar, Punjab', established: '2009', type: 'Public', campus: 'Urban campus', founder: 'Government of Punjab', chancellor: 'Chief Justice of Punjab and Haryana High Court', totalenrollment: '300 students', website: 'https://www.nlua.ac.in/' },
    { rank: 22, name: 'National Law University', location: 'Jammu', approxfee: 'INR 1,50,000 - 1,90,000', avgpackage: 'INR 4,00,000 - 6,00,000', ratings: '3.7/5', reviews: 'Focus on constitutional laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Jammu, Jammu and Kashmir', established: '1998', type: 'Public', campus: 'Urban campus', founder: 'Government of Jammu and Kashmir', chancellor: 'Chief Justice of Jammu and Kashmir High Court', totalenrollment: '280 students', website: 'https://www.nlujammu.ac.in/' },
    { rank: 23, name: 'National Law University', location: 'Siliguri', approxfee: 'INR 1,40,000 - 1,80,000', avgpackage: 'INR 3,00,000 - 5,00,000', ratings: '3.6/5', reviews: 'Serving North Bengal region.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Siliguri, West Bengal', established: '2021', type: 'Public', campus: 'Campus in Siliguri', founder: 'Government of West Bengal', chancellor: 'Chief Justice of Calcutta High Court', totalenrollment: '200 students', website: 'https://www.nlusiliguri.ac.in/' },
    { rank: 24, name: 'National Law University', location: 'Kozhikode', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.8/5', reviews: 'Focus on commercial laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Kozhikode, Kerala', established: '2014', type: 'Public', campus: 'Urban campus', founder: 'Government of Kerala', chancellor: 'Chief Justice of Kerala High Court', totalenrollment: '270 students', website: 'https://www.nluk.ac.in/' },
    { rank: 25, name: 'National Law University', location: 'Mangalore', approxfee: 'INR 1,50,000 - 1,90,000', avgpackage: 'INR 3,00,000 - 6,00,000', ratings: '3.7/5', reviews: 'Focus on coastal laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Mangalore, Karnataka', established: '2020', type: 'Public', campus: 'Urban campus', founder: 'Government of Karnataka', chancellor: 'Chief Justice of Karnataka High Court', totalenrollment: '220 students', website: 'https://www.nlumangalore.ac.in/' },
    { rank: 26, name: 'National Law University', location: 'Udaipur', approxfee: 'INR 1,70,000 - 2,10,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.9/5', reviews: 'Beautiful lakeside campus.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Udaipur, Rajasthan', established: '2016', type: 'Public', campus: 'Campus in Udaipur', founder: 'Government of Rajasthan', chancellor: 'Chief Justice of Rajasthan High Court', totalenrollment: '260 students', website: 'https://www.nlua.ac.in/' },
    { rank: 27, name: 'National Law University', location: 'Gwalior', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 6,00,000', ratings: '3.8/5', reviews: 'Focus on criminal laws.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Gwalior, Madhya Pradesh', established: '2018', type: 'Public', campus: 'Urban campus', founder: 'Government of Madhya Pradesh', chancellor: 'Chief Justice of Madhya Pradesh High Court', totalenrollment: '240 students', website: 'https://www.nlug.ac.in/' },
    { rank: 28, name: 'National Law University', location: 'Agra', approxfee: 'INR 1,50,000 - 1,90,000', avgpackage: 'INR 3,00,000 - 5,00,000', ratings: '3.6/5', reviews: 'Regional law university.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Agra, Uttar Pradesh', established: '2021', type: 'Public', campus: 'Urban campus', founder: 'Government of Uttar Pradesh', chancellor: 'Chief Justice of Allahabad High Court', totalenrollment: '200 students', website: 'https://www.nlua.ac.in/' },
    { rank: 29, name: 'National Law University', location: 'Guwahati', approxfee: 'INR 1,40,000 - 1,80,000', avgpackage: 'INR 3,00,000 - 5,00,000', ratings: '3.7/5', reviews: 'Serving North-East region.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Guwahati, Assam', established: '2009', type: 'Public', campus: 'Urban campus', founder: 'Government of Assam', chancellor: 'Chief Justice of Gauhati High Court', totalenrollment: '230 students', website: 'https://www.nluassam.ac.in/' },
    { rank: 30, name: 'National Law University', location: 'Bhubaneswar', approxfee: 'INR 1,60,000 - 2,00,000', avgpackage: 'INR 4,00,000 - 7,00,000', ratings: '3.8/5', reviews: 'Modern infrastructure.', eligibility: '10+2 with 45% marks and CLAT UG score', scholarship: 'Merit-based and Government Scholarships', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/University_campus_%283%29.jpg/800px-University_campus_%283%29.jpg', address: 'Bhubaneswar, Odisha', established: '2020', type: 'Public', campus: 'Urban campus', founder: 'Government of Odisha', chancellor: 'Chief Justice of Odisha High Court', totalenrollment: '250 students', website: 'https://www.nlub.ac.in/' }
  ];

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageError = (collegeRank) => {
    setImageErrors(prev => ({
      ...prev,
      [collegeRank]: true
    }));
  };

  const getFallbackImage = (college) => {
    const initial = college.name.charAt(0);
    return (
      <div style={{
        width: '100%',
        height: '250px',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        border: '2px solid #d4af37',
        color: '#d4af37',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        {initial}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <h1 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>Top 30 Law Colleges in India – 2025</h1>
      
      <div style={{ maxWidth: '600px', margin: '0 auto 30px auto', position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
        <input
          type="text"
          placeholder="Search colleges by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 15px 15px 45px',
            borderRadius: '10px',
            border: '2px solid #555',
            backgroundColor: '#2a2a2a',
            color: '#fff',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #555' }}>
          <thead>
            <tr style={{ backgroundColor: '#333' }}>
              <th style={{ border: '1px solid #555', padding: '15px', color: '#d4af37' }}>Rank</th>
              <th style={{ border: '1px solid #555', padding: '15px', color: '#d4af37' }}>College Name</th>
              <th style={{ border: '1px solid #555', padding: '15px', color: '#d4af37' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((c) => (
              <tr 
                key={c.rank} 
                style={{ 
                  backgroundColor: c.rank % 2 === 0 ? '#2a2a2a' : '#1c1c1c',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = c.rank % 2 === 0 ? '#2a2a2a' : '#1c1c1c'}
                onClick={() => setSelected(c)}
              >
                <td style={{ border: '1px solid #555', padding: '15px', fontWeight: 'bold' }}>{c.rank}</td>
                <td style={{ border: '1px solid #555', padding: '15px' }}>{c.name}</td>
                <td style={{ border: '1px solid #555', padding: '15px' }}>{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredColleges.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#ccc' }}>
            No colleges found matching your search.
          </div>
        )}
      </div>

      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', zIndex: 1000 }} onClick={() => setSelected(null)}>
          <div style={{ backgroundColor: '#222', borderRadius: '15px', padding: '30px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', border: '3px solid #d4af37' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#d4af37', border: 'none', borderRadius: '50%', width: '35px', height: '35px', fontSize: '20px', color: '#000', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
            
            <h1 style={{ marginTop: 0, color: '#d4af37', textAlign: 'center', marginBottom: '5px' }}>{selected.name}</h1>
            <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '25px', fontWeight: 'normal' }}>{selected.location}</h2>
            
            {/* Fixed Image Display */}
            {imageErrors[selected.rank] ? (
              getFallbackImage(selected)
            ) : (
              <img 
                src={selected.image} 
                alt={`${selected.name} campus`} 
                style={{ 
                  width: '100%', 
                  height: '250px', 
                  objectFit: 'cover', 
                  borderRadius: '10px', 
                  border: '2px solid #555', 
                  marginBottom: '20px' 
                }} 
                onError={() => handleImageError(selected.rank)}
              />
            )}

            <div style={{ lineHeight: '1.7' }}>
              {[
                ['📍 Address:', selected.address],
                ['🏛 Campus:', selected.campus],
                ['📅 Established:', selected.established],
                ['🎓 Type:', selected.type],
                ['👨‍🏫 Founder:', selected.founder],
                ['⚖ Chancellor:', selected.chancellor],
                ['👥 Total Enrollment:', selected.totalenrollment],
                ['⭐ Rating:', selected.ratings],
                ['💰 Approximate Fees:', selected.approxfee],
                ['💼 Average Placement:', selected.avgpackage],
                ['📝 Review:', selected.reviews],
                ['🎯 Eligibility:', selected.eligibility],
                ['🎓 Scholarship:', selected.scholarship]
              ].map(([label, value], index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'gold', minWidth: '160px', display: 'inline-block' }}>{label}</strong> 
                  <span>{value}</span>
                </div>
              ))}

              {selected.website && (
                <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '2px solid #555' }}>
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#d4af37', color: '#000', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#000'; e.target.style.color = '#d4af37'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#d4af37'; e.target.style.color = '#000'; }}>
                    <ExternalLink size={18} />
                    Visit College Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}