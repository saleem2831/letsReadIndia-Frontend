

import axios from "axios";

const API_URL = "http://localhost:4000/api";

// =====================
// AUTH
// =====================
export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};



// =====================
// PRODUCTS (PUBLIC)
// =====================
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
};



// =====================
// PRODUCTS (SUPER ADMIN)
// =====================

// ⚠️ uses your existing PUT /products/:id
// export const updateProductStatus = async (id, status, token) => {
//   const res = await fetch(`${API_URL}/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ status }),
//   });
//   return res.json();
// };

// DELETE PRODUCT
// export const deleteProduct = async (id, token) => {
//   const res = await fetch(`${API_URL}/products/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json();
// };

// ⚠️ ADMIN PRODUCT LIST (YOU NEED TO ADD THIS BACKEND ROUTE)
// GET /products/admin/list?page=1
export const getProductsAdmin = async (page = 1, token) => {
  const res = await fetch(
    `${API_URL}/products/admin/list?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};



// =====================
// ADMINS (SUPER ADMIN)
// =====================

export const createAdmin = async (data, token) => {
  const res = await fetch(`${API_URL}/admin/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAdminStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/admin/status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// export const deleteAdmin = async (id, token) => {
//   const res = await fetch(`${API_URL}/admin/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json();
// };

export const deleteAdmin = async (id, newAdminId, token) => {
  const res = await fetch(`${API_URL}/admin/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newAdminId }),
  });

  return res.json();
};


export const updatePassword = async (id, password, token) => {
  const res = await fetch(`${API_URL}/admin/password/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  return res.json();
};

// ⚠️ PAGINATED ADMIN LIST (YOU NEED TO ADD THIS BACKEND)
export const getAdmins = async (page = 1, token) => {
  const res = await fetch(
    `${API_URL}/admin?page=${page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
};


// =====================
// ORDERS (ADMIN)
// =====================
export const getMyOrders = async (token) => {
  const res = await fetch(`${API_URL}/admin/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};


// Recently added 

// export const createProduct = async (formData, token) => {
//   const res = await fetch(`${API_URL}/products`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   return res.json();
// };

// export const updateProduct = async (id, formData, token) => {
//   const res = await fetch(`${API_URL}/products/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   return res.json();
// };



export const createProduct = (data, token) =>
  axios.post(`${API_URL}/products/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (id, data, token) =>
  axios.put(`${API_URL}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id, token) =>
  axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProductStatus = (id, status, token) =>
  axios.put(
    `${API_URL}/products/status/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const updateAdmin = async (id, data, token) => {
  const res = await fetch(`${API_URL}/admin/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// Admin Page

/* ================= ADMIN DASHBOARD ================= */

// export const getAdminDashboard = async (token) => {
//   const res = await fetch(`${API_URL}/admin/dashboard`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// };

// export const getAssignedOrders = async (page = 1, token) => {
//   const res = await fetch(`${API_URL}/admin/orders?page=${page}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// };

// export const updateOrderStatus = async (orderId, status, token) => {
//   const res = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ status }),
//   });

//   return res.json();
// };


/* ADMIN DASHBOARD STATS */
export const getAdminDashboard = async (token) => {
  const res = await fetch(`${API_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/* ASSIGNED ORDERS (with search + filter + pagination) */
export const getAssignedOrders = async (page, token, search = "", status = "") => {
  const params = new URLSearchParams({
    page,
    search,
    status,
  });

  const res = await fetch(`${API_URL}/admin/orders?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
};

/* UPDATE ORDER STATUS */
export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  

  return res.json();
};

/* 🔥 THIS WAS MISSING → ORDER DETAILS (items in order) */
export const getOrderDetails = async (orderId, token) => {
  const res = await fetch(`${API_URL}/admin/orders/${orderId}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
};


//customer

/* Track order */
export const getCustomerOrder = async (orderNumber) => {
  const res = await fetch(`${API_URL}/customer/order/${orderNumber}`);
  return res.json();
};

/* Download invoice */
export const downloadInvoice = async (orderNumber) => {
  const res = await fetch(`${API_URL}/customer/order/${orderNumber}/invoice`);

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${orderNumber}.pdf`;
  a.click();
};


export const shipOrder = async (orderId, data, token) => {
  const res = await fetch(
    `${API_URL}/admin/orders/${orderId}/ship`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Shipping failed");

  return res.json();
};

export const requestReturn = async (data) => {
  const res = await fetch(
    // '${API_URL}/customer/return',
        `${API_URL}/customer/return`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return res.json();
};




// ======================
// ADMIN RETURN APIs
// ======================

// Get all return requests
export const getReturns = async () => {
  const res = await fetch("http://localhost:4000/api/admin/returns", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
};

// Approve / Reject return
export const updateReturnStatus = async (id, status) => {
  const res = await fetch(
    `http://localhost:4000/api/admin/returns/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  return res.json();
};


export const approveReturn = async (id) => {
  const res = await axios.put(
    `http://localhost:4000/api/admin/returns/${id}/approve`
  );
  return res.data;
};

export const schedulePickup = async (id) => {
  const res = await axios.put(
    `http://localhost:4000/api/admin/returns/${id}/schedule`
  );
  return res.data;
};


export const getCustomerReturnOrder = async (orderNumber) => {
  const res = await fetch(
    `${API_BASE_URL}/customer/track-order?orderNumber=${orderNumber}`
  );

  return res.json();
};

// ===============================
// Parent Form Submission
// ===============================
export const submitParentInquiry = async (formData) => {
  const res = await fetch("http://localhost:4000/api/forms/parent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Server Error");
  }

  return data;
};

// ===============================
// School Form Submission
// ===============================
export const submitSchoolInquiry = async (formData) => {
  const res = await fetch("http://localhost:4000/api/forms/school", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};

export const submitContactForm = async (formData) => {
  const res = await fetch("http://localhost:4000/api/forms/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};