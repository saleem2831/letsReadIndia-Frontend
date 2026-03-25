import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import {
  getAdmins,
  createAdmin,
  updateAdminStatus,
  deleteAdmin,
} from "../../services/api";
import "../../styles/AdminsManagement.css";

// export default function Admins() {
//   const token = localStorage.getItem("token");

//   const [admins, setAdmins] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     load();
//   }, [page]);

//   const load = async () => {
//     const res = await getAdmins(page, token);
//     setAdmins(res.data);
//     setTotalPages(res.totalPages);
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password) {
//       return alert("All fields required");
//     }

//     await createAdmin({ ...form, role: "admin" }, token);

//     alert("Admin created");

//     setForm({ name: "", email: "", password: "" });

//     load();
//   };

//   const toggleStatus = async (id, status) => {
//     await updateAdminStatus(
//       id,
//       status === "active" ? "inactive" : "active",
//       token
//     );
//     load();
//   };

//   const remove = async (id) => {
//     if (!window.confirm("Delete admin?")) return;
//     await deleteAdmin(id, token);
//     load();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Admin Management</h1>

//       {/* CREATE ADMIN FORM */}
//       <form
//         onSubmit={handleCreate}
//         className="bg-white p-4 rounded-2xl shadow space-y-3"
//       >
//         <h2 className="text-lg font-semibold">Create New Admin</h2>

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full rounded"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
//           Create Admin
//         </button>
//       </form>

//       {/* ADMIN LIST */}
//       <div className="bg-white p-4 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold mb-4">Admins</h2>

//         {admins.length === 0 ? (
//           <p>No admins found</p>
//         ) : (
//           admins.map((a) => (
//             <div
//               key={a.id}
//               className="flex justify-between items-center border p-3 rounded-xl mb-2"
//             >
//               <div>
//                 <p className="font-medium">{a.name}</p>
//                 <p className="text-sm text-gray-500">{a.email}</p>
//               </div>

//               <div className="flex gap-2 items-center">
//                 <span
//                   className={`px-3 py-1 text-xs rounded-full ${
//                     a.status === "active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {a.status}
//                 </span>

//                 <button
//                   onClick={() => toggleStatus(a.id, a.status)}
//                   className="border px-3 py-1 rounded"
//                 >
//                   {a.status === "active" ? "Disable" : "Enable"}
//                 </button>

//                 <button
//                   onClick={() => remove(a.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}

//         {/* PAGINATION */}
//         <div className="flex gap-2 mt-4">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 border rounded ${
//                 page === i + 1 ? "bg-black text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Admins() {
  const token = localStorage.getItem("token");

  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  
  // Loading states
  const [createLoading, setCreateLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    load();
  }, [page]);

  const load = async () => {
    const res = await getAdmins(page, token);
    setAdmins(res.data);
  };

  const create = async () => {
    setCreateLoading(true);
    try {
      await createAdmin({ ...form, role: "admin" }, token);
      setToast({ message: "Admin created successfully!", duration: 3000 });
      setForm({ name: "", email: "", password: "" });
      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Creation failed"), duration: 3000 });
      console.error(error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleToggleStatus = async (adminId, currentStatus) => {
    setToggleLoading(adminId);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateAdminStatus(adminId, newStatus, token);
      setToast({ message: `Admin ${newStatus === "active" ? "enabled" : "disabled"} successfully!`, duration: 3000 });
      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Toggle failed"), duration: 3000 });
      console.error(error);
    } finally {
      setToggleLoading(null);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteAdmin(deleteId, token);
      setDeleteId(null);
      setToast({ message: "Admin deleted successfully!", duration: 3000 });
      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Delete failed"), duration: 3000 });
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="admins-page-wrapper">
      {toast && <Toast message={toast.message} duration={toast.duration} onClose={() => setToast(null)} />}
      <div className="admins-page-container">
        {/* HEADER */}
        <div className="admins-header">
          <h1 className="admins-page-title">👥 Admin Management</h1>
        </div>

        {/* CREATE FORM */}
        <div className="admins-form-card">
          <h2 className="form-title">➕ Create New Admin</h2>

          <div className="form-inputs-group">
            <input
              className="form-input-field"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="form-input-field"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="form-input-field"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button onClick={create} disabled={createLoading} className="form-button">
              {createLoading ? "⏳ Creating..." : "✅ Create Admin"}
            </button>
          </div>
        </div>

        {/* ADMINS TABLE */}
        <div className="admins-table-card">
          <div className="table-wrapper">
            <table className="admins-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <span className="admin-row-name">{a.name}</span>
                      <span className="admin-row-email">{a.email}</span>
                    </td>
                    <td className="admin-row-email">{a.email}</td>
                    <td>
                      <span
                        className={`status-badge-admin ${
                          a.status === "active"
                            ? "status-active-badge"
                            : "status-inactive-badge"
                        }`}
                      >
                        {a.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          onClick={() =>
                            handleToggleStatus(a.id, a.status)
                          }
                          disabled={toggleLoading === a.id}
                          className="action-btn-toggle"
                        >
                          {toggleLoading === a.id ? "⏳" : (a.status === "active" ? "Disable" : "Enable")}
                        </button>
                        <button
                          onClick={() => setDeleteId(a.id)}
                          disabled={toggleLoading === a.id || deleteLoading}
                          className="action-btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {admins.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      📭 No admins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="pagination-footer">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="pagination-button"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="pagination-button"
            >
              Next →
            </button>
          </div>
        </div>

        {/* DELETE CONFIRMATION MODAL */}
        {deleteId && (
          <div className="delete-confirmation-modal">
            <div className="modal-content">
              <h3 className="modal-title">⚠️ Delete Admin</h3>
              <p className="modal-message">
                Are you sure you want to delete this admin? This action cannot be undone.
              </p>
              
              <div className="modal-actions">
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="btn-confirm-delete"
                >
                  {deleteLoading ? "⏳ Deleting..." : "🗑️ Delete"}
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn-cancel-delete"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
