
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import "./OutGateScanner.css";

// const OutGateScanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [error, setError] = useState("");
//   const scannerRef = useRef(null);
//   const navigate = useNavigate();
//   const isScannerInitialized = useRef(false);

//   useEffect(() => {
//     console.log("Component Mounted");

//     if (!isScannerInitialized.current) {
//       startScanner();
//       isScannerInitialized.current = true;
//     }

//     return () => {
//       console.log("Component Unmounted → Stopping Scanner");
//       stopScanner();
//     };
//   }, []);

//   const startScanner = () => {
//     console.log("Starting Scanner...");
//     stopScanner(); // Prevent duplicate scanners

//     setTimeout(() => {
//       const readerDiv = document.getElementById("reader");
//       if (readerDiv) readerDiv.innerHTML = ""; // Clear old scanner UI

//       scannerRef.current = new Html5QrcodeScanner("reader", {
//         fps: 10,
//         qrbox: 250,
//       });

//       scannerRef.current.render(
//         (decodedText) => {
//           console.log("QR Scanned: ", decodedText);
//           stopScanner();
//           handleScan(decodedText);
//         },
//         (err) => console.warn("Scan Error:", err)
//       );
//     }, 100);
//   };

//   const stopScanner = () => {
//     if (scannerRef.current) {
//       console.log("Stopping Scanner...");
//       scannerRef.current
//         .clear()
//         .then(() => {
//           console.log("Scanner Cleared");
//           scannerRef.current = null;
//           isScannerInitialized.current = false;
//         })
//         .catch((err) => console.warn("Scanner Clear Error:", err));
//     }
//   };

//   const handleScan = async (decodedText) => {
//     setError("");
//     try {
//       const parsedData = JSON.parse(decodedText);
//       console.log("Parsed QR Data:", parsedData);

//       // Retrieve token from localStorage
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authorization failed: No token found. Please log in again.");
//         return;
//       }

//       const response = await fetch("http://localhost:3000/scan-qr", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}` // 🔑 Include token
//         },
//         body: JSON.stringify({ vehicleNumber: parsedData.vehicleNumber }),
//       });

//       if (!response.ok) throw new Error("No record found for this QR code.");

//       const data = await response.json();
//       console.log("Server Response:", data);

//       setScannedData({
//         vehicleNumber: data.vehicleNumber,
//         inTimeIST: data.inTime,
//         outTimeIST: data.outTime,
//         duration: data.duration,
//         price: data.price || "Not Available",
//       });

//     } catch (err) {
//       console.error("Scan Error:", err);
//       setError(err.message || "Error scanning. Try again.");
//     }
//   };

//   const restartScanner = () => {
//     console.log("Restarting Scanner...");
//     setScannedData(null);
//     setError("");
//     stopScanner();

//     setTimeout(() => {
//       isScannerInitialized.current = false;
//       startScanner();
//     }, 200);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Out-Gate Scanner</h1>
      
//       {!scannedData && <div id="reader"></div>} {/* Prevent duplicate scanners */}

//       {error && <p className="error-message">{error}</p>}

//       {scannedData && (
//         <div className="receipt">
//           <h2>Receipt</h2>
//           <p><strong>Vehicle Number:</strong> {scannedData.vehicleNumber}</p>
//           <p><strong>In Time:</strong> {scannedData.inTimeIST}</p>
//           <p><strong>Out Time:</strong> {scannedData.outTimeIST}</p>
//           <p><strong>Total Duration:</strong> {scannedData.duration}</p>
//           <p><strong>Price:</strong> {scannedData.price}</p>
//         </div>
//       )}

//       {scannedData ? (
//         <>
//           <button onClick={restartScanner} className="button">
//             Scan Again
//           </button>
//           <button onClick={() => window.print()} className="button print-btn">
//             Print Receipt
//           </button>
//         </>
//       ) : (
//         <button onClick={() => navigate("/qrcode")} className="button">
//           Back to Generator
//         </button>
//       )}
//     </div>
//   );
// };

