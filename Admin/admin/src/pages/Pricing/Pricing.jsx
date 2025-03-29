
import React, { useEffect, useState } from "react";
import "./Pricing.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";

const Pricing = () => {
    const [pricing, setPricing] = useState({
        peak: { startTime: "", endTime: "", pricePerHour: "" },
        midPeak: { startTime: "", endTime: "", pricePerHour: "" },
        offPeak: { startTime: "", endTime: "", pricePerHour: "" }
    });

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/config", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });
            const data = await response.json();
            setPricing(data.pricing);
        } catch (error) {
            console.error("Error fetching pricing:", error);
        }
    };

    const updatePricing = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/pricing", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(pricing),
            });
            const data = await response.json();
            alert(data.message);
            fetchPricing();
        } catch (error) {
            console.error("Error updating pricing:", error);
        }
    };

    return (
        <div>
            <AdminNavbar/>
            <div className="pricing-section">
                <h2 className="pricing-header">Update Pricing</h2>
                <div className="pricing-row">
                    {["peak", "midPeak", "offPeak"].map((category) => (
                        <div key={category} className="pricing-item">
                            <h3 className="pricing-subheader">
                                {category === "peak" ? "Peak" : category === "midPeak" ? "Mid-Peak" : "Off-Peak"} Hours
                            </h3>
                            <div className="input-group">
                                <label>Start Time:</label>
                                <input
                                    type="time"
                                    value={pricing[category]?.startTime || ""}
                                    onChange={(e) =>
                                        setPricing({ ...pricing, [category]: { ...pricing[category], startTime: e.target.value } })
                                    }
                                />
                            </div>
                            <div className="input-group">
                                <label>End Time:</label>
                                <input
                                    type="time"
                                    value={pricing[category]?.endTime || ""}
                                    onChange={(e) =>
                                        setPricing({ ...pricing, [category]: { ...pricing[category], endTime: e.target.value } })
                                    }
                                />
                            </div>
                            <div className="input-group">
                                <label>Price per Hour:</label>
                                <input
                                    type="number"
                                    value={pricing[category]?.pricePerHour || ""}
                                    onChange={(e) =>
                                        setPricing({ ...pricing, [category]: { ...pricing[category], pricePerHour: e.target.value } })
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="pricing-btn" onClick={updatePricing}>
                    Update Pricing
                </button>
            </div>
        </div>
    );
};

export default Pricing;

