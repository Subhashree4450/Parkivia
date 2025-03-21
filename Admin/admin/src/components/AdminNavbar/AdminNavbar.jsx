import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <span>Admin Panel</span>
      </div>
      <div className="admin-navbar-links">
        {/* Navigation Buttons */}
        <button onClick={() => navigate('/admin/slots')} className="admin-navbar-button">Slots</button>
        <button onClick={() => navigate('/admin/pricing')} className="admin-navbar-button">Pricing</button>
        <button onClick={() => navigate('/admin/workers')} className="admin-navbar-button">Workers</button>
        <button onClick={() => navigate('/admin/history')} className="admin-navbar-button">History</button>
        <button onClick={() => navigate('/admin/revenue')} className="admin-navbar-button">Revenue</button>

        {/* Logout Button */}
        <button onClick={handleLogout} className="admin-navbar-button logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
