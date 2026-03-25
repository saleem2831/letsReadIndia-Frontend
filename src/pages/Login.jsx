// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/api";


// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await login({ email, password });

//     if (res.token) {
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("role", res.user.role);

//       if (res.user.role === "super_admin") {
//         navigate("/super-admin");
//       } else {
//         navigate("/admin");
//       }
//     } else {
//       alert(res.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button>Login</button>
//     </form>
//   );
// }


import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/lets-read-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });

      const token = res.token;
      const role = res.admin?.role;

      if (!token || !role) {
        setError("Invalid login credentials. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("adminName", res.admin.name);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      }

      if (role === "super_admin") {
        navigate("/super-admin");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* ANIMATED BACKGROUND */}
      <div className="login-background">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>

      {/* LOGIN CONTAINER */}
      <div className="login-container">
        {/* HEADER */}
        <div className="login-header">
          {/* <div className="login-icon-box">🔐</div> */}
          <img src={logo} alt="Let's Read India" className="login-logo" />
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {/* LOGIN FORM CARD */}
        <div className="login-form-card">
          {/* ERROR ALERT */}
          {error && (
            <div className="alert-error show">
              <div className="alert-icon">❌</div>
              <div className="alert-content">
                <h4>Login Failed</h4>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} noValidate>
            {/* EMAIL FIELD */}
            <div className="login-form-group">
              <label className="login-form-label">
                <span className="login-form-label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                className="login-form-input"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className="login-form-group">
              <label className="login-form-label">
                <span className="login-form-label-icon">🔑</span>
                Password
              </label>
              <div className="login-password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            {/* <div className="login-form-options">
              <label className="login-form-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="login-form-forgot">
                Forgot password?
              </a>
            </div> */}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <>
                  <div className="login-btn-spinner"></div>
                  <span className="login-btn-text">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="login-btn-text">Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="login-footer">
          <p className="login-footer-copyright">
            © 2026 LetsReadIndia. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}