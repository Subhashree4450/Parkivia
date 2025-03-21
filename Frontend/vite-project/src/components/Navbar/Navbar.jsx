import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Separate CSS for Navbar

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">PARKIVIA</Link> {/* Clicking on the brand also takes you home */}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-button">Home</Link>

        {/* Login Button (Direct Link to SignIn.jsx) */}
        <Link to="/Login" className="navbar-button">Login</Link>

        <Link to="/about-us" className="navbar-button">About Us</Link>
        <Link to="/help" className="navbar-button">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;