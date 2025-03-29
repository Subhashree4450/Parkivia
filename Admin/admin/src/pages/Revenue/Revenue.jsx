import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "./Revenue.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";

const Revenue = () => {
    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [employeeStats, setEmployeeStats] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/revenue", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });
            const data = await response.json();

            const formattedDailyRevenue = data.dailyRevenue
                .map(item => {
                    if (item.date) {
                        const date = new Date(item.date);
                        if (!isNaN(date.getTime())) {
                            return {
                                day: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
                                revenue: item.totalRevenue || 0,
                                vehicleCount: item.vehicleCount || 0
                            };
                        }
                    }
                    console.warn("Invalid Date Found:", item.date);
                    return null;
                })
                .filter(Boolean);

            setDailyRevenue(formattedDailyRevenue);
            setEmployeeStats(data.employeeStats);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="revenue-section">
                {/* ✅ Title */}
                <h2 className="revenue-title">Revenue and Vehicle Stats</h2>

                {/* ✅ Side-by-Side Bar Charts */}
                <div className="charts-container">
                    {/* Daily Revenue Bar Chart */}
                    <div className="chart-item">
                        <h3 className="chart-title">Daily Revenue for the Past Week</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dailyRevenue} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                                <XAxis dataKey="day" tick={{ fill: "#fff", fontSize: 12 }} interval={0} />
                                <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ color: "#fff" }} />
                                <Bar dataKey="revenue" fill="#FFA500" name="Revenue (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Daily Vehicle Count Bar Chart */}
                    <div className="chart-item">
                        <h3 className="chart-title">Daily Vehicle Count for the Past Week</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dailyRevenue} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                                <XAxis dataKey="day" tick={{ fill: "#fff", fontSize: 12 }} interval={0} />
                                <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ color: "#fff" }} />
                                <Bar dataKey="vehicleCount" fill="#FF7F50" name="Vehicle Count" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ✅ Employee Stats */}
                <div className="workers-section">
                    <h3 className="workers-title">Employee Scanning Stats</h3>
                    <div className="workers-list">
                        {employeeStats.map((stat) => (
                            <div key={stat.employeeId} className="worker-card">
                                <div className="worker-name">{stat.employeeId}</div>
                                <div className="worker-id">₹{stat.totalScannedAmount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;
