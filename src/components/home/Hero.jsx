import './hero.css'
// import main from "../../assets/main-image.png";
import main from "../../assets/lets-read-hero.png";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Decorative Elements */}
      <div className="hero-decoration decoration-1"></div>
      <div className="hero-decoration decoration-2"></div>
      <div className="hero-decoration decoration-3"></div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          {/* <h1 className="hero-headline">
            Kinesthetic Reading Kits &amp; Programs that Build Confident <span className="hero-highlight">Readers</span>
          </h1> */}

          <h1 className="hero-headline">
              Bridging the Reading Gap in children          
          </h1>

          {/* <p className="hero-description">
            Let's Read India helps children (3–12) move from <strong>phonics → comprehension → fluent reading</strong> through joyful, hands-on learning — at home and in school.
          </p> */}

               <p className="hero-description">
            Helping children aged 3–12 build the skills to read and understand at the level needed for their age and grade. 
            <p> <strong>Created by an Indian educator for learning English as a second language.</strong>          
</p>

          </p>


          <div className="hero-buttons">
            <a href="/products" className="hero-btn hero-btn-primary">
              Shop Kits for My Child
            </a>
            <a href="/demo" className="hero-btn hero-btn-secondary">
              Book a Demo for My School
            </a>
            <a href="/nep-ncf" className="hero-btn hero-btn-tertiary">
              NEP and NCF aligned Program
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src={main} 
              alt="Children learning with reading kits"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
