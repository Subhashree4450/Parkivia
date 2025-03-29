import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import SignUp from "./pages/SignUp/SignUp";
import Slots from "./pages/Slots/Slots";
import Pricing from "./pages/Pricing/Pricing";
import Workers from "./pages/Workers/Workers";
import History from "./pages/History/History";
import Revenue from "./pages/Revenue/Revenue";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminHome />} /> {/* ✅ Set Admin Home as the default page */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<SignUp />} />
                <Route path="/admin/slots" element={<Slots />} />
                <Route path="/admin/pricing" element={<Pricing />} />
                <Route path="/admin/workers" element={<Workers />} />
                <Route path="/admin/history" element={<History />} />
                <Route path="/admin/revenue" element={<Revenue />} />
            </Routes>
        </Router>
    );
}

export default App;

