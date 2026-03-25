

import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getAssignedOrders,
  updateOrderStatus,
  getOrderDetails,
} from "../../services/api";
import "../../styles/AdminDashboard.css";
import { shipOrder } from "../../services/api";


export default function AdminDashboard() {


  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [searchInput, setSearchInput] = useState("");


    const [shipModal, setShipModal] = useState(false);
const [shippingOrderId, setShippingOrderId] = useState(null);
const [dimensions, setDimensions] = useState({
  weight: "",
  length: "",
  breadth: "",
  height: "",
});
const [shippingLoading, setShippingLoading] = useState(false);


const openShipModal = (orderId) => {
  setShippingOrderId(orderId);
  setShipModal(true);
};



const handleShipOrder = async () => {
  if (!dimensions.weight || !dimensions.length || !dimensions.breadth || !dimensions.height) {
    alert("Please enter all dimensions");
    return;
  }

  try {
    setShippingLoading(true);

    await shipOrder(shippingOrderId, dimensions, token);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === shippingOrderId ? { ...o, status: "shipped" } : o
      )
    );

    setShipModal(false);
    alert("Order shipped successfully 🚚");

  } catch (err) {
    alert("Shipping failed");
  } finally {
    setShippingLoading(false);
  }
};


  useEffect(() => {
    loadData();
  }, [page, search, statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, ordersRes] = await Promise.all([
        getAdminDashboard(token),
        getAssignedOrders(page, token, search, statusFilter),
      ]);

      setStats(statsRes || {});
      setOrders(ordersRes?.data || []);
      setTotalPages(ordersRes?.pages || 1);
    } catch {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, status, token);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } catch {
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const viewItems = async (orderId) => {
    try {
      const items = await getOrderDetails(orderId, token);
      setSelectedItems(items || []);
      setShowModal(true);
    } catch {
      alert("Failed to load order items");
    }
  };


  if (loading) return <div className="loading-message">📊 Loading dashboard...</div>;
  if (error) return <div className="error-message">❌ {error}</div>;

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-dashboard-container">
        
        {/* STATS GRID */}
        <div className="stats-grid">
          <StatCard title="Total Orders" value={stats.total_orders || 0} />
          <StatCard title="Pending" value={stats.pending || 0} />
          <StatCard title="Assigned" value={stats.assigned || 0} />
          <StatCard title="Shipped" value={stats.shipped || 0} />
          <StatCard title="Delivered" value={stats.delivered || 0} />
          <StatCard
            title="Total Value"
            value={`₹ ${Number(stats.total_value || 0).toLocaleString("en-IN")}`}
          />
        </div>

        {/* SEARCH & FILTER */}
        <div className="search-filter-container">
          <input
            type="text"
            className="search-input-field"
            placeholder="Search order number or customer..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearch(searchInput);
              }
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              setPage(1);
              setSearch(searchInput);
            }}
          >
            🔍 Search
          </button>

          <select
            className="filter-select-field"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">📋 All Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="assigned">📌 Assigned</option>
            <option value="shipped">🚚 Shipped</option>
            <option value="delivered">✅ Delivered</option>
          </select>
        </div>

        {/* ORDERS TABLE */}
        <div className="orders-table-wrapper">
          <div className="table-header">
            <h2 className="table-title">Assigned Orders</h2>
          </div>

          <table className="orders-table">
            <thead className="table-thead">
              <tr>
                <th className="table-th">Order #</th>
                <th className="table-th">Customer</th>
                <th className="table-th">Total Qty</th>
                <th className="table-th">Total</th>
                <th className="table-th">Status</th>
                <th className="table-th">Date</th>
                <th className="table-th">Actions</th>
                <th className="table-th">Ship</th>

              </tr>
            </thead>

            <tbody className="table-tbody">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="table-td table-td-order-number">{o.order_number}</td>
                  <td className="table-td">{o.customer_name}</td>
                  <td className="table-td">{o.total_quantity}</td>
                  <td className="table-td table-td-amount">
                    ₹ {Number(o.total || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="table-td">
                    <select
                      disabled={updatingId === o.id}
                      className="status-select"
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="table-td">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>

                  <td className="table-td">
                    <button
                      onClick={() => viewItems(o.id)}
                      className="view-items-btn"
                    >
                      View Items
                    </button>
                  </td>
                  <td className="table-td">
                    {o.status !== "shipped" && o.status !== "delivered" && (
  <button
    onClick={() => openShipModal(o.id)}
    className="ship-btn"
  >
    🚚 Ship
  </button>
)}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <div className="empty-state-text">No orders found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="pagination-container">
            <div className="pagination-buttons">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="pagination-btn"
              >
                ← Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>

            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
          </div>
        </div>

        {/* ORDER ITEMS MODAL */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">
                <span className="modal-title-icon">📚</span>
                Order Items
              </h3>

              <div className="modal-items-list">
                {selectedItems.map((item, i) => (
                  <div key={i} className="modal-item">
                    <div>
                      <div className="modal-item-name">{item.name}</div>
                      <div className="modal-item-quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="modal-item-price">
                      ₹{Number(item.price || 0).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="modal-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* {} */}

        {shipModal && (
  <div className="modal-overlay" onClick={() => setShipModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-title">📦 Enter Box Details</h3>

      <div className="modal-items-list">
        <input
          type="number"
          placeholder="Weight (kg)"
          value={dimensions.weight}
          onChange={(e) =>
            setDimensions({ ...dimensions, weight: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Length (cm)"
          value={dimensions.length}
          onChange={(e) =>
            setDimensions({ ...dimensions, length: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Breadth (cm)"
          value={dimensions.breadth}
          onChange={(e) =>
            setDimensions({ ...dimensions, breadth: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={dimensions.height}
          onChange={(e) =>
            setDimensions({ ...dimensions, height: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleShipOrder}
        disabled={shippingLoading}
        className="modal-close-btn"
      >
        {shippingLoading ? "Processing..." : "Generate AWB"}
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
