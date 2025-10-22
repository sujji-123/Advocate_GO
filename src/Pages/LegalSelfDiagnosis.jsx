import React, { useState } from 'react';

const LegalSelfDiagnosis = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [savedDiagnoses, setSavedDiagnoses] = useState([]);

  const legalCategories = {
    contract: {
      name: "Contract Issues",
      icon: "📝",
      severity: "medium",
      questions: [
        {
          id: "contract_type",
          question: "What type of contract is involved?",
          type: "multiple",
          options: ["Employment", "Business Partnership", "Real Estate", "Service Agreement", "Loan Agreement", "Other"]
        },
        {
          id: "contract_status",
          question: "What is the current status of the contract?",
          type: "multiple",
          options: ["Signed and active", "Breached by other party", "Breached by me", "Under negotiation", "Expired"]
        },
        {
          id: "financial_impact",
          question: "What is the estimated financial impact?",
          type: "range",
          min: 0,
          max: 100000,
          step: 1000,
          unit: "$"
        }
      ]
    },
    employment: {
      name: "Employment Law",
      icon: "💼",
      severity: "high",
      questions: [
        {
          id: "employment_issue",
          question: "What employment issue are you facing?",
          type: "multiple",
          options: ["Wrongful termination", "Discrimination", "Harassment", "Wage dispute", "Contract dispute", "Workplace safety"]
        },
        {
          id: "employment_status",
          question: "What is your current employment status?",
          type: "multiple",
          options: ["Currently employed", "Recently terminated", "On leave", "Independent contractor"]
        },
        {
          id: "timeline",
          question: "When did this issue occur?",
          type: "date"
        }
      ]
    },
    property: {
      name: "Property & Real Estate",
      icon: "🏠",
      severity: "medium",
      questions: [
        {
          id: "property_type",
          question: "What type of property issue?",
          type: "multiple",
          options: ["Landlord/Tenant", "Property damage", "Boundary dispute", "Zoning issues", "Purchase/Sale dispute"]
        },
        {
          id: "property_value",
          question: "Estimated property value involved?",
          type: "range",
          min: 0,
          max: 2000000,
          step: 50000,
          unit: "$"
        },
        {
          id: "urgency",
          question: "How urgent is this matter?",
          type: "scale",
          min: 1,
          max: 5,
          labels: ["Not urgent", "Slightly urgent", "Moderately urgent", "Very urgent", "Critical"]
        }
      ]
    },
    family: {
      name: "Family Law",
      icon: "👨‍👩‍👧‍👦",
      severity: "high",
      questions: [
        {
          id: "family_issue",
          question: "What family law matter are you dealing with?",
          type: "multiple",
          options: ["Divorce", "Child custody", "Child support", "Alimony", "Adoption", "Domestic violence"]
        },
        {
          id: "children_involved",
          question: "Are children involved?",
          type: "boolean"
        },
        {
          id: "previous_agreements",
          question: "Are there any existing agreements?",
          type: "multiple",
          options: ["No agreements", "Prenuptial agreement", "Separation agreement", "Court orders"]
        }
      ]
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const quickTemplates = [
    {
      name: "Landlord-Tenant Issue",
      category: "property",
      presetResponses: {
        property_type: "Landlord/Tenant",
        urgency: 4
      }
    },
    {
      name: "Employment Termination",
      category: "employment",
      presetResponses: {
        employment_issue: "Wrongful termination",
        employment_status: "Recently terminated",
        urgency: 5
      }
    },
    {
      name: "Contract Breach",
      category: "contract",
      presetResponses: {
        contract_status: "Breached by other party",
        urgency: 4
      }
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(1);
  };

  const handleResponse = (questionId, response) => {
    setUserResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleNext = () => {
    if (currentStep < legalCategories[selectedCategory].questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      generateDiagnosis();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedCategory(null);
    }
  };

  const generateDiagnosis = () => {
    const category = legalCategories[selectedCategory];
    let riskLevel = "low";
    let recommendations = [];
    let urgency = "standard";

    const financialImpact = userResponses.financial_impact || 0;
    const urgencyLevel = userResponses.urgency || 1;

    if (financialImpact > 50000 || urgencyLevel >= 4) {
      riskLevel = "high";
      urgency = "immediate";
    } else if (financialImpact > 10000 || urgencyLevel >= 3) {
      riskLevel = "medium";
      urgency = "soon";
    }

    if (selectedCategory === "employment") {
      recommendations = [
        "Document all communications with your employer",
        "Gather evidence of employment terms and conditions",
        "Consult with an employment lawyer within 1-2 weeks"
      ];
      if (userResponses.employment_issue === "Wrongful termination") {
        recommendations.push("File with EEOC if discrimination is suspected");
      }
    } else if (selectedCategory === "contract") {
      recommendations = [
        "Review the contract terms carefully",
        "Document all breaches and communications",
        "Send a formal demand letter if appropriate"
      ];
    } else if (selectedCategory === "property") {
      recommendations = [
        "Document all property-related communications",
        "Take photos/videos of any property issues",
        "Review your lease or property agreements"
      ];
      if (userResponses.property_type === "Landlord/Tenant") {
        recommendations.push("Check local tenant rights laws");
      }
    } else if (selectedCategory === "family") {
      recommendations = [
        "Consult with a family law attorney",
        "Gather all relevant financial documents",
        "Consider mediation for dispute resolution"
      ];
      if (userResponses.children_involved) {
        recommendations.push("Prioritize children's best interests in all decisions");
      }
    }

    const diagnosis = {
      category: category.name,
      riskLevel,
      urgency,
      recommendations,
      timestamp: new Date().toISOString(),
      userResponses: { ...userResponses }
    };

    setDiagnosisResult(diagnosis);
    setCurrentStep(legalCategories[selectedCategory].questions.length + 1);
  };

  const saveDiagnosis = () => {
    const newDiagnosis = {
      ...diagnosisResult,
      id: Date.now(),
      savedAt: new Date().toLocaleString()
    };
    setSavedDiagnoses(prev => [newDiagnosis, ...prev.slice(0, 4)]);
  };

  const useQuickTemplate = (template) => {
    setSelectedCategory(template.category);
    setUserResponses(template.presetResponses);
    setCurrentStep(1);
  };

  const resetDiagnosis = () => {
    setCurrentStep(0);
    setSelectedCategory(null);
    setUserResponses({});
    setDiagnosisResult(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#00c851';
      default: return '#666';
    }
  };

  const renderStep = () => {
    if (!selectedCategory) {
      return (
        <div className="category-selection">
          <h2>What legal issue are you facing?</h2>
          <div className="quick-actions-header">
            <button 
              className="quick-templates-toggle"
              onClick={() => setShowQuickActions(!showQuickActions)}
              style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '20px',
                fontWeight: '600'
              }}
            >
              {showQuickActions ? 'Hide' : 'Show'} Quick Templates
            </button>
          </div>
          
          {showQuickActions && (
            <div className="quick-templates">
              <h3>Quick Start Templates</h3>
              <div className="template-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
              }}>
                {quickTemplates.map((template, index) => (
                  <button
                    key={index}
                    className="template-card"
                    onClick={() => useQuickTemplate(template)}
                    style={{
                      background: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      padding: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                  >
                    <span className="template-icon" style={{
                      fontSize: '1.5em',
                      display: 'block',
                      marginBottom: '8px'
                    }}>{legalCategories[template.category].icon}</span>
                    <span className="template-name" style={{
                      fontSize: '0.9em',
                      color: '#2c3e50',
                      fontWeight: '500'
                    }}>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="category-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            {Object.entries(legalCategories).map(([key, category]) => (
              <button
                key={key}
                className="category-card"
                onClick={() => handleCategorySelect(key)}
                style={{
                  background: 'white',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '25px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div className="category-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <span className="category-icon" style={{ fontSize: '2.5em' }}>{category.icon}</span>
                  <span 
                    className="severity-indicator"
                    style={{ 
                      backgroundColor: getSeverityColor(category.severity),
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      marginLeft: '10px'
                    }}
                  ></span>
                </div>
                <h3 style={{
                  color: '#2c3e50',
                  marginBottom: '10px',
                  fontSize: '1.2em'
                }}>{category.name}</h3>
                <p style={{
                  color: '#7f8c8d',
                  fontSize: '0.9em'
                }}>Start diagnosis</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (diagnosisResult) {
      return (
        <div className="diagnosis-result">
          <div className="result-header">
            <h2>Legal Self-Diagnosis Result</h2>
            <div className={`risk-level ${diagnosisResult.riskLevel}`} style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '20px',
              fontWeight: '600',
              marginTop: '10px',
              color: 'white',
              background: diagnosisResult.riskLevel === 'high' ? '#e74c3c' : 
                         diagnosisResult.riskLevel === 'medium' ? '#f39c12' : '#27ae60'
            }}>
              Risk Level: {diagnosisResult.riskLevel.toUpperCase()}
            </div>
          </div>
          
          <div className="result-details" style={{
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div className="result-category" style={{
              marginBottom: '15px',
              fontSize: '1.1em'
            }}>
              <strong>Category:</strong> {diagnosisResult.category}
            </div>
            <div className="result-urgency" style={{
              marginBottom: '15px',
              fontSize: '1.1em'
            }}>
              <strong>Recommended Action Time:</strong> {diagnosisResult.urgency}
            </div>
            
            <div className="recommendations" style={{ margin: '30px 0' }}>
              <h3>Recommended Next Steps:</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {diagnosisResult.recommendations.map((rec, index) => (
                  <li key={index} style={{
                    background: '#f8f9fa',
                    padding: '12px 15px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #3498db'
                  }}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="action-buttons" style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              marginTop: '30px'
            }}>
              <button className="btn-primary" onClick={saveDiagnosis} style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '600'
              }}>
                Save Diagnosis
              </button>
              <button className="btn-secondary" onClick={resetDiagnosis} style={{
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '600'
              }}>
                New Diagnosis
              </button>
            </div>
          </div>
        </div>
      );
    }

    const category = legalCategories[selectedCategory];
    const currentQuestion = category.questions[currentStep - 1];

    return (
      <div className="question-step">
        <div className="progress-bar" style={{
          width: '100%',
          height: '6px',
          background: '#e9ecef',
          borderRadius: '3px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div 
            className="progress-fill"
            style={{ 
              width: `${((currentStep) / category.questions.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)',
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
        
        <h3 style={{
          color: '#2c3e50',
          marginBottom: '25px',
          fontSize: '1.3em',
          textAlign: 'center'
        }}>{currentQuestion.question}</h3>
        
        <div className="response-options">
          {currentQuestion.type === 'multiple' && (
            <div className="option-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '30px'
            }}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${userResponses[currentQuestion.id] === option ? 'selected' : ''}`}
                  onClick={() => handleResponse(currentQuestion.id, option)}
                  style={{
                    background: userResponses[currentQuestion.id] === option ? '#3498db' : 'white',
                    color: userResponses[currentQuestion.id] === option ? 'white' : 'inherit',
                    border: `2px solid ${userResponses[currentQuestion.id] === option ? '#3498db' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95em'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'boolean' && (
            <div className="boolean-options" style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              <button
                className={`option-btn ${userResponses[currentQuestion.id] === true ? 'selected' : ''}`}
                onClick={() => handleResponse(currentQuestion.id, true)}
                style={{
                  background: userResponses[currentQuestion.id] === true ? '#3498db' : 'white',
                  color: userResponses[currentQuestion.id] === true ? 'white' : 'inherit',
                  border: `2px solid ${userResponses[currentQuestion.id] === true ? '#3498db' : '#e9ecef'}`,
                  borderRadius: '8px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '100px'
                }}
              >
                Yes
              </button>
              <button
                className={`option-btn ${userResponses[currentQuestion.id] === false ? 'selected' : ''}`}
                onClick={() => handleResponse(currentQuestion.id, false)}
                style={{
                  background: userResponses[currentQuestion.id] === false ? '#3498db' : 'white',
                  color: userResponses[currentQuestion.id] === false ? 'white' : 'inherit',
                  border: `2px solid ${userResponses[currentQuestion.id] === false ? '#3498db' : '#e9ecef'}`,
                  borderRadius: '8px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '100px'
                }}
              >
                No
              </button>
            </div>
          )}

          {currentQuestion.type === 'range' && (
            <div className="range-input" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
                value={userResponses[currentQuestion.id] || currentQuestion.min}
                onChange={(e) => handleResponse(currentQuestion.id, parseInt(e.target.value))}
                style={{ width: '80%', marginBottom: '15px' }}
              />
              <div className="range-value" style={{
                fontSize: '1.2em',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                {currentQuestion.unit} {userResponses[currentQuestion.id] || currentQuestion.min}
              </div>
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="scale-options" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '30px'
            }}>
              {Array.from({ length: currentQuestion.max }, (_, i) => i + 1).map((value) => (
                <button
                  key={value}
                  className={`scale-btn ${userResponses[currentQuestion.id] === value ? 'selected' : ''}`}
                  onClick={() => handleResponse(currentQuestion.id, value)}
                  style={{
                    background: userResponses[currentQuestion.id] === value ? '#3498db' : 'white',
                    color: userResponses[currentQuestion.id] === value ? 'white' : 'inherit',
                    border: `2px solid ${userResponses[currentQuestion.id] === value ? '#3498db' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '15px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {value}
                  <span className="scale-label" style={{
                    fontSize: '0.8em',
                    opacity: '0.8'
                  }}>{currentQuestion.labels[value - 1]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navigation-buttons" style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px'
        }}>
          <button className="btn-secondary" onClick={handleBack} style={{
            background: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: '600'
          }}>
            Back
          </button>
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={userResponses[currentQuestion.id] === undefined}
            style={{
              background: userResponses[currentQuestion.id] === undefined ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '8px',
              cursor: userResponses[currentQuestion.id] === undefined ? 'not-allowed' : 'pointer',
              fontSize: '1em',
              fontWeight: '600'
            }}
          >
            {currentStep === category.questions.length ? 'Get Diagnosis' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="legal-self-diagnosis" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <header className="diagnosis-header" style={{
        textAlign: 'center',
        marginBottom: '30px',
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '2.5em' }}>⚖️ Legal Self-Diagnosis Tool</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1em' }}>Quick assessment of your legal situation with actionable recommendations</p>
      </header>

      <main className="diagnosis-container" style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        {renderStep()}
      </main>

      {savedDiagnoses.length > 0 && (
        <aside className="saved-diagnoses" style={{
          background: 'white',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Recently Saved Diagnoses</h3>
          <div className="saved-list" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {savedDiagnoses.map(diagnosis => (
              <div key={diagnosis.id} className="saved-item" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                borderLeft: '4px solid #3498db'
              }}>
                <div className="saved-category" style={{
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>{diagnosis.category}</div>
                <div className={`saved-risk ${diagnosis.riskLevel}`} style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8em',
                  fontWeight: '600',
                  color: 'white',
                  background: diagnosis.riskLevel === 'high' ? '#e74c3c' : 
                             diagnosis.riskLevel === 'medium' ? '#f39c12' : '#27ae60'
                }}>
                  {diagnosis.riskLevel}
                </div>
                <div className="saved-date" style={{
                  fontSize: '0.8em',
                  color: '#7f8c8d'
                }}>{diagnosis.savedAt}</div>
              </div>
            ))}
          </div>
        </aside>
      )}

      <footer className="diagnosis-footer" style={{
        textAlign: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{
          color: '#7f8c8d',
          fontSize: '0.9em',
          lineHeight: '1.5',
          margin: '0'
        }}>
          <strong>Disclaimer:</strong> This tool provides general information only 
          and does not constitute legal advice. Consult with a qualified attorney 
          for professional legal guidance.
        </p>
      </footer>
    </div>
  );
};

export default LegalSelfDiagnosis;