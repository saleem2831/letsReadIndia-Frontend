import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → redirect based on role
  if (role !== "admin") {
    return <Navigate to="/super-admin" replace />;
  }

  return children;
}
