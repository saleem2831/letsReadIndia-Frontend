import { useState } from 'react';
import '../styles/faq.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQ() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What ages is this for?",
      answer: "3–10 years (levels progress with the child)."
    },
    {
      id: 2,
      question: "How much time daily?",
      answer: "10–15 minutes consistently works best."
    },
    {
      id: 3,
      question: "Do I need training?",
      answer: "Parent/teacher guides included; schools get training."
    },
    {
      id: 4,
      question: "Does this follow the curriculum?",
      answer: "Yes—aligned with NCF 2022 and NEP 2020 FLN goals."
    },
    {
      id: 5,
      question: "How is progress tracked?",
      answer: "LR Diagnostic + simple trackers (home/school)."
    },
    {
      id: 6,
      question: "Language support?",
      answer: "Designed for Indian learners; works for L1 & L2 English."
    }
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="faq-page">
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="faq-hero-content">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about Let's Read and our programs</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="faq-content">
          <div className="faq-container">
            <div className="accordion">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`accordion-item ${openAccordion === faq.id ? 'active' : ''}`}
                >
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="accordion-icon">
                      {openAccordion === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordion === faq.id && (
                    <div className="accordion-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="faq-cta">
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Please reach out to our support team.</p>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-primary">Contact Us</a>
                <a href="https://wa.me/917058587080" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
