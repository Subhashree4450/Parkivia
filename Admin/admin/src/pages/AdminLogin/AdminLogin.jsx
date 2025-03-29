import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.role === "admin") {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    navigate("/admin/home");
                } else {
                    setError("Access denied. Only admins can log in.");
                }
            } else {
                setError(data.error || "Login failed.");
            }
        } catch (error) {
            setError("Server error. Try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1 className="login-title">Admin Panel</h1>
                <p className="login-subtitle">Secure access for administrators</p>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <h2 className="login-header">Admin Login</h2>
                    {error && <p className="login-error">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="login-form-group">
                            <label className="login-label">Employee ID</label>
                            <input
                                type="text"
                                className="login-input"
                                placeholder="Enter Employee ID"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-form-group">
                            <label className="login-label">Password</label>
                            <input
                                type="password"
                                className="login-input"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
