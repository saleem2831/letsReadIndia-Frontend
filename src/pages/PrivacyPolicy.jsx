import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <Navbar />

      {/* HERO */}
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy Policy</h1>

          <p>
            Your privacy matters to us. Learn how Let's Read India
            collects, uses and protects your information.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="privacy-content">

        <div className="privacy-container">

          <div className="privacy-intro">
            <p>
              At <strong>Lets Read India</strong>, accessible at{" "}
              <strong>www.letsreadindia.in</strong>, we respect your
              privacy and are committed to protecting your personal
              information.
            </p>
          </div>

          <section className="privacy-section">
            <h2>Information We Collect</h2>

            <p>
              We may collect information that you voluntarily provide,
              such as your name, email address, phone number, comments,
              feedback, or other information submitted through our website.
            </p>

            <p>
              We may also automatically collect basic technical information,
              such as IP address, browser type, device information, and
              website usage data through cookies and similar technologies.
            </p>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>

            <p>We may use your information to:</p>

            <ul>
              <li>Provide and improve our website and services.</li>
              <li>Respond to your questions and requests.</li>
              <li>Send updates or communications where you have requested them.</li>
              <li>Understand website usage and improve user experience.</li>
              <li>Maintain website security and prevent misuse.</li>
              <li>Comply with applicable laws and legal requirements.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Cookies</h2>

            <p>
              Our website may use cookies and similar technologies to
              improve functionality and understand website traffic.
              You can manage or disable cookies through your browser settings.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Sharing of Information</h2>

            <p>
              We do not sell or rent your personal information. We may
              share information with trusted service providers or authorities
              when necessary to operate our website, provide services,
              comply with legal obligations, or protect our rights.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Data Security</h2>

            <p>
              We take reasonable measures to protect your personal
              information. However, no online system can be guaranteed
              to be completely secure.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Your Rights</h2>

            <p>
              Subject to applicable law, you may request access to,
              correction of, or deletion of your personal information,
              or raise a privacy-related concern with us.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Third-Party Links</h2>

            <p>
              Our website may contain links to third-party websites.
              We are not responsible for the privacy practices or content
              of those websites.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Children's Privacy</h2>

            <p>
              We respect children's privacy and handle children's personal
              data in accordance with applicable laws and regulations.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Policy</h2>

            <p>
              We may update this Privacy Policy from time to time.
              Any changes will be posted on this page with an updated date.
            </p>
          </section>

          <section className="privacy-section privacy-contact">
            <h2>Contact Us</h2>

            <p>
              If you have any questions or concerns about this Privacy
              Policy, please contact us:
            </p>

            <div className="privacy-contact-box">
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.letsreadindia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.letsreadindia.in
                </a>
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:YOUR_EMAIL_ADDRESS">
                 info@letsreadindia.in
                </a>
              </p>
            </div>
          </section>

          <div className="privacy-footer-note">
            © Lets Read India. All rights reserved.
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}