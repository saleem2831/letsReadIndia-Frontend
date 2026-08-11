
import "./JourneyTimeline.css";
import { Link } from "react-router-dom";
// import Navbar from '../components/Navbar';
import Navbar from "../Navbar";



const timeline = [
  {
    year: "2011",
    title: "The Beginning",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900",
    description:
      "Let's Read started as a reading initiative at Treasure House Library, Jubilee Hills, Hyderabad, with the vision of helping children become confident readers."
  },
  {
    year: "2012",
    title: "Growing Demand",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900",
    description:
      "The phonics program became extremely popular and parents waited several months to enroll their children."
  },
  {
    year: "2013",
    title: "Educator Handbook",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900",
    description:
      "The first Let's Read Educator Handbook was published to support parents and teachers."
  },
  {
    year: "2015",
    title: "Teacher Training",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900",
    description:
      "Teacher training workshops expanded across schools using hands-on reading methodologies."
  },
  {
    year: "2020",
    title: "Research & Innovation",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900",
    description:
      "Research started to scientifically validate the Let's Read methodology and Reading Age Diagnostic Tool."
  },
  {
    year: "2023",
    title: "Private Limited",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900",
    description:
      "Let's Read became a Private Limited company and launched curriculum-based reading kits."
  },
  {
    year: "2026",
    title: "Global Recognition",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900",
    description:
      "Research presented internationally while continuing to empower children, teachers, and schools."
  }
];

export default function Journey() {
  return (
    <>
    <Navbar/>
      {/* Hero */}

      <section className="journey-hero">
        <div className="hero-overlay">
          <h1>Our Journey</h1>

          <p>
            From a small reading initiative to a research-backed literacy
            movement transforming thousands of young readers.
          </p>

          <a href="#timeline" className="hero-btn">
            Explore Our Story
          </a>
        </div>
      </section>

      {/* Timeline */}

      <section className="timeline-section" id="timeline">
        <div className="container">

          <div className="section-title">
            <h2>Milestones</h2>
            <p>
              Every milestone reflects our commitment to nurturing confident
              readers and lifelong learners.
            </p>
          </div>

          {timeline.map((item, index) => (
            <div
              className={`timeline-row ${
                index % 2 === 0 ? "normal" : "reverse"
              }`}
              key={index}
            >
              <div className="timeline-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="timeline-content">
                <span>{item.year}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Impact */}

      <section className="impact-section">

        <div className="impact-card">
          <h2>15+</h2>
          <p>Years of Excellence</p>
        </div>

        <div className="impact-card">
          <h2>10,000+</h2>
          <p>Children Impacted</p>
        </div>

        <div className="impact-card">
          <h2>500+</h2>
          <p>Teachers Trained</p>
        </div>

        <div className="impact-card">
          <h2>100+</h2>
          <p>Partner Schools</p>
        </div>

      </section>

      {/* CTA */}

      <section className="journey-cta">
        <h2>Be a Part of Our Journey</h2>

        <p>
          Together we can inspire more children to discover the joy of reading.
        </p>

        {/* <button><link></link>Contact Us</button> */}
        <button>
          <Link to="/contact" >
            Contact Us
          </Link></button>
      </section>
    </>
  );
}