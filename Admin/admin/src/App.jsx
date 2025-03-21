// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin/AdminLogin";
// import AdminHome from "./pages/AdminHome/AdminHome";
// import SignUp from "./pages/SignUp/SignUp";

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* ✅ Redirect from "/" to "/admin/login" */}
//                 <Route path="/" element={<Navigate to="/admin/login" />} />
//                 <Route path="/admin/login" element={<AdminLogin />} />
//                 <Route path="/admin/home" element={<AdminHome />} />
//                 <Route path="/admin/signup" element={<SignUp />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHome from "./pages/AdminHome/AdminHome";
import Slots from "./pages/Slots/Slots";
import Pricing from "./pages/Pricing/Pricing";
import Workers from "./pages/Workers/Workers";
import History from "./pages/History/History";
import Revenue from "./pages/Revenue/Revenue";
import SignUp from "./pages/SignUp/SignUp";

function App() {
    return (
        <Router>
            <Routes>
                {/* ✅ Redirect from "/" to "/admin/login" */}
                <Route path="/" element={<Navigate to="/admin/login" />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<SignUp />} />

                {/* ✅ Admin Home with nested routes */}
                <Route path="/admin" element={<AdminHome />}>
                    <Route path="slots" element={<Slots />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="workers" element={<Workers />} />
                    <Route path="history" element={<History />} />
                    <Route path="revenue" element={<Revenue />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
