import { Link } from "react-router-dom";
import "./JourneyPreview.css";

export default function JourneyPreview() {
  return (
    <section className="journey-preview">
      <div className="journey-preview-container">

        <div className="journey-left">
          <span className="journey-tag">OUR JOURNEY</span>

          <h2>
            From a Small Library Initiative to a
            <span> Global Literacy Movement</span>
          </h2>

          <p>
            Since 2011, Let's Read has empowered thousands of children,
            educators, and schools through research-backed literacy programs,
            innovative reading kits, and teacher training initiatives.
          </p>

          <div className="journey-highlights">

            <div className="highlight">
              <span>🌱</span>
              <p>Started in 2011</p>
            </div>

            <div className="highlight">
              <span>📚</span>
              <p>15+ Years of Experience</p>
            </div>

            <div className="highlight">
              <span>🎓</span>
              <p>Research Validated</p>
            </div>

            <div className="highlight">
              <span>🌍</span>
              <p>International Recognition</p>
            </div>

          </div>

          <Link to="/journey-timeline" className="journey-btn">
            Explore Our Journey →
          </Link>

        </div>

        <div className="journey-right">

          <div className="journey-card">

            <h1>15+</h1>

            <h3>Years of Excellence</h3>

            <p>
              Transforming young readers through innovative literacy programs
              and educator training.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}