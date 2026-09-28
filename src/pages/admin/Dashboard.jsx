import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  getAdminDashboard,
  getAssignedOrders,
  getOrderDetails,
  shipOrder,
  SOCKET_URL,
  updateOrderStatus,
} from "../../services/api";
import "../../styles/AdminDashboard.css";
import "../../styles/AdminOperations.css";

const money = (value, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency", currency: currency || "INR", maximumFractionDigits: 2,
    }).format(Number(value || 0));
  } catch {
    return `${currency || "INR"} ${Number(value || 0).toFixed(2)}`;
  }
};

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [live, setLive] = useState(false);

  const loadData = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      setError("");
      const [statsResult, ordersResult] = await Promise.all([
        getAdminDashboard(token),
        getAssignedOrders(page, token, search, statusFilter),
      ]);
      setStats(statsResult || {});
      setOrders(ordersResult?.data || []);
      setTotalPages(Math.max(1, Number(ordersResult?.pages) || 1));
    } catch (requestError) {
      setError(requestError.message || "Failed to load dashboard data");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [page, search, statusFilter, token]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { auth: { token }, transports: ["websocket", "polling"] });
    socket.on("connect", () => setLive(true));
    socket.on("disconnect", () => setLive(false));
    socket.on("connect_error", () => setLive(false));
    socket.on("orders:changed", () => loadData(false));
    const fallback = window.setInterval(() => loadData(false), 30000);
    return () => { window.clearInterval(fallback); socket.disconnect(); };
  }, [loadData, token]);

  const changeStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, status, token);
      setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status } : order));
      await loadData(false);
    } catch (requestError) {
      setError(requestError.message || "Failed to update order status");
    } finally { setUpdatingId(null); }
  };

  const openDetails = async (orderId) => {
    setDetailsLoading(true);
    try {
      setError("");
      setDetails(await getOrderDetails(orderId, token));
    } catch (requestError) {
      setError(requestError.message || "Failed to load order details");
    } finally { setDetailsLoading(false); }
  };

  const createShipment = async (order) => {
    if (!window.confirm(`Create the Shiprocket shipment and AWB for ${order.order_number}?`)) return;
    setShippingId(order.id);
    try {
      setError("");
      await shipOrder(order.id, {}, token);
      await loadData(false);
    } catch (requestError) {
      setError(requestError.message || "Shipping failed");
    } finally { setShippingId(null); }
  };

  return <div className="admin-dashboard-wrapper admin-operations-page"><div className="admin-dashboard-container">
    <div className="admin-operations-heading"><div><h1>Order Dashboard</h1><p>Manage assigned domestic and international deliveries.</p></div><strong className={live ? "admin-socket-live" : "admin-socket-offline"}>{live ? "● Live updates" : "○ Reconnecting"}</strong></div>

    <div className="stats-grid"><StatCard title="Total Orders" value={stats.total_orders || 0} /><StatCard title="Pending" value={stats.pending || 0} /><StatCard title="Assigned" value={stats.assigned || 0} /><StatCard title="Shipped" value={stats.shipped || 0} /><StatCard title="Delivered" value={stats.delivered || 0} /><StatCard title="Total Value" value={money(stats.total_value)} /></div>

    <div className="search-filter-container"><input className="search-input-field" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { setPage(1); setSearch(searchInput.trim()); } }} placeholder="Search order number or customer" /><button className="search-btn" onClick={() => { setPage(1); setSearch(searchInput.trim()); }}>Search</button><select className="filter-select-field" value={statusFilter} onChange={(event) => { setPage(1); setStatusFilter(event.target.value); }}><option value="">All statuses</option><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option></select></div>

    {error && <div className="admin-operations-error">{error}</div>}
    <div className="orders-table-wrapper admin-operations-table"><div className="table-header"><h2 className="table-title">Assigned Orders</h2></div><div className="admin-table-scroll"><table className="orders-table"><thead className="table-thead"><tr><th className="table-th">Order</th><th className="table-th">Customer</th><th className="table-th">Delivery</th><th className="table-th">Items</th><th className="table-th">Amount</th><th className="table-th">Status</th><th className="table-th">Shipment</th><th className="table-th">Date</th><th className="table-th">Actions</th></tr></thead><tbody className="table-tbody">
      {loading ? <tr><td className="table-td" colSpan="9">Loading orders…</td></tr> : orders.map((order) => <tr key={order.id}>
        <td className="table-td table-td-order-number">{order.order_number}</td>
        <td className="table-td"><strong>{order.customer_name}</strong><small>{order.email}<br />{order.phone}</small></td>
        <td className="table-td"><span className={`admin-shipping-mode ${order.shipping_mode}`}>{order.shipping_mode || "domestic"}</span><small>{order.city}, {order.country}<br />{order.pincode}</small></td>
        <td className="table-td">{order.total_quantity}</td>
        <td className="table-td table-td-amount">{money(order.total, order.currency)}<small>Shipping {money(order.delivery_fee, order.currency)}</small></td>
        <td className="table-td"><select disabled={updatingId === order.id} className="status-select" value={order.status} onChange={(event) => changeStatus(order.id, event.target.value)}><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option></select></td>
        <td className="table-td"><strong>{order.shipment_status || "Not created"}</strong><small>{order.courier_name || "Courier pending"}{order.waybill ? <><br />AWB {order.waybill}</> : null}</small></td>
        <td className="table-td">{new Date(order.created_at).toLocaleDateString("en-IN")}<small>{new Date(order.created_at).toLocaleTimeString("en-IN")}</small></td>
        <td className="table-td"><div className="admin-row-actions"><button className="view-items-btn" disabled={detailsLoading} onClick={() => openDetails(order.id)}>Details</button>{!order.waybill && order.status !== "delivered" && <button className="ship-btn" disabled={shippingId === order.id} onClick={() => createShipment(order)}>{shippingId === order.id ? "Creating…" : "Ship"}</button>}</div></td>
      </tr>)}
      {!loading && !orders.length && <tr><td colSpan="9" className="empty-state">No orders match these filters.</td></tr>}
    </tbody></table></div><div className="pagination-container"><div className="pagination-buttons"><button className="pagination-btn" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>← Prev</button><button className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}>Next →</button></div><span className="pagination-info">Page {page} of {totalPages}</span></div></div>
  </div>{details && <OrderModal data={details} onClose={() => setDetails(null)} />}</div>;
}

function StatCard({ title, value }) { return <div className="stat-card"><p className="stat-label">{title}</p><p className="stat-value">{value}</p></div>; }

function OrderModal({ data, onClose }) {
  const { order, items = [], events = [] } = data;
  if (!order) return null;
  return <div className="modal-overlay" onClick={onClose}><div className="modal-content admin-order-modal" onClick={(event) => event.stopPropagation()}><button className="admin-modal-x" onClick={onClose}>×</button><h3 className="modal-title">{order.order_number}</h3><div className="admin-order-detail-grid">
    <Detail label="Customer" value={order.customer_name} /><Detail label="Email" value={order.email} /><Detail label="Phone" value={order.phone} /><Detail label="Shipping mode" value={order.shipping_mode} /><Detail label="Address" value={`${order.address}, ${order.city}, ${order.state}, ${order.country} ${order.pincode}`} /><Detail label="Payment" value={`${order.payment_status} • ${order.payment_id || "No payment ID"}`} /><Detail label="Order total" value={money(order.total, order.currency)} /><Detail label="Delivery fee" value={money(order.delivery_fee, order.currency)} /><Detail label="Courier" value={order.courier_name || "Not selected"} /><Detail label="AWB" value={order.waybill || "Not assigned"} />
  </div><h4>Items</h4><div className="admin-order-list">{items.map((item) => <div key={item.product_id}><span>{item.name}<small>HSN {item.hsn_code || "Not set"}</small></span><strong>{item.quantity} × {money(item.price, order.currency)}</strong></div>)}</div><h4>Shipment history</h4>{events.length ? <div className="admin-order-list">{events.map((event, index) => <div key={`${event.event_time || event.created_at}-${index}`}><span>{event.shipment_status}<small>{event.activity || "Status update"}{event.location ? ` • ${event.location}` : ""}</small></span><strong>{new Date(event.event_time || event.created_at).toLocaleString("en-IN")}</strong></div>)}</div> : <p>No shipment events received yet.</p>}<button className="modal-close-btn" onClick={onClose}>Close</button></div></div>;
}

function Detail({ label, value }) { return <div><small>{label}</small><strong>{value || "—"}</strong></div>; }
