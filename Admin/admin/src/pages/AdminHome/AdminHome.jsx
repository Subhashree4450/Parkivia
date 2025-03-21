

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./AdminHome.css";

// // const AdminHome = () => {
// //     const navigate = useNavigate();
// //     const [isAdmin, setIsAdmin] = useState(false);
// //     const [selectedTab, setSelectedTab] = useState("slots");
// //     const [parkingConfig, setParkingConfig] = useState(null);
// //     const [workers, setWorkers] = useState([]);
// //     const [totalSlots, setTotalSlots] = useState("");
// //     const [pricing, setPricing] = useState({
// //         peak: { startTime: "", endTime: "", pricePerHour: "" },
// //         midPeak: { startTime: "", endTime: "", pricePerHour: "" },
// //         offPeak: { startTime: "", endTime: "", pricePerHour: "" }
// //     });

// //     useEffect(() => {
// //         const token = localStorage.getItem("token");
// //         const role = localStorage.getItem("role");

// //         if (!token || role !== "admin") {
// //             navigate("/admin/login");
// //         } else {
// //             setIsAdmin(true);
// //             fetchParkingConfig(token);
// //             fetchWorkers(token);
// //         }
// //     }, [navigate]);

// //     const fetchParkingConfig = async (token) => {
// //         try {
// //             const response = await fetch("http://localhost:3000/admin/config", {
// //                 method: "GET",
// //                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
// //             });
// //             const data = await response.json();
// //             setParkingConfig(data);
// //             setTotalSlots(data.totalSlots);
// //             setPricing(data.pricing);
// //         } catch (error) {
// //             console.error("Error fetching parking config:", error);
// //         }
// //     };

// //     const fetchWorkers = async (token) => {
// //         try {
// //             const response = await fetch("http://localhost:3000/workers", {
// //                 method: "GET",
// //                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
// //             });
// //             const data = await response.json();
// //             setWorkers(data);
// //         } catch (error) {
// //             console.error("Error fetching workers:", error);
// //         }
// //     };

// //     const updateParkingSlots = async () => {
// //         const token = localStorage.getItem("token");
// //         try {
// //             const response = await fetch("http://localhost:3000/admin/slots", {
// //                 method: "PUT",
// //                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
// //                 body: JSON.stringify({ totalSlots }),
// //             });
// //             const data = await response.json();
// //             alert(data.message);
// //             fetchParkingConfig(token);
// //         } catch (error) {
// //             console.error("Error updating parking slots:", error);
// //         }
// //     };

// //     const updatePricing = async () => {
// //         const token = localStorage.getItem("token");
// //         try {
// //             const response = await fetch("http://localhost:3000/admin/pricing", {
// //                 method: "PUT",
// //                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
// //                 body: JSON.stringify(pricing),
// //             });
// //             const data = await response.json();
// //             alert(data.message);
// //             fetchParkingConfig(token);
// //         } catch (error) {
// //             console.error("Error updating pricing:", error);
// //         }
// //     };

// //     const handleLogout = () => {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("role");
// //         navigate("/admin/login");
// //     };

// //     if (!isAdmin || !parkingConfig) return <p className="loading-text">Loading...</p>;

// //     return (
// //         <div className="admin-home">
// //             <h1>Admin Dashboard</h1>

// //             {/* Navbar */}
// //             <nav className="admin-navbar">
// //                 <button onClick={() => setSelectedTab("slots")} className={selectedTab === "slots" ? "active" : ""}>
// //                     Parking Slots
// //                 </button>
// //                 <button onClick={() => setSelectedTab("pricing")} className={selectedTab === "pricing" ? "active" : ""}>
// //                     Pricing
// //                 </button>
// //                 <button onClick={() => setSelectedTab("workers")} className={selectedTab === "workers" ? "active" : ""}>
// //                     Workers
// //                 </button>
// //             </nav>

