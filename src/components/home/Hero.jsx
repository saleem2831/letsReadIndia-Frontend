

import { useEffect, useState } from "react";
import "./hero.css";

import main from "../../assets/lets-read-hero.PNG";
import main2 from "../../assets/letread-image-2.jpg";
import main3 from "../../assets/letread-image-3.jpg";
import main4 from "../../assets/letread-image-4.jpg";
import main5 from "../../assets/letsread-5.jpeg";
import main6 from "../../assets/letsread-6.jpeg";
import main7 from "../../assets/letsread-7.jpeg";
import main8 from "../../assets/letsread-8.jpeg";



const slides = [
  {
    // title: "Bridging the Reading Gap in Children",
        title: "Teaching and Learning English as a Second Language",
    description:
      "Helping children aged 3–12 build the skills to read and understand at the level needed for their age and grade.",
    highlight:
      "",
            // "Created by an Indian educator for learning English as a second language.",

    buttons: [
      // {
      //   label: "Shop Kits for My Child",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "Book a Demo for My School",
      //   href: "/demo",
      //   type: "secondary",
      // },
      // {
      //   label: "NEP and NCF Aligned Program",
      //   href: "/nep-ncf",
      //   type: "tertiary",
      // },
    ],
    image: main,
    alt: "Children learning with reading kits",
    theme: "purple",
  },

  {
    // title: "Build Strong Reading Foundations",
    title:"Bridging the Reading Gap in Children",
    description:
      "Give children the right foundation through phonics, sounds, word recognition and early reading skills.",
    highlight:
      "Strong foundations today can help children become confident readers tomorrow.",
    buttons: [
      // {
      //   label: "Explore Reading Kits",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "Book a Demo",
      //   href: "/demo",
      //   type: "secondary",
      // },
      // {
      //   label: "Learn More",
      //   href: "/reading-age",
      //   type: "tertiary",
      // },
    ],
    image: main2,
    alt: "Children building reading foundations",
    theme: "blue",
  },

  {
    title: "From Phonics to Reading Fluency",
    description:
      "Support your child's journey from recognising sounds and words to reading confidently and independently.",
    highlight:
      "A structured approach that grows with your child's reading ability.",
    buttons: [
      // {
      //   label: "Shop Reading Kits",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "See How It Works",
      //   href: "/how-it-works",
      //   type: "secondary",
      // },
      // {
      //   label: "Book a Demo",
      //   href: "/demo",
      //   type: "tertiary",
      // },
    ],
    image: main3,
    alt: "Children developing reading fluency",
    theme: "pink",
  },

  {
    title: "Reading Is More Than Just Words",
    description:
      "Help children move beyond decoding words to understanding stories, ideas, meaning and context.",
    highlight:
      "Build comprehension skills that support learning across every subject.",
    buttons: [
      // {
      //   label: "Explore Learning Kits",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "For Parents",
      //   href: "/parents",
      //   type: "secondary",
      // },
      // {
      //   label: "Book a Demo",
      //   href: "/demo",
      //   type: "tertiary",
      // },
    ],
    image: main4,
    alt: "Children developing reading comprehension",
    theme: "teal",
  },

  {
    title: "Learning Through Hands-On Reading Kits",
    description:
      "Make reading practice engaging with carefully designed activities that encourage children to learn by doing.",
    highlight:
      "Less passive learning. More interaction, practice and confidence.",
    buttons: [
      // {
      //   label: "Shop Learning Kits",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "How It Works",
      //   href: "/how-it-works",
      //   type: "secondary",
      // },
      // {
      //   label: "For Schools",
      //   href: "/schools",
      //   type: "tertiary",
      // },
    ],
    image: main5,
    alt: "Hands-on reading learning kits",
    theme: "orange",
  },

  {
    title: "Make Reading Practice Easier at Home",
    description:
      "Give parents simple tools and structured activities to support their child's reading journey at home.",
    highlight:
      "Turn everyday reading practice into a positive learning experience.",
    buttons: [
      // {
      //   label: "Shop Kits",
      //   href: "/products",
      //   type: "primary",
      // },
      // {
      //   label: "Parent Resources",
      //   href: "/parents",
      //   type: "secondary",
      // },
      // {
      //   label: "Book a Demo",
      //   href: "/demo",
      //   type: "tertiary",
      // },
    ],
    image: main6,
    alt: "Parent supporting child reading",
    theme: "indigo",
  },

  {
    title: "Bring Better Reading Support Into Your School",
    description:
      "Structured reading programs designed to help schools support children at different stages of their reading journey.",
    highlight:
      "Designed for educators, schools and learners in the Indian education environment.",
    buttons: [
      // {
      //   label: "School Program",
      //   href: "/schools",
      //   type: "primary",
      // },
      // {
      //   label: "Book a School Demo",
      //   href: "/demo",
      //   type: "secondary",
      // },
      // {
      //   label: "NEP & NCF Alignment",
      //   href: "/nep-ncf",
      //   type: "tertiary",
      // },
    ],
    image: main7,
    alt: "School reading program",
    theme: "violet",
  },

  {
    title: "NEP & NCF Aligned Reading Program",
    description:
      "A structured approach to reading development designed around the needs of Indian learners and aligned with the broader direction of NEP and NCF.",
    highlight:
      "Helping children build foundational literacy and meaningful reading skills.",
    buttons: [
      // {
      //   label: "Explore NEP & NCF",
      //   href: "/nep-ncf",
      //   type: "primary",
      // },
      // {
      //   label: "Book a School Demo",
      //   href: "/demo",
      //   type: "secondary",
      // },
      // {
      //   label: "Shop Reading Kits",
      //   href: "/products",
      //   type: "tertiary",
      // },
    ],
    image: main8,
    alt: "NEP and NCF aligned reading program",
    theme: "gold",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="hero-section">
      <div
        className="hero-carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Entire Hero Slider */}
        <div
          className="hero-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <article
              key={index}
              className={`hero-slide hero-theme-${slide.theme} ${
                index === currentSlide ? "active" : ""
              }`}
              aria-hidden={index !== currentSlide}
            >
              {/* Decorative Elements */}
              <div className="hero-decoration decoration-1"></div>
              <div className="hero-decoration decoration-2"></div>
              <div className="hero-decoration decoration-3"></div>

              <div className="hero-container">
                {/* Left Content */}
                <div className="hero-content">
                  <span className="hero-slide-number">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(totalSlides).padStart(2, "0")}
                  </span>

                  <h1 className="hero-headline">
                    {slide.title}
                  </h1>

                  <p className="hero-description">
                    {slide.description}
                  </p>

                  <p className="hero-highlight-text">
                    <strong>{slide.highlight}</strong>
                  </p>

                  <div className="hero-buttons">
                    {slide.buttons.map((button, buttonIndex) => (
                      <a
                        key={buttonIndex}
                        href={button.href}
                        className={`hero-btn hero-btn-${button.type}`}
                        tabIndex={
                          index === currentSlide ? 0 : -1
                        }
                      >
                        {button.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right Image */}
                <div className="hero-image-container">
                  <div className="hero-image-wrapper">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="hero-image"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Previous Button */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                index === currentSlide ? "true" : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
