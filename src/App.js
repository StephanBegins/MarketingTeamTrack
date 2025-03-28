import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", checkAuth); // Listen for storage changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
            <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/reports" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
