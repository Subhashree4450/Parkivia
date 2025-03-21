import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const Revenue = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [peakDays, setPeakDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { dailyRevenue, weeklyRevenue, monthlyRevenue, peakDays } =
          response.data;

        setDailyRevenue(
          dailyRevenue.map((item) => ({
            date: `${item._id.day}/${item._id.month}/${item._id.year}`,
            revenue: item.totalRevenue,
          }))
        );

        setWeeklyRevenue(
          weeklyRevenue.map((item) => ({
            week: `Week ${item._id.week}, ${item._id.year}`,
            revenue: item.totalRevenue,
          }))
        );

        setMonthlyRevenue(
          monthlyRevenue.map((item) => ({
            month: `${item._id.month}/${item._id.year}`,
            revenue: item.totalRevenue,
          }))
        );

        setPeakDays(
          peakDays.map((item) => ({
            date: `${item._id.day}/${item._id.month}/${item._id.year}`,
            revenue: item.totalRevenue,
          }))
        );
      } catch (error) {
        setError("Failed to fetch revenue data. Please try again later.");
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  const renderBarChart = (title, data, xKey, color, xAxisLabel, yAxisLabel) => (
    <div style={{ marginBottom: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        {title}
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            {/* Grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            {/* X-Axis */}
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12 }}
              label={{
                value: xAxisLabel,
                position: "bottom",
                offset: 5,
                fontSize: 14,
                fill: "#555",
              }}
            />

            {/* Y-Axis */}
            <YAxis
              tickFormatter={(value) => `₹${value}`}
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                offset: -5,
                fontSize: 14,
                fill: "#555",
              }}
            />

            {/* Tooltip and Legend */}
            <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
            <Legend verticalAlign="top" align="right" height={36} />

            {/* Bar with labels */}
            <Bar dataKey="revenue" fill={color} radius={[5, 5, 0, 0]}>
              <LabelList dataKey="revenue" position="top" fill="#333" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No data available</p>
      )}
    </div>
  );

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {loading && <p style={{ textAlign: "center" }}>Loading revenue data...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {renderBarChart(
            "📊 Daily Revenue",
            dailyRevenue,
            "date",
            "#4CAF50",
            "Date",
            "Revenue (₹)"
          )}
          {renderBarChart(
            "📈 Weekly Revenue",
            weeklyRevenue,
            "week",
            "#2196F3",
            "Week",
            "Revenue (₹)"
          )}
          {renderBarChart(
            "📅 Monthly Revenue",
            monthlyRevenue,
            "month",
            "#FF9800",
            "Month",
            "Revenue (₹)"
          )}

          {/* Peak Days Table */}
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "#333",
            }}
          >
            🔥 Peak Days (Top 5)
          </h2>
          {peakDays.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px" }}>
                    Date
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px" }}>
                    Revenue (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {peakDays.map((day, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index === 0 ? "#dcedc8" : "#fff",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <td style={{ padding: "12px", fontSize: "14px" }}>
                      {day.date}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: index === 0 ? "bold" : "normal",
                      }}
                    >
                      ₹{day.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>No peak day data available</p>
          )}
        </>
      )}
    </div>
  );
};

export default Revenue;
