import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeId, password } = formData;

    if (!employeeId || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, password })
      });

      const data = await response.json();

      if (response.ok) {
          // ✅ Store token in localStorage
        localStorage.setItem("token", data.token);    //edit
        toast.success("Login successful!", { autoClose: 2000 }); // Show toast notification
        setTimeout(() => navigate("/qrcode"), 2000); // Delay navigation slightly
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* ToastContainer must be inside component tree */}
      <ToastContainer position="top-left" autoClose={1000} />

      {/* Left Section */}
      <div className="login-left">
        <h1 className="login-title">Parkivia</h1>
        <p className="login-subtitle">Parking made simple!</p>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-header">LOGIN</h2>
          {error && <p className="login-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="employeeId" className="login-label">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                className="login-input"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="login-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


