import { Navigate } from "react-router-dom";

export default function RequireSuperAdmin({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "super_admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