// export default OutGateScanner;






import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import {jwtDecode} from "jwt-decode"; // To decode JWT token
import "./OutGateScanner.css";

const OutGateScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const isScannerInitialized = useRef(false);

  useEffect(() => {
    console.log("Component Mounted");

    if (!isScannerInitialized.current) {
      startScanner();
      isScannerInitialized.current = true;
    }

    return () => {
      console.log("Component Unmounted → Stopping Scanner");
      stopScanner();
    };
  }, []);

  const startScanner = () => {
    console.log("Starting Scanner...");
    stopScanner(); // Prevent duplicate scanners

    setTimeout(() => {
      const readerDiv = document.getElementById("reader");
      if (readerDiv) readerDiv.innerHTML = ""; // Clear old scanner UI

      scannerRef.current = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });

      scannerRef.current.render(
        (decodedText) => {
          console.log("QR Scanned: ", decodedText);
          stopScanner();
          handleScan(decodedText);
        },
        (err) => console.warn("Scan Error:", err)
      );
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      console.log("Stopping Scanner...");
      scannerRef.current
        .clear()
        .then(() => {
          console.log("Scanner Cleared");
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
      console.log("Parsed QR Data:", parsedData);

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization failed: No token found. Please log in again.");
        return;
      }

      // Decode the token to get employeeId
      let employeeId;
      try {
        const decoded = jwtDecode(token);
        employeeId = decoded.employeeId; // Extract employeeId from JWT
      } catch (decodeError) {
        console.error("Token Decode Error:", decodeError);
        setError("Invalid authentication token. Please log in again.");
        return;
      }

      // Send request to backend
      const response = await fetch("http://localhost:3000/scan-qr", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Include token
        },
        body: JSON.stringify({ 
          vehicleNumber: parsedData.vehicleNumber,
          employeeId: employeeId, // Send employeeId
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No record found for this QR code.");
      }

      const data = await response.json();
      console.log("Server Response:", data);

      setScannedData({
        vehicleNumber: data.vehicleNumber,
        inTimeIST: data.inTime,
        outTimeIST: data.outTime,
        duration: data.duration,
        price: data.price || "Not Available",
        scannedBy: employeeId, // Display scannedBy ID
      });

    } catch (err) {
      console.error("Scan Error:", err);
      setError(err.message || "Error scanning. Try again.");
    }
  };

  const restartScanner = () => {
    console.log("Restarting Scanner...");
    setScannedData(null);
    setError("");
    stopScanner();

    setTimeout(() => {
      isScannerInitialized.current = false;
      startScanner();
    }, 200);
  };

  return (
    <div className="container">
      <h1 className="title">Out-Gate Scanner</h1>
      
      {!scannedData && <div id="reader"></div>} {/* Prevent duplicate scanners */}

      {error && <p className="error-message">{error}</p>}

      {scannedData && (
        <div className="receipt">
          <h2>Receipt</h2>
          <p><strong>Vehicle Number:</strong> {scannedData.vehicleNumber}</p>
          <p><strong>In Time:</strong> {scannedData.inTimeIST}</p>
          <p><strong>Out Time:</strong> {scannedData.outTimeIST}</p>
          <p><strong>Total Duration:</strong> {scannedData.duration}</p>
          <p><strong>Price:</strong> {scannedData.price}</p>
          <p><strong>Scanned By (Employee ID):</strong> {scannedData.scannedBy}</p>
        </div>
      )}

      {scannedData ? (
        <>
          <button onClick={restartScanner} className="button">
            Scan Again
          </button>
          <button onClick={() => window.print()} className="button print-btn">
            Print Receipt
          </button>
        </>
      ) : (
        <button onClick={() => navigate("/qrcode")} className="button">
          Back to Generator
        </button>
      )}
    </div>
  );
};

export default OutGateScanner;
