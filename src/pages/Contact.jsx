import { useState } from 'react';
import '../styles/contact.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaMobileAlt, FaComments, FaMapMarkerAlt } from 'react-icons/fa';
import { submitContactForm } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   // Add your form submission logic here
  //   alert('Thank you for reaching out! We will get back to you soon.');
  //   setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await submitContactForm(formData);

    alert(data.message);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

  return (
    <>
      <Navbar />
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          <div className="contact-container">
            {/* Contact Info Cards */}
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon"><FaEnvelope /></div>
                <h3>Email</h3>
                <p>sales@letsreadindia.in</p>
                <a href="mailto:sales@letsreadindia.in">Send Email</a>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaMobileAlt /></div>
                <h3>Phone</h3>
                <p>+91 70585 87080</p>
                <a href="tel:+917058587080">Call Us</a>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaComments /></div>
                <h3>WhatsApp</h3>
                <p>+91 70585 87080</p>
                <a href="https://wa.me/917058587080" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <h3>Address</h3>
                <p>Let's Read India<br/>New Delhi, India</p>
                <a href="#">View on Map</a>
              </div>
            </div>

            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send us a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
