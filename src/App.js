import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
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
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Convert string to boolean

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes Wrapped Inside Layout */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
            <Route path="/tasks" element={<ProtectedLayout><Tasks /></ProtectedLayout>} />
            <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
          </>
        ) : (
          // Redirect to login if not authenticated
          <>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/tasks" element={<Navigate to="/" />} />
            <Route path="/reports" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
