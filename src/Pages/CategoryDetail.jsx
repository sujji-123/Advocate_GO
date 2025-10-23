// src/Pages/CategoryDetail.jsx
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CategoryDetail = () => {
  const { id } = useParams();

  const categories = {
    1: {
      title: "Indian Constitution",
      description: "Learn about the preamble and fundamental structure of India's constitution",
      content: `The Constitution of India is the supreme law of India. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers, and duties of government institutions, and sets out fundamental rights, directive principles, and the duties of citizens.

Key Features:
• Longest written constitution in the world
• Federal system with unitary features
• Parliamentary form of government
• Fundamental Rights and Duties
• Directive Principles of State Policy

The Constitution was adopted by the Constituent Assembly on 26 November 1949 and came into effect on 26 January 1950. It has been amended 105 times since its enactment.`,
      resources: [
        {
          name: "Complete Constitution Text",
          link: "https://legislative.gov.in/constitution-of-india"
        },
        {
          name: "Important Amendments",
          link: "https://www.india.gov.in/my-government/constitution-india/amendments"
        },
        {
          name: "Landmark Judgments",
          link: "https://main.sci.gov.in/important-judgments"
        },
        {
          name: "Constitutional History",
          link: "https://www.constitutionofindia.net/historical-constitutions/"
        }
      ],
      quizLink: "https://byjus.com/free-ias-prep/mcq-on-constitution-of-india/",
      videoLink: "https://www.youtube.com/results?search_query=indian+constitution+explained",
      pdfLink: "https://www.mea.gov.in/Images/pdf1/Part1.pdf"
    },
    2: {
      title: "Fundamental Rights",
      description: "Understand your basic rights as an Indian citizen",
      content: `Fundamental Rights are the basic human rights enshrined in the Constitution of India which are guaranteed to all citizens. They are essential for the development of individuals and the country.

The six fundamental rights are:
1. Right to Equality (Articles 14-18)
2. Right to Freedom (Articles 19-22)
3. Right against Exploitation (Articles 23-24)
4. Right to Freedom of Religion (Articles 25-28)
5. Cultural and Educational Rights (Articles 29-30)
6. Right to Constitutional Remedies (Article 32)

These rights are justiciable, meaning they are enforceable by the courts.`,
      resources: [
        {
          name: "Article 12-35 Details",
          link: "https://www.mea.gov.in/Images/pdf1/Part3.pdf"
        },
        {
          name: "Case Studies",
          link: "https://nludelhi.ac.in/download/publication/FR-Case-Law.pdf"
        },
        {
          name: "Right Violation Reporting",
          link: "https://nhrc.nic.in/"
        },
        {
          name: "Legal Remedies Guide",
          link: "https://legalaffairs.gov.in/"
        }
      ],
      quizLink: "https://testbook.com/objective-questions/mcq-on-fundamental-rights--5eea6a0c39140f30f369e3a6",
      videoLink: "https://www.youtube.com/results?search_query=fundamental+rights+india+explained",
      pdfLink: "https://www.mea.gov.in/Images/pdf1/Part3.pdf"
    },
    3: {
      title: "Legal System",
      description: "How the Indian legal system works and its hierarchy",
      content: `The Indian legal system is based on common law system inherited from the British colonial period. It has a well-defined hierarchy of courts and follows the principle of stare decisis.

Court Hierarchy:
• Supreme Court of India (Apex Court)
• High Courts (State Level)
• District Courts
• Subordinate Courts

The legal system incorporates statutes, case law, and customary laws. It also includes various tribunals for specialized matters like service, tax, and environmental issues.`,
      resources: [
        {
          name: "Court Structure Guide",
          link: "https://main.sci.gov.in/court-structure"
        },
        {
          name: "Case Filing Process",
          link: "https://ecourts.gov.in/ecourts_home/"
        },
        {
          name: "Legal Procedures",
          link: "https://www.indiacode.nic.in/"
        },
        {
          name: "Court Etiquette",
          link: "https://districts.ecourts.gov.in/sites/default/files/court_etiquette.pdf"
        }
      ],
      quizLink: "https://www.gktoday.in/top-50-indian-legal-system-questions/",
      videoLink: "https://www.youtube.com/results?search_query=indian+legal+system+explained",
      pdfLink: "https://www.legalserviceindia.com/legal/article-241-indian-legal-system.html"
    },
    4: {
      title: "Criminal Law",
      description: "Know about IPC, CrPC, and criminal justice system",
      content: `Criminal law in India is primarily governed by three main acts:
• Indian Penal Code (IPC), 1860
• Code of Criminal Procedure (CrPC), 1973
• Indian Evidence Act, 1872

The criminal justice system follows the adversarial system where the prosecution and defense present their cases before an impartial judge.

Key Principles:
• Presumption of innocence
• Burden of proof on prosecution
• Right to fair trial
• Protection against self-incrimination`,
      resources: [
        {
          name: "IPC Sections",
          link: "https://www.indiacode.nic.in/show-data?actid=AC_CEN_3_20_00037_186045_1523266765688&orderno=1"
        },
        {
          name: "Bail Procedures",
          link: "https://www.legalserviceindia.com/legal/article-145-bail-in-indian-laws.html"
        },
        {
          name: "Criminal Defenses",
          link: "https://nludelhi.ac.in/download/course-material/CL-II-General-Exceptions.pdf"
        },
        {
          name: "Victim Rights",
          link: "https://www.mha.gov.in/division_of_mha/victim-compensation-scheme"
        }
      ],
      quizLink: "https://www.gktoday.in/topic/mcqs-on-indian-penal-code-ipc/",
      videoLink: "https://www.youtube.com/results?search_query=indian+criminal+law+explained",
      pdfLink: "https://www.indiacode.nic.in/bitstream/123456789/15373/1/the_indian_penal_code.pdf"
    },
    5: {
      title: "Civil Law",
      description: "Property, contracts, and other civil matters",
      content: `Civil law deals with disputes between individuals and organizations, where compensation may be awarded to the victim.

Key Areas:
• Contract Law
• Property Law
• Tort Law
• Family Law
• Inheritance Law

Civil cases are governed by the Code of Civil Procedure, 1908 and various substantive laws like the Indian Contract Act, Transfer of Property Act, etc.`,
      resources: [
        {
          name: "Civil Procedure Code",
          link: "https://www.indiacode.nic.in/handle/123456789/2186?sam_handle=123456789/1362"
        },
        {
          name: "Contract Law Guide",
          link: "https://www.indiacode.nic.in/show-data?actid=AC_CEN_3_20_00024_187209_1517808318406"
        },
        {
          name: "Property Laws",
          link: "https://www.indiacode.nic.in/handle/123456789/2188?locale=en"
        },
        {
          name: "Civil Rights",
          link: "https://nhrc.nic.in/"
        }
      ],
      quizLink: "https://www.gktoday.in/topic/civil-law/",
      videoLink: "https://www.youtube.com/results?search_query=civil+law+india+explained",
      pdfLink: "https://www.indiacode.nic.in/bitstream/123456789/2186/1/A1908-05.pdf"
    },
    6: {
      title: "Family Law",
      description: "Marriage, divorce, inheritance, and related matters",
      content: `Family law in India encompasses marriage, divorce, adoption, inheritance, and other family-related matters. India has separate personal laws for different religions.

Key Acts:
• Hindu Marriage Act, 1955
• Muslim Personal Law
• Special Marriage Act, 1954
• Hindu Succession Act, 1956
• Guardians and Wards Act, 1890`,
      resources: [
        {
          name: "Marriage Laws",
          link: "https://www.indiacode.nic.in/bitstream/123456789/15378/1/the_hindu_marriage_act%2C_1955.pdf"
        },
        {
          name: "Divorce Procedures",
          link: "https://districts.ecourts.gov.in/sites/default/files/Divorce_0.pdf"
        },
        {
          name: "Inheritance Guide",
          link: "https://www.indiacode.nic.in/bitstream/123456789/15379/1/the_hindu_succession_act%2C_1956.pdf"
        },
        {
          name: "Child Custody",
          link: "https://wcd.nic.in/act/guardian-and-wards-act-1890"
        }
      ],
      quizLink: "https://www.gktoday.in/topic/family-law/",
      videoLink: "https://www.youtube.com/results?search_query=family+law+india+explained",
      pdfLink: "https://www.indiacode.nic.in/bitstream/123456789/15378/1/the_hindu_marriage_act%2C_1955.pdf"
    },
    7: {
      title: "Consumer Rights",
      description: "Protect yourself against unfair trade practices",
      content: `Consumer protection laws safeguard consumers against unfair trade practices, defective goods, and deficient services.

Key Rights:
• Right to Safety
• Right to Information
• Right to Choose
• Right to be Heard
• Right to Redressal
• Right to Consumer Education

The Consumer Protection Act, 2019 provides for establishment of consumer courts at district, state and national levels.`,
      resources: [
        {
          name: "Consumer Protection Act",
          link: "https://www.indiacode.nic.in/handle/123456789/15585?view_type=browse&sam_handle=123456789/1362"
        },
        {
          name: "File Complaint Online",
          link: "https://consumerhelpline.gov.in/"
        },
        {
          name: "Consumer Rights Guide",
          link: "https://www.mca.gov.in/Ministry/pdf/ConsumerProtectionAct2019_24092019.pdf"
        },
        {
          name: "Product Safety",
          link: "https://www.bis.gov.in/"
        }
      ],
      quizLink: "https://www.gktoday.in/topic/consumer-protection/",
      videoLink: "https://www.youtube.com/results?search_query=consumer+rights+india+explained",
      pdfLink: "https://www.mca.gov.in/Ministry/pdf/ConsumerProtectionAct2019_24092019.pdf"
    },
    8: {
      title: "Labor Laws",
      description: "Rights and protections for employees",
      content: `Labor laws regulate the relationship between workers, employers, trade unions, and the government.

Key Areas:
• Minimum Wages
• Working Conditions
• Social Security
• Industrial Relations
• Occupational Safety

Recent labor codes have consolidated 29 central labor laws into 4 codes: Wages, Industrial Relations, Social Security, and Occupational Safety.`,
      resources: [
        {
          name: "Labor Codes",
          link: "https://labour.gov.in/labour-law-reforms"
        },
        {
          name: "Minimum Wages",
          link: "https://labour.gov.in/whatsnew/minimum-wages"
        },
        {
          name: "Employee Rights",
          link: "https://www.epfindia.gov.in/"
        },
        {
          name: "Workplace Safety",
          link: "https://dgfasli.gov.in/"
        }
      ],
      quizLink: "https://www.gktoday.in/topic/labour-laws/",
      videoLink: "https://www.youtube.com/results?search_query=labor+laws+india+explained",
      pdfLink: "https://labour.gov.in/sites/default/files/THE_CODE_ON_WAGES.pdf"
    }
  };

  const category = categories[id];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Category not found</div>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleResourceClick = (resourceLink) => {
    window.open(resourceLink, '_blank', 'noopener,noreferrer');
  };

  const handleTakeQuiz = () => {
    if (category.quizLink) {
      window.open(category.quizLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWatchVideos = () => {
    if (category.videoLink) {
      window.open(category.videoLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadPDF = () => {
    if (category.pdfLink) {
      window.open(category.pdfLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              &larr; Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{category.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{category.description}</p>
          
          <div className="prose max-w-none mb-8">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-lg">
              {category.content}
            </pre>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.resources.map((resource, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{resource.name}</h3>
                  <button 
                    onClick={() => handleResourceClick(resource.link)}
                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-200"
                  >
                    View Resource 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4 flex-wrap">
            <button 
              onClick={handleTakeQuiz}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Take Quiz
            </button>
            <button 
              onClick={handleWatchVideos}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Watch Videos
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;