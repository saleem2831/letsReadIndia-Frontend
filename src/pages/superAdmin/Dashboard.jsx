
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import {
  getProducts,
  getAdmins,
  createAdmin,
  updateAdminStatus,
  deleteAdmin,
  updateAdmin,
} from "../../services/api";
import "../../styles/SuperAdminDashboard.css";

export default function SuperAdminPage() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({ products: 0, admins: 0 });
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // delete reassignment
  const [deleteId, setDeleteId] = useState(null);
  const [reassignAdminId, setReassignAdminId] = useState("");

  // Loading states
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadAll();
  }, [page]);

  const loadAll = async () => {
    const products = await getProducts();
    const res = await getAdmins(page, token);

    setStats({
      products: products.length,
      admins: res.data.length,
    });

    setAdmins(res.data);
    setTotalPages(res.totalPages || res.pages || 1);
  };

  // CREATE OR UPDATE ADMIN
  const handleSubmit = async () => {
    if (!editingId && !form.password) {
      setToast({ message: "Password is required to create admin", duration: 3000 });
      return;
    }

    setSubmitLoading(true);
    try {
      if (editingId) {
        await updateAdmin(editingId, form, token);
        setToast({ message: "Admin updated successfully!", duration: 3000 });
      } else {
        await createAdmin({ ...form, role: "admin" }, token);
        setToast({ message: "Admin created successfully!", duration: 3000 });
      }

      setForm({ name: "", email: "", password: "" });
      setEditingId(null);
      loadAll();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Operation failed"), duration: 3000 });
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // DELETE ADMIN WITH REASSIGN
  const confirmDelete = async () => {
    if (!reassignAdminId) {
      setToast({ message: "Please select an admin to reassign orders!", duration: 3000 });
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await deleteAdmin(deleteId, reassignAdminId, token);

      if (res.success) {
        setDeleteId(null);
        setReassignAdminId("");
        setToast({ message: "Admin deleted successfully!", duration: 3000 });
        loadAll();
      } else {
        setToast({ message: res.message || "Delete failed", duration: 3000 });
      }
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Delete failed"), duration: 3000 });
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (admin) => {
    setToggleLoading(admin.id);
    try {
      const newStatus = admin.status === "active" ? "inactive" : "active";
      await updateAdminStatus(admin.id, newStatus, token);
      setToast({ message: `Admin ${newStatus === "active" ? "enabled" : "disabled"} successfully!`, duration: 3000 });
      loadAll();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Toggle failed"), duration: 3000 });
      console.error(error);
    } finally {
      setToggleLoading(null);
    }
  };

  // EDIT CLICK
  const startEdit = (admin) => {
    setEditingId(admin.id);
    setForm({ name: admin.name, email: admin.email, password: "" });
    window.scrollTo(0, 0);
  };

  return (
    <div className="super-admin-dashboard-wrapper">
      {toast && <Toast message={toast.message} duration={toast.duration} onClose={() => setToast(null)} />}
      <div className="super-admin-dashboard-container">
        {/* HEADER */}
        <div className="super-admin-dashboard-header">
          <h1 className="super-admin-dashboard-title">Super Admin Dashboard</h1>
        </div>

        {/* STATS */}
        <div className="super-admin-dashboard-stats-grid">
          <StatCard title="🛍️ Total Products" value={stats.products} />
          <StatCard title="👥 Total Admins" value={stats.admins} />
        </div>

        {/* CREATE / EDIT FORM */}
        <div className="super-admin-dashboard-create-admin-card">
          <h2 className="super-admin-dashboard-form-title">
            {editingId ? "✏️ Edit Admin" : "➕ Create New Admin"}
          </h2>

          <div className="super-admin-dashboard-form-grid">
            <input
              className="super-admin-dashboard-form-input"
              placeholder="Admin Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="super-admin-dashboard-form-input"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="super-admin-dashboard-password-wrapper">
              <input
                className="super-admin-dashboard-form-input"
                placeholder={
                  editingId ? "Password (leave blank to keep same)" : "Password *"
                }
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="super-admin-dashboard-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="super-admin-dashboard-form-button-group">
            <button onClick={handleSubmit} disabled={submitLoading} className="super-admin-dashboard-submit-btn">
              {submitLoading ? "⏳ Processing..." : (editingId ? "📝 Update Admin" : "✅ Create Admin")}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", email: "", password: "" });
                }}
                className="super-admin-dashboard-cancel-btn"
              >
                ✖️ Cancel
              </button>
            )}
          </div>
        </div>

        {/* ADMIN TABLE */}
        <div className="super-admin-dashboard-admin-table-card">
          <div className="super-admin-dashboard-table-header">
            <h2 className="super-admin-dashboard-table-header-title">Admin Management</h2>
          </div>

          <table className="super-admin-dashboard-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Pending</th>
                <th>Assigned</th>
                <th>Shipped</th>
                <th>Delivered</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="super-admin-dashboard-admin-name">{a.name}</div>
                    <div className="super-admin-dashboard-admin-email">{a.email}</div>
                  </td>
                  <td className="super-admin-dashboard-admin-email">{a.email}</td>
                  <td>{a.total_orders}</td>
                  <td>{a.pending_orders}</td>
                  <td>{a.assigned_orders}</td>
                  <td>{a.shipped_orders}</td>
                  <td>{a.delivered_orders}</td>
                  <td>₹ {Number(a.total_order_value || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <span
                      className={`super-admin-dashboard-status-badge ${
                        a.status === "active"
                          ? "super-admin-dashboard-status-active"
                          : "super-admin-dashboard-status-inactive"
                      }`}
                    >
                      {a.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="super-admin-dashboard-table-actions">
                      <button
                        onClick={() => toggleStatus(a)}
                        disabled={toggleLoading === a.id}
                        className="super-admin-dashboard-action-btn super-admin-dashboard-btn-toggle"
                      >
                        {toggleLoading === a.id ? "⏳" : (a.status === "active" ? "Disable" : "Enable")}
                      </button>

                      <button
                        onClick={() => startEdit(a)}
                        disabled={submitLoading || toggleLoading === a.id}
                        className="super-admin-dashboard-action-btn super-admin-dashboard-btn-edit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(a.id)}
                        disabled={submitLoading || toggleLoading === a.id}
                        className="super-admin-dashboard-action-btn super-admin-dashboard-btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {admins.length === 0 && (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "2rem" }}>
                    <span style={{ color: "#999", fontSize: "1.1rem" }}>📭 No admins found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="super-admin-dashboard-pagination-controls">
            <div className="super-admin-dashboard-pagination-buttons">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="super-admin-dashboard-pagination-btn"
              >
                ← Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="super-admin-dashboard-pagination-btn"
              >
                Next →
              </button>
            </div>

            <span className="super-admin-dashboard-pagination-info">
              Page {page} of {totalPages}
            </span>
          </div>
        </div>

        {/* DELETE CONFIRMATION MODAL */}
        {deleteId && (
          <div className="super-admin-dashboard-delete-modal">
            <div className="super-admin-dashboard-delete-modal-content">
              <h3 className="super-admin-dashboard-delete-modal-title">⚠️ Reassign Orders Before Delete</h3>

              <select
                className="super-admin-dashboard-delete-select"
                value={reassignAdminId}
                onChange={(e) => setReassignAdminId(e.target.value)}
              >
                <option value="">📌 Select Admin to Reassign</option>
                {admins
                  .filter((a) => a.id !== deleteId)
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
              </select>

              <button 
                onClick={confirmDelete} 
                disabled={deleteLoading || !reassignAdminId}
                className="btn-confirm"
              >
                ✅ Confirm Delete
              </button>

              <button
                onClick={() => {
                  setDeleteId(null);
                  setReassignAdminId("");
                }}
                className="btn-close-modal"
              >
                ❌ Cancel
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