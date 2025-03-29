import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

const HomePage = () => {
  const [parkingData, setParkingData] = useState({
    totalSlots: 0,
    availableSlots: 0,
    chanceOfGettingSlot: 0
  });

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/parking-details");
        const data = await response.json();
        setParkingData(data);
      } catch (error) {
        console.error("Failed to fetch parking details:", error);
      }
    };

    fetchParkingData();
  }, []);

  return (
    <div className="homepage-container">
      <Navbar />
      
      <div className="homepage-content">
        <h1>Welcome to Parkivia</h1>
        <p>Parking made simple!</p>

        {/* Card Component */}
        <div className="homepage-card">
          <h2>Parking Details</h2>
          <p><strong>Total Number Of Slots:</strong> {parkingData.totalSlots}</p>
          <p><strong>Number Of Slots Available:</strong> {parkingData.availableSlots}</p>
          <p><strong>Chance Of Getting Your Slot:</strong> {parkingData.chanceOfGettingSlot}%</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
