import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Add appropriate styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submission

    // Dummy authentication (replace with API call)
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
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in</p>

        <div className="social-login">
          <button className="google">G</button>
          <button className="apple"></button>
          <button className="facebook">f</button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <div className="remember">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember for 30 days</label>
          </div>

          <buttonlogin type="submit">Sign in</buttonlogin>
        </form>

        <p>
          Don’t have an account? <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
