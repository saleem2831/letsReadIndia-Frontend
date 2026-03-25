import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/AdminLayout.css";
import logo from "../assets/lets-read-logo.png";

export default function AdminLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname.includes(path) ? "active" : "";
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="admin-layout-wrapper">
      {/* NAVBAR */}
      <nav className="admin-navbar">
        {/* NAVBAR BRAND */}
        <div className="admin-navbar-brand">
          <img src={logo} alt="Let's Read India" className="admin-navbar-logo" />
          {/* <h1 className="admin-navbar-title">Admin Panel</h1> */}
        </div>

        {/* NAVBAR MENU TOGGLE */}
        <button
          className="admin-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAVBAR CENTER - NAVIGATION MENU */}
        <div className={`admin-nav-wrapper ${menuOpen ? "open" : ""}`}>
          <ul className="admin-nav-menu">
            <li className="admin-nav-item">
              <Link
                to="."
                className={`admin-nav-link ${isActive("/admin") && !isActive("returns") ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="admin-nav-icon">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            {/* <li className="admin-nav-item">
              <Link
                to="returns"
                className={`admin-nav-link ${isActive("returns")}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="admin-nav-icon">📋</span>
                <span>Return Request</span>
              </Link>
            </li> */}
          </ul>
        </div>

        {/* NAVBAR RIGHT - ACTIONS */}
        <div className="admin-navbar-actions">
          <button className="admin-logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="admin-main-content">
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}