

// import { useEffect, useState } from "react";
// import Toast from "../../components/Toast";
// import {
//   updateProductStatus,
//   deleteProduct,
//   createProduct,
//   updateProduct,
// } from "../../services/api";
// import "../../styles/productsCrud.css";
// import ImageSlider from "./ImageSlider";



// const BASE_URL = "http://localhost:4000";
// // const BASE_URL = "https://api.letsreadindia.in/";



// export default function ProductsCrud() {
//   const token = localStorage.getItem("token");

//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     images: [],
//   });

//   // Loading states
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(null);
//   const [toggleLoading, setToggleLoading] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [toast, setToast] = useState(null);

//   // ==========================================
//   // LOAD PRODUCTS
//   // ==========================================
//   useEffect(() => {
//     load();
//   }, [page]);

//   const load = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/products/admin/list?page=${page}`,
//         // "https://api.letsreadindia.in/api/products/admin/list?page=${page}",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = await res.json();
//       setProducts(data.data || []);
//       setTotalPages(data.totalPages || data.pages || 1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ==========================================
//   // CREATE / UPDATE
//   // ==========================================
//   const handleSubmit = async () => {
//     setSubmitLoading(true);
//     try {
//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       formData.append("price", form.price);
//       formData.append("stock", form.stock);

//       for (let i = 0; i < form.images.length; i++) {
//         formData.append("images", form.images[i]);
//       }

//       if (editingId) {
//         await updateProduct(editingId, formData, token);
//         setToast({ message: "Product updated successfully!", duration: 3000 });
//         setEditingId(null);
//       } else {
//         await createProduct(formData, token);
//         setToast({ message: "Product created successfully!", duration: 3000 });
//       }

//       setForm({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         images: [],
//       });

//       load();
//     } catch (error) {
//       setToast({ message: "Error: " + (error.message || "Operation failed"), duration: 3000 });
//       console.error(error);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // ==========================================
//   // EDIT MODE
//   // ==========================================
//   const handleEdit = (product) => {
//     setEditingId(product.id);
//     setForm({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//       images: [],
//     });
//     window.scrollTo(0, 0);
//   };

//   // ==========================================
//   // TOGGLE STATUS
//   // ==========================================
//   const handleToggleStatus = async (productId, currentStatus) => {
//     setToggleLoading(productId);
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       await updateProductStatus(productId, newStatus, token);
//       setToast({ message: `Product ${newStatus === "active" ? "enabled" : "disabled"} successfully!`, duration: 3000 });
//       load();
//     } catch (error) {
//       setToast({ message: "Error: " + (error.message || "Toggle failed"), duration: 3000 });
//       console.error(error);
//     } finally {
//       setToggleLoading(null);
//     }
//   };

//   // ==========================================
//   // DELETE PRODUCT
//   // ==========================================
//   const confirmDelete = async () => {
//     setDeleteLoading(deleteId);
//     try {
//       await deleteProduct(deleteId, token);
//       setDeleteId(null);
//       setToast({ message: "Product deleted successfully!", duration: 3000 });
//       load();
//     } catch (error) {
//       setToast({ message: "Error: " + (error.message || "Delete failed"), duration: 3000 });
//       console.error(error);
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   // ==========================================
//   // RENDER
//   // ==========================================
//   return (
//     <div className="products-crud-page-wrapper">
//       {toast && <Toast message={toast.message} duration={toast.duration} onClose={() => setToast(null)} />}
//       <div className="products-crud-page-container">

//         {/* HEADER */}
//         <div className="products-crud-header">
//           <h1 className="products-crud-main-title">🛍️ Products Management</h1>
//           <p className="products-crud-subtitle">Manage your store products professionally</p>
//         </div>

//         {/* FORM CARD */}
//         <div className="products-crud-form-card">
//           <h2 className="products-crud-form-title">
//             {editingId ? "✏️ Update Product" : "➕ Create Product"}
//           </h2>

//           <div className="products-crud-form-grid">
//             <input
//               className="products-crud-form-input"
//               placeholder="Product Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               className="products-crud-form-input"
//               placeholder="Price (₹)"
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//             />

//             <input
//               className="products-crud-form-input"
//               placeholder="Stock Quantity"
//               type="number"
//               value={form.stock}
//               onChange={(e) => setForm({ ...form, stock: e.target.value })}
//             />

//             <input
//               type="file"
//               multiple
//               onChange={(e) =>
//                 setForm({ ...form, images: e.target.files })
//               }
//               className="products-crud-form-input file-input"
//             />
//           </div>

//           <textarea
//             rows="4"
//             className="products-crud-form-textarea"
//             placeholder="Product Description"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <div className="products-crud-form-button-group">
//             <button
//               onClick={handleSubmit}
//               disabled={submitLoading}
//               className="products-crud-form-submit-btn"
//             >
//               {submitLoading ? "⏳ Processing..." : (editingId ? "📝 Update Product" : "✅ Create Product")}
//             </button>
//             {editingId && (
//               <button
//                 onClick={() => {
//                   setEditingId(null);
//                   setForm({
//                     name: "",
//                     description: "",
//                     price: "",
//                     stock: "",
//                     images: [],
//                   });
//                 }}
//                 className="products-crud-form-cancel-btn"
//               >
//                 ❌ Cancel
//               </button>
//             )}
//           </div>
//         </div>

//         {/* TABLE CARD */}
//         <div className="products-crud-table-card">
//           <div className="products-crud-table-wrapper">
//             <table className="products-crud-table">

//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>Stock</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {products.map((p) => {
//                   const images =
//                     typeof p.images === "string"
//                       ? JSON.parse(p.images)
//                       : p.images || [];

//                   return (
//                     <tr key={p.id}>
//                       <td data-label="Image">
//                         {images.length > 0 ? (
//                           <ImageSlider images={images} />
//                         ) : (
//                           <span className="no-image-text">
//                             📭 No Image
//                           </span>
//                         )}
//                       </td>

//                       <td data-label="Name" className="product-name-cell">
//                         {p.name}
//                       </td>

//                       <td data-label="Price" className="product-price-cell">
//                         ₹{p.price}
//                       </td>

//                       <td data-label="Stock">
//                         {p.stock}
//                       </td>

//                       <td data-label="Status">
//                         <span
//                           className={`products-crud-product-status ${
//                             p.status === "active"
//                               ? "products-crud-status-active"
//                               : "products-crud-status-inactive"
//                           }`}
//                         >
//                           {p.status === "active" ? "🟢 Active" : "🔴 Inactive"}
//                         </span>
//                       </td>

//                       <td data-label="Actions">
//                         <div className="products-crud-product-actions">

//                           <button
//                             onClick={() =>
//                               handleToggleStatus(p.id, p.status)
//                             }
//                             disabled={toggleLoading === p.id}
//                             className="products-crud-btn-action products-crud-btn-toggle"
//                           >
//                             {toggleLoading === p.id ? "⏳" : (p.status === "active" ? "Disable" : "Enable")}
//                           </button>

//                           <button
//                             onClick={() => handleEdit(p)}
//                             disabled={submitLoading || toggleLoading === p.id || deleteLoading === p.id}
//                             className="products-crud-btn-action products-crud-btn-edit"
//                           >
//                             Edit
//                           </button>

//                           <button
//                             onClick={() => setDeleteId(p.id)}
//                             disabled={deleteLoading === p.id || submitLoading}
//                             className="products-crud-btn-action products-crud-btn-delete"
//                           >
//                             Delete
//                           </button>

//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//                 {products.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="empty-row">
//                       📦 No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>

//             </table>
//           </div>

//           {/* PAGINATION */}
//           <div className="pagination-section">
//             <div className="pagination-buttons">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="pagination-btn"
//               >
//                 ← Prev
//               </button>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="pagination-btn"
//               >
//                 Next →
//               </button>
//             </div>

//             <span className="pagination-info">
//               Page {page} of {totalPages}
//             </span>
//           </div>

//         </div>

//         {/* DELETE CONFIRMATION MODAL */}
//         {deleteId && (
//           <div className="delete-confirmation-modal">
//             <div className="modal-content">
//               <h3 className="modal-title">⚠️ Delete Product</h3>
//               <p className="modal-message">
//                 Are you sure you want to delete this product? This action cannot be undone.
//               </p>
              
//               <div className="modal-actions">
//                 <button
//                   onClick={confirmDelete}
//                   disabled={deleteLoading === deleteId}
//                   className="btn-confirm-delete"
//                 >
//                   {deleteLoading === deleteId ? "⏳ Deleting..." : "🗑️ Delete"}
//                 </button>
//                 <button
//                   onClick={() => setDeleteId(null)}
//                   className="btn-cancel-delete"
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import Toast from "../../components/Toast";
// import {
//   updateProductStatus,
//   deleteProduct,
//   createProduct,
//   updateProduct,
// } from "../../services/api";
// import "../../styles/productsCrud.css";
// import ImageSlider from "./ImageSlider";

// // ============================================================
// // API BASE URL
// // ============================================================

// const BASE_URL = "http://localhost:4000";
// // const BASE_URL = "https://api.letsreadindia.in";

// // ============================================================
// // EMPTY FORM
// // ============================================================

// const EMPTY_FORM = {
//   name: "",
//   description: "",
//   price: "",
//   stock: "",
//   existingImages: [],
//   newImages: [],
// };

// // ============================================================
// // PRODUCTS CRUD
// // ============================================================

// export default function ProductsCrud() {
//   const token = localStorage.getItem("token");

//   // ==========================================================
//   // PRODUCTS
//   // ==========================================================

//   const [products, setProducts] = useState([]);

//   const [page, setPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(1);

//   // ==========================================================
//   // EDITING
//   // ==========================================================

//   const [editingId, setEditingId] = useState(null);

//   // ==========================================================
//   // FORM
//   // ==========================================================

//   const [form, setForm] = useState({
//     ...EMPTY_FORM,
//     existingImages: [],
//     newImages: [],
//   });

//   // ==========================================================
//   // LOADING STATES
//   // ==========================================================

//   const [submitLoading, setSubmitLoading] = useState(false);

//   const [deleteLoading, setDeleteLoading] = useState(null);

//   const [toggleLoading, setToggleLoading] = useState(null);

//   // ==========================================================
//   // DELETE MODAL
//   // ==========================================================

//   const [deleteId, setDeleteId] = useState(null);

//   // ==========================================================
//   // TOAST
//   // ==========================================================

//   const [toast, setToast] = useState(null);

//   // ==========================================================
//   // LOAD PRODUCTS
//   // ==========================================================

//   useEffect(() => {
//     load();
//   }, [page]);

//   const load = async () => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/api/products/admin/list?page=${page}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to load products");
//       }

//       const data = await res.json();

//       setProducts(data.data || []);

//       setTotalPages(
//         data.totalPages ||
//           data.pages ||
//           1
//       );
//     } catch (error) {
//       console.error("Load products error:", error);

//       setToast({
//         message:
//           error.message ||
//           "Failed to load products",
//         duration: 3000,
//       });
//     }
//   };

//   // ==========================================================
//   // RESET FORM
//   // ==========================================================

//   const resetForm = () => {
//     setEditingId(null);

//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       stock: "",
//       existingImages: [],
//       newImages: [],
//     });
//   };

//   // ==========================================================
//   // IMAGE URL
//   // ==========================================================

//   const getImageUrl = (image) => {
//     if (!image) {
//       return "";
//     }

//     // Full URL
//     if (
//       image.startsWith("http://") ||
//       image.startsWith("https://") ||
//       image.startsWith("blob:")
//     ) {
//       return image;
//     }

//     // Relative URL
//     return `${BASE_URL}${
//       image.startsWith("/") ? "" : "/"
//     }${image}`;
//   };

//   // ==========================================================
//   // PARSE IMAGES
//   // ==========================================================

//   const parseImages = (images) => {
//     if (!images) {
//       return [];
//     }

//     try {
//       if (Array.isArray(images)) {
//         return images;
//       }

//       if (typeof images === "string") {
//         const parsed = JSON.parse(images);

//         return Array.isArray(parsed)
//           ? parsed
//           : [];
//       }

//       return [];
//     } catch (error) {
//       console.error(
//         "Image parsing error:",
//         error
//       );

//       return [];
//     }
//   };

//   // ==========================================================
//   // CREATE / UPDATE PRODUCT
//   // ==========================================================

//   // const handleSubmit = async () => {
//   //   // --------------------------------------------------------
//   //   // VALIDATION
//   //   // --------------------------------------------------------

//   //   if (!form.name.trim()) {
//   //     setToast({
//   //       message: "Product name is required",
//   //       duration: 3000,
//   //     });

//   //     return;
//   //   }

//   //   if (
//   //     form.price === "" ||
//   //     form.price === null ||
//   //     form.price === undefined
//   //   ) {
//   //     setToast({
//   //       message: "Product price is required",
//   //       duration: 3000,
//   //     });

//   //     return;
//   //   }

//   //   if (
//   //     form.stock === "" ||
//   //     form.stock === null ||
//   //     form.stock === undefined
//   //   ) {
//   //     setToast({
//   //       message: "Stock quantity is required",
//   //       duration: 3000,
//   //     });

//   //     return;
//   //   }

//   //   // --------------------------------------------------------
//   //   // START LOADING
//   //   // --------------------------------------------------------

//   //   setSubmitLoading(true);

//   //   try {
//   //     const formData = new FormData();

//   //     // ------------------------------------------------------
//   //     // BASIC PRODUCT DATA
//   //     // ------------------------------------------------------

//   //     formData.append(
//   //       "name",
//   //       form.name
//   //     );

//   //     formData.append(
//   //       "description",
//   //       form.description
//   //     );

//   //     formData.append(
//   //       "price",
//   //       form.price
//   //     );

//   //     formData.append(
//   //       "stock",
//   //       form.stock
//   //     );

//   //     // ------------------------------------------------------
//   //     // EXISTING IMAGES
//   //     //
//   //     // IMPORTANT:
//   //     //
//   //     // During UPDATE this tells the backend which old
//   //     // images should remain.
//   //     // ------------------------------------------------------

