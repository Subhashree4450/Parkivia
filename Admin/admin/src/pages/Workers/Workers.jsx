
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Workers.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";

const Workers = () => {
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/admin/workers", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error("Error fetching workers:", error);
        }
    };

    return (
        <div>
            <AdminNavbar/>
            <div className="workers-section">
                <h2 className="workers-title">Manage Gate Workers</h2>
                <div className="workers-list">
                    {workers.map((worker) => (
                        <div key={worker._id} className="worker-card">
                            <h3 className="worker-name">{worker.username}</h3>
                            <p className="worker-id">ID: {worker.employeeId}</p>
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate("/admin/signup")} className="workers-add-btn">
                    Add Worker
                </button>
            </div>
        </div>
    );
};

export default Workers;
