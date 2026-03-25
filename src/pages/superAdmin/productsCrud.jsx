

import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import {
  updateProductStatus,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/api";
import "../../styles/productsCrud.css";
import ImageSlider from "./ImageSlider";



const BASE_URL = "http://localhost:4000";


export default function ProductsCrud() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  // Loading states
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [toggleLoading, setToggleLoading] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================
  useEffect(() => {
    load();
  }, [page]);

  const load = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/products/admin/list?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setProducts(data.data || []);
      setTotalPages(data.totalPages || data.pages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // CREATE / UPDATE
  // ==========================================
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      if (editingId) {
        await updateProduct(editingId, formData, token);
        setToast({ message: "Product updated successfully!", duration: 3000 });
        setEditingId(null);
      } else {
        await createProduct(formData, token);
        setToast({ message: "Product created successfully!", duration: 3000 });
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: [],
      });

      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Operation failed"), duration: 3000 });
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // ==========================================
  // EDIT MODE
  // ==========================================
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: [],
    });
    window.scrollTo(0, 0);
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================
  const handleToggleStatus = async (productId, currentStatus) => {
    setToggleLoading(productId);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateProductStatus(productId, newStatus, token);
      setToast({ message: `Product ${newStatus === "active" ? "enabled" : "disabled"} successfully!`, duration: 3000 });
      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Toggle failed"), duration: 3000 });
      console.error(error);
    } finally {
      setToggleLoading(null);
    }
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================
  const confirmDelete = async () => {
    setDeleteLoading(deleteId);
    try {
      await deleteProduct(deleteId, token);
      setDeleteId(null);
      setToast({ message: "Product deleted successfully!", duration: 3000 });
      load();
    } catch (error) {
      setToast({ message: "Error: " + (error.message || "Delete failed"), duration: 3000 });
      console.error(error);
    } finally {
      setDeleteLoading(null);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="products-crud-page-wrapper">
      {toast && <Toast message={toast.message} duration={toast.duration} onClose={() => setToast(null)} />}
      <div className="products-crud-page-container">

        {/* HEADER */}
        <div className="products-crud-header">
          <h1 className="products-crud-main-title">🛍️ Products Management</h1>
          <p className="products-crud-subtitle">Manage your store products professionally</p>
        </div>

        {/* FORM CARD */}
        <div className="products-crud-form-card">
          <h2 className="products-crud-form-title">
            {editingId ? "✏️ Update Product" : "➕ Create Product"}
          </h2>

          <div className="products-crud-form-grid">
            <input
              className="products-crud-form-input"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="products-crud-form-input"
              placeholder="Price (₹)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              className="products-crud-form-input"
              placeholder="Stock Quantity"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <input
              type="file"
              multiple
              onChange={(e) =>
                setForm({ ...form, images: e.target.files })
              }
              className="products-crud-form-input file-input"
            />
          </div>

          <textarea
            rows="4"
            className="products-crud-form-textarea"
            placeholder="Product Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="products-crud-form-button-group">
            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              className="products-crud-form-submit-btn"
            >
              {submitLoading ? "⏳ Processing..." : (editingId ? "📝 Update Product" : "✅ Create Product")}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    images: [],
                  });
                }}
                className="products-crud-form-cancel-btn"
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="products-crud-table-card">
          <div className="products-crud-table-wrapper">
            <table className="products-crud-table">

              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => {
                  const images =
                    typeof p.images === "string"
                      ? JSON.parse(p.images)
                      : p.images || [];

                  return (
                    <tr key={p.id}>
                      <td data-label="Image">
                        {images.length > 0 ? (
                          <ImageSlider images={images} />
                        ) : (
                          <span className="no-image-text">
                            📭 No Image
                          </span>
                        )}
                      </td>

                      <td data-label="Name" className="product-name-cell">
                        {p.name}
                      </td>

                      <td data-label="Price" className="product-price-cell">
                        ₹{p.price}
                      </td>

                      <td data-label="Stock">
                        {p.stock}
                      </td>

                      <td data-label="Status">
                        <span
                          className={`products-crud-product-status ${
                            p.status === "active"
                              ? "products-crud-status-active"
                              : "products-crud-status-inactive"
                          }`}
                        >
                          {p.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                        </span>
                      </td>

                      <td data-label="Actions">
                        <div className="products-crud-product-actions">

                          <button
                            onClick={() =>
                              handleToggleStatus(p.id, p.status)
                            }
                            disabled={toggleLoading === p.id}
                            className="products-crud-btn-action products-crud-btn-toggle"
                          >
                            {toggleLoading === p.id ? "⏳" : (p.status === "active" ? "Disable" : "Enable")}
                          </button>

                          <button
                            onClick={() => handleEdit(p)}
                            disabled={submitLoading || toggleLoading === p.id || deleteLoading === p.id}
                            className="products-crud-btn-action products-crud-btn-edit"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setDeleteId(p.id)}
                            disabled={deleteLoading === p.id || submitLoading}
                            className="products-crud-btn-action products-crud-btn-delete"
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      📦 No products found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="pagination-section">
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

        {/* DELETE CONFIRMATION MODAL */}
        {deleteId && (
          <div className="delete-confirmation-modal">
            <div className="modal-content">
              <h3 className="modal-title">⚠️ Delete Product</h3>
              <p className="modal-message">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              
              <div className="modal-actions">
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading === deleteId}
                  className="btn-confirm-delete"
                >
                  {deleteLoading === deleteId ? "⏳ Deleting..." : "🗑️ Delete"}
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