//   //     if (editingId) {
//   //       formData.append(
//   //         "existingImages",
//   //         JSON.stringify(
//   //           form.existingImages
//   //         )
//   //       );
//   //     }

//   //     // ------------------------------------------------------
//   //     // NEW IMAGES
//   //     // ------------------------------------------------------

//   //     form.newImages.forEach((file) => {
//   //       formData.append(
//   //         "images",
//   //         file
//   //       );
//   //     });

//   //     // ------------------------------------------------------
//   //     // UPDATE
//   //     // ------------------------------------------------------

//   //     if (editingId) {
//   //       await updateProduct(
//   //         editingId,
//   //         formData,
//   //         token
//   //       );

//   //       setToast({
//   //         message:
//   //           "Product updated successfully!",
//   //         duration: 3000,
//   //       });
//   //     }

//   //     // ------------------------------------------------------
//   //     // CREATE
//   //     // ------------------------------------------------------

//   //     else {
//   //       await createProduct(
//   //         formData,
//   //         token
//   //       );

//   //       setToast({
//   //         message:
//   //           "Product created successfully!",
//   //         duration: 3000,
//   //       });
//   //     }

//   //     // ------------------------------------------------------
//   //     // RESET
//   //     // ------------------------------------------------------

//   //     resetForm();

//   //     // ------------------------------------------------------
//   //     // RELOAD PRODUCTS
//   //     // ------------------------------------------------------

//   //     await load();
//   //   } catch (error) {
//   //     console.error(
//   //       "Product submit error:",
//   //       error
//   //     );

//   //     setToast({
//   //       message:
//   //         "Error: " +
//   //         (error.message ||
//   //           "Operation failed"),
//   //       duration: 3000,
//   //     });
//   //   } finally {
//   //     setSubmitLoading(false);
//   //   }
//   // };

//   const handleSubmit = async () => {
//   setSubmitLoading(true);

//   try {
//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);

//     // ---------------------------------------------
//     // EDIT PRODUCT
//     // ---------------------------------------------
//     if (editingId) {
//       // Tell backend which old images should remain
//       formData.append(
//         "existingImages",
//         JSON.stringify(form.existingImages)
//       );

//       // Add newly selected images
//       form.newImages.forEach((file) => {
//         formData.append("images", file);
//       });

//       await updateProduct(
//         editingId,
//         formData,
//         token
//       );

//       setToast({
//         message: "Product updated successfully!",
//         duration: 3000,
//       });
//     }

//     // ---------------------------------------------
//     // CREATE PRODUCT
//     // ---------------------------------------------
//     else {
//       form.newImages.forEach((file) => {
//         formData.append("images", file);
//       });

//       await createProduct(
//         formData,
//         token
//       );

//       setToast({
//         message: "Product created successfully!",
//         duration: 3000,
//       });
//     }

//     // ---------------------------------------------
//     // Reset form
//     // ---------------------------------------------
//     setEditingId(null);

//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       stock: "",
//       existingImages: [],
//       newImages: [],
//     });

//     await load();

//   } catch (error) {
//     console.error(error);

//     setToast({
//       message:
//         "Error: " +
//         (error.message || "Operation failed"),
//       duration: 3000,
//     });

//   } finally {
//     setSubmitLoading(false);
//   }
// };

//   // ==========================================================
//   // EDIT PRODUCT
//   // ==========================================================

//   const handleEdit = (product) => {
//     const productImages = parseImages(
//       product.images
//     );

//     setEditingId(product.id);

//     setForm({
//       name: product.name || "",

//       description:
//         product.description || "",

//       price:
//         product.price !== null &&
//         product.price !== undefined
//           ? product.price
//           : "",

//       stock:
//         product.stock !== null &&
//         product.stock !== undefined
//           ? product.stock
//           : "",

//       // IMPORTANT
//       // Existing images go here
//       existingImages: [
//         ...productImages,
//       ],

//       // New files start empty
//       newImages: [],
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // ==========================================================
//   // REMOVE EXISTING IMAGE
//   // ==========================================================

//   const handleRemoveExistingImage = (
//     imageIndex
//   ) => {
//     setForm((previous) => ({
//       ...previous,

//       existingImages:
//         previous.existingImages.filter(
//           (_, index) =>
//             index !== imageIndex
//         ),
//     }));
//   };

//   // ==========================================================
//   // ADD NEW IMAGES
//   // ==========================================================

//   const handleNewImages = (event) => {
//     const selectedFiles = Array.from(
//       event.target.files || []
//     );

//     if (
//       selectedFiles.length === 0
//     ) {
//       return;
//     }

//     setForm((previous) => ({
//       ...previous,

//       newImages: [
//         ...previous.newImages,
//         ...selectedFiles,
//       ],
//     }));

//     // Allow same file to be selected again
//     event.target.value = "";
//   };

//   // ==========================================================
//   // REMOVE NEW IMAGE
//   // ==========================================================

//   const handleRemoveNewImage = (
//     imageIndex
//   ) => {
//     setForm((previous) => ({
//       ...previous,

//       newImages:
//         previous.newImages.filter(
//           (_, index) =>
//             index !== imageIndex
//         ),
//     }));
//   };

//   // ==========================================================
//   // TOGGLE STATUS
//   // ==========================================================

//   const handleToggleStatus = async (
//     productId,
//     currentStatus
//   ) => {
//     setToggleLoading(productId);

//     try {
//       const newStatus =
//         currentStatus === "active"
//           ? "inactive"
//           : "active";

//       await updateProductStatus(
//         productId,
//         newStatus,
//         token
//       );

//       setToast({
//         message: `Product ${
//           newStatus === "active"
//             ? "enabled"
//             : "disabled"
//         } successfully!`,
//         duration: 3000,
//       });

//       await load();
//     } catch (error) {
//       console.error(
//         "Toggle status error:",
//         error
//       );

//       setToast({
//         message:
//           "Error: " +
//           (error.message ||
//             "Toggle failed"),
//         duration: 3000,
//       });
//     } finally {
//       setToggleLoading(null);
//     }
//   };

//   // ==========================================================
//   // DELETE PRODUCT
//   // ==========================================================

//   const confirmDelete = async () => {
//     if (!deleteId) {
//       return;
//     }

//     setDeleteLoading(deleteId);

//     try {
//       await deleteProduct(
//         deleteId,
//         token
//       );

//       setDeleteId(null);

//       setToast({
//         message:
//           "Product deleted successfully!",
//         duration: 3000,
//       });

//       await load();
//     } catch (error) {
//       console.error(
//         "Delete product error:",
//         error
//       );

//       setToast({
//         message:
//           "Error: " +
//           (error.message ||
//             "Delete failed"),
//         duration: 3000,
//       });
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="products-crud-page-wrapper">

//       {/* ======================================================
//           TOAST
//       ====================================================== */}

//       {toast && (
//         <Toast
//           message={toast.message}
//           duration={toast.duration}
//           onClose={() =>
//             setToast(null)
//           }
//         />
//       )}

//       <div className="products-crud-page-container">

//         {/* ====================================================
//             HEADER
//         ==================================================== */}

