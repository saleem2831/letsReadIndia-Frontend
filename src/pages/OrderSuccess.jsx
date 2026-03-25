import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/OrderSuccess.css"
import { useLocation } from "react-router-dom";


export default function OrderSuccess() {
  // const orderNumber = Math.random().toString(36).substring(2, 11).toUpperCase()
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Navbar />
      <div className="order-success-page">
        <div className="order-success-container">
          {/* Success Icon */}
          <div className="success-icon-wrapper">
            <div className="success-icon">✓</div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="success-title">🎉 Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <div className="order-details-section">
            <h3>Order Details</h3>
            <div className="order-number" style={{ color: "#10b981" }}>#{orderNumber}</div>

            <div className="order-details-row">
              <span className="detail-label">Order Date</span>
              <span className="detail-value" style={{ color: "#10b981" }}>{currentDate}</span>
            </div>

            <div className="order-details-row">
              <span className="detail-label">Status</span>
              <span className="detail-value" style={{ color: "#10b981" }}>Confirmed ✓</span>
            </div>

            <div className="order-details-row">
              <span className="detail-label">Estimated Delivery</span>
              <span className="detail-value" style={{ color: "#10b981" }}>5-7 Business Days</span>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="success-actions">
            <Link to="/products" style={{ flex: 1 }}>
              <button className="btn-success btn-primary-success">
                🛍️ Continue Shopping
              </button>
            </Link>
            <Link to="/customer" style={{ flex: 1 }}>
              <button className="btn-success btn-secondary-success">
                📦 Track Order
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

