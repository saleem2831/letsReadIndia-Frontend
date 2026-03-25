import React, { useEffect, useState } from "react";
import "./ChoosePath.css";
import { FaHome, FaSchool } from "react-icons/fa";

export default function ChoosePath() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("choose-path");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) setAnimate(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="choose-path" className="choose-path">
      <div className="container">

        {/* HEADER */}
        <div className={`header ${animate ? "show" : ""}`}>
          <h2>Well Researched Multisensory Reading Program</h2>

          <div className="underline"></div>

          <div className="dots">
            <span className="dot purple"></span>
            <span className="dot pink"></span>
            <span className="dot yellow"></span>
          </div>

          <p>
            Let's Read is a research based program that is based on the Science of reading - phonemic awareness, phonics, fluency, vocabulary & comprehension. Our program is structured progressively and it builds reading along with comprehension. Our resources are contextual and specially designed to teach English as a second language.
          </p>
        </div>

        {/* CARDS */}
        <div className="cards">

          {/* Parents Card */}
          <div className={`card ${animate ? "show" : ""}`}>
            {/* <div className="floating pink-circle"></div> */}

            <div className="card-header">
              <div className="icon purple-bg"><FaHome /></div>
              <div>
                <h3>For Parents</h3>
                <span>Home Learning Kits</span>
              </div>
            </div>

            <p className="desc">
              Give your child the gift of confidence reading with our structured,
              fun-filled home learning kits. Perfect for ages 3–12 - weather your child ia a beginner or a struggling reader, our product will add fun and reduce stress for teaching - learning at home.
            </p>

            <ul className="features">
              <li><span className="bullet purple"></span>Ability appropriate levels</li>
              <li><span className="bullet pink"></span>Parent-friendly guides</li>
              <li><span className="bullet yellow"></span>Fun filled activity bags and games</li>
              <li><span className="bullet pink"></span>Rainy day and holiday blues</li>
              <li><span className="bullet purple"></span>15–20 mins daily routine for best results</li>
            </ul>

            <a href="/parents" className="btn purple-btn">
              Explore Home Kits →
            </a>
          </div>

          {/* Schools Card */}
          <div className={`card ${animate ? "show" : ""}`}>
            {/* <div className="floating purple-circle"></div> */}

            <div className="card-header">
              <div className="icon pink-bg"><FaSchool /></div>
              <div>
                <h3>For Schools</h3>
                <span>Classroom Programs</span>
              </div>
            </div>

            <p className="desc">
              Transform your school's reading program with our evidence-based
              curriculum and teacher training. Aligned with core global standards for teaching of English as a second language in the Asian context. <br />
              In India, it is aligned with NIPUN Bharat policy and national literacy goals.
            </p>

            <ul className="features">
              <li><span className="bullet pink"></span>Teacher training / self learning</li>
              <li><span className="bullet purple"></span>Setting up of English language labs</li>
              <li><span className="bullet yellow"></span>Simple Assessment tools for tracking progress in reading</li>
              <li><span className="bullet pink"></span>Mentoring and Observations on request</li>
            </ul>

            <a href="/schools" className="btn pink-btn">
              See School Program →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}