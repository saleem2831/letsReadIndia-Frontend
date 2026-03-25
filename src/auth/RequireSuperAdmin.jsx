import { Navigate } from "react-router-dom";

export default function RequireSuperAdmin({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "super_admin") {
    return <Navigate to="/login" />;
  }

  return children;
}