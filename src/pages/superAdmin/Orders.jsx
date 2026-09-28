import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  getAdmins,
  getAllOrderDetailsForSuperAdmin,
  getAllOrdersForSuperAdmin,
  SOCKET_URL,
} from "../../services/api";
import "../../styles/PlatformAdmin.css";
import "../../styles/PlatformAdminActions.css";
import "../../styles/SuperAdminOrders.css";

const money = (value, currency = "INR") => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: currency || "INR", maximumFractionDigits: 2,
}).format(Number(value || 0));

export default function SuperAdminOrders() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [shippingMode, setShippingMode] = useState("");
  const [adminId, setAdminId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const loadOrders = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      setError("");
      const result = await getAllOrdersForSuperAdmin({
        page, search, status, shipping_mode: shippingMode, admin_id: adminId,
      }, token);
      setOrders(result.data || []);
      setStats(result.stats || {});
      setPages(result.pages || 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [adminId, page, search, shippingMode, status, token]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  useEffect(() => {
    getAdmins(1, token, 100).then((result) => setAdmins(result.data || [])).catch(() => {});
  }, [token]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { auth: { token }, transports: ["websocket", "polling"] });
    socket.on("connect", () => setLive(true));
    socket.on("disconnect", () => setLive(false));
    socket.on("connect_error", () => setLive(false));
    socket.on("orders:changed", () => loadOrders(false));
    const fallback = window.setInterval(() => loadOrders(false), 30000);
    return () => { window.clearInterval(fallback); socket.disconnect(); };
  }, [loadOrders, token]);

  const openDetails = async (orderId) => {
    setDetailsLoading(true);
    try {
      setDetails(await getAllOrderDetailsForSuperAdmin(orderId, token));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  return <div className="platform-admin orders-ops-page">
    <header>
      <div><span>Super Admin</span><h1>All Orders</h1><p>Complete domestic and international order visibility across every manager.</p></div>
      <strong className={live ? "orders-live" : "orders-offline"}>{live ? "● Live" : "○ Reconnecting"}</strong>
    </header>

    <div className="orders-ops-summary">
      <Summary label="Total orders" value={stats.total_orders} />
      <Summary label="Pending" value={stats.pending} />
      <Summary label="Assigned" value={stats.assigned} />
      <Summary label="Shipped" value={stats.shipped} />
      <Summary label="Delivered" value={stats.delivered} />
      <Summary label="International" value={stats.international_orders} />
      <Summary label="Order value" value={money(stats.total_value)} />
    </div>

    <div className="orders-ops-filters">
      <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={(event) => {
        if (event.key === "Enter") { setPage(1); setSearch(searchInput.trim()); }
      }} placeholder="Order, customer, email or phone" />
      <button onClick={() => { setPage(1); setSearch(searchInput.trim()); }}>Search</button>
      <select value={adminId} onChange={(event) => { setPage(1); setAdminId(event.target.value); }}><option value="">All managers</option>{admins.map((admin) => <option key={admin.id} value={admin.id}>{admin.name}</option>)}</select>
      <select value={status} onChange={(event) => { setPage(1); setStatus(event.target.value); }}><option value="">All statuses</option><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option></select>
      <select value={shippingMode} onChange={(event) => { setPage(1); setShippingMode(event.target.value); }}><option value="">All shipping</option><option value="domestic">Domestic</option><option value="international">International</option></select>
    </div>

    {error && <p className="admin-error">{error}</p>}
    <div className="admin-table-wrap orders-ops-table"><table><thead><tr><th>Order</th><th>Customer</th><th>Manager</th><th>Delivery</th><th>Amount</th><th>Order status</th><th>Shipment</th><th>Date</th><th>Details</th></tr></thead><tbody>
      {loading ? <tr><td colSpan="9">Loading orders…</td></tr> : orders.map((order) => <tr key={order.id}>
        <td><strong>{order.order_number}</strong><small>{order.total_quantity} item(s)</small></td>
        <td><strong>{order.customer_name}</strong><small>{order.email}<br />{order.phone}</small></td>
        <td>{order.assigned_admin_name || <span className="orders-unassigned">Unassigned</span>}<small>{order.assigned_admin_email}</small></td>
        <td><span className={`orders-mode ${order.shipping_mode}`}>{order.shipping_mode}</span><small>{order.city}, {order.country}<br />{order.pincode}</small></td>
        <td><strong>{money(order.total, order.currency)}</strong><small>Delivery {money(order.delivery_fee, order.currency)}{Number(order.discount_amount) > 0 ? <><br />Discount {money(order.discount_amount, order.currency)}</> : null}</small></td>
        <td><span className={`orders-status ${order.status}`}>{order.status}</span></td>
        <td>{order.shipment_status || "Not created"}<small>{order.courier_name}<br />{order.waybill ? `AWB ${order.waybill}` : ""}</small></td>
        <td>{new Date(order.created_at).toLocaleDateString("en-IN")}<small>{new Date(order.created_at).toLocaleTimeString("en-IN")}</small></td>
        <td><button className="small" disabled={detailsLoading} onClick={() => openDetails(order.id)}>View all</button></td>
      </tr>)}
      {!loading && !orders.length && <tr><td colSpan="9">No orders match these filters.</td></tr>}
    </tbody></table></div>
    <div className="admin-pages"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage((value) => value + 1)}>Next</button></div>

    {details && <OrderDetails data={details} onClose={() => setDetails(null)} />}
  </div>;
}

