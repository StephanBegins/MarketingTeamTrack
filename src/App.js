import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return ( 
    <Router>
      <Header />
      <div className="app-container">
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  ); 
}

export default App;
