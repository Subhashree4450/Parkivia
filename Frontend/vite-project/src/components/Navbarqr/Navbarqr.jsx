import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbarqr.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem("token"); 
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Parkivia</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/qrcode">QR-Generator</Link>
        <Link to="/outgate">Out-Scanner</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
