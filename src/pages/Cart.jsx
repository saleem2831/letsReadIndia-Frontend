

import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/cart.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartTotal
  } = useCart()

  const navigate = useNavigate()

  if (!cart.length) {
    return (
      <>
        <Navbar />
        <div className="cart-page">
          <section className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-icon">🛒</div>
              <h1>Your Cart is Empty</h1>
              <p>Looks like you haven't added any products yet</p>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {/* Hero Section */}
        <section className="cart-hero">
          <div className="cart-hero-content">
            <h1>Your Shopping Cart</h1>
            <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="cart-content">
          <div className="cart-container">
            <div className="cart-items-section">
              <h2>Cart Items</h2>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      {item.primary_image ? (
                        <img
                          src={item.primary_image}
                          alt={item.name}
                          onError={(e) => (e.target.src = '/placeholder.png')}
                        />
                      ) : (
                        <div className="no-image">📦</div>
                      )}
                    </div>

                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">₹{item.price}</p>
                    </div>

                    <div className="item-controls">
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => decreaseQty(item.id)}
                        >
                          −
                        </button>
                        <span className="qty-display">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        ₹{item.price * item.qty}
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from cart"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{cartTotal}</span>
              </div>
              
              {/* <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div> */}
              
              {/* <div className="summary-row">
                <span>Tax:</span>
                <span>₹0</span>
              </div> */}

              <div className="summary-divider"></div>
              
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{cartTotal}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
