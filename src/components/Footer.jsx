import './footer.css';
import { FaInstagram, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP GLOW */}
      <div className="footer-glow"></div>

      <div className="footer-container">
        
        {/* LEFT BRAND SECTION */}
        <div className="footer-brand">
          <div className="brand-header">
            <div className="brand-logo">LR</div>

            <div>
              <h2>LET'S READ</h2>
              <p className="tagline">
                Empowering young minds through literacy.
              </p>
            </div>
          </div>

          <p className="brand-desc">
            Reading kits, diagnostics and training to help children build
            strong reading foundations.
          </p>

          {/* SOCIAL */}
          <div className="social">
            <a href="https://instagram.com" className="icon instagram" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/917058587080" className="icon whatsapp" title="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="tel:+917058587080" className="icon phone" title="Phone">
              <FaPhone />
            </a>
            <a href="mailto:sales@letsreadindia.in" className="icon mail" title="Email">
              <FaEnvelope />
            </a>
          </div>

          <div className="contact">
            <p>sales@letsreadindia.in</p>
            <p>+91 70585 87080</p>
          </div>
        </div>

        {/* COLUMN 1 */}
        <div>
          <h3>For Parents</h3>
          <ul>
            <li>Shop Kits</li>
            <li>Readiness Quiz</li>
            <li>Sample Activity</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3>For Schools</h3>
          <ul>
            <li>Program</li>
            <li>Diagnostic</li>
            <li>Training</li>
            <li>Case Studies</li>
            <li>Demo</li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3>Resources</h3>
          <ul>
            <li>Articles</li>
            <li>Blog</li>
            <li>Research Paper</li>
            <li>Free Download</li>
            <li>Press</li>
            <li>Awards</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>2026 Let's Read India. All rights reserved.</p>

        <div className="links">
          <span>Privacy</span>
          <span>•</span>
          <span>Terms</span>
          <span>•</span>
          <span>Refunds / Shipping</span>
        </div>
      </div>
    </footer>
  );
}