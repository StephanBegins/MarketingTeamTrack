import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Login from "./pages/Login"; // Import Login Page
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      {isAuthenticated && <Header />}
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <Routes>
          {/* Login Route (Redirects if already authenticated) */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />

          {/* Protected Routes (Only accessible when logged in) */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />
          <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
