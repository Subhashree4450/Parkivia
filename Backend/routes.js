

// //20/2
// // const express = require("express");
// // const { generateQR } = require("./controllers/incontroller");
// // const { scanOut } = require("./controllers/outcontroller");
// // const authMiddleware = require("./middleware/auth"); // Import Auth Middleware

// // const router = express.Router();

// // // Public Routes
// // router.post("/generate-qr", generateQR);
// // router.post("/scan-qr", scanOut);

// // // Example Protected Route (requires valid JWT)
// // router.get("/protected", authMiddleware, (req, res) => {
// //   res.json({ message: "✅ Access granted to protected route", user: req.user });
// // });

// // module.exports = router;




// const express = require("express");
// const { generateQR } = require("./controllers/incontroller");
// const { scanOut } = require("./controllers/outcontroller");
// const {
//   getParkingConfig,
//   updateTotalSlots,
//   updatePricing,
//   getWorkers,
// } = require("./controllers/admincontroller");
// const { authMiddleware } = require("./middleware/auth");

// const router = express.Router();

// // Public Routes
// router.post("/generate-qr", authMiddleware, generateQR);
// router.post("/scan-qr", authMiddleware, scanOut);

// // Parking Configuration Routes (Admin Only)
// router.get("/admin/config", authMiddleware, getParkingConfig); // Get parking config (slots & pricing)
// router.put("/admin/slots", authMiddleware, updateTotalSlots); // Update total slots
// router.put("/admin/pricing", authMiddleware, updatePricing); // Update pricing

// // Worker Management Routes (Admin Only)
// router.get("/workers", authMiddleware, getWorkers);

// module.exports = router;

// const express = require("express");
// const { generateQR } = require("./controllers/incontroller");
// const { scanOut } = require("./controllers/outcontroller");
// const {
//   getParkingConfig,
//   updateTotalSlots,
//   updatePricing,
//   getWorkers,
// } = require("./controllers/admincontroller");
// const { getHistory } = require("./controllers/historyController");
// const { authMiddleware } = require("./middleware/auth");
// const { getRevenue } = require("./controllers/revenueController");

// const router = express.Router();

// // Public Routes
// router.post("/generate-qr", authMiddleware, generateQR);
// router.post("/scan-qr", authMiddleware, scanOut);

// // Parking Configuration Routes (Admin Only)
// router.get("/admin/config", authMiddleware, getParkingConfig);
// router.put("/admin/slots", authMiddleware, updateTotalSlots);
// router.put("/admin/pricing", authMiddleware, updatePricing);

// // Worker Management Routes (Admin Only)
// router.get("/workers", authMiddleware, getWorkers);

// // History Routes (Admin Only)
// router.get("/admin/history", authMiddleware, getHistory);
// router.get("/admin/revenue", authMiddleware, getRevenue);

// module.exports = router;


const express = require("express");
const { generateQR } = require("./controllers/incontroller");
const { scanOut } = require("./controllers/outcontroller");
const {
  getParkingConfig,
  updateTotalSlots,
  updatePricing,
  getWorkers,
} = require("./controllers/admincontroller");
const { getHistory } = require("./controllers/historyController");
const { authMiddleware } = require("./middleware/auth");
const { getRevenue } = require("./controllers/revenueController");
const { getParkingDetails } = require("./controllers/homeController");

const router = express.Router();

//
// ✅ Public Routes (Accessible to authenticated users)
//
router.post("/generate-qr", authMiddleware, generateQR); // Generate QR Code for parking entry
router.post("/scan-qr", authMiddleware, scanOut); // Scan QR Code for parking exit
router.get("/parking-details", getParkingDetails); // ✅ Get parking details (total slots, available slots, chance)

//
// ✅ Admin Routes (Restricted to Admin Users)
//
router.use("/admin", authMiddleware); // Apply authMiddleware for all admin routes

// Parking Configuration
router.get("/admin/config", getParkingConfig); // Get current parking configuration
router.put("/admin/slots", updateTotalSlots); // Update total parking slots
router.put("/admin/pricing", updatePricing); // Update pricing configuration

// Worker Management
router.get("/admin/workers", getWorkers); // Get list of workers

// History and Revenue
router.get("/admin/history", getHistory); // Get parking history
router.get("/admin/revenue", getRevenue); // Get revenue details

module.exports = router;
