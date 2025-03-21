// import React, { useEffect, useState } from "react";
// import "./History.css";

// const History = () => {
//     const [history, setHistory] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     const fetchHistory = async () => {
//         const token = localStorage.getItem("token");
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

//     const filteredHistory = history.filter(item =>
//         item.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.inTime.includes(searchQuery) ||
//         item.outTime.includes(searchQuery) ||
//         item.scannedBy.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//             <div className="history-container">
//             <h2 className="history-title">Parking History (Last 7 Days)</h2>
//             <div className="history-search-container">
//             <input
//                 type="text"
//                 className="history-input"
//                 placeholder="Search by vehicle number, date, time, or employee ID..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="history-search-btn">Search</button>
//             </div>
//             <table className="history-table">
//             <thead>
//                 <tr>
//                     <th>Vehicle Number</th>
//                     <th>In Time</th>
//                     <th>Out Time</th>
//                     <th>Duration (min)</th>
//                     <th>Price</th>
//                     <th>Scanned By</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {filteredHistory.map((record) => (
//                     <tr key={record._id}>
//                         <td>{record.vehicleNumber}</td>
//                         <td>{new Date(record.inTime).toLocaleString()}</td>
//                         <td>{new Date(record.outTime).toLocaleString()}</td>
//                         <td>{record.duration}</td>
//                         <td>₹{record.price}</td>
//                         <td>{record.scannedBy}</td>
//                     </tr>
//                 ))}
//             </tbody>
//             </table>
//         </div>
//     );
// };

// export default History;



import React, { useEffect, useState } from "react";
import "./History.css";

const History = () => {
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/history", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });
            const data = await response.json();

            // Filter only data from the last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const filteredData = data.filter(item => {
                const inTime = new Date(item.inTime);
                return inTime >= sevenDaysAgo;
            });

            setHistory(filteredData);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const filteredHistory = history.filter(item =>
        item.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.inTime.includes(searchQuery) ||
        item.outTime.includes(searchQuery) ||
        item.scannedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="history-container">
            {/* Title + Search Section */}
            <div className="history-header">
                <h2 className="history-title">Parking History (Last 7 Days)</h2>
                <div className="history-search-container">
                    <input
                        type="text"
                        className="history-input"
                        placeholder="Search by vehicle number, date, time, or employee ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="history-search-btn">Search</button>
                </div>
            </div>

            {/* Table Section */}
            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Vehicle Number</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Duration (min)</th>
                            <th>Price</th>
                            <th>Scanned By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.map((record) => (
                            <tr key={record._id}>
                                <td>{record.vehicleNumber}</td>
                                <td>{new Date(record.inTime).toLocaleString()}</td>
                                <td>{new Date(record.outTime).toLocaleString()}</td>
                                <td>{record.duration}</td>
                                <td>₹{record.price}</td>
                                <td>{record.scannedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