// //             {/* Conditional Rendering for Sections */}
//             // {selectedTab === "slots" && (
//             //     <div className="admin-section">
//             //         <h2>Update Parking Slots</h2>
//             //         <label>Total Slots:</label>
//             //         <input
//             //             type="number"
//             //             className="admin-input"
//             //             value={totalSlots}
//             //             onChange={(e) => setTotalSlots(e.target.value)}
//             //         />
//             //         <button className="admin-button" onClick={updateParkingSlots}>Update Slots</button>
//             //     </div>
//             // )}

//             // {selectedTab === "pricing" && (
//             //     <div className="admin-section">
//             //         <h2>Update Pricing</h2>
//             //         <div className="pricing-container">
//             //             {["peak", "midPeak", "offPeak"].map((category) => (
//             //                 <div key={category} className="pricing-group">
//             //                     <h3>
//             //                         {category === "peak" ? "Peak" : category === "midPeak" ? "Mid-Peak" : "Off-Peak"} Hours
//             //                     </h3>
//             //                     <label>Start Time:</label>
//             //                     <input
//             //                         type="time"
//             //                         className="admin-input"
//             //                         value={pricing[category]?.startTime || ""}
//             //                         onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], startTime: e.target.value } })}
//             //                     />
//             //                     <label>End Time:</label>
//             //                     <input
//             //                         type="time"
//             //                         className="admin-input"
//             //                         value={pricing[category]?.endTime || ""}
//             //                         onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], endTime: e.target.value } })}
//             //                     />
//             //                     <label>Price per Hour:</label>
//             //                     <input
//             //                         type="number"
//             //                         className="admin-input"
//             //                         value={pricing[category]?.pricePerHour || ""}
//             //                         onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], pricePerHour: e.target.value } })}
//             //                     />
//             //                 </div>
//             //             ))}
//             //         </div>
//             //         <button className="admin-button" onClick={updatePricing}>Update Pricing</button>
//             //     </div>
//             // )}

//             // {selectedTab === "workers" && (
//             //     <div className="admin-section">
//             //         <h2>Manage Gate Workers</h2>
//             //         <button className="admin-button" onClick={() => navigate("/admin/signup")}>Add Worker</button>
//             //         <div className="workers-list">
//             //             {workers.map((worker) => (
//             //                 <div key={worker._id} className="worker-card">
//             //                     <p><strong>ID:</strong> {worker.employeeId}</p>
//             //                     <p><strong>Name:</strong> {worker.username}</p>
//             //                 </div>
//             //             ))}
//             //         </div>
//             //     </div>
//             // )}

// //             {/* Logout Button */}
// //             <button className="logout-button" onClick={handleLogout}>Logout</button>
// //         </div>
// //     );
// // };

// // export default AdminHome;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminHome.css";

// const AdminHome = () => {
//     const navigate = useNavigate();
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [selectedTab, setSelectedTab] = useState("slots");
//     const [parkingConfig, setParkingConfig] = useState(null);
//     const [workers, setWorkers] = useState([]);
//     const [totalSlots, setTotalSlots] = useState("");
//     const [pricing, setPricing] = useState({
//         peak: { startTime: "", endTime: "", pricePerHour: "" },
//         midPeak: { startTime: "", endTime: "", pricePerHour: "" },
//         offPeak: { startTime: "", endTime: "", pricePerHour: "" }
//     });
//     const [history, setHistory] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         if (!token || role !== "admin") {
//             navigate("/admin/login");
//         } else {
//             setIsAdmin(true);
//             fetchParkingConfig(token);
//             fetchWorkers(token);
//             fetchHistory(token);
//         }
//     }, [navigate]);

//     const fetchParkingConfig = async (token) => {
//         try {
//             const response = await fetch("http://localhost:3000/admin/config", {
//                 method: "GET",
//                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
//             });
//             const data = await response.json();
//             setParkingConfig(data);
//             setTotalSlots(data.totalSlots);
//             setPricing(data.pricing);
//         } catch (error) {
//             console.error("Error fetching parking config:", error);
//         }
//     };

//     const fetchWorkers = async (token) => {
//         try {
//             const response = await fetch("http://localhost:3000/workers", {
//                 method: "GET",
//                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
//             });
//             const data = await response.json();
//             setWorkers(data);
//         } catch (error) {
//             console.error("Error fetching workers:", error);
//         }
//     };

