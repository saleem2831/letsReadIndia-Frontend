import React, { useEffect, useState } from "react";
import "./Features.css";
import { FaCheckCircle, FaHandshake, FaTrophy, FaMicroscope, FaMedal, FaClipboardList } from "react-icons/fa";

export default function Features() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("features");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) setShow(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    {
      icon: <FaCheckCircle />,
      title: "ECA Badge Approved",
      desc: "Recognized as an approved Extra Curricular Activity by leading CBSE and ICSE affiliated schools across India for holistic child development.",
      color: "blue",
      badge: "✓ VERIFIED BADGE",
    },
    {
      icon: <FaHandshake />,
      title: "Corporate Partnerships",
      desc: "Trusted partner with leading corporates for CSR initiatives and employee wellness programs focused on child literacy and education.",
      color: "green",
      badge: "✓ 15+ PARTNERS",
    },
    {
      icon: <FaTrophy />,
      title: "Asma Awards & Recognition",
      desc: "Recipient of prestigious awards for educational innovation, founder expertise, and impact on child literacy across India.",
      color: "orange",
      badge: "✓ 8+ AWARDS",
    },
    {
      icon: <FaMicroscope />,
      title: "Research-Backed Program",
      desc: "Grounded in peer-reviewed research with published studies on kinesthetic learning methodologies and reading intervention effectiveness.",
      color: "indigo",
      badge: "✓ PHD BACKED",
    },
    {
      icon: <FaMedal />,
      title: "LR Recognition",
      desc: "Featured in leading edtech publications, media outlets, and educational journals for innovative literacy solutions.",
      color: "rose",
      badge: "✓ MEDIA FEATURED",
    },
    {
      icon: <FaClipboardList />,
      title: "NEP 2020 & NCF 2022 Aligned",
      desc: "Fully compliant with National Education Policy 2020 and National Curriculum Framework 2022 FLN standards.",
      color: "teal",
      badge: "✓ NIPUN BHARAT",
    },
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">

        {/* HEADER */}
        <div className={`features-header ${show ? "show" : ""}`}>
          <h2>LET'S READ INDIA FEATURES & RECOGNITION</h2>

          <div className="underline"></div>

          <div className="dots">
            <span className="dot purple"></span>
            <span className="dot pink"></span>
            <span className="dot yellow"></span>
          </div>

          <p>
            Recognized and trusted by leading educational bodies, corporate
            partners, and institutions across India for our innovative approach
            to reading literacy.
          </p>
        </div>

        {/* GRID */}
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className={`feature-card ${show ? "show" : ""}`}>
              <div className={`icon ${f.color}`}>{f.icon}</div>

              <h3>{f.title}</h3>

              <p>{f.desc}</p>

              <div className="badge">{f.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}