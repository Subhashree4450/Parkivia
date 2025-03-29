import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home"; // Import the Home component
import QRCodeGenerator from "../src/pages/Generator/QRCodeGenerator";
import OutGateScanner from "../src/pages/Scanner/OutGateScanner";
import Login from "../src/pages/Login/Login";
import About from "../src/pages/About/About";
import Help from "../src/pages/Help/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Set Home as the default page */}
        <Route path="/qrcode" element={<QRCodeGenerator />} />
        <Route path="/outgate" element={<OutGateScanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;

