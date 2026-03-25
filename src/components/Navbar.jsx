import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/lets-read-logo.png";
import { useCart } from "../context/CartContext";


import { submitParentInquiry,submitSchoolInquiry } from "../services/api";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showParentForm, setShowParentForm] = useState(false);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const { cart } = useCart();

  const [parentForm, setParentForm] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: ""
  });

  const [schoolForm, setSchoolForm] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    studentCount: ""
  });

  const handleParentChange = (e) => {
    setParentForm({ ...parentForm, [e.target.name]: e.target.value });
  };

  const handleSchoolChange = (e) => {
    setSchoolForm({ ...schoolForm, [e.target.name]: e.target.value });
  };

  // const handleParentSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Parent Form:", parentForm);
  //   alert("Thank you! We will contact you soon.");
  //   setParentForm({ name: "", email: "", phone: "", childAge: "" });
  //   setShowParentForm(false);
  // };


const handleParentSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await submitParentInquiry(parentForm);
    alert(data.message);
  } catch (error) {
    console.error("Full Error:", error);
    alert(error.message || "Something went wrong");
  }
};

const handleSchoolSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await submitSchoolInquiry(schoolForm);
    alert(data.message);
  } catch (error) {
    console.error("Full Error:", error);
    alert(error.message || "Something went wrong");
  }
};


  // const handleSchoolSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("School Form:", schoolForm);
  //   alert("Thank you! We will contact you soon.");
  //   setSchoolForm({ schoolName: "", contactPerson: "", email: "", phone: "", studentCount: "" });
  //   setShowSchoolForm(false);
  // };


//   const handleSchoolSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = await submitSchoolInquiry(schoolForm);
//     alert(data.message);

//     setSchoolForm({
//       schoolName: "",
//       contactPerson: "",
//       email: "",
//       phone: "",
//       studentCount: "",
//     });
//   } catch (error) {
//     alert("Something went wrong");
//   }
// };

  return (
    <>
      {/* ===== Top Banner ===== */}
      {/* <div className="top-banner">
        <div className="banner-container">
          <span>
            🎁 Free Reading Age Check for your child/class — Book a 10-min call
          </span>
          <button className="book-btn">Book Now</button>
        </div>
      </div> */}

      {/* ===== Main Navbar ===== */}
      <nav className="navbar">
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="Let's Read Logo" className="logo-img " />
          </Link>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>

          {/* Right Buttons */}
          <div className="nav-actions">
            <button className="parent-btn" onClick={() => setShowParentForm(true)}>I'm a Parent</button>
            <button className="school-btn" onClick={() => setShowSchoolForm(true)}>I'm a School</button>
            {/* <span className="icon">🌙</span> */}
            <Link to="/cart" className="cart-icon">
              🛒
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <Link to="/cart" className="mobile-cart-icon">
              🛒
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
            {/* Mobile Menu Icon */}
            <div
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <button className="parent-btn" onClick={() => {setShowParentForm(true); setMobileMenuOpen(false);}}>I'm a Parent</button>
            <button className="school-btn" onClick={() => {setShowSchoolForm(true); setMobileMenuOpen(false);}}>I'm a School</button>
          </div>
        )}
      </nav>

      {/* ===== Parent Form Modal ===== */}
      {showParentForm && (
        <div className="modal-overlay" onClick={() => setShowParentForm(false)}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowParentForm(false)}>✕</button>
            
            <h2>Register as Parent</h2>
            <p className="modal-subtitle">Join thousands of parents helping their children read better</p>
            
            <form onSubmit={handleParentSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="parent-name">Full Name *</label>
                <input
                  id="parent-name"
                  type="text"
                  name="name"
                  value={parentForm.name}
                  onChange={handleParentChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parent-email">Email *</label>
                <input
                  id="parent-email"
                  type="email"
                  name="email"
                  value={parentForm.email}
                  onChange={handleParentChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parent-phone">Phone Number *</label>
                <input
                  id="parent-phone"
                  type="tel"
                  name="phone"
                  value={parentForm.phone}
                  onChange={handleParentChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parent-age">Child's Age *</label>
                <input
                  id="parent-age"
                  type="text"
                  name="childAge"
                  value={parentForm.childAge}
                  onChange={handleParentChange}
                  placeholder="e.g., 5 years"
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">Register Now</button>
            </form>
          </div>
        </div>
      )}

      {/* ===== School Form Modal ===== */}
      {showSchoolForm && (
        <div className="modal-overlay" onClick={() => setShowSchoolForm(false)}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSchoolForm(false)}>✕</button>
            
            <h2>Register as School</h2>
            <p className="modal-subtitle">Partner with us to transform reading education in your school</p>
            
            <form onSubmit={handleSchoolSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="school-name">School Name *</label>
                <input
                  id="school-name"
                  type="text"
                  name="schoolName"
                  value={schoolForm.schoolName}
                  onChange={handleSchoolChange}
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-person">Contact Person *</label>
                <input
                  id="contact-person"
                  type="text"
                  name="contactPerson"
                  value={schoolForm.contactPerson}
                  onChange={handleSchoolChange}
                  placeholder="Name of principal/coordinator"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="school-email">Email *</label>
                <input
                  id="school-email"
                  type="email"
                  name="email"
                  value={schoolForm.email}
                  onChange={handleSchoolChange}
                  placeholder="school@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="school-phone">Phone Number *</label>
                <input
                  id="school-phone"
                  type="tel"
                  name="phone"
                  value={schoolForm.phone}
                  onChange={handleSchoolChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-count">Number of Students *</label>
                <input
                  id="student-count"
                  type="text"
                  name="studentCount"
                  value={schoolForm.studentCount}
                  onChange={handleSchoolChange}
                  placeholder="e.g., 500"
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">Register School</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}