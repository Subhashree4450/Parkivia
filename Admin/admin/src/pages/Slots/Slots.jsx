// import React, { useEffect, useState } from "react";
// import "./Slots.css";

// const Slots = () => {
//     const [totalSlots, setTotalSlots] = useState("");

//     useEffect(() => {
//         fetchParkingConfig();
//     }, []);

//     const fetchParkingConfig = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch("http://localhost:3000/admin/config", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`, // ✅ Fixed template literal
//                     "Content-Type": "application/json"
//                 }
//             });
//             const data = await response.json();
//             if (data.totalSlots !== undefined) {
//                 setTotalSlots(data.totalSlots); // ✅ Ensured value is set correctly
//             }
//         } catch (error) {
//             console.error("Error fetching parking config:", error);
//         }
//     };

//     const updateParkingSlots = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch("http://localhost:3000/admin/slots", {
//                 method: "PUT",
//                 headers: {
//                     "Authorization": `Bearer ${token}`, // ✅ Fixed template literal
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ totalSlots }),
//             });
//             const data = await response.json();
//             alert(data.message);
//             fetchParkingConfig();
//         } catch (error) {
//             console.error("Error updating parking slots:", error);
//         }
//     };

//     return (
//         <div className="slots-section">
//             <h2>Update Parking Slots</h2>
//             <label>Total Slots:</label>
//             <input
//                 type="number"
//                 className="slots-input"
//                 value={totalSlots}
//                 onChange={(e) => setTotalSlots(e.target.value)}
//             />
//             <button className="slots-button" onClick={updateParkingSlots}>
//                 Update Slots
//             </button>
//         </div>
//     );
// };

// export default Slots;


import React, { useEffect, useState } from "react";
import "./Slots.css";

const Slots = () => {
    const [totalSlots, setTotalSlots] = useState("");

    useEffect(() => {
        fetchParkingConfig();
    }, []);

    const fetchParkingConfig = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/config", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.totalSlots !== undefined) {
                setTotalSlots(data.totalSlots);
            }
        } catch (error) {
            console.error("Error fetching parking config:", error);
        }
    };

    const updateParkingSlots = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/slots", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ totalSlots }),
            });
            const data = await response.json();
            alert(data.message);
            fetchParkingConfig();
        } catch (error) {
            console.error("Error updating parking slots:", error);
        }
    };

    return (
        <div className="slots-section">
            <h2 className="slots-title">Update Parking Slots</h2>
            <div className="slots-form-group">
                <label className="slots-label">Total Slots</label>
                <input
                    type="number"
                    className="slots-input"
                    value={totalSlots}
                    onChange={(e) => setTotalSlots(e.target.value)}
                />
            </div>
            <button className="slots-button" onClick={updateParkingSlots}>
                Update Slots
            </button>
        </div>
    );
};

export default Slots;
