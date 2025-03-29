import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import "./AdminHome.css";

const AdminHome = () => {
    const [chanceOfGettingSlot, setChanceOfGettingSlot] = useState(null);
    const [revenueEstimate, setRevenueEstimate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [pricing, setPricing] = useState({
        peak: { pricePerHour: "60" },
        midPeak: { pricePerHour: "8" },
        offPeak: { pricePerHour: "5" }
    });

    const [totalSlotsAvailable] = useState(200); 
    const [avgParkingDuration] = useState(2); 
    
    useEffect(() => {
        fetchChanceOfGettingSlot();
        fetchPricing();
    }, []);

    useEffect(() => {
        if (chanceOfGettingSlot !== null) {
            calculateRevenue();
        }
    }, [chanceOfGettingSlot, pricing]);

    const fetchPricing = async () => {
        const token = localStorage.getItem("token"); // Extract token from localStorage
        try {
            const response = await fetch("http://localhost:3000/admin/config", {
                method: "GET",
                headers: { 
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json" 
                }
            });
            const data = await response.json();
            setPricing(data.pricing);
        } catch (error) {
            console.error("Error fetching pricing:", error);
        }
    };

    const fetchChanceOfGettingSlot = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // No auth header here
                body: JSON.stringify({ Total_Vehicles_Entered: 100 }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data && typeof data.chanceOfGettingSlot === "number") {
                setChanceOfGettingSlot(data.chanceOfGettingSlot);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Failed to fetch chance of getting slot:", error);
            setError("Failed to fetch data. Check API.");
        } finally {
            setLoading(false);
        }
    };

    const calculateRevenue = () => {
        if (chanceOfGettingSlot !== null) {
            const occupancyRate = (100 - chanceOfGettingSlot) / 100;
            const vehiclesParked = occupancyRate * totalSlotsAvailable;
            const pricePerHour = parseFloat(pricing.peak.pricePerHour) || 0;
            const estimatedRevenue = vehiclesParked * pricePerHour * avgParkingDuration;
            setRevenueEstimate(estimatedRevenue.toFixed(2));
        }
    };

    return (
      <div className="admin-dashboard-container">
          <AdminNavbar />
          
          <div className="admin-dashboard-content">
              <h1>Welcome to the Admin Dashboard</h1>
              <p>Manage parking statistics effortlessly!</p>
  
              {/* Card Component for Stats */}
              <div className="admin-dashboard-card">
                  <h2>Parking Statistics</h2>
                  
                  <p><strong>Chance of Getting a Parking Slot:</strong> 
                      {loading ? (
                          <span className="loading"> Loading...</span>
                      ) : error ? (
                          <span className="error">{error}</span>
                      ) : (
                          <span className="chance-value"> {chanceOfGettingSlot}%</span>
                      )}
                  </p>
  
                  <p><strong>Estimated Revenue Potential:</strong> 
                      {chanceOfGettingSlot !== null && revenueEstimate !== null ? (
                          <span className="revenue-value"> ₹{revenueEstimate}</span>
                      ) : (
                          <span className="loading"> Calculating...</span>
                      )}
                  </p>
              </div>
  
              <Outlet />
          </div>
      </div>
  );
  
   
};

export default AdminHome;