//         <div className="products-crud-header">

//           <h1 className="products-crud-main-title">
//             🛍️ Products Management
//           </h1>

//           <p className="products-crud-subtitle">
//             Manage your store products
//             professionally
//           </p>

//         </div>

//         {/* ====================================================
//             FORM CARD
//         ==================================================== */}

//         <div className="products-crud-form-card">

//           <h2 className="products-crud-form-title">

//             {editingId
//               ? "✏️ Update Product"
//               : "➕ Create Product"}

//           </h2>

//           {/* ==================================================
//               BASIC FIELDS
//           ================================================== */}

//           <div className="products-crud-form-grid">

//             {/* PRODUCT NAME */}

//             <input
//               className="products-crud-form-input"
//               placeholder="Product Name"
//               value={form.name}
//               onChange={(event) =>
//                 setForm({
//                   ...form,
//                   name:
//                     event.target.value,
//                 })
//               }
//             />

//             {/* PRICE */}

//             <input
//               className="products-crud-form-input"
//               placeholder="Price (₹)"
//               type="number"
//               min="0"
//               value={form.price}
//               onChange={(event) =>
//                 setForm({
//                   ...form,
//                   price:
//                     event.target.value,
//                 })
//               }
//             />

//             {/* STOCK */}

//             <input
//               className="products-crud-form-input"
//               placeholder="Stock Quantity"
//               type="number"
//               min="0"
//               value={form.stock}
//               onChange={(event) =>
//                 setForm({
//                   ...form,
//                   stock:
//                     event.target.value,
//                 })
//               }
//             />

//             {/* FILE UPLOAD */}

//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleNewImages}
//               className="products-crud-form-input file-input"
//             />

//           </div>

//           {/* ==================================================
//               DESCRIPTION
//           ================================================== */}

//           <textarea
//             rows="4"
//             className="products-crud-form-textarea"
//             placeholder="Product Description"
//             value={form.description}
//             onChange={(event) =>
//               setForm({
//                 ...form,
//                 description:
//                   event.target.value,
//               })
//             }
//           />

//           {/* ==================================================
//               EXISTING IMAGES
//               ONLY SHOWN DURING EDIT
//           ================================================== */}

//           {editingId && (
//             <div className="product-edit-images-section">

//               <div className="product-images-section-header">

//                 <div>

//                   <h3>
//                     Existing Images
//                   </h3>

//                   <p>
//                     These images are already
//                     attached to this product.
//                     Click ✕ to remove an image.
//                   </p>

//                 </div>

//                 <span className="image-count-badge">

//                   {
//                     form.existingImages
//                       .length
//                   }

//                   {" "}

//                   {form.existingImages
//                     .length === 1
//                     ? "Image"
//                     : "Images"}

//                 </span>

//               </div>

//               {form.existingImages
//                 .length > 0 ? (

//                 <div className="product-image-preview-grid">

//                   {form.existingImages.map(
//                     (
//                       image,
//                       index
//                     ) => (

//                       <div
//                         className="product-image-preview-card"
//                         key={`${image}-${index}`}
//                       >

//                         <img
//                           src={getImageUrl(
//                             image
//                           )}
//                           alt={`Product image ${
//                             index + 1
//                           }`}
//                           onError={(
//                             event
//                           ) => {
//                             event.currentTarget.style.display =
//                               "none";
//                           }}
//                         />

//                         {/* REMOVE */}

//                         <button
//                           type="button"
//                           className="remove-product-image-btn"
//                           onClick={() =>
//                             handleRemoveExistingImage(
//                               index
//                             )
//                           }
//                           title="Remove existing image"
//                         >
//                           ✕
//                         </button>

//                         <span className="product-image-number">
//                           Image{" "}
//                           {index + 1}
//                         </span>

//                       </div>

//                     )
//                   )}

//                 </div>

//               ) : (

//                 <div className="no-existing-images">

//                   📭 No existing images

//                 </div>

//               )}

//             </div>
//           )}

//           {/* ==================================================
//               NEW IMAGE PREVIEWS
//           ================================================== */}

//           {form.newImages
//             .length > 0 && (

//             <div className="product-edit-images-section">

//               <div className="product-images-section-header">

//                 <div>

//                   <h3>

//                     {editingId
//                       ? "New Images"
//                       : "Selected Images"}

//                   </h3>

//                   <p>
//                     These images will be
//                     uploaded when you save
//                     the product.
//                   </p>

//                 </div>

//                 <span className="image-count-badge">

//                   {
//                     form.newImages
//                       .length
//                   }

//                   {" "}

//                   {form.newImages
//                     .length === 1
//                     ? "Image"
//                     : "Images"}

//                 </span>

//               </div>

//               <div className="product-image-preview-grid">

//                 {form.newImages.map(
//                   (
//                     file,
//                     index
//                   ) => (

//                     <div
//                       className="product-image-preview-card new-image-preview-card"
//                       key={`${file.name}-${file.size}-${index}`}
//                     >

//                       <img
//                         src={URL.createObjectURL(
//                           file
//                         )}
//                         alt={file.name}
//                       />

//                       {/* REMOVE */}

//                       <button
//                         type="button"
//                         className="remove-product-image-btn"
//                         onClick={() =>
//                           handleRemoveNewImage(
//                             index
//                           )
//                         }
//                         title="Remove new image"
//                       >
//                         ✕
//                       </button>

//                       <span className="product-image-number">

//                         {file.name.length >
//                         22
//                           ? `${file.name.substring(
//                               0,
//                               22
//                             )}...`
//                           : file.name}

//                       </span>

//                     </div>

//                   )
//                 )}

//               </div>

//             </div>

//           )}

//           {/* ==================================================
//               BUTTONS
//           ================================================== */}

//           <div className="products-crud-form-button-group">

//             {/* SUBMIT */}

//             <button
//               onClick={handleSubmit}
//               disabled={
//                 submitLoading
//               }
//               className="products-crud-form-submit-btn"
//             >

//               {submitLoading
//                 ? "⏳ Processing..."
//                 : editingId
//                 ? "📝 Update Product"
//                 : "✅ Create Product"}

//             </button>

//             {/* CANCEL EDIT */}

//             {editingId && (

//               <button
//                 onClick={resetForm}
//                 disabled={
//                   submitLoading
//                 }
//                 className="products-crud-form-cancel-btn"
//               >
//                 ❌ Cancel
//               </button>

//             )}

//           </div>

//         </div>

//         {/* ====================================================
//             PRODUCTS TABLE
//         ==================================================== */}

//         <div className="products-crud-table-card">

//           <div className="products-crud-table-wrapper">

//             <table className="products-crud-table">

//               <thead>

//                 <tr>

//                   <th>
//                     Image
//                   </th>

//                   <th>
//                     Name
//                   </th>

//                   <th>
//                     Price
//                   </th>

//                   <th>
//                     Stock
//                   </th>

//                   <th>
//                     Status
//                   </th>

//                   <th>
//                     Actions
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {products.map(
//                   (product) => {

//                     const images =
//                       parseImages(
//                         product.images
//                       );

//                     return (

//                       <tr
//                         key={
//                           product.id
//                         }
//                       >

//                         {/* IMAGE */}

//                         <td data-label="Image">

//                           {images.length >
//                           0 ? (

//                             <ImageSlider
//                               images={
//                                 images
//                               }
//                             />

//                           ) : (

//                             <span className="no-image-text">
//                               📭 No Image
//                             </span>

//                           )}

//                         </td>

//                         {/* NAME */}

//                         <td
//                           data-label="Name"
//                           className="product-name-cell"
//                         >
//                           {
//                             product.name
//                           }
//                         </td>

//                         {/* PRICE */}

//                         <td
//                           data-label="Price"
//                           className="product-price-cell"
//                         >
//                           ₹
//                           {
//                             product.price
//                           }
//                         </td>

//                         {/* STOCK */}

//                         <td data-label="Stock">

//                           {
//                             product.stock
//                           }

//                         </td>

//                         {/* STATUS */}

//                         <td data-label="Status">

//                           <span
//                             className={`products-crud-product-status ${
//                               product.status ===
//                               "active"
//                                 ? "products-crud-status-active"
//                                 : "products-crud-status-inactive"
//                             }`}
//                           >

//                             {product.status ===
//                             "active"
//                               ? "🟢 Active"
//                               : "🔴 Inactive"}

//                           </span>

//                         </td>

//                         {/* ACTIONS */}

//                         <td data-label="Actions">

//                           <div className="products-crud-product-actions">

//                             {/* TOGGLE */}

//                             <button
//                               onClick={() =>
//                                 handleToggleStatus(
//                                   product.id,
//                                   product.status
//                                 )
//                               }
//                               disabled={
//                                 toggleLoading ===
//                                 product.id
//                               }
//                               className="products-crud-btn-action products-crud-btn-toggle"
//                             >

//                               {toggleLoading ===
//                               product.id
//                                 ? "⏳"
//                                 : product.status ===
//                                   "active"
//                                 ? "Disable"
//                                 : "Enable"}

//                             </button>

//                             {/* EDIT */}

//                             <button
//                               onClick={() =>
//                                 handleEdit(
//                                   product
//                                 )
//                               }
//                               disabled={
//                                 submitLoading ||
//                                 toggleLoading ===
//                                   product.id ||
//                                 deleteLoading ===
//                                   product.id
//                               }
//                               className="products-crud-btn-action products-crud-btn-edit"
//                             >
//                               Edit
//                             </button>

//                             {/* DELETE */}

//                             <button
//                               onClick={() =>
//                                 setDeleteId(
//                                   product.id
//                                 )
//                               }
//                               disabled={
//                                 deleteLoading ===
//                                   product.id ||
//                                 submitLoading
//                               }
//                               className="products-crud-btn-action products-crud-btn-delete"
//                             >
//                               Delete
//                             </button>

//                           </div>

//                         </td>

//                       </tr>

//                     );
//                   }
//                 )}

//                 {/* EMPTY */}

//                 {products.length ===
//                   0 && (

//                   <tr>

//                     <td
//                       colSpan="6"
//                       className="empty-row"
//                     >
//                       📦 No products found
//                     </td>

//                   </tr>

//                 )}

//               </tbody>

//             </table>

//           </div>

//           {/* ==================================================
//               PAGINATION
//           ================================================== */}

//           <div className="pagination-section">

//             <div className="pagination-buttons">

//               <button
//                 disabled={
//                   page === 1
//                 }
//                 onClick={() =>
//                   setPage(
//                     page - 1
//                   )
//                 }
//                 className="pagination-btn"
//               >
//                 ← Prev
//               </button>

//               <button
//                 disabled={
//                   page === totalPages
//                 }
//                 onClick={() =>
//                   setPage(
//                     page + 1
//                   )
//                 }
//                 className="pagination-btn"
//               >
//                 Next →
//               </button>

//             </div>

//             <span className="pagination-info">

//               Page {page} of{" "}
//               {totalPages}

//             </span>

//           </div>

//         </div>

//         {/* ====================================================
//             DELETE CONFIRMATION MODAL
//         ==================================================== */}

//         {deleteId && (

//           <div
//             className="delete-confirmation-modal"
//             onClick={(event) => {

//               if (
//                 event.target ===
//                 event.currentTarget
//               ) {
//                 setDeleteId(null);
//               }

//             }}
//           >

//             <div className="modal-content">

//               <h3 className="modal-title">
//                 ⚠️ Delete Product
//               </h3>

//               <p className="modal-message">

//                 Are you sure you want to
//                 delete this product?

//                 <br />

//                 This action cannot be
//                 undone.

//               </p>

//               <div className="modal-actions">

//                 <button
//                   onClick={
//                     confirmDelete
//                   }
//                   disabled={
//                     deleteLoading ===
//                     deleteId
//                   }
//                   className="btn-confirm-delete"
//                 >

//                   {deleteLoading ===
//                   deleteId
//                     ? "⏳ Deleting..."
//                     : "🗑️ Delete"}

//                 </button>

//                 <button
//                   onClick={() =>
//                     setDeleteId(null)
//                   }
//                   disabled={
//                     deleteLoading ===
//                     deleteId
//                   }
//                   className="btn-cancel-delete"
//                 >
//                   ❌ Cancel
//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//       </div>

//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import Toast from "../../components/Toast";
import {
  updateProductStatus,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/api";
import "../../styles/productsCrud.css";
import ImageSlider from "./ImageSlider";

// ======================================================
// API BASE URL
// ======================================================

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api\/?$/, "");

// ======================================================
// EMPTY FORM
// ======================================================

const getEmptyForm = () => ({
  name: "",
  description: "",
  price: "",
  stock: "",
  weight_kg: "0.5",
  length_cm: "20",
  breadth_cm: "15",
  height_cm: "5",
  hsn_code: "",
  existingImages: [],
  newImages: [],
});

// ======================================================
// PARSE PRODUCT IMAGES
// ======================================================

const parseImages = (images) => {
  if (!images) return [];

  if (Array.isArray(images)) {
    return images;
  }

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return images ? [images] : [];
    } catch (error) {
      // In case DB/API returns a single plain URL
      return images ? [images] : [];
    }
  }

  return [];
};

// ======================================================
// GET IMAGE URL
// ======================================================

const getImageUrl = (image) => {
  if (!image) return "";

  let imageValue = image;

  // Support object format
  if (typeof image === "object") {
    imageValue =
      image.image_url ||
      image.imageUrl ||
      image.url ||
      image.path ||
      image.filename ||
      "";
  }

  if (!imageValue || typeof imageValue !== "string") {
    return "";
  }

  // Already full URL
  if (
    imageValue.startsWith("http://") ||
    imageValue.startsWith("https://") ||
    imageValue.startsWith("data:") ||
    imageValue.startsWith("blob:")
  ) {
    return imageValue;
  }

  const cleanBaseUrl = BASE_URL.replace(/\/+$/, "");
  const cleanImagePath = imageValue.replace(/^\/+/, "");

  return `${cleanBaseUrl}/${cleanImagePath}`;
};

// ======================================================
// EXISTING IMAGE IDENTIFIER
// ======================================================

const getImageIdentifier = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  return (
    image.image_url ||
    image.imageUrl ||
    image.url ||
    image.path ||
    image.filename ||
    ""
  );
};

// ======================================================
// COMPONENT
// ======================================================

export default function ProductsCrud() {
  const token = localStorage.getItem("token");

  // ====================================================
  // PRODUCTS
  // ====================================================

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ====================================================
  // EDITING
  // ====================================================

  const [editingId, setEditingId] = useState(null);

  // ====================================================
  // FORM
  // ====================================================

  const [form, setForm] = useState(getEmptyForm());

  // ====================================================
  // NEW IMAGE PREVIEWS
  // ====================================================

  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // ====================================================
  // FULL IMAGE VIEWER
  // ====================================================

  const [viewerImage, setViewerImage] = useState(null);

  // ====================================================
  // LOADING STATES
  // ====================================================

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(null);

  const [toggleLoading, setToggleLoading] = useState(null);

  // ====================================================
  // DELETE PRODUCT MODAL
  // ====================================================

  const [deleteId, setDeleteId] = useState(null);

  // ====================================================
  // FILE INPUT RESET
  // ====================================================

  const [fileInputKey, setFileInputKey] = useState(0);

  // ====================================================
  // TOAST
  // ====================================================

  const [toast, setToast] = useState(null);

  // ====================================================
  // LOAD PRODUCTS
  // ====================================================

  useEffect(() => {
    load();
  }, [page]);

  const load = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/admin/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();

      setProducts(data.data || []);

      setTotalPages(
        data.totalPages ||
          data.pages ||
          1
      );
    } catch (error) {
      console.error("Load products error:", error);

      setToast({
        message:
          error.message ||
          "Failed to load products",
        duration: 3000,
      });
    }
  };

  // ====================================================
  // CREATE NEW IMAGE PREVIEWS
  // ====================================================

  useEffect(() => {
    const urls = form.newImages.map((file) =>
      URL.createObjectURL(file)
    );

    setNewImagePreviews(urls);

    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [form.newImages]);

  // ====================================================
  // EXISTING IMAGE COUNT
  // ====================================================

  const existingImageCount = useMemo(() => {
    return form.existingImages.length;
  }, [form.existingImages]);

  // ====================================================
  // NEW IMAGE COUNT
  // ====================================================

  const newImageCount = useMemo(() => {
    return form.newImages.length;
  }, [form.newImages]);

  // ====================================================
  // TOTAL IMAGE COUNT
  // ====================================================

  const totalImageCount = useMemo(() => {
    return existingImageCount + newImageCount;
  }, [existingImageCount, newImageCount]);

  // ====================================================
  // RESET FORM
  // ====================================================

  const resetForm = () => {
    setEditingId(null);

    setForm(getEmptyForm());

    setFileInputKey((prev) => prev + 1);
  };

  // ====================================================
  // EDIT PRODUCT
  // ====================================================

  const handleEdit = (product) => {
    const existingImages = parseImages(
      product.images
    );

    setEditingId(product.id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      weight_kg: product.weight_kg ?? "0.5",
      length_cm: product.length_cm ?? "20",
      breadth_cm: product.breadth_cm ?? "15",
      height_cm: product.height_cm ?? "5",
      hsn_code: product.hsn_code ?? "",
      existingImages,
      newImages: [],
    });

    setFileInputKey((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ====================================================
  // ADD NEW IMAGES
  // ====================================================

  const handleNewImages = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (!selectedFiles.length) {
      return;
    }

    // Only allow image files
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type &&
        file.type.startsWith("image/")
    );

    if (validFiles.length !== selectedFiles.length) {
      setToast({
        message:
          "Only image files are allowed.",
        duration: 3000,
      });
    }

    setForm((prev) => ({
      ...prev,
      newImages: [
        ...prev.newImages,
        ...validFiles,
      ],
    }));

    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  // ====================================================
  // REMOVE EXISTING IMAGE
  // ====================================================

  const handleRemoveExistingImage = (index) => {
    setForm((prev) => ({
      ...prev,
      existingImages:
        prev.existingImages.filter(
          (_, imageIndex) =>
            imageIndex !== index
        ),
    }));
  };

  // ====================================================
  // REMOVE NEW IMAGE
  // ====================================================

  const handleRemoveNewImage = (index) => {
    setForm((prev) => ({
      ...prev,
      newImages:
        prev.newImages.filter(
          (_, imageIndex) =>
            imageIndex !== index
        ),
    }));
  };

  // ====================================================
  // OPEN IMAGE VIEWER
  // ====================================================

  const openImageViewer = (imageUrl, title = "") => {
    if (!imageUrl) return;

    setViewerImage({
      url: imageUrl,
      title,
    });
  };

  // ====================================================
  // CLOSE IMAGE VIEWER
  // ====================================================

  const closeImageViewer = () => {
    setViewerImage(null);
  };

  // ====================================================
  // ESC KEY FOR IMAGE VIEWER
  // ====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImageViewer();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ====================================================
  // SUBMIT PRODUCT
  // ====================================================

  const handleSubmit = async () => {
    // Basic validation
    if (!form.name.trim()) {
      setToast({
        message: "Please enter product name.",
        duration: 3000,
      });

      return;
    }

    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {
      setToast({
        message: "Please enter a valid price.",
        duration: 3000,
      });

      return;
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      setToast({
        message:
          "Please enter a valid stock quantity.",
        duration: 3000,
      });

      return;
    }

    // Prevent product from having no images
    if (
      editingId &&
      totalImageCount === 0
    ) {
      const confirmWithoutImages =
        window.confirm(
          "This product will have no images. Do you want to continue?"
        );

      if (!confirmWithoutImages) {
        return;
      }
    }

    setSubmitLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "description",
        form.description || ""
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "stock",
        form.stock
      );

      ["weight_kg", "length_cm", "breadth_cm", "height_cm", "hsn_code"].forEach((field) => {
        formData.append(field, form[field]);
      });

      // ==================================================
      // UPDATE PRODUCT
      // ==================================================

      if (editingId) {
        // Send images that should remain
        formData.append(
          "existingImages",
          JSON.stringify(
            form.existingImages
          )
        );

        // Send newly added files
        form.newImages.forEach((file) => {
          formData.append(
            "images",
            file
          );
        });

        await updateProduct(
          editingId,
          formData,
          token
        );

        setToast({
          message:
            "Product updated successfully!",
          duration: 3000,
        });
      }

      // ==================================================
      // CREATE PRODUCT
      // ==================================================

      else {
        form.newImages.forEach((file) => {
          formData.append(
            "images",
            file
          );
        });

        await createProduct(
          formData,
          token
        );

        setToast({
          message:
            "Product created successfully!",
          duration: 3000,
        });
      }

      resetForm();

      await load();
    } catch (error) {
      console.error(
        "Product submit error:",
        error
      );

      setToast({
        message:
          "Error: " +
          (error.message ||
            "Operation failed"),
        duration: 3000,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // ====================================================
  // TOGGLE STATUS
  // ====================================================

  const handleToggleStatus = async (
    productId,
    currentStatus
  ) => {
    setToggleLoading(productId);

    try {
      const newStatus =
        currentStatus === "active"
          ? "inactive"
          : "active";

      await updateProductStatus(
        productId,
        newStatus,
        token
      );

      setToast({
        message:
          `Product ${
            newStatus === "active"
              ? "enabled"
              : "disabled"
          } successfully!`,
        duration: 3000,
      });

      await load();
    } catch (error) {
      console.error(
        "Toggle status error:",
        error
      );

      setToast({
        message:
          "Error: " +
          (error.message ||
            "Toggle failed"),
        duration: 3000,
      });
    } finally {
      setToggleLoading(null);
    }
  };

  // ====================================================
  // CONFIRM DELETE
  // ====================================================

  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleteLoading(deleteId);

    try {
      await deleteProduct(
        deleteId,
        token
      );

      setDeleteId(null);

      setToast({
        message:
          "Product deleted successfully!",
        duration: 3000,
      });

      await load();
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      setToast({
        message:
          "Error: " +
          (error.message ||
            "Delete failed"),
        duration: 3000,
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="products-crud-page-wrapper">

      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (
        <Toast
          message={toast.message}
          duration={toast.duration}
          onClose={() =>
            setToast(null)
          }
        />
      )}

      <div className="products-crud-page-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="products-crud-header">
          <h1 className="products-crud-main-title">
            🛍️ Products Management
          </h1>

          <p className="products-crud-subtitle">
            Manage your store products
            professionally
          </p>
        </div>

        {/* =================================================
            PRODUCT FORM
        ================================================= */}

        <div className="products-crud-form-card">

          <div className="products-crud-form-heading-row">

            <div>
              <h2 className="products-crud-form-title">
                {editingId
                  ? "✏️ Update Product"
                  : "➕ Create Product"}
              </h2>

              {editingId && (
                <p className="products-crud-editing-text">
                  Editing product #{editingId}
                </p>
              )}
            </div>

            {editingId && (
              <div className="products-crud-image-summary">
                <span>
                  🖼️{" "}
                  {totalImageCount}{" "}
                  image
                  {totalImageCount !== 1
                    ? "s"
                    : ""}
                </span>
              </div>
            )}

          </div>

          {/* =================================================
              BASIC PRODUCT INFORMATION
          ================================================= */}

          <div className="products-crud-form-grid">

            <div className="products-crud-field">
              <label>
                Product Name
              </label>

              <input
                className="products-crud-form-input"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="products-crud-field">
              <label>
                Price
              </label>

              <input
                className="products-crud-form-input"
                placeholder="Price (₹)"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </div>

            <div className="products-crud-field">
              <label>
                Stock Quantity
              </label>

              <input
                className="products-crud-form-input"
                placeholder="Stock Quantity"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
              />
            </div>

            {[['weight_kg','Weight (kg)'],['length_cm','Length (cm)'],['breadth_cm','Breadth (cm)'],['height_cm','Height (cm)']].map(([field,label]) => (
              <div className="products-crud-field" key={field}><label>{label}</label><input className="products-crud-form-input" type="number" min="0.01" step="0.01" value={form[field]} onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))} /></div>
            ))}

            <div className="products-crud-field"><label>HSN code (international shipping)</label><input className="products-crud-form-input" inputMode="numeric" pattern="[0-9]{1,15}" maxLength="15" value={form.hsn_code} onChange={(e) => setForm((prev) => ({ ...prev, hsn_code: e.target.value.replace(/\D/g, "").slice(0, 15) }))} placeholder="Digits only, for example 49030020" /></div>

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="products-crud-field products-crud-description-field">

            <label>
              Product Description
            </label>

            <textarea
              rows="4"
              className="products-crud-form-textarea"
              placeholder="Product Description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description:
                    e.target.value,
                }))
              }
            />

          </div>

          {/* =================================================
              EXISTING IMAGES
          ================================================= */}

          {editingId && (
            <div className="products-crud-image-manager">

              <div className="products-crud-image-manager-header">

                <div>
                  <h3>
                    🖼️ Existing Images
                  </h3>

                  <p>
                    These images are currently
                    saved for this product.
                  </p>
                </div>

                <span className="products-crud-image-count">
                  {existingImageCount}{" "}
                  existing
                </span>

              </div>

              {form.existingImages.length >
              0 ? (
                <div className="products-crud-image-grid">

                  {form.existingImages.map(
                    (image, index) => {
                      const imageUrl =
                        getImageUrl(image);

                      return (
                        <div
                          className="products-crud-image-card existing-image-card"
                          key={`${getImageIdentifier(
                            image
                          )}-${index}`}
                        >

                          <div
                            className="products-crud-image-preview"
                            onClick={() =>
                              openImageViewer(
                                imageUrl,
                                `Existing Image ${
                                  index + 1
                                }`
                              )
                            }
                          >

                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={`Product ${
                                  index + 1
                                }`}
                                onError={(
                                  e
                                ) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="products-crud-image-error">
                                🖼️
                                <span>
                                  Image unavailable
                                </span>
                              </div>
                            )}

                            <div className="products-crud-image-view-overlay">
                              👁️ View
                            </div>

                          </div>

                          <div className="products-crud-image-card-footer">

                            {index === 0 ? (
                              <span className="products-crud-primary-badge">
                                ⭐ Primary
                              </span>
                            ) : (
                              <span className="products-crud-existing-badge">
                                Existing
                              </span>
                            )}

                            <button
                              type="button"
                              className="products-crud-image-remove-btn"
                              onClick={() =>
                                handleRemoveExistingImage(
                                  index
                                )
                              }
                            >
                              🗑️ Remove
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              ) : (
                <div className="products-crud-no-images-box">
                  <div className="products-crud-no-images-icon">
                    📭
                  </div>

                  <strong>
                    No existing images
                  </strong>

                  <span>
                    Add new images below.
                  </span>
                </div>
              )}

            </div>
          )}

          {/* =================================================
              NEW IMAGE UPLOAD
          ================================================= */}

          <div className="products-crud-image-manager">

            <div className="products-crud-image-manager-header">

              <div>
                <h3>
                  ➕{" "}
                  {editingId
                    ? "Add New Images"
                    : "Product Images"}
                </h3>

                <p>
                  Select one or multiple
                  images to upload.
                </p>
              </div>

              {editingId &&
                newImageCount > 0 && (
                  <span className="products-crud-image-count new-count">
                    {newImageCount} new
                  </span>
                )}

            </div>

            {/* FILE UPLOAD AREA */}

            <label className="products-crud-upload-area">

              <input
                key={fileInputKey}
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleNewImages
                }
                className="products-crud-hidden-file-input"
              />

              <div className="products-crud-upload-icon">
                📸
              </div>

              <strong>
                Click to select images
              </strong>

              <span>
                JPG, JPEG, PNG, WEBP
              </span>

              <small>
                You can select multiple
                images
              </small>

            </label>

            {/* NEW IMAGE PREVIEWS */}

            {form.newImages.length >
              0 && (
              <div className="products-crud-new-images-section">

                <div className="products-crud-new-images-title">
                  <span>
                    📤 New Images
                  </span>

                  <span>
                    {newImageCount} selected
                  </span>
                </div>

                <div className="products-crud-image-grid">

                  {form.newImages.map(
                    (file, index) => {
                      const preview =
                        newImagePreviews[
                          index
                        ];

                      return (
                        <div
                          className="products-crud-image-card new-image-card"
                          key={`${file.name}-${file.size}-${index}`}
                        >

                          <div
                            className="products-crud-image-preview"
                            onClick={() =>
                              openImageViewer(
                                preview,
                                file.name
                              )
                            }
                          >

                            {preview && (
                              <img
                                src={preview}
                                alt={
                                  file.name
                                }
                              />
                            )}

                            <div className="products-crud-image-view-overlay">
                              👁️ View
                            </div>

                          </div>

                          <div className="products-crud-image-card-footer">

                            <div className="products-crud-new-file-info">
                              <span className="products-crud-new-badge">
                                NEW
                              </span>

                              <span
                                title={
                                  file.name
                                }
                                className="products-crud-file-name"
                              >
                                {file.name}
                              </span>
                            </div>

                            <button
                              type="button"
                              className="products-crud-image-remove-btn"
                              onClick={() =>
                                handleRemoveNewImage(
                                  index
                                )
                              }
                            >
                              🗑️ Remove
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              IMAGE UPDATE INFORMATION
          ================================================= */}

          {editingId && (
            <div className="products-crud-image-info-box">

              <div className="products-crud-info-icon">
                💡
              </div>

              <div>
                <strong>
                  How image updates work
                </strong>

                <p>
                  Existing images that you
                  keep will remain. Images
                  marked as Remove will be
                  removed when you click
                  <strong>
                    {" "}
                    Update Product
                  </strong>
                  . New images will be added
                  without removing your
                  remaining images.
                </p>
              </div>

            </div>
          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="products-crud-form-button-group">

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitLoading}
              className="products-crud-form-submit-btn"
            >
              {submitLoading
                ? "⏳ Processing..."
                : editingId
                ? "📝 Update Product"
                : "✅ Create Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={submitLoading}
                className="products-crud-form-cancel-btn"
              >
                ❌ Cancel
              </button>
            )}

          </div>

        </div>

        {/* =================================================
            PRODUCTS TABLE
        ================================================= */}

        <div className="products-crud-table-card">

          <div className="products-crud-table-header">

            <div>
              <h2>
                📦 Products
              </h2>

              <p>
                View and manage all store
                products.
              </p>
            </div>

            <span className="products-crud-product-count">
              {products.length} products
            </span>

          </div>

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

                {products.map((product) => {

                  const images =
                    parseImages(
                      product.images
                    );

                  return (
                    <tr
                      key={product.id}
                    >

                      {/* IMAGE */}

                      <td data-label="Image">

                        {images.length >
                        0 ? (
                          <ImageSlider
                            images={images}
                          />
                        ) : (
                          <span className="no-image-text">
                            📭 No Image
                          </span>
                        )}

                      </td>

                      {/* NAME */}

                      <td
                        data-label="Name"
                        className="product-name-cell"
                      >
                        {product.name}
                      </td>

                      {/* PRICE */}

                      <td
                        data-label="Price"
                        className="product-price-cell"
                      >
                        ₹{product.price}
                      </td>

                      {/* STOCK */}

                      <td data-label="Stock">
                        {product.stock}
                      </td>

                      {/* STATUS */}

                      <td data-label="Status">

                        <span
                          className={`products-crud-product-status ${
                            product.status ===
                            "active"
                              ? "products-crud-status-active"
                              : "products-crud-status-inactive"
                          }`}
                        >
                          {product.status ===
                          "active"
                            ? "🟢 Active"
                            : "🔴 Inactive"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td data-label="Actions">

                        <div className="products-crud-product-actions">

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(
                                product.id,
                                product.status
                              )
                            }
                            disabled={
                              toggleLoading ===
                                product.id ||
                              submitLoading ||
                              deleteLoading ===
                                product.id
                            }
                            className="products-crud-btn-action products-crud-btn-toggle"
                          >
                            {toggleLoading ===
                            product.id
                              ? "⏳"
                              : product.status ===
                                "active"
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                product
                              )
                            }
                            disabled={
                              submitLoading ||
                              toggleLoading ===
                                product.id ||
                              deleteLoading ===
                                product.id
                            }
                            className="products-crud-btn-action products-crud-btn-edit"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(
                                product.id
                              )
                            }
                            disabled={
                              deleteLoading ===
                                product.id ||
                              submitLoading
                            }
                            className="products-crud-btn-action products-crud-btn-delete"
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-row"
                    >
                      📦 No products found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="pagination-section">

            <div className="pagination-buttons">

              <button
                type="button"
                disabled={
                  page === 1 ||
                  submitLoading
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
                className="pagination-btn"
              >
                ← Prev
              </button>

              <button
                type="button"
                disabled={
                  page === totalPages ||
                  submitLoading
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
                className="pagination-btn"
              >
                Next →
              </button>

            </div>

            <span className="pagination-info">
              Page {page} of{" "}
              {totalPages}
            </span>

          </div>

        </div>

        {/* =================================================
            DELETE CONFIRMATION MODAL
        ================================================= */}

        {deleteId && (
          <div
            className="delete-confirmation-modal"
            onClick={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setDeleteId(null);
              }
            }}
          >

            <div className="modal-content">

              <div className="modal-icon">
                ⚠️
              </div>

              <h3 className="modal-title">
                Delete Product
              </h3>

              <p className="modal-message">
                Are you sure you want to
                delete this product?
                <br />
                This action cannot be
                undone.
              </p>

              <div className="modal-actions">

                <button
                  type="button"
                  onClick={
                    confirmDelete
                  }
                  disabled={
                    deleteLoading ===
                    deleteId
                  }
                  className="btn-confirm-delete"
                >
                  {deleteLoading ===
                  deleteId
                    ? "⏳ Deleting..."
                    : "🗑️ Delete"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(null)
                  }
                  disabled={
                    deleteLoading ===
                    deleteId
                  }
                  className="btn-cancel-delete"
                >
                  ❌ Cancel
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            FULL SIZE IMAGE VIEWER
        ================================================= */}

        {viewerImage && (
          <div
            className="products-crud-image-viewer"
            onClick={closeImageViewer}
          >

            <div
              className="products-crud-image-viewer-content"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="products-crud-image-viewer-header">

                <span>
                  {viewerImage.title ||
                    "Image Preview"}
                </span>

                <button
                  type="button"
                  onClick={
                    closeImageViewer
                  }
                  className="products-crud-image-viewer-close"
                  aria-label="Close image viewer"
                >
                  ✕
                </button>

              </div>

              {/* IMAGE */}

              <div className="products-crud-image-viewer-body">

                <img
                  src={
                    viewerImage.url
                  }
                  alt={
                    viewerImage.title ||
                    "Full size preview"
                  }
                />

              </div>

              {/* FOOTER */}

              <div className="products-crud-image-viewer-footer">
                Click outside the image
                or press ESC to close
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
