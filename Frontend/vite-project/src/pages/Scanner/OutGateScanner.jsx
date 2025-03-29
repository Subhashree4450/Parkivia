import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbarqr/Navbarqr"; // Import Navbar component
import "./OutGateScanner.css";

const OutGateScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const isScannerInitialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isScannerInitialized.current) {
      startScanner();
      isScannerInitialized.current = true;
    }

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = () => {
    stopScanner(); // Prevent multiple scanners

    setTimeout(() => {
      const readerDiv = document.getElementById("reader");
      if (readerDiv) readerDiv.innerHTML = ""; // Clear old scanner UI

      scannerRef.current = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });

      scannerRef.current.render(
        (decodedText) => {
          stopScanner();
          handleScan(decodedText);
        },
        (err) => console.warn("Scan Error:", err)
      );
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .clear()
        .then(() => {
          scannerRef.current = null;
          isScannerInitialized.current = false;
        })
        .catch((err) => console.warn("Scanner Clear Error:", err));
    }
  };

  const handleScan = async (decodedText) => {
    setError("");

    try {
      const parsedData = JSON.parse(decodedText);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization failed. Please log in again.");

      const decoded = jwtDecode(token);
      const employeeId = decoded.employeeId;

      const response = await fetch("http://localhost:3000/scan-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleNumber: parsedData.vehicleNumber,
          employeeId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No record found for this QR code.");
      }

      const data = await response.json();

      setScannedData({
        vehicleNumber: data.vehicleNumber,
        inTimeIST: data.inTime,
        outTimeIST: data.outTime,
        duration: data.duration,
        price: data.price || "Not Available",
        scannedBy: employeeId,
      });
    } catch (err) {
      setError(err.message || "Error scanning QR code. Try again.");
    }
  };

  const restartScanner = () => {
    setScannedData(null);
    setError("");
    stopScanner();

    setTimeout(() => {
      startScanner();
    }, 200);
  };

  return (
    <>
      <Navbar /> {/* Added Navbar */}
      <div className="container">
      <h1 className="title">Out-Gate Scanner</h1>

      {!scannedData && <div id="reader"></div>}

      {error && <p className="error-message">{error}</p>}

      {scannedData && (
        <div className="receipt">
          <h2>Receipt</h2>
          <p>
            <strong>Vehicle Number:</strong> {scannedData.vehicleNumber}
          </p>
          <p>
            <strong>In Time:</strong> {scannedData.inTimeIST}
          </p>
          <p>
            <strong>Out Time:</strong> {scannedData.outTimeIST}
          </p>
          <p>
            <strong>Total Duration:</strong> {scannedData.duration}
          </p>
          <p>
            <strong>Price:</strong> {scannedData.price}
          </p>
          <p>
            <strong>Scanned By (Employee ID):</strong> {scannedData.scannedBy}
          </p>
        </div>
      )}

      {/* "Scan Again" button appears even when there's an error */}
      {(scannedData || error) && (
        <button onClick={restartScanner} className="button">
          Scan Again
        </button>
      )}

      {scannedData && (
        <button onClick={() => window.print()} className="button print-btn">
          Print Receipt
        </button>
      )}
    </div>

    </>
  );
};

export default OutGateScanner;