//     const fetchHistory = async (token) => {
//         try {
//             const response = await fetch("http://localhost:3000/admin/history", {
//                 method: "GET",
//                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
//             });
//             const data = await response.json();

//             // Filter only data from the last 7 days
//             const sevenDaysAgo = new Date();
//             sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//             const filteredData = data.filter(item => {
//                 const inTime = new Date(item.inTime);
//                 return inTime >= sevenDaysAgo;
//             });

//             setHistory(filteredData);
//         } catch (error) {
//             console.error("Error fetching history:", error);
//         }
//     };

//     const updateParkingSlots = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch("http://localhost:3000/admin/slots", {
//                 method: "PUT",
//                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
//                 body: JSON.stringify({ totalSlots }),
//             });
//             const data = await response.json();
//             alert(data.message);
//             fetchParkingConfig(token);
//         } catch (error) {
//             console.error("Error updating parking slots:", error);
//         }
//     };

//     const updatePricing = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch("http://localhost:3000/admin/pricing", {
//                 method: "PUT",
//                 headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
//                 body: JSON.stringify(pricing),
//             });
//             const data = await response.json();
//             alert(data.message);
//             fetchParkingConfig(token);
//         } catch (error) {
//             console.error("Error updating pricing:", error);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         navigate("/admin/login");
//     };

//     const filteredHistory = history.filter(item =>
//         item.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.inTime.includes(searchQuery) ||
//         item.outTime.includes(searchQuery)
//     );

//     if (!isAdmin || !parkingConfig) return <p className="loading-text">Loading...</p>;

//     return (
//         <div className="admin-home">
//             <h1>Admin Dashboard</h1>

//             {/* Navbar */}
//             <nav className="admin-navbar">
//                 <button onClick={() => setSelectedTab("slots")} className={selectedTab === "slots" ? "active" : ""}>Parking Slots</button>
//                 <button onClick={() => setSelectedTab("pricing")} className={selectedTab === "pricing" ? "active" : ""}>Pricing</button>
//                 <button onClick={() => setSelectedTab("workers")} className={selectedTab === "workers" ? "active" : ""}>Workers</button>
//                 <button onClick={() => setSelectedTab("history")} className={selectedTab === "history" ? "active" : ""}>History</button>
//             </nav>

//             {selectedTab === "slots" && (
//                 <div className="admin-section">
//                     <h2>Update Parking Slots</h2>
//                     <label>Total Slots:</label>
//                     <input
//                         type="number"
//                         className="admin-input"
//                         value={totalSlots}
//                         onChange={(e) => setTotalSlots(e.target.value)}
//                     />
//                     <button className="admin-button" onClick={updateParkingSlots}>Update Slots</button>
//                 </div>
//             )}

//             {selectedTab === "pricing" && (
//                 <div className="admin-section">
//                     <h2>Update Pricing</h2>
//                     <div className="pricing-container">
//                         {["peak", "midPeak", "offPeak"].map((category) => (
//                             <div key={category} className="pricing-group">
//                                 <h3>
//                                     {category === "peak" ? "Peak" : category === "midPeak" ? "Mid-Peak" : "Off-Peak"} Hours
//                                 </h3>
//                                 <label>Start Time:</label>
//                                 <input
//                                     type="time"
//                                     className="admin-input"
//                                     value={pricing[category]?.startTime || ""}
//                                     onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], startTime: e.target.value } })}
//                                 />
//                                 <label>End Time:</label>
//                                 <input
//                                     type="time"
//                                     className="admin-input"
//                                     value={pricing[category]?.endTime || ""}
//                                     onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], endTime: e.target.value } })}
//                                 />
//                                 <label>Price per Hour:</label>
//                                 <input
//                                     type="number"
//                                     className="admin-input"
//                                     value={pricing[category]?.pricePerHour || ""}
//                                     onChange={(e) => setPricing({ ...pricing, [category]: { ...pricing[category], pricePerHour: e.target.value } })}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <button className="admin-button" onClick={updatePricing}>Update Pricing</button>
//                 </div>
//             )}

