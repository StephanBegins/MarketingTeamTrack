import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
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

    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="gradient-header">
          <h1>Litvik Software Labs.</h1>
        </div>

        <h2>Welcome back</h2>
        <p>Please enter your details to sign in</p>

        <div className="social-login">
          <button className="google">G</button>
          <button className="apple"></button>
          <button className="facebook">f</button>
        </div>

        <p className="divider">or</p>

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

          {error && <p className="error-message">{error}</p>}

          <div className="remember">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember for 30 days</label>
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
