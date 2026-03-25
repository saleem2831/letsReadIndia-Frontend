import React from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Let's read really helped my students build clarity of sounds and gaining confidence in listening and speaking. The hands-on activities got my students curious for learning.",
      author: "Harshita Doe",
      role: "TeachForIndia Fellow",
    },
    {
      quote:
        "The 'Let's Read' materials have been an invaluable asset in my classroom. Their impact has been especially profound for students facing learning challenges. The interactive and engaging nature of the activities has been a source of joy for all students, fostering a fun-filled approach to reading and comprehension.",
      author: "Muhammed Hasan",
      role: "Teach For India",
    },
    {
      quote:
        "Thanks to Let's Read, learning English as a language has become engaging, joyful, and highly effective for the students. I wholeheartedly recommend the Let's Read program to any educator seeking to revolutionize literacy instruction and make a lasting impact in their classrooms.",
      author: "Harshita Doe",
      role: "RAASTA School Transformation Program",
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        
        {/* HEADER */}
        <div className="testimonials-header">
          <h2>TESTIMONIALS</h2>

          <div className="underline"></div>

          <div className="dots">
            <span className="dot purple"></span>
            <span className="dot pink"></span>
            <span className="dot yellow"></span>
          </div>

          <p>See what people say about our company</p>
        </div>

        {/* CARDS */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">

              {/* QUOTE ICON */}
              <div className="quote-box">“</div>

              <p className="quote-text">{t.quote}</p>

              <div className="author">
                <div className="avatar">
                  <div className="inner-avatar"></div>
                </div>

                <div>
                  <h4>{t.author}</h4>
                  <span>{t.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}