//             {selectedTab === "workers" && (
//                 <div className="admin-section">
//                     <h2>Manage Gate Workers</h2>
//                     <button className="admin-button" onClick={() => navigate("/admin/signup")}>Add Worker</button>
//                     <div className="workers-list">
//                         {workers.map((worker) => (
//                             <div key={worker._id} className="worker-card">
//                                 <p><strong>ID:</strong> {worker.employeeId}</p>
//                                 <p><strong>Name:</strong> {worker.username}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* History Section */}
//             {selectedTab === "history" && (
//                 <div className="admin-section">
//                     <h2>Parking History (Last 7 Days)</h2>
//                     <input
//                         type="text"
//                         className="admin-input"
//                         placeholder="Search by vehicle number, date or time..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <table className="history-table">
//                         <thead>
//                             <tr>
//                                 <th>Vehicle Number</th>
//                                 <th>In Time</th>
//                                 <th>Out Time</th>
//                                 <th>Duration (min)</th>
//                                 <th>Price</th>
//                                 <th>Scanned By</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredHistory.map((record) => (
//                                 <tr key={record._id}>
//                                     <td>{record.vehicleNumber}</td>
//                                     <td>{new Date(record.inTime).toLocaleString()}</td>
//                                     <td>{new Date(record.outTime).toLocaleString()}</td>
//                                     <td>{record.duration}</td>
//                                     <td>₹{record.price}</td>
//                                     <td>{record.scannedBy}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Logout Button */}
//             <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default AdminHome;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Slots from "../Slots/Slots";
// import Pricing from "../Pricing/Pricing";
// import Workers from "../Workers/Workers";
// import History from "../History/History";
// import "./AdminHome.css";

// const AdminHome = () => {
//     const navigate = useNavigate();
//     const [selectedTab, setSelectedTab] = useState("slots");

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         navigate("/admin/login");
//     };

//     return (
//         <div className="admin-home">
//             <h1>Welcome, Admin!</h1>
//             <nav className="admin-navbar">
//                 <button onClick={() => setSelectedTab("slots")}>Parking Slots</button>
//                 <button onClick={() => setSelectedTab("pricing")}>Pricing</button>
//                 <button onClick={() => setSelectedTab("workers")}>Workers</button>
//                 <button onClick={() => setSelectedTab("history")}>History</button>
//             </nav>

//             {selectedTab === "slots" && <Slots />}
//             {selectedTab === "pricing" && <Pricing />}
//             {selectedTab === "workers" && <Workers />}
//             {selectedTab === "history" && <History />}

//             <button className="logout-button" onClick={handleLogout}>
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default AdminHome;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Slots from "../Slots/Slots";
// import Pricing from "../Pricing/Pricing";
// import Workers from "../Workers/Workers";
// import History from "../History/History";
// import Revenue from "../Revenue/Revenue";
// import "./AdminHome.css";

// const AdminHome = () => {
//     const navigate = useNavigate();
//     const [selectedTab, setSelectedTab] = useState("slots");

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         navigate("/admin/login");
//     };

//     return (
//         <div className="admin-home">
//             <h1>Welcome, Admin!</h1>
//             <nav className="admin-navbar">
//                 <button onClick={() => setSelectedTab("slots")}>Parking Slots</button>
//                 <button onClick={() => setSelectedTab("pricing")}>Pricing</button>
//                 <button onClick={() => setSelectedTab("workers")}>Workers</button>
//                 <button onClick={() => setSelectedTab("history")}>History</button>
//                 <button onClick={() => setSelectedTab("revenue")}>Revenue</button>
//             </nav>

//             {selectedTab === "slots" && <Slots />}
//             {selectedTab === "pricing" && <Pricing />}
//             {selectedTab === "workers" && <Workers />}
//             {selectedTab === "history" && <History />}
//             {selectedTab === "revenue" && <Revenue />}

//             <button className="logout-button" onClick={handleLogout}>
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default AdminHome;


import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

const AdminHome = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="mt-16 p-4"> {/* Add margin to avoid navbar overlap */}
        <Outlet /> {/* Renders the active child route */}
      </div>
    </div>
  );
};

export default AdminHome;



