// import "./ReadingAge.css";
import { Link } from "react-router-dom";
import "../styles/ReadingAge.css";
import Navbar from '../components/Navbar';


export default function ReadingAge() {
  return (
    <>
    <Navbar/>
      {/* ================= HERO ================= */}

      <section className="ra-hero">
        <div className="ra-overlay">
          <span className="ra-badge">
            Research Backed • Teacher Friendly • Evidence Based
          </span>

          <h1>
            Reading Age <span>Diagnostic Tool</span>
          </h1>

          <p>
            A simple, reliable and research-backed assessment that helps
            teachers accurately measure a child's reading ability, identify
            learning gaps, and plan targeted literacy interventions.
          </p>

          <div className="hero-buttons">
            <Link to="/contact" className="primary-btn">
              Book a Demo
            </Link>

            <a href="#about-reading-age" className="secondary-btn">
              Learn More
            </a>
          </div>

          <div className="hero-stats">

            <div>
              <h2>15+</h2>
              <span>Years of Research</span>
            </div>

            <div>
              <h2>100+</h2>
              <span>Schools</span>
            </div>

            <div>
              <h2>10K+</h2>
              <span>Students</span>
            </div>

            <div>
              <h2>91%</h2>
              <span>Teacher Satisfaction</span>
            </div>

          </div>

        </div>
      </section>

      {/* ================= WHAT IS READING AGE ================= */}

      <section className="reading-age-section" id="about-reading-age">

        <div className="container">

          <div className="section-header">

            <span>UNDERSTANDING READING AGE</span>

            <h2>What is Reading Age?</h2>

            <p>
              Reading Age is a practical indicator of a child's reading
              development. It compares a student's current reading ability with
              the level expected for children of different ages, helping
              teachers understand progress and provide appropriate support.
            </p>

          </div>

          <div className="reading-grid">

            <div className="reading-card">

              <div className="icon">📖</div>

              <h3>Reading Age</h3>

              <p>
                Reading Age reflects the level at which a child can decode and
                read words confidently using phonics-based assessment. It helps
                educators monitor literacy development over time.
              </p>

            </div>

            <div className="reading-card">

              <div className="icon">🎂</div>

              <h3>Chronological Age</h3>

              <p>
                Chronological Age refers to the child's actual age in years and
                months. It is used as a comparison to understand whether reading
                development is ahead, aligned, or requires additional support.
              </p>

            </div>

            <div className="reading-card">

              <div className="icon">🎯</div>

              <h3>Why It Matters</h3>

              <p>
                Comparing Reading Age with Chronological Age enables teachers to
                identify learning gaps early, plan interventions, and monitor
                progress using measurable data.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= COMPARISON ================= */}

      <section className="comparison-section">

        <div className="container">

          <div className="comparison-left">

            <span>READING AGE VS CHRONOLOGICAL AGE</span>

            <h2>Understanding the Difference</h2>

            <p>
              Reading Age is not a measure of intelligence. It is a progress
              tracking tool that allows educators to understand reading ability,
              identify struggling readers early, and implement targeted
              intervention strategies.
            </p>

            <ul>

              <li>✔ Identifies learning gaps early</li>

              <li>✔ Supports differentiated instruction</li>

              <li>✔ Measures reading growth over time</li>

              <li>✔ Helps monitor intervention effectiveness</li>

              <li>✔ Supports teacher decision making</li>

            </ul>

          </div>

          <div className="comparison-right">

            <div className="comparison-box">

              <h3>Example</h3>

              <table>

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Age</th>
                    <th>Reading Age</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Student A</td>
                    <td>6 Years</td>
                    <td>7 Years</td>
                  </tr>

                  <tr>
                    <td>Student B</td>
                    <td>6 Years</td>
                    <td>5 Years</td>
                  </tr>

                  <tr>
                    <td>Student C</td>
                    <td>6 Years</td>
                    <td>6 Years</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="reading-cta">

        <div className="container">

          <h2>
            Every Child Deserves the Opportunity to Become a Confident Reader.
          </h2>

          <p>
            Discover how the Let's Read Reading Age Diagnostic Tool can help
            your school measure progress, identify learning gaps, and improve
            literacy outcomes through targeted interventions.
          </p>

          <Link to="/contact" className="primary-btn">
            Schedule a Demonstration
          </Link>

        </div>

      </section>

    </>
  );
}