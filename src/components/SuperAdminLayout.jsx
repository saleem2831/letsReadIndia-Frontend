import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/SuperAdminLayout.css";
import logo from "../assets/lets-read-logo.png";

export default function SuperAdminLayout() {
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
    <div className="super-admin-layout-wrapper">
      {/* NAVBAR */}
      <nav className="super-admin-navbar">
        {/* NAVBAR BRAND */}
        <div className="super-admin-navbar-brand">
          <img src={logo} alt="Let's Read India" className="super-admin-navbar-logo" />
          {/* <h1 className="super-admin-navbar-title">Super Admin</h1> */}
        </div>

        {/* NAVBAR MENU TOGGLE */}
        <button
          className="super-admin-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAVBAR CENTER - NAVIGATION MENU */}
        <div className={`super-admin-nav-wrapper ${menuOpen ? "open" : ""}`}>
          <ul className="super-admin-nav-menu">
            <li className="super-admin-nav-item">
              <Link
                to="admins"
                className={`super-admin-nav-link ${isActive("admins")}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="super-admin-nav-icon">👥</span>
                <span>Manage Admins</span>
              </Link>
            </li>
            <li className="super-admin-nav-item">
              <Link
                to="products"
                className={`super-admin-nav-link ${isActive("products")}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="super-admin-nav-icon">📦</span>
                <span>Manage Products</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* NAVBAR RIGHT - ACTIONS */}
        <div className="super-admin-navbar-actions">
          <button className="super-admin-logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="super-admin-main-content">
        <main className="super-admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}