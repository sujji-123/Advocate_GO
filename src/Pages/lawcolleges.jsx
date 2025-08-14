import React from 'react';
import rank1 from '../assets/rank1.jpg';
import rank2 from '../assets/rank2.jpeg';
import rank3 from '../assets/rank3.jpg';
import rank4 from '../assets/rank4.jpg';
import rank5 from '../assets/rank5.jpg';
import rank6 from '../assets/rank6.jpeg';
import rank7 from '../assets/rank7.jpeg';
import rank8 from '../assets/rank8.jpg';  
import rank9 from '../assets/rank9.jpeg';
import rank10 from '../assets/rank10.jpg';
import rank11 from '../assets/rank11.png';
import rank12 from '../assets/rank12.jpeg';
import rank13 from '../assets/rank13.jpeg';
import rank14 from '../assets/rank14.jpg';
import rank15 from '../assets/rank15.png';
import rank16 from '../assets/rank16.jpg';
import rank17 from '../assets/rank17.jpeg';
import rank18 from '../assets/rank18.jpg';
import rank19 from '../assets/rank19.jpg';
import rank20 from '../assets/rank20.jpg';
import rank21 from '../assets/rank21.jpg';
import rank22 from '../assets/rank22.jpg';
import rank23 from '../assets/rank23.jpg';
import rank24 from '../assets/rank24.jpg';
import rank25 from '../assets/rank25.jpg';
import rank26 from '../assets/rank26.jpeg';
import rank27 from '../assets/rank27.jpeg';
import rank28 from '../assets/rank28.jpeg';
import rank29 from '../assets/rank29.jpeg';
import rank30 from '../assets/rank30.jpeg';
export default function TopLawCollegesPage(){
  const [selected, setSelected] = React.useState(null);
  const colleges = [
    { rank: 1, name: 'National Law School of India University', location: 'Bengaluru' ,approxfee:  'INR 1,00,000',avgpackage: 'INR 12,00,000',ratings:'4.8/5',reviews:'Campus is great, faculty is excellent, and placements are top-notch.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.',scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLSUI Alumini Scholarship.',
      image:rank1
    ,address:' Gnana Bharathi Main Rd, opp. NAAC, Teachers Colony, Naagarabhaavi, Bengaluru, Karnataka 560072',
      established: '1987',
      type: 'Public',
      campus: 'Urban-located residential-cum-day school, 23 acres (9.3 ha)',
      founder: 'N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '713 (2025)'
     },
    { rank: 2, name: 'National Law University', location: 'New Delhi'  ,approxfee: 'INR 1,20,000', avgpackage: 'INR 14,00,000', ratings: '4.7/5', reviews: 'One of the best law schools in India, with a vibrant campus life.',eligibility: '10+2 with minimum 50% marks and CLAT exam.',scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Alumini Scholarship.',
      image:rank2,
      address: 'Sector 14, Dwarka, New Delhi, Delhi 110078',
      established: '2008',
      type: 'Public',
      campus: 'Urban, 40 acres (16 ha)',
      founder: 'Prof. (Dr.) Ranbir Singh',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,500 (2025)'
     },
    { rank: 3, name: 'NALSAR University of Law', location: 'Hyderabad', approxfee: 'INR 1,10,000', avgpackage: 'INR 13,00,000', ratings: '4.6/5', reviews: 'Excellent faculty and infrastructure, with a strong alumni network.',eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNALSAR Alumini Scholarship.'
      ,image:rank3,
      address: 'Justice City, Shameerpet, Hyderabad, Telangana 500101',
      established: '1998',
      type: 'Public',
      campus: 'Urban, 55 acres (22 ha)',
      founder: 'Prof. (Dr.) Faizan Mustafa',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 4, name: 'West Bengal National University of Juridical Sciences', location: 'Kolkata' , approxfee: 'INR 1,05,000', avgpackage: 'INR 11,00,000', ratings: '4.5/5', reviews: 'Great campus and a diverse student body, with good placement opportunities.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nWBNUJS Alumini Scholarship.' ,
      image:rank4,
      address: '12 LB Block, Sector III, Salt Lake City, Kolkata, West Bengal 700098',
      established: '1999',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,000 (2025)'
    },
    { rank: 5, name: 'Symbiosis Law School', location: 'Pune', approxfee: 'INR 1,15,000', avgpackage: 'INR 10,00,000', ratings: '4.4/5', reviews: 'Known for its innovative teaching methods and strong industry connections.',eligibility: '10+2 with minimum 50% marks and SLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nSLS Alumini Scholarship.' ,
      image: rank5,
      address: 'Senapati Bapat Road, Pune, Maharashtra 411004',
      established: '1977',
      type: 'Private',
      campus: 'Urban, 30 acres (12 ha)',
      founder: 'Dr. S. B. Mujumdar',
      chancellor: 'Dr. S. B. Mujumdar',
      totalenrollment: '1,500 (2025)'
    },
    {rank:6, name:'Gujarat National Law University', location: 'Gandhinagar', approxfee: 'INR 1,00,000', avgpackage: 'INR 9,00,000', ratings: '4.3/5', reviews: 'Offers a unique curriculum with a focus on practical learning and research.', eligibility: '10+2 with minimum 50% marks and CLAT exam.',scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nGNLU Alumini Scholarship.',
      image: rank6,
      address: 'Attalika Avenue, Knowledge Corridor, Koba, Gandhinagar, Gujarat 382426',
      established: '2003',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) B. S. Chimni',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 7, name: 'National Academy of Legal Studies and Research', location: 'Hyderabad' , approxfee: 'INR 1,20,000', avgpackage: 'INR 15,00,000', ratings: '4.2/5', reviews: 'Strong emphasis on research and public policy, with excellent faculty.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNALSAR Alumini Scholarship.',
      image:rank7,
      address: 'Justice City, Shameerpet, Hyderabad, Telangana 500101',
      established: '1998',
      type: 'Public',
      campus: 'Urban, 55 acres (22 ha)',
      founder: 'Prof. (Dr.) Faizan Mustafa',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
       },
    { rank: 8, name: 'National Law University, Jodhpur', location: 'Jodhpur', approxfee: 'INR 1,30,000', avgpackage: 'INR 16,00,000', ratings: '4.1/5', reviews: 'Known for its rigorous academic programs and strong placement record.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Jodhpur Alumini Scholarship.',
      image:rank8,
      address: 'NH 65, Mandore, Jodhpur, Rajasthan 342304',
      established: '1999',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,000 (2025)'
     },
    { rank: 9, name: 'National Law University, Odisha', location: 'Cuttack', approxfee: 'INR 1,25,000', avgpackage: 'INR 14,00,000', ratings: '4.0/5', reviews: 'Offers a unique blend of traditional and modern legal education.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Odisha Alumini Scholarship.',
      image: rank9,
      address: 'Kathajodi Campus, Sector 13, CDA, Cuttack, Odisha 753014',
      established: '2009',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 10, name: 'National Law University, Delhi', location: 'New Delhi', approxfee: 'INR 1,40,000', avgpackage: 'INR 18,00,000', ratings: '4.9/5', reviews: 'Top-notch faculty and infrastructure, with a strong focus on research and innovation.',eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Delhi Alumini Scholarship.',
      image:rank10,
      address: 'Sector 14, Dwarka, New Delhi, Delhi 110078',
      established: '2008',
      type: 'Public',
      campus: 'Urban, 40 acres (16 ha)',
      founder: 'Prof. (Dr.) Ranbir Singh',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,500 (2025)'
     },
    { rank: 11, name: 'National Law University, Lucknow', location: 'Lucknow',  approxfee: 'INR 1,35,000', avgpackage: 'INR 17,00,000', ratings: '4.8/5', reviews: 'Excellent campus facilities and a vibrant student community.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Lucknow Alumini Scholarship.',
      image:rank11,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 12, name: 'National Law University, Mumbai', location: 'Mumbai' , approxfee: 'INR 1,50,000', avgpackage: 'INR 20,00,000', ratings: '4.7/5', reviews: 'Strong industry connections and a diverse curriculum.' ,eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Mumbai Alumini Scholarship.' 
      ,image: rank12,
      address: 'Sector 14, Vashi, Navi Mumbai, Maharashtra 400703',
      established: '2010',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,500 (2025)'
    },
    { rank: 13, name: 'National Law University, Ranchi', location: 'Ranchi' , approxfee: 'INR 1,10,000', avgpackage: 'INR 12,00,000', ratings: '4.6/5', reviews: 'Known for its strong focus on social justice and public interest law.', eligibility: '10+2 with minimum 50% marks and CLAT exam.' ,scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Ranchi Alumini Scholarship.' 
      ,image: rank13,  
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of Jharkand',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 14, name: 'National Law University, Patiala', location: 'Patiala' , approxfee: 'INR 1,20,000', avgpackage: 'INR 13,00,000', ratings: '4.5/5', reviews: 'Offers a unique curriculum with a focus on practical learning and research.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Patiala Alumini Scholarship.',
      image:rank14,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 15, name: 'National Law University, Shimla', location: 'Shimla', approxfee: 'INR 1,15,000', avgpackage: 'INR 11,00,000', ratings: '4.4/5', reviews: 'Great campus and a diverse student body, with good placement opportunities.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Shimla Alumini Scholarship.' ,
      image:rank15,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 16, name: 'National Law University, Raipur', location: 'Raipur', approxfee: 'INR 1,05,000', avgpackage: 'INR 10,00,000', ratings: '4.3/5', reviews: 'Known for its innovative teaching methods and strong industry connections.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Raipur Alumini Scholarship.',
      image: rank16,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 17, name: 'National Law University, Nagpur', location: 'Nagpur', approxfee: 'INR 1,00,000', avgpackage: 'INR 9,00,000', ratings: '4.2/5', reviews: 'Offers a unique blend of traditional and modern legal education.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Nagpur Alumini Scholarship.'
      ,image:rank17,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 18, name: 'National Law University, Bhopal', location: 'Bhopal', approxfee: 'INR 1,30,000', avgpackage: 'INR 15,00,000', ratings: '4.1/5', reviews: 'Strong emphasis on research and public policy, with excellent faculty.', eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Bhopal Alumini Scholarship.',
      image:rank18,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 19, name: 'National Law University, Visakhapatnam', location: 'Visakhapatnam' , approxfee: 'INR 1,25,000', avgpackage: 'INR 14,00,000', ratings: '4.0/5', reviews: 'Known for its rigorous academic programs and strong placement record.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Visakhapatnam Alumini Scholarship.' ,
      image:rank19,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank  : 20, name: 'National Law University, Surat', location: 'Surat', approxfee: 'INR 1,35,000', avgpackage: 'INR 17,00,000', ratings: '4.9/5', reviews: 'Top-notch faculty and infrastructure, with a strong focus on research and innovation.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Surat Alumini Scholarship.' ,
      image:rank20,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 21, name: 'National Law University, Thiruvananthapuram', location: 'Thiruvananthapuram', approxfee: 'INR 1,40,000', avgpackage: 'INR 18,00,000', ratings: '4.8/5', reviews: 'Excellent campus facilities and a vibrant student community.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Thiruvananthapuram Alumini Scholarship.',
      image:rank21,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 22, name: 'National Law University, Dehradun', location: 'Dehradun', approxfee: 'INR 1,50,000', avgpackage: 'INR 20,00,000', ratings: '4.7/5', reviews: 'Strong industry connections and a diverse curriculum.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Dehradun Alumini Scholarship.',
      image:rank22,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 23, name: 'National Law University, Amritsar', location: 'Amritsar', approxfee: 'INR 1,10,000', avgpackage: 'INR 12,00,000', ratings: '4.6/5', reviews: 'Known for its strong focus on social justice and public interest law.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Amritsar Alumini Scholarship.',
      image:rank23,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 24, name: 'National Law University, Jammu', location: 'Jammu' , approxfee: 'INR 1,20,000', avgpackage: 'INR 13,00,000', ratings: '4.5/5', reviews: 'Offers a unique curriculum with a focus on practical learning and research.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Jammu Alumini Scholarship.',
      image:rank24,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 25, name: 'National Law University, Siliguri', location: 'Siliguri' , approxfee: 'INR 1,15,000', avgpackage: 'INR 11,00,000', ratings: '4.4/5', reviews: 'Great campus and a diverse student body, with good placement opportunities.', eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Siliguri Alumini Scholarship.',
      image:rank25,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 26, name: 'National Law University, Kozhikode', location: 'Kozhikode', approxfee: 'INR 1,05,000', avgpackage: 'INR 10,00,000', ratings: '4.3/5', reviews: 'Known for its innovative teaching methods and strong industry connections.', eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Kozhikode Alumini Scholarship.',
      image: rank26,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 27, name: 'National Law University, Mangalore', location: 'Mangalore' , approxfee: 'INR 1,00,000', avgpackage: 'INR 9,00,000', ratings: '4.2/5', reviews: 'Offers a unique blend of traditional and modern legal education.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Mangalore Alumini Scholarship.' ,
      image:rank27,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },
    { rank: 28, name: 'National Law University, Udaipur', location: 'Udaipur', approxfee: 'INR 1,30,000', avgpackage: 'INR 15,00,000', ratings: '4.1/5', reviews: 'Strong emphasis on research and public policy, with excellent faculty.' , eligibility: '10+2 with minimum 50% marks and CLAT exam.' , scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Udaipur Alumini Scholarship.',
      image:rank28,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'

     },
    { rank: 29, name: 'National Law University, Gwalior', location: 'Gwalior', approxfee: 'INR 1,25,000', avgpackage: 'INR 14,00,000', ratings: '4.0/5', reviews: 'Known for its rigorous academic programs and strong placement record.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Gwalior Alumini Scholarship.'
      ,image: rank29,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
     },
    { rank: 30, name: 'National Law University, Agra', location: 'Agra' , approxfee: 'INR 1,35,000', avgpackage: 'INR 17,00,000', ratings: '4.9/5', reviews: 'Top-notch faculty and infrastructure, with a strong focus on research and innovation.', eligibility: '10+2 with minimum 50% marks and CLAT exam.', scholarship: 'Merit-based scholarships available for deserving students.\n Government Scolarships.\nNLU Agra Alumini Scholarship.' ,
      image: rank30,
      address: 'Sector 14, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      established: '2005',
      type: 'Public',
      campus: 'Urban, 50 acres (20 ha)',
      founder: 'Prof. (Dr.) N. R. Madhava Menon',
      chancellor: 'Chief Justice of India (de facto)',
      totalenrollment: '1,200 (2025)'
    },  


  ];

  return (
    <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#d4af37', textAlign: 'center' }}>Top 30 Law Colleges in India – 2025</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#333' }}>
            <th style={{ border: '1px solid #555', padding: '8px', color: '#d4af37' }}>Rank</th>
            <th style={{ border: '1px solid #555', padding: '8px', color: '#d4af37' }}>College Name</th>
            <th style={{ border: '1px solid #555', padding: '8px', color: '#d4af37' }}>Location</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((c) => (
            <tr key={c.rank} style={{ backgroundColor: c.rank % 2 === 0 ? '#2a2a2a' : 'transparent' }}>
              <td style={{ border: '1px solid #555', padding: '8px' }}>{c.rank}</td>
              <td style={{ border: '1px solid #555', padding: '8px',cursor: 'pointer' }} onClick={() => setSelected(c)}>{c.name}</td>
              <td style={{ border: '1px solid #555', padding: '8px' }}>{c.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            //display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            zIndex: 99,
          }}
        >
          <div
            style={{
              backgroundColor: '#222',
              borderRadius: '12px',
              padding: '24px',
              //maxWidth: '500px',
              width: '100%',
              maxHeight:'100vh',
              overflowY: 'auto',
              position: 'relative',
              color: '#f0f0f0',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <h1 style={{ marginTop: 0 ,color:'#d4af37',textAlign: 'center',}}><strong>{selected.name}</strong></h1>
            <h2 style={{color:'#d4af37',textAlign:'center'}}>{selected.location}</h2>
            <img src={selected.image} alt={`${selected.name} logo`} style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', margin: '20px 0', padding: '2px' }} />
            <div style={{ marginTop: '12px' }}>
              <div>
                <strong style={{color:'gold'}}>Address:</strong> {selected.address}
              </div>
              <div>
                <strong style={{color:'gold'}}>Campus:</strong> {selected.campus}
              </div>
              <div>
                <strong style={{color:'gold'}}>Founded:</strong> {selected.founded}
              </div>
              <div>
                <strong style={{color:'gold'}}>Founder:</strong> {selected.founder}
              </div>
              <div>
                <strong style={{color:'gold'}}>Chancellor:</strong> {selected.chancellor}
              </div>
              <div>
                <strong style={{color:'gold'}}>Total Enrollment:</strong> {selected.totalenrollment}
              </div>
              <div>
                <strong style={{color:'gold'}}>Rating:</strong> {selected.ratings}
              </div>
              <div>
                <strong style={{color:'gold'}}>Average Placement:</strong> {selected.avgpackage}
              </div>
              <div>
                <strong style={{color:'gold'}}>Review:</strong> {selected.reviews}
              </div>
              <div>
                <strong style={{color:'gold'}}>Eligibility:</strong> {selected.eligibility}
              </div>
              <div style={{ whiteSpace: 'pre-line' }}>
                <strong style={{color:'gold'}}>Scholarship:</strong> {selected.scholarship}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}