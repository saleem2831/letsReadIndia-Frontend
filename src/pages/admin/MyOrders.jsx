import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/api";
import "../../styles/MyOrders.css";

export default function MyOrders() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getMyOrders(token);
      setOrders(res || []);
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: "⏳",
      confirmed: "✅",
      assigned: "📌",
      shipped: "🚚",
      delivered: "✨",
      cancelled: "❌",
    };
    return icons[status?.toLowerCase()] || "📦";
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === "all") return true;
    return o.status?.toLowerCase() === activeFilter;
  });

  const uniqueStatuses = ["all", ...new Set(orders.map((o) => o.status?.toLowerCase()))];

  if (loading) {
    return (
      <div className="my-orders-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading your orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-wrapper">
        <div className="my-orders-container">
          <div className="empty-state-container">
            <span className="empty-state-icon">❌</span>
            <h3 className="empty-state-title">Error Loading Orders</h3>
            <p className="empty-state-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-wrapper">
      <div className="my-orders-container">
        {/* HEADER */}
        <div className="my-orders-header">
          <h1 className="my-orders-page-title">My Orders</h1>
        </div>

        {/* FILTERS */}
        {orders.length > 0 && (
          <div className="filters-section">
            <div className="filter-btn-group">
              {uniqueStatuses.map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${activeFilter === status ? "active" : ""}`}
                  onClick={() => setActiveFilter(status)}
                >
                  {status === "all" ? "📋 All Orders" : `${getStatusIcon(status)} ${status.charAt(0).toUpperCase() + status.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS GRID */}
        {filteredOrders.length > 0 ? (
          <div className="orders-grid">
            {filteredOrders.map((o) => (
              <div key={o.id} className="order-card">
                {/* HEADER */}
                <div className="order-card-header">
                  <div>
                    <span className="order-number-label">Order Number</span>
                    <div className="order-number">#{o.id || o.order_number || "N/A"}</div>
                  </div>
                  <span
                    className={`order-status-badge status-${o.status?.toLowerCase() || "pending"}`}
                  >
                    {getStatusIcon(o.status)} {o.status || "Pending"}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Order Amount</span>
                    <span className="detail-value amount">
                      ₹{Number(o.total_amount || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Total Items</span>
                    <span className="detail-value">{o.item_count || o.total_items || "N/A"}</span>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="order-card-footer">
                  <span className="order-date">
                    📅 {new Date(o.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <button className="view-details-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-container">
            <span className="empty-state-icon">📭</span>
            <h3 className="empty-state-title">
              {orders.length === 0 ? "No Orders Yet" : "No Orders Found"}
            </h3>
            <p className="empty-state-text">
              {orders.length === 0
                ? "You haven't placed any orders yet. Start shopping today!"
                : `No orders found for "${activeFilter}" status.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}