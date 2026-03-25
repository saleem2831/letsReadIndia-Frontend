import { useState, useEffect } from 'react';
import '../styles/programs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaGraduationCap, FaBook, FaStar, FaTrophy } from 'react-icons/fa';

export default function Programs() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("programs-section");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) setShow(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const programs = [
    {
      level: "Pre-Reader (Ages 3-4)",
      icon: <FaGraduationCap />,
      title: "Foundations",
      duration: "12 weeks",
      description: "Introduction to letter sounds, phonemic awareness, and pre-reading skills through play-based activities.",
      features: [
        "Letter sound recognition",
        "Phonemic awareness games",
        "Fine motor skill development",
        "Sound sequencing activities"
      ],
      color: "purple"
    },
    {
      level: "Early Reader (Ages 4-5)",
      icon: <FaBook />,
      title: "Building Blocks",
      duration: "16 weeks",
      description: "Systematic phonics instruction with CVC words, simple blends, and beginning fluency development.",
      features: [
        "CVC word formation",
        "Simple blends (s, t, p)",
        "Reading short sentences",
        "Initial fluency building"
      ],
      color: "pink"
    },
    {
      level: "Developing Reader (Ages 5-7)",
      icon: <FaStar />,
      title: "Fluency Boost",
      duration: "20 weeks",
      description: "Advanced phonetics, multi-syllabic words, and comprehension strategies for emerging readers.",
      features: [
        "Multi-syllabic words",
        "Complex blends & digraphs",
        "Reading comprehension",
        "Vocabulary expansion"
      ],
      color: "blue"
    },
    {
      level: "Advanced Reader (Ages 7-10)",
      icon: <FaTrophy />,
      title: "Mastery",
      duration: "24 weeks",
      description: "Advanced phonics, complex text comprehension, critical thinking, and independent reading skills.",
      features: [
        "Advanced phonics patterns",
        "Complex text analysis",
        "Reading strategies",
        "Writing & comprehension"
      ],
      color: "orange"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="programs-page">
        {/* Hero Section */}
        <section className="programs-hero">
          <div className="programs-hero-content">
            <h1>Our Reading Programs</h1>
            <p>Age-appropriate, research-backed programs designed to build confident, fluent readers at every stage.</p>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs-section" className="programs-section">
          <div className="programs-container">
            
            {/* Header */}
            <div className={`programs-header ${show ? "show" : ""}`}>
              <h2>Choose the Right Program for Your Child</h2>
              <div className="underline"></div>
              <div className="dots">
                <span className="dot purple"></span>
                <span className="dot pink"></span>
                <span className="dot yellow"></span>
              </div>
              <p>Our four-tier program structure ensures every child gets the right support at their reading level.</p>
            </div>

            {/* Program Cards Grid */}
            <div className="programs-grid">
              {programs.map((prog, i) => (
                <div key={i} className={`program-card ${prog.color} ${show ? "show" : ""}`}>
                  <div className="program-level">{prog.level}</div>
                  
                  <div className={`program-icon ${prog.color}`}>
                    {prog.icon}
                  </div>

                  <h3 className="program-title">{prog.title}</h3>
                  
                  <div className="program-duration">
                    <span>⏱️ {prog.duration}</span>
                  </div>

                  <p className="program-description">{prog.description}</p>

                  <div className="program-features">
                    <h4>What's Included:</h4>
                    <ul>
                      {prog.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="bullet">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="program-btn">Learn More →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-programs-work">
          <div className="how-container">
            <h2>How Our Programs Work</h2>
            <div className="work-underline"></div>

            <div className="work-grid">
              <div className={`work-card ${show ? "show" : ""}`}>
                <div className="work-number">1</div>
                <h3>Assessment</h3>
                <p>We start with our LR Diagnostic to understand your child's current reading level and learning style.</p>
              </div>

              <div className={`work-card ${show ? "show" : ""}`}>
                <div className="work-number">2</div>
                <h3>Personalized Path</h3>
                <p>Based on assessment results, we create a customized learning journey tailored to your child's needs.</p>
              </div>

              <div className={`work-card ${show ? "show" : ""}`}>
                <div className="work-number">3</div>
                <h3>Guided Learning</h3>
                <p>Structured lessons combining phonics, kinesthetic activities, and decodable readers for multi-sensory learning.</p>
              </div>

              <div className={`work-card ${show ? "show" : ""}`}>
                <div className="work-number">4</div>
                <h3>Progress Tracking</h3>
                <p>Regular assessments and progress reports keep you informed every step of the journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Benefits Section */}
        <section className="program-benefits">
          <div className="benefits-container">
            <h2>Benefits of Our Programs</h2>
            <div className="benefits-underline"></div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">📚</div>
                <h3>Evidence-Based</h3>
                <p>Grounded in scientific research on how children learn to read, with proven results.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Personalized</h3>
                <p>Each child gets a customized learning path based on their unique needs and pace.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">😊</div>
                <h3>Joyful Learning</h3>
                <p>Games, activities, and stories make reading fun and engaging for young learners.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">👨‍👩‍👧</div>
                <h3>Family Involved</h3>
                <p>Parent guides and resources help you support your child's reading journey at home.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h3>Measurable Progress</h3>
                <p>Track your child's growth with detailed assessments and progress reports.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🏆</div>
                <h3>Proven Success</h3>
                <p>85% of our learners show significant reading improvement within 3-6 months.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="programs-cta">
          <div className="cta-container">
            <h2>Ready to Start Your Child's Reading Journey?</h2>
            <p>Take our free reading age check to find the perfect program for your child.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Start Free Assessment</button>
              <button className="cta-btn secondary">Chat with Us</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
