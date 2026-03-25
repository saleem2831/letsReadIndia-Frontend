import { useState } from "react";
import { getCustomerOrder, downloadInvoice,requestReturn,getCustomerReturnOrder } from "../../services/api";
import "../../styles/CustomerDashboard.css";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await getCustomerOrder(orderNumber);

      if (res.message) {
        setError(res.message);
        setData(null);
      } else {
        setData(res);
      }
    } catch {
      setError("Order not found. Please check your order number.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };



const fetchOrder = async () => {
  const result = await getCustomerOrder(orderNumber);
  setData(result);
};

const handleReturn = async (orderId, orderItemId) => {
  try {
    await requestReturn({
      orderId,
      orderItemId,
      reason: "Size issue"
    });

    alert("Return submitted");

    // 🔥 VERY IMPORTANT
    await fetchOrder();   // call track-order again

  } catch (err) {
    console.error(err);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };



  const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "pending";
    case "assigned":
    case "confirmed":
    case "processing":
      return "confirmed";
    case "shipped":
    case "in transit":
      return "shipped";
    case "delivered":
      return "delivered";
    case "cancelled":
      return "cancelled";
    default:
      return "";
  }
};

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">📦 Track Your Order</h1>
          <p className="dashboard-subtitle">Enter your order number below to check status</p>
        </div>

        {/* SEARCH SECTION */}
        <div className="search-section">
          <label className="search-label">Order Number</label>
          <div className="search-input-group">
            <input
              className="search-input"
              placeholder="Enter Order Number (e.g., ORD-12345)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              className="search-btn"
              disabled={loading || !orderNumber.trim()}
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </div>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="error-message">
            <span className="error-icon">❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* ORDER DETAILS */}
        {data && (
          <div className="order-card">
            {/* ORDER HEADER */}
            <div className="order-header">
              <div className="order-number">
                <span className="order-number-icon">#</span>
                {data.order.order_number}
              </div>
            </div>

        

            <div className="status-grid">
  {/* ORDER STATUS */}
  <div className="status-item">
    <div className="status-label">
      <span className="status-label-icon">📋</span>
      Order Status
    </div>
    <div className={`status-value ${getStatusColor(data.order?.status)}`}>
      {data.order?.status || "—"}
    </div>
  </div>

  {/* PAYMENT STATUS */}
  <div className="status-item">
    <div className="status-label">
      <span className="status-label-icon">💳</span>
      Payment Status
    </div>
    <div className={`status-value ${getStatusColor(data.order?.payment_status)}`}>
      {data.order?.payment_status || "—"}
    </div>
  </div>

  {/* SHIPMENT STATUS */}
  <div className="status-item">
    <div className="status-label">
      <span className="status-label-icon">🚚</span>
      Shipment Status
    </div>
    <div className={`status-value ${getStatusColor(data.order?.shipment_status)}`}>
      {data.order?.shipment_status || "—"}
    </div>
  </div>

  {/* ORDER DATE */}
  <div className="status-item">
    <div className="status-label">
      <span className="status-label-icon">📅</span>
      Order Date
    </div>
    <div className="status-value">
      {data.order?.created_at
        ? new Date(data.order.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—"}
    </div>
  </div>

  {/* TRACKING ID */}
  {data.order?.waybill && (
    <div className="status-item">
      <div className="status-label">
        <span className="status-label-icon">🔎</span>
        Tracking ID
      </div>
      <div className="status-value shipped">
        {data.order.waybill}
      </div>
    </div>
  )}

  {/* COURIER */}
  {data.order?.courier_name && (
    <div className="status-item">
      <div className="status-label">
        <span className="status-label-icon">🚛</span>
        Courier
      </div>
      <div className="status-value shipped">
        {data.order.courier_name}
      </div>
    </div>
  )}
</div>


            {/* ORDER TOTAL */}
            <div className="order-total">
              <div className="total-label">Total Amount</div>
              <div className="total-amount">
                ₹ {Number(data.order.total).toLocaleString("en-IN")}
              </div>
            </div>
            {/* RETURN & REFUND DETAILS */}
{data.return && (
  <div className="order-total" style={{ marginTop: "20px" }}>
    <div className="total-label">Return Status</div>

    <div className={`status-value ${getStatusColor(data.return.status)}`}>
      {data.return.status}
    </div>

    {data.return.status === "refunded" && (
      <>
        <div style={{ marginTop: "10px" }}>
          <strong>Refund Amount:</strong> ₹{" "}
          {Number(data.return.refund_amount).toLocaleString("en-IN")}
        </div>

        <div>
          <strong>Refunded On:</strong>{" "}
          {new Date(data.return.refunded_at).toLocaleDateString("en-IN")}
        </div>
      </>
    )}
  </div>
)}


            {/* ORDER ITEMS */}
            <div className="items-section">
              <h3 className="items-title">
                <span className="items-title-icon">📚</span>
                Order Items
              </h3>
              <div className="items-list">

{data.items?.length > 0 ? (
  data.items.map((item) => (
    <div key={item.id} className="item-card">
      <div className="item-info">
        <div className="item-name">{item.name}</div>
        <div className="item-quantity">
          Qty: {item.quantity}
        </div>
      </div>

      <div className="item-price1">
        ₹ {Number(item.total || item.price * item.quantity).toLocaleString("en-IN")}
      </div>

      {/* RETURN BUTTON */}
{/* {!data?.return &&
 data?.order?.status?.toLowerCase() === "delivered" &&
 data?.order?.delivered_at &&
 new Date() - new Date(data.order.delivered_at) <=
   10 * 24 * 60 * 60 * 1000 && (
    <button
      className="return-btn"
      onClick={() =>
        handleReturn(data.order.id, item.id)
      }
    >
      🔄 Request Return
    </button>
)} */}
    </div>
  ))
) : (
  <div className="no-items">
    No items found for this order.
  </div>
)}


              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
  <button
    onClick={() => downloadInvoice(data.order.order_number)}
    className="download-btn"
  >
    📄 Download Invoice
  </button>

  {/* {data.tracking_url && (
    <a
      href={data.tracking_url}
      target="_blank"
      rel="noopener noreferrer"
      className="download-btn"
      style={{ background: "#2563eb" }}
    >
      🚚 Track Shipment
    </a>
  )} */}


  {/* RETURN & REFUND STATUS */}
{/* {data.return && (
  <div className="refund-card">
    <h3 className="refund-title">
      🔄 Return & Refund Details
    </h3>

    <div className="status-grid">
      {/* RETURN STATUS */}
      {/* <div className="status-item">
        <div className="status-label">
          📦 Return Status
        </div>
        <div className={`status-value ${getStatusColor(data.return.status)}`}>
          {data.return.status}
        </div>
      </div> */}

      {/* REFUND STATUS */}
      {/* <div className="status-item">
        <div className="status-label">
          💰 Refund Status
        </div>
        <div className={`status-value ${getStatusColor(data.return.refund_status)}`}>
          {data.return.refund_status || "Pending"}
        </div>
      </div> */}

      {/* REFUND AMOUNT */}
      {/* {data.return.refund_amount && (
        <div className="status-item">
          <div className="status-label">
            💵 Refund Amount
          </div>
          <div className="status-value delivered">
            ₹ {Number(data.return.refund_amount).toLocaleString("en-IN")}
          </div>
        </div>
      )} */}

      {/* REFUND DATE */}
      {/* {data.return.refunded_at && (
        <div className="status-item">
          <div className="status-label">
            📅 Refunded On
          </div>
          <div className="status-value">
            {new Date(data.return.refunded_at).toLocaleDateString("en-IN")}
          </div>
        </div>
      )} */}
    {/* </div>
  </div>
)} */}

{/* {data?.return && (
  <div className="order-total" style={{ marginTop: "20px" }}>
    <div className="total-label">Return Status</div>

    <div className={`status-value ${getStatusColor(data.return.status)}`}>
      {data.return.status}
    </div>

    {data.return.status === "refunded" && (
      <div>
        Refund Amount: ₹ {data.return.refund_amount}
      </div>
    )}
  </div>
)} */}

</div>

          </div>
        )}
      </div>
    </div>

    
  );
}
