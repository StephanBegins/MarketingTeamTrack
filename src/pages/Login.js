import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [role, setRole] = useState(""); // State for user role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select your role (Admin or Employee)");
      return;
    }

    if (role === "Admin" && email === "admin@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/home");
    } else if (role === "Employee" && email === "employee@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again."); 
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="gradient-header">
          <h1>Litvik Software Labs.</h1>
        </div>

        <h2 className="heading2">WELCOME BACK</h2>
        <p>Please select your role and enter your details to sign in</p>

        {/* Role Selection */}
        <div className="role-selection">
          <button 
            className={role === "Admin" ? "selected" : ""} 
            onClick={() => setRole("Admin")}
          >
            Admin
          </button>
          <button 
            className={role === "Employee" ? "selected" : ""} 
            onClick={() => setRole("Employee")}
          >
            Employee
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <div className="remember">
            <div className="remember-left">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember for 30 days</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>


          <button type="submit" className="login-button">Sign in</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
