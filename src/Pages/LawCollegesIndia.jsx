import React, { useState, useEffect } from 'react';

const LawCollegesIndia = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    exam: '',
    fees: '',
    type: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  // Sample data for top law colleges in India
  const lawCollegesData = [
    {
      id: 1,
      name: "National Law School of India University (NLSIU)",
      location: "Bangalore",
      type: "Public",
      established: 1987,
      ranking: 1,
      exams: ["CLAT"],
      fees: "2.5-3 L/year",
      courses: ["BA LLB", "LLM", "PhD"],
      seats: 120,
      placement: "95%",
      avgPackage: "15-20 LPA",
      topRecruiters: ["Trilegal", "Shardul Amarchand", "Khaitan & Co"],
      infrastructure: "Excellent",
      faculty: "World-class",
      hostel: "Available",
      website: "https://www.nls.ac.in",
      highlights: ["Oldest NLU", "Best placements", "Strong alumni network"],
      image: "https://via.placeholder.com/300x200?text=NLSIU+Bangalore"
    },
    {
      id: 2,
      name: "NALSAR University of Law",
      location: "Hyderabad",
      type: "Public",
      established: 1998,
      ranking: 2,
      exams: ["CLAT"],
      fees: "2-2.5 L/year",
      courses: ["BA LLB", "BBA LLB", "LLM", "PhD"],
      seats: 120,
      placement: "92%",
      avgPackage: "14-18 LPA",
      topRecruiters: ["Luthra & Luthra", "Trilegal", "AZB & Partners"],
      infrastructure: "Excellent",
      faculty: "Renowned",
      hostel: "Available",
      website: "https://www.nalsar.ac.in",
      highlights: ["Beautiful campus", "Strong moot court culture", "Research focus"],
      image: "https://via.placeholder.com/300x200?text=NALSAR+Hyderabad"
    },
    {
      id: 3,
      name: "West Bengal National University of Juridical Sciences (WBNUJS)",
      location: "Kolkata",
      type: "Public",
      established: 1999,
      ranking: 3,
      exams: ["CLAT"],
      fees: "2-2.8 L/year",
      courses: ["BA LLB", "BSc LLB", "LLM", "PhD"],
      seats: 120,
      placement: "90%",
      avgPackage: "12-16 LPA",
      topRecruiters: ["S&R Associates", "Khaitan & Co", "JSA"],
      infrastructure: "Very Good",
      faculty: "Experienced",
      hostel: "Available",
      website: "https://www.nujs.edu",
      highlights: ["Strong corporate law focus", "Good location", "Active student body"],
      image: "https://via.placeholder.com/300x200?text=WBNUJS+Kolkata"
    },
    {
      id: 4,
      name: "National Law University (NLU Delhi)",
      location: "Delhi",
      type: "Public",
      established: 2008,
      ranking: 4,
      exams: ["AILET"],
      fees: "1.8-2.2 L/year",
      courses: ["BA LLB", "LLM", "PhD"],
      seats: 80,
      placement: "88%",
      avgPackage: "13-17 LPA",
      topRecruiters: ["SAM", "Trilegal", "Shardul Amarchand"],
      infrastructure: "Good",
      faculty: "Excellent",
      hostel: "Available",
      website: "https://nludelhi.ac.in",
      highlights: ["Prime location", "Growing reputation", "Good faculty"],
      image: "https://via.placeholder.com/300x200?text=NLU+Delhi"
    },
    {
      id: 5,
      name: "Gujarat National Law University (GNLU)",
      location: "Gandhinagar",
      type: "Public",
      established: 2003,
      ranking: 5,
      exams: ["CLAT"],
      fees: "2-2.5 L/year",
      courses: ["BA LLB", "BCom LLB", "LLM", "PhD"],
      seats: 160,
      placement: "85%",
      avgPackage: "10-14 LPA",
      topRecruiters: ["Cyril Amarchand", "Luthra & Luthra", "Economic Laws Practice"],
      infrastructure: "Excellent",
      faculty: "Good",
      hostel: "Available",
      website: "https://www.gnlu.ac.in",
      highlights: ["Large campus", "Diverse courses", "Good infrastructure"],
      image: "https://via.placeholder.com/300x200?text=GNLU+Gandhinagar"
    },
    {
      id: 6,
      name: "Symbiosis Law School (SLS Pune)",
      location: "Pune",
      type: "Private",
      established: 1977,
      ranking: 6,
      exams: ["SLAT"],
      fees: "4-5 L/year",
      courses: ["BA LLB", "BBA LLB", "LLM"],
      seats: 180,
      placement: "82%",
      avgPackage: "8-12 LPA",
      topRecruiters: ["Wadia Ghandy", "DSK Legal", "Legasis Partners"],
      infrastructure: "Very Good",
      faculty: "Good",
      hostel: "Available",
      website: "https://www.symlaw.ac.in",
      highlights: ["Private top college", "Good location", "Strong industry connections"],
      image: "https://via.placeholder.com/300x200?text=SLS+Pune"
    },
    {
      id: 7,
      name: "ILS Law College",
      location: "Pune",
      type: "Private",
      established: 1924,
      ranking: 7,
      exams: ["ILS Entrance"],
      fees: "1.5-2 L/year",
      courses: ["BA LLB", "LLB", "LLM"],
      seats: 240,
      placement: "78%",
      avgPackage: "6-10 LPA",
      topRecruiters: ["Local firms", "Corporate houses", "Litigation chambers"],
      infrastructure: "Good",
      faculty: "Experienced",
      hostel: "Limited",
      website: "https://ilslaw.edu",
      highlights: ["Heritage institute", "Strong alumni", "Affordable fees"],
      image: "https://via.placeholder.com/300x200?text=ILS+Pune"
    },
    {
      id: 8,
      name: "Faculty of Law, University of Delhi",
      location: "Delhi",
      type: "Public",
      established: 1924,
      ranking: 8,
      exams: ["DU LLB Entrance"],
      fees: "20-50k/year",
      courses: ["LLB", "LLM", "PhD"],
      seats: 2000,
      placement: "75%",
      avgPackage: "5-8 LPA",
      topRecruiters: ["Various law firms", "Corporate sector", "Judicial services"],
      infrastructure: "Adequate",
      faculty: "Excellent",
      hostel: "Limited",
      website: "https://law.du.ac.in",
      highlights: ["Highly affordable", "Prime location", "Large intake"],
      image: "https://via.placeholder.com/300x200?text=DU+Law+Faculty"
    }
  ];

  useEffect(() => {
    setColleges(lawCollegesData);
    setFilteredColleges(lawCollegesData);
  }, []);

  useEffect(() => {
    filterColleges();
  }, [filters, searchTerm]);

  const filterColleges = () => {
    let filtered = [...colleges];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(college => college.location === filters.location);
    }

    // Exam filter
    if (filters.exam) {
      filtered = filtered.filter(college => college.exams.includes(filters.exam));
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(college => college.type === filters.type);
    }

    setFilteredColleges(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleCompare = (college) => {
    if (compareList.find(c => c.id === college.id)) {
      setCompareList(compareList.filter(c => c.id !== college.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, college]);
      } else {
        alert('You can compare up to 3 colleges at a time');
      }
    }
  };

  const isInCompareList = (collegeId) => {
    return compareList.some(college => college.id === collegeId);
  };

  const getUniqueLocations = () => {
    return [...new Set(colleges.map(college => college.location))];
  };

  const getUniqueExams = () => {
    const allExams = colleges.flatMap(college => college.exams);
    return [...new Set(allExams)];
  };

  const renderCollegeCard = (college) => (
    <div key={college.id} className="college-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: selectedCollege?.id === college.id ? '2px solid #3498db' : '1px solid #e9ecef',
      cursor: 'pointer'
    }}>
      <div className="college-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
      }}>
        <div>
          <h3 style={{ color: '#2c3e50', marginBottom: '5px', fontSize: '1.2em' }}>
            {college.name}
          </h3>
          <p style={{ color: '#7f8c8d', fontSize: '0.9em', marginBottom: '5px' }}>
            {college.location} • {college.type}
          </p>
          <div style={{
            display: 'inline-block',
            background: college.ranking <= 5 ? '#e74c3c' : college.ranking <= 10 ? '#f39c12' : '#3498db',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.8em',
            fontWeight: '600'
          }}>
            Rank #{college.ranking}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(college);
          }}
          style={{
            background: isInCompareList(college.id) ? '#e74c3c' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '0.8em'
          }}
        >
          {isInCompareList(college.id) ? 'Remove' : 'Compare'}
        </button>
      </div>

      <div className="college-details" style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#7f8c8d' }}>Fees:</span>
          <span style={{ fontWeight: '600', color: '#2c3e50' }}>{college.fees}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#7f8c8d' }}>Exams:</span>
          <span style={{ fontWeight: '600', color: '#2c3e50' }}>{college.exams.join(', ')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#7f8c8d' }}>Placement:</span>
          <span style={{ fontWeight: '600', color: '#2c3e50' }}>{college.placement}</span>
        </div>
      </div>

      <div className="college-highlights">
        <h4 style={{ color: '#2c3e50', marginBottom: '8px', fontSize: '0.9em' }}>Highlights:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {college.highlights.slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              style={{
                background: '#f8f9fa',
                color: '#3498db',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8em',
                border: '1px solid #3498db'
              }}
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCollegeDetail = () => {
    if (!selectedCollege) return null;

    return (
      <div className="college-detail" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div className="detail-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '25px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>{selectedCollege.name}</h2>
            <p style={{ color: '#7f8c8d', fontSize: '1.1em' }}>
              {selectedCollege.location} • Established {selectedCollege.established}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              background: selectedCollege.ranking <= 5 ? '#e74c3c' : '#f39c12',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: '600',
              fontSize: '1.1em'
            }}>
              Rank #{selectedCollege.ranking}
            </div>
            <button
              onClick={() => window.open(selectedCollege.website, '_blank')}
              style={{
                background: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Visit Website
            </button>
          </div>
        </div>

        <div className="detail-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '25px'
        }}>
          <div className="detail-section">
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Basic Information</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Type:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Entrance Exams:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.exams.join(', ')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Annual Fees:</span>
                <span style={{ fontWeight: '600', color: '#e74c3c' }}>{selectedCollege.fees}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Total Seats:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.seats}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Placement Statistics</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Placement Rate:</span>
                <span style={{ fontWeight: '600', color: '#27ae60' }}>{selectedCollege.placement}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Average Package:</span>
                <span style={{ fontWeight: '600', color: '#27ae60' }}>{selectedCollege.avgPackage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Top Recruiters:</span>
                <span style={{ fontWeight: '600', textAlign: 'right' }}>
                  {selectedCollege.topRecruiters.join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Infrastructure</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Campus:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.infrastructure}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Faculty:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.faculty}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7f8c8d' }}>Hostel:</span>
                <span style={{ fontWeight: '600' }}>{selectedCollege.hostel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="courses-section">
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Courses Offered</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedCollege.courses.map((course, index) => (
              <span
                key={index}
                style={{
                  background: '#3498db',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9em'
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderComparison = () => {
    if (!showComparison || compareList.length < 2) return null;

    return (
      <div className="comparison-view" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div className="comparison-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          <h2 style={{ color: '#2c3e50' }}>College Comparison</h2>
          <button
            onClick={() => setShowComparison(false)}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Close Comparison
          </button>
        </div>

        <div className="comparison-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Parameter</th>
                {compareList.map(college => (
                  <th key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Ranking</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    #{college.ranking}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Location</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.location}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Annual Fees</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.fees}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Entrance Exams</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.exams.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Placement Rate</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.placement}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: '600' }}>Avg Package</td>
                {compareList.map(college => (
                  <td key={college.id} style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    {college.avgPackage}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="law-colleges-india" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <header className="page-header" style={{
        textAlign: 'center',
        marginBottom: '30px',
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '2.5em' }}>🎓 Top Law Colleges in India</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1em' }}>
          Comprehensive guide to India's premier law institutions with detailed comparisons
        </p>
      </header>

      {/* Search and Filters */}
      <div className="filters-section" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div className="search-bar" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search law colleges by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '1em',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        <div className="filter-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={{
              padding: '10px',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '0.9em'
            }}
          >
            <option value="">All Locations</option>
            {getUniqueLocations().map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={filters.exam}
            onChange={(e) => handleFilterChange('exam', e.target.value)}
            style={{
              padding: '10px',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '0.9em'
            }}
          >
            <option value="">All Entrance Exams</option>
            {getUniqueExams().map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            style={{
              padding: '10px',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '0.9em'
            }}
          >
            <option value="">All Types</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          <button
            onClick={() => setFilters({ location: '', exam: '', fees: '', type: '' })}
            style={{
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Comparison Bar */}
      {compareList.length > 0 && (
        <div className="comparison-bar" style={{
          background: '#3498db',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>Colleges selected for comparison: {compareList.length}/3</strong>
            <div style={{ fontSize: '0.9em', opacity: '0.9' }}>
              {compareList.map(college => college.name).join(', ')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowComparison(true)}
              disabled={compareList.length < 2}
              style={{
                background: compareList.length < 2 ? '#bdc3c7' : '#27ae60',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: compareList.length < 2 ? 'not-allowed' : 'pointer'
              }}
            >
              Compare ({compareList.length})
            </button>
            <button
              onClick={() => setCompareList([])}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* College List */}
      {renderComparison()}
      {renderCollegeDetail()}

      <div className="colleges-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredColleges.map(college => (
          <div key={college.id} onClick={() => setSelectedCollege(college)}>
            {renderCollegeCard(college)}
          </div>
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#7f8c8d' }}>No colleges found matching your criteria</h3>
          <p style={{ color: '#95a5a6' }}>Try adjusting your filters or search terms</p>
        </div>
      )}

      <footer className="page-footer" style={{
        textAlign: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '30px'
      }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9em' }}>
          <strong>Note:</strong> Rankings and data are based on 2024 surveys and may vary. 
          Always check official college websites for the most current information.
        </p>
      </footer>
    </div>
  );
};

export default LawCollegesIndia;