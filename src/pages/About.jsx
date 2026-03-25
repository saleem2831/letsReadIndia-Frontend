import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/about.css';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About Let's Read India</h1>
            <p>Transforming Reading Education Across India</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="vision-container">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>To empower children across India with strong reading foundations through scientifically-backed interventions, innovative teaching methods, and comprehensive support for parents and educators.</p>
            </div>
            <div className="vision-card">
              <h2>Our Vision</h2>
              <p>A nation where every child becomes a confident, fluent reader who can access quality education and build a successful future through the power of reading.</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="story-container">
            <h2>Our Story</h2>
            <div className="founder-divider"></div>
            <div className="founder-dots">
              <span className="dot purple"></span>
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
            </div>
            <div className="story-content">
              <div className="story-text">
                <p>
                  Let's Read India was founded with a simple yet powerful belief: every child deserves the opportunity to become a proficient reader. 
                  Recognizing that reading is the foundation for academic success and personal growth, our team of educators, researchers, and child development experts came together to create a comprehensive solution.
                </p>
                <p>
                  Our journey began when we realized that traditional reading instruction methods weren't reaching all children effectively. Many students, despite being in school, were struggling with basic reading skills. This critical gap prompted us to develop evidence-based reading intervention programs that address the root causes of reading difficulties.
                </p>
                <p>
                  Today, Let's Read India serves thousands of children, parents, and educators across the country. We provide diagnostic tools, structured intervention programs, engaging learning materials, and continuous support to ensure every child develops strong reading skills.
                </p>
              </div>
              <div className="story-image">
                <div className="story-placeholder">📚 Teaching Reading with Care</div>
              </div>
            </div>
          </div>
        </section>

                {/* Founder & Research Section */}
        <section className="founder-research">
          <div className="founder-container">
            <h2>Founder & Research</h2>
            <div className="founder-divider"></div>
            <div className="founder-dots">
              <span className="dot purple"></span>
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
            </div>
            
            <div className="founder-content">
              <div className="founder-image">
                <div className="founder-placeholder">👩‍🎓</div>
              </div>
              
              <div className="founder-text">
                <p>
                  Founded by <strong>Dr. Asma Zaidi</strong>, an award-winning early-years educator and teacher-trainer. Her doctoral work on kinesthetic reading underpins Let's Read India's program design and the LR Diagnostic.
                </p>
                <a href="/about" className="founder-btn">About Our Approach →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <h2>Our Core Values</h2>
          <div className="founder-divider"></div>
            <div className="founder-dots">
              <span className="dot purple"></span>
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
            </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Evidence-Based</h3>
              <p>All our programs are grounded in scientific research and proven methodologies in reading education.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Child-Centered</h3>
              <p>We keep each child's individual needs, learning style, and progress at the center of everything we do.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaborative</h3>
              <p>We work closely with parents, teachers, and schools to create a supportive ecosystem for reading success.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Inclusive</h3>
              <p>We believe quality reading education should be accessible to all children regardless of background.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Innovative</h3>
              <p>We continuously innovate and improve our methods to stay at the forefront of reading education.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">📈</div>
              <h3>Results-Driven</h3>
              <p>We measure success through tangible improvements in children's reading abilities and confidence.</p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="about-impact">
          <h2>Our Impact</h2>
          <div className="founder-divider"></div>
            <div className="founder-dots">
              <span className="dot purple"></span>
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
            </div>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Children Helped</div>
              <p>Children across India who have improved their reading through our programs</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Schools Partnered</div>
              <p>Educational institutions benefiting from our teacher training and resources</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">2,000+</div>
              <div className="stat-label">Parents Supported</div>
              <p>Parents empowered to support their children's reading development at home</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Success Rate</div>
              <p>Children who show significant improvement in reading proficiency</p>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-container">
            <h2>Ready to Help Your Child Read Better?</h2>
            <p>Join thousands of families who have transformed their children's reading abilities with Let's Read India</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Get Started</a>
              <a href="https://wa.me/917058587080" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
