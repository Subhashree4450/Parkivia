// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import QRCodeGenerator from "../src/components/QRCodeGenerator";
// import OutGateScanner from "../src/components/OutGateScanner";
// import SignUp from "../src/components/SignUp";
// import Login from "../src/components/Login"
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<QRCodeGenerator />} />
//         <Route path="/outgate" element={<OutGateScanner />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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

