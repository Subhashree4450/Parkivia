
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <div 
        className="admin-navbar-brand" 
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <span>Admin Panel</span>
      </div>
      <div className="admin-navbar-links">
        <span className="admin-navbar-text" onClick={() => navigate('/admin/slots')}>Slots</span>
        <span className="admin-navbar-text" onClick={() => navigate('/admin/pricing')}>Pricing</span>
        <span className="admin-navbar-text" onClick={() => navigate('/admin/workers')}>Workers</span>
        <span className="admin-navbar-text" onClick={() => navigate('/admin/history')}>History</span>
        <span className="admin-navbar-text" onClick={() => navigate('/admin/revenue')}>Revenue</span>
        <span className="admin-navbar-text logout-text" onClick={() => {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }}>Logout</span>
      </div>
    </nav>
  );
};

export default AdminNavbar;