function Summary({ label, value }) {
  return <div><small>{label}</small><strong>{value ?? 0}</strong></div>;
}

function OrderDetails({ data, onClose }) {
  const { order, items = [], events = [] } = data;
  return <div className="admin-modal-bg" onClick={onClose}><div className="admin-modal orders-detail-modal" onClick={(event) => event.stopPropagation()}>
    <button className="modal-x" onClick={onClose}>×</button><h2>{order.order_number}</h2><p>Complete order, payment, delivery and shipment information.</p>
    <div className="detail-grid">
      <Detail label="Customer" value={order.customer_name} /><Detail label="Email" value={order.email} /><Detail label="Phone" value={order.phone} /><Detail label="Manager" value={order.assigned_admin_name || "Unassigned"} />
      <Detail label="Address" value={`${order.address}, ${order.city}, ${order.state}, ${order.country} ${order.pincode}`} /><Detail label="Shipping" value={`${order.shipping_mode} • ${order.courier_name || "Not selected"}`} />
      <Detail label="Subtotal" value={money(order.subtotal, order.currency)} /><Detail label="Discount" value={money(order.discount_amount, order.currency)} /><Detail label="Delivery fee" value={money(order.delivery_fee, order.currency)} /><Detail label="Total paid" value={money(order.total, order.currency)} />
      <Detail label="Payment" value={`${order.payment_status} • ${order.payment_id || "No payment ID"}`} /><Detail label="Razorpay order" value={order.razorpay_order_id || "Not available"} />
      <Detail label="Order status" value={order.status} /><Detail label="Shipment status" value={order.shipment_status || "Not created"} /><Detail label="AWB" value={order.waybill || "Not assigned"} /><Detail label="Estimated delivery" value={order.estimated_delivery_days ? `${order.estimated_delivery_days} days` : "Not available"} />
    </div>
    <h3>Items</h3><div className="orders-detail-list">{items.map((item) => <div key={item.id}><span>{item.name}<small>Product {item.product_id} • HSN {item.hsn_code || "Not set"}</small></span><strong>{item.quantity} × {money(item.price, order.currency)}</strong></div>)}</div>
    <h3>Shipment history</h3>{events.length ? <div className="orders-detail-list">{events.map((event) => <div key={event.id}><span>{event.shipment_status}<small>{event.activity || "Status update"}{event.location ? ` • ${event.location}` : ""}</small></span><strong>{new Date(event.event_time || event.created_at).toLocaleString("en-IN")}</strong></div>)}</div> : <p>No shipment events received yet.</p>}
  </div></div>;
}

function Detail({ label, value }) {
  return <div><small>{label}</small><strong>{value || "—"}</strong></div>;
}
