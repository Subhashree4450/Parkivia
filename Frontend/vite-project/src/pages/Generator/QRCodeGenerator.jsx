



// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation
// import "./QRCodeGenerator.css";

// const QRCodeGenerator = () => {
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [qrCodeData, setQrCodeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const qrRef = useRef(null);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!vehicleNumber.trim()) {
//       setError("Vehicle number cannot be empty.");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       // Retrieve token from localStorage (assuming it's stored after login)
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authorization failed: No token found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("http://localhost:3000/generate-qr", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the authorization token
//         },
//         body: JSON.stringify({ vehicleNumber }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setQrCodeData({
//           qrCodeBase64: data.qrCodeBase64 || "",
//           inTimeIST: data.inTimeIST || "No time received",
//         });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to generate QR code.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred while generating the QR code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const printQRCode = () => {
//     if (qrRef.current) {
//       const printWindow = window.open("", "_blank");
//       printWindow.document.write(`
//         <html>
//         <head>
//           <title>Print QR Code</title>
//           <style>
//             body { font-family: Arial, sans-serif; text-align: center; }
//             img { max-width: 200px; margin: 20px 0; }
//             p { font-size: 18px; font-weight: bold; }
//           </style>
//         </head>
//         <body>
//           ${qrRef.current.innerHTML}
//           <script>
//             window.onload = function() {
//               window.print();
//               window.close();
//             };
//           </script>
//         </body>
//         </html>
//       `);
//       printWindow.document.close();
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 className="title">QR CODE GENERATOR</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter Vehicle Number"
//             value={vehicleNumber}
//             onChange={(e) => setVehicleNumber(e.target.value)}
//             required
//             className="input"
//           />
//           <button type="submit" className="button" disabled={loading}>
//             {loading ? "Generating..." : "Generate QR Code"}
//           </button>
//         </form>

//         {error && <p className="error-message">{error}</p>}

//         {qrCodeData && (
//           <div className="qr-code-container" ref={qrRef}>
//             <h2>Generated QR Code</h2>
//             <img src={qrCodeData.qrCodeBase64} alt="Generated QR Code" className="qr-code-image" />
//             <p><strong>In Time (IST):</strong> {qrCodeData.inTimeIST}</p>
//           </div>
//         )}

//         {qrCodeData && (
//           <button onClick={printQRCode} className="button print-button">
//             Print QR Code
//           </button>
//         )}

//         {/* New Button for Out-Gate Scanner */}
//         <button onClick={() => navigate("/outgate")} className="button outgate-button">
//           Out-Gate Scanner
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QRCodeGenerator;



// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./QRCodeGenerator.css";

// const QRCodeGenerator = () => {
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [qrCodeData, setQrCodeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [token, setToken] = useState(null); // Store token in memory
//   const qrRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) setToken(storedToken);
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!vehicleNumber.trim()) {
//       setError("Vehicle number cannot be empty.");
//       return;
//     }
//     if (!token) {
//       setError("Authorization failed. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:3000/generate-qr", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ vehicleNumber }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setQrCodeData({
//           qrCodeBase64: data.qrCodeBase64 || "",
//           inTimeIST: data.inTimeIST || "No time received",
//         });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to generate QR code.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred while generating the QR code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 className="title">QR CODE GENERATOR</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter Vehicle Number"
//             value={vehicleNumber}
//             onChange={(e) => setVehicleNumber(e.target.value)}
//             required
//             className="input"
//           />
//           <button type="submit" className="button" disabled={loading}>
//             {loading ? "Generating..." : "Generate QR Code"}
//           </button>
//         </form>

//         {error && <p className="error-message">{error}</p>}

//         {qrCodeData && (
//           <div className="qr-code-container" ref={qrRef}>
//             <h2>Generated QR Code</h2>
//             <img src={qrCodeData.qrCodeBase64} alt="Generated QR Code" className="qr-code-image" />
//             <p><strong>In Time (IST):</strong> {qrCodeData.inTimeIST}</p>
//           </div>
//         )}

//         {qrCodeData && (
//           <button onClick={() => window.print()} className="button print-button">
//             Print QR Code
//           </button>
//         )}

//         <button onClick={() => navigate("/outgate")} className="button outgate-button">
//           Out-Gate Scanner
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QRCodeGenerator;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!vehicleNumber.trim()) {
      setError("Vehicle number cannot be empty.");
      return;
    }
    if (!token) {
      setError("Authorization failed. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vehicleNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setQrCodeData({
          qrCodeBase64: data.qrCodeBase64 || "",
          inTimeIST: data.inTimeIST || "No time received",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to generate QR code.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating the QR code.");
    } finally {
      setLoading(false);
    }
  };

  const printQRCode = () => {
    if (qrRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            img { max-width: 200px; margin: 20px 0; }
            p { font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          ${qrRef.current.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(() => { 
                window.print(); 
                window.close(); 
              }, 500);
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">QR CODE GENERATOR</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Generating..." : "Generate QR Code"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {qrCodeData && (
          <div className="qr-code-container" ref={qrRef}>
            <h2>Generated QR Code</h2>
            <img src={qrCodeData.qrCodeBase64} alt="Generated QR Code" className="qr-code-image" />
            <p><strong>In Time (IST):</strong> {qrCodeData.inTimeIST}</p>
          </div>
        )}

        {qrCodeData && (
          <button onClick={printQRCode} className="button print-button">
            Print QR Code
          </button>
        )}

        <button onClick={() => navigate("/outgate")} className="button outgate-button">
          Out-Gate Scanner
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

