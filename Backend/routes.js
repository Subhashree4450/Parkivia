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
const { getRevenue } = require("./controllers/historyController");
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
