import React, { useEffect, useState } from "react";
import "./HowItWorks.css";
import { FaBook, FaHandsHelping, FaBookOpen, FaChartBar } from "react-icons/fa";

export default function HowItWorks() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("how-it-works");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) setShow(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cards = [
    {
      icon: <FaBook />,
      title: "Educator's Handbook",
      desc:
        "A practical, adult-friendly guide designed to support emergent reading, spelling and comprehension. It offers complete, progressive phonics instructions from beginner to advanced level in one book!",
      color: "purple",
    },
    {
      icon: <FaHandsHelping />,
      title: "Kinesthetic, Multi-Sensory Activities",
      desc:
        "Each level has more than 20 fun interactive games and activities that promote higher-order thinking skills and confidence in young learners.",
      color: "pink",
    },
    {
      icon: <FaBookOpen />,
      title: "Student Workbooks / School Reader and Workbook",
      desc:
        "Our student workbooks can complement any curriculum or age group and support practice learning of English language.",
      color: "blue",
    },
    {
      icon: <FaChartBar />,
      title: "Reading Age Diagnostic Tool",
      desc:
        "The LR-RADT is a simple tool that takes less than a minute to provide an estimate of a child's 'Reading Age'. It is helpful to plan instructions for a class and track individual progress in reading.",
      color: "orange",
    },
  ];

  return (
    <section id="how-it-works" className="how">
      <div className="how-container">

        {/* HEADER */}
        <div className={`how-header ${show ? "show" : ""}`}>
          <h2>THE LET'S READ PROGRAM</h2>

          <div className="how-underline"></div>

          <div className="how-dots">
            <span className="dot purple"></span>
            <span className="dot pink"></span>
            <span className="dot yellow"></span>
          </div>

          <p>
            Let's Read is the PhD research of our founder and is grounded in neuroscience. It provides clear, systematic and cumulative instructions for teaching & learning. It provides confidence to children and helps them to 'decode' complex words and improve spellings. The continuous association of pictures helps to build comprehension. The activities are based on the theories of 'constructivism' where children actively build their knowledge of English language. All games and activities are designed by keeping Vygotsky's 'Zone of Proximal Development' in mind, where each child gets enough scaffolding to learn and practice new concepts with ease.
          </p>
        </div>

        {/* CARDS */}
        <div className="how-grid">
          {cards.map((c, i) => (
            <div key={i} className={`how-card ${show ? "show" : ""}`}>
              <div className={`icon-box ${c.color}`}>
                {c.icon}
              </div>

              <h3>{c.title}</h3>

              <p>{c.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}