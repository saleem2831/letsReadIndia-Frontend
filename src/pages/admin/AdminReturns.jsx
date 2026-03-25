// import { useEffect, useState } from "react";
// import { getReturns, updateReturnStatus } from "../../services/api";

// export default function AdminReturns() {
//   const [returns, setReturns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReturns();
//   }, []);

//   const fetchReturns = async () => {
//     try {
//       const data = await getReturns();
//       setReturns(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (id, status) => {
//     await updateReturnStatus(id, status);
//     fetchReturns();
//   };

//   if (loading) return <p>Loading returns...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📦 Return Requests</h2>

//       {returns.length === 0 && <p>No return requests found.</p>}

//       {returns.map((r) => (
//         <div
//           key={r.id}
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//           }}
//         >
//           <p><strong>Order:</strong> {r.order_number}</p>
//           <p><strong>Product:</strong> {r.product_name}</p>
//           <p><strong>Quantity:</strong> {r.quantity}</p>
//           <p><strong>Reason:</strong> {r.reason}</p>
//           <p><strong>Status:</strong> {r.status}</p>

//           {r.status === "pending" && (
//             <div style={{ marginTop: "10px" }}>
//               <button
//                 onClick={() => handleUpdate(r.id, "approved")}
//                 style={{ marginRight: "10px" }}
//               >
//                 ✅ Approve
//               </button>

//               <button
//                 onClick={() => handleUpdate(r.id, "rejected")}
//               >
//                 ❌ Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getReturns, updateReturnStatus, schedulePickup } from "../../services/api";

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const data = await getReturns();
      setReturns(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateReturnStatus(id, status);
      fetchReturns();
    } catch (err) {
      console.error(err);
      alert("Error updating return");
    }
  };

  const handleSchedulePickup = async (id) => {
  try {
    await schedulePickup(id);
    fetchReturns(); // refresh list
  } catch (err) {
    console.error(err);
  }
};


  const getStatusStyle = (status) => {
    switch (status) {
      case "requested":
        return { background: "#fff3cd", color: "#856404" };
      case "approved":
        return { background: "#d4edda", color: "#155724" };
      case "pickup_scheduled":
        return { background: "#d1ecf1", color: "#0c5460" };
      case "picked_up":
        return { background: "#cce5ff", color: "#004085" };
      case "refunded":
        return { background: "#e2e3e5", color: "#383d41" };
      case "rejected":
        return { background: "#f8d7da", color: "#721c24" };
      default:
        return {};
    }
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>Loading return requests...</h3>
      </div>
    );

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "25px" }}>📦 Return Requests</h2>

      {returns.length === 0 && (
        <div
          style={{
            padding: "40px",
            background: "#fff",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          No return requests found.
        </div>
      )}

      {returns.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h4 style={{ margin: 0 }}>Order #{r.order_number}</h4>

            <span
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                ...getStatusStyle(r.status),
              }}
            >
              {r.status}
            </span>
          </div>

          <p><strong>Product:</strong> {r.product_name}</p>
          <p><strong>Quantity:</strong> {r.quantity}</p>
          <p><strong>Reason:</strong> {r.reason}</p>
          <p><strong>Date:</strong> {new Date(r.created_at).toLocaleString()}</p>
         

          {r.status === "requested" && (
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => handleUpdate(r.id, "approved")}
                style={{
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                ✅ Approve
              </button>

              <button
                onClick={() => handleUpdate(r.id, "rejected")}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ❌ Reject
              </button>
            </div>
          )}

           {r.status === "approved" && (
  <button onClick={() => handleSchedulePickup(r.id)}>
    🚚 Schedule Pickup
  </button>
)}

        </div>
      ))}
    </div>
  );
}
