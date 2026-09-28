import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/checkout.css";

const fallbackCountries = [["IN", "India"], ["AE", "United Arab Emirates"], ["US", "United States"], ["GB", "United Kingdom"],
  ["CA", "Canada"], ["AU", "Australia"], ["SG", "Singapore"], ["SA", "Saudi Arabia"], ["QA", "Qatar"],
  ["OM", "Oman"], ["KW", "Kuwait"], ["BH", "Bahrain"], ["NZ", "New Zealand"], ["DE", "Germany"], ["FR", "France"]];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", address: "", pincode: "", city: "", state: "", country: "India", country_code: "IN" });
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shippingCountries, setShippingCountries] = useState(fallbackCountries);

  useEffect(() => {
    fetch(`${API_URL}/shipping/countries`).then((response) => response.json()).then((data) => {
      if (data.data?.length) setShippingCountries(data.data.map((country) => [country.code, country.name]));
    }).catch(() => {});
  }, []);

  const change = (event) => {
    const { name, value } = event.target;
    if (name === "country_code") {
      setForm((current) => ({ ...current, country_code: value, country: shippingCountries.find(([code]) => code === value)?.[1] || value }));
    } else setForm((current) => ({ ...current, [name]: value }));
    setPayment(null);
  };

  const createQuote = async () => {
    if (!cart.length) return setError("Your cart is empty.");
    setLoading(true); setError("");
    try {
      const response = await fetch(`${API_URL}/payments/create`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, coupon_code: coupon, items: cart.map((item) => ({ product_id: item.id, quantity: item.qty })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to calculate the total");
      setPayment(data);
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };

  const pay = () => {
    if (!payment) return;
    const razorpay = new window.Razorpay({
      key: payment.key, amount: payment.amount, currency: payment.currency, order_id: payment.orderId,
      name: "LetsReadIndia", description: "Book order", theme: { color: "#5936ad" },
      prefill: { name: form.customer_name, email: form.email, contact: form.phone },
      handler: async (response) => {
        setLoading(true); setError("");
        try {
          const orderResponse = await fetch(`${API_URL}/orders`, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id, signature: response.razorpay_signature }) });
          const data = await orderResponse.json();
          if (!orderResponse.ok) throw new Error(data.message || "Order placement failed");
          clearCart(); navigate("/order-success", { state: { orderNumber: data.order_number } });
        } catch (requestError) { setError(requestError.message); setLoading(false); }
      },
      modal: { ondismiss: () => setLoading(false) },
    });
    razorpay.open();
  };

  const q = payment?.quote;
  return <><Navbar /><div className="checkout-page"><section className="checkout-hero"><div className="checkout-hero-content"><h1>Complete Your Order</h1><p>International cards and Shiprocket delivery quotes are supported.</p></div></section>
    <section className="checkout-content"><div className="checkout-container"><div className="delivery-section"><h2>Delivery Information</h2><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); createQuote(); }}>
      <div className="form-group"><label>Full name *</label><input required name="customer_name" value={form.customer_name} onChange={change} /></div>
      <div className="form-group"><label>Email *</label><input required type="email" name="email" value={form.email} onChange={change} /></div>
      <div className="form-group"><label>Phone *</label><input required name="phone" value={form.phone} onChange={change} /></div>
      <div className="form-group"><label>Address *</label><textarea required name="address" value={form.address} onChange={change} rows="4" /></div>
      <div className="form-row"><div className="form-group"><label>City *</label><input required name="city" value={form.city} onChange={change} /></div><div className="form-group"><label>State / Province *</label><input required name="state" value={form.state} onChange={change} /></div></div>
      <div className="form-row"><div className="form-group"><label>Country *</label><select name="country_code" value={form.country_code} onChange={change}>{shippingCountries.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></div><div className="form-group"><label>Postal code *</label><input required name="pincode" value={form.pincode} onChange={change} /></div></div>
      <div className="form-group"><label>Coupon code</label><div className="coupon-entry"><input value={coupon} onChange={(event) => { setCoupon(event.target.value.toUpperCase()); setPayment(null); }} placeholder="Enter coupon" /><button type="submit">Apply & quote</button></div></div>
    </form></div>
    <div className="order-summary"><h2>Order Summary</h2><div className="summary-items">{cart.map((item) => <div key={item.id} className="summary-item"><div className="item-info"><span className="item-name">{item.name}</span><span className="item-qty">×{item.qty}</span></div><span>₹{Number(item.price * item.qty).toFixed(2)}</span></div>)}</div><div className="summary-divider" />
      {q ? <><div className="summary-row"><span>Subtotal</span><span>₹{Number(q.subtotal).toFixed(2)}</span></div>{q.discount > 0 && <div className="summary-row discount-row"><span>Coupon {q.coupon_code}</span><span>−₹{Number(q.discount).toFixed(2)}</span></div>}<div className="summary-row"><span>Shiprocket ({q.shipping_mode})</span><span>₹{Number(q.shipping_fee).toFixed(2)}</span></div><small className="shipping-detail">{q.courier_name}{q.estimated_delivery_days ? ` • ${q.estimated_delivery_days} days` : ""}</small><div className="summary-divider" /><div className="summary-total"><span>Total</span><span>₹{Number(q.total).toFixed(2)} INR</span></div><button className="pay-btn" onClick={pay} disabled={loading}>{loading ? "Processing…" : "Pay securely"}</button><p className="payment-note">Foreign cards work after International Payments is enabled in your Razorpay account.</p></> : <button className="pay-btn" onClick={createQuote} disabled={loading}>{loading ? "Getting Shiprocket rate…" : "Calculate delivery & total"}</button>}
      {error && <p className="checkout-error">{error}</p>}<Link to="/cart" className="back-to-cart">← Back to cart</Link>
    </div></div></section></div><Footer /></>;
}
