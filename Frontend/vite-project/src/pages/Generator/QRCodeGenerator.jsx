import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbarqr/Navbarqr"; // Importing Navbar component
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
          <h2>Generated QR Code</h2>
          <p><strong>Vehicle Number:</strong> ${vehicleNumber}</p>
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

      // ✅ Clear the input field immediately after printing
      setVehicleNumber("");
      setQrCodeData(null);
    }
  };

  return (
    <div>
      <Navbar /> {/* ✅ Replacing inline Navbar with imported Navbar */}
      <div className="qr-section">
        <h1 className="qr-title">QR Code Generator</h1>
        <form onSubmit={handleSubmit} className="qr-form">
          <input
            type="text"
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
            className="qr-input"
          />
          <button type="submit" className="qr-button" disabled={loading}>
            {loading ? "Generating..." : "Generate QR"}
          </button>
        </form>

        {error && <p className="qr-error">{error}</p>}

        {qrCodeData && (
          <div className="qr-code-container" ref={qrRef}>
            <img
              src={qrCodeData.qrCodeBase64}
              alt="Generated QR Code"
              className="qr-code-image"
            />
            <p>
              <strong>In Time (IST):</strong> {qrCodeData.inTimeIST}
            </p>
          </div>
        )}

        {qrCodeData && (
          <button onClick={printQRCode} className="qr-button">
             Print QR 
          </button>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;

