

import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  // const [form, setForm] = useState({
  //   customer_name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   pincode:"",
  //   city:"",
  //   state:""
  // });

  const [form, setForm] = useState({
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  pincode: "",
  city: "",
  state: "",
  country: "India"
});


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const TAX_RATE = 0.18; // 18% GST
const taxAmount = cartTotal * TAX_RATE;
const grandTotal = cartTotal - taxAmount;

  const payAndPlaceOrder = async () => {
    if (!cart.length) return alert("Cart is empty");

    // if (!form.customer_name || !form.phone || !form.address) {
    //   return alert("Please fill all required fields");
    // }

    if (
  !form.customer_name ||
  !form.phone ||
  !form.address ||
  !form.pincode ||
  !form.city ||
  !form.state
) {
  return alert("Please fill all required fields");
}


    try {
      setLoading(true);

      // 🧾 1️⃣ Create Razorpay order from backend
      const paymentRes = await fetch(
        "http://localhost:4000/api/payments/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: cartTotal + 100 })
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok) {
        throw new Error(paymentData.message || "Payment init failed");
      }

      // 💳 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SCR5PXbtiFZ9CK",
        amount: paymentData.amount,
        currency: "INR",
        order_id: paymentData.orderId,
        name: "LetsReadIndia",
        description: "Book Order Payment",

        handler: async function (response) {
          try {
            setLoading(true);

            const payload = {
              ...form,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              items: cart.map((item) => ({
                product_id: item.id,
                quantity: item.qty,
                price: item.price
              }))
            };

            const orderRes = await fetch(
              "http://localhost:4000/api/orders",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
              }
            );

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
              throw new Error(orderData.message || "Order failed");
            }

            // clearCart();
            // navigate("/order-success");
            clearCart();
navigate("/order-success", {
  state: { orderNumber: orderData.order_number }
});

          } catch (err) {
            console.error(err);
            alert("Order placement failed");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            // ❗ User closed Razorpay
            setLoading(false);
          }
        },

        prefill: {
          name: form.customer_name,
          email: form.email,
          contact: form.phone
        },

        theme: { color: "#000" }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loader-page">
          <div className="spinner"></div>
          <p>Processing your payment & order...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        {/* Hero Section */}
        <section className="checkout-hero">
          <div className="checkout-hero-content">
            <h1>Complete Your Order</h1>
            <p>Review and confirm your delivery information</p>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="checkout-content">
          <div className="checkout-container">
            {/* Delivery Form */}
            <div className="delivery-section">
              <h2>Delivery Information</h2>
              
              <form className="checkout-form">
                <div className="form-group">
                  <label htmlFor="customer_name">Full Name *</label>
                  <input
                    id="customer_name"
                    name="customer_name"
                    placeholder="Enter your full name"
                    value={form.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your complete delivery address"
                    value={form.address}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>



<div className="form-row">
  <div className="form-group">
    <label htmlFor="city">City *</label>
    <input
      id="city"
      name="city"
      placeholder="Enter your city"
      value={form.city}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="state">State *</label>
    <input
      id="state"
      name="state"
      placeholder="Enter your state"
      value={form.state}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="country">Country *</label>
    <input
      id="country"
      name="country"
      value={form.country}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="pincode">Pincode *</label>
    <input
      id="pincode"
      name="pincode"
      placeholder="Enter your pincode"
      value={form.pincode}
      onChange={handleChange}
      required
    />
  </div>
</div>

              </form>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.qty}</span>
                    </div>
                    <span className="item-amount">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              {/* <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{cartTotal}</span>
              </div> */}
      <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{grandTotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">₹ 100</span>
              </div>

              {/* <div className="summary-row">
                <span>Tax:</span>
                <span>₹0</span>
              </div> */}

              <div className="summary-row">
            <span>Tax (18% GST):</span>
           <span>₹{taxAmount.toFixed(2)}</span>
            </div>


              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total Amount:</span>
                <span>₹{cartTotal + 100}</span>
              </div>

              <button
                className="pay-btn"
                onClick={payAndPlaceOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay & Place Order"}
              </button>

              <Link to="/cart" className="back-to-cart">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
