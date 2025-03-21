// const Vehicle = require("../models/ingate");
// const History = require("../models/history"); // Updated reference

// exports.scanOut = async (req, res) => {
//   try {
//     const { vehicleNumber } = req.body;

//     const entryRecord = await Vehicle.findOne({ vehicleNumber });

//     if (!entryRecord) {
//       return res.status(404).json({ message: "Vehicle entry not found!" });
//     }

//     const inTime = new Date(entryRecord.inTime);
//     const outTime = new Date();
//     const duration = Math.abs(outTime - inTime) / 60000; // Duration in minutes

//     // Price Calculation (Example: ₹10 per hour)
//     const ratePerHour = 10;
//     const price = ((duration / 60) * ratePerHour).toFixed(2);

//     // Store the details in the history collection
//     const newHistoryEntry = new History({
//       vehicleNumber,
//       inTime,
//       outTime,
//       duration: duration.toFixed(2),
//       price,
//     });

//     await newHistoryEntry.save();

//     res.json({
//       message: "Exit scanned successfully!",
//       vehicleNumber,
//       inTime: inTime.toLocaleString(),
//       outTime: outTime.toLocaleString(),
//       duration: `${duration.toFixed(2)} minutes`,
//       price: `₹${price}`,
//     });
//   } catch (error) {
//     console.error("Error processing exit:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



// 27/2
// const Vehicle = require("../models/ingate");
// const History = require("../models/history");
// const ParkingConfig = require("../models/parking_location");

// exports.scanOut = async (req, res) => {
//   try {
//     const { vehicleNumber } = req.body;

//     const entryRecord = await Vehicle.findOne({ vehicleNumber });

//     if (!entryRecord) {
//       return res.status(404).json({ message: "Vehicle entry not found!" });
//     }

//     const inTime = new Date(entryRecord.inTime);
//     const outTime = new Date();
//     const duration = Math.abs(outTime - inTime) / 60000; // Duration in minutes

//     // Fetch parking configuration
//     const config = await ParkingConfig.findOne();
//     if (!config) {
//       return res.status(500).json({ message: "Parking configuration not found" });
//     }

//     // Extract pricing details
//     const { peak, midPeak, offPeak } = config.pricing;

//     // Function to determine applicable rate per hour
//     const getPricingRate = (time) => {
//       const hours = time.getHours();
//       const minutes = time.getMinutes();
//       const currentTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

//       const isWithinRange = (time, start, end) => {
//         return time >= start && time < end;
//       };

//       if (isWithinRange(currentTime, peak.startTime, peak.endTime)) {
//         return peak.pricePerHour;
//       } else if (isWithinRange(currentTime, midPeak.startTime, midPeak.endTime)) {
//         return midPeak.pricePerHour;
//       } else {
//         return offPeak.pricePerHour;
//       }
//     };

//     const ratePerHour = getPricingRate(outTime);
//     console.log(ratePerHour);
//     // Calculate the final price
//     const price = ((duration / 60) * ratePerHour).toFixed(2);
//     // Store the details in the history collection
//     const newHistoryEntry = new History({
//       vehicleNumber,
//       inTime,
//       outTime,
//       duration: duration.toFixed(2),
//       price,
//     });

//     await newHistoryEntry.save();

//     res.json({
//       message: "Exit scanned successfully!",
//       vehicleNumber,
//       inTime: inTime.toLocaleString(),
//       outTime: outTime.toLocaleString(),
//       duration: `${duration.toFixed(2)} minutes`,
//       price: `₹${price}`,
//     });
//   } catch (error) {
//     console.error("Error processing exit:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



const Vehicle = require("../models/ingate");
const History = require("../models/history");
const ParkingConfig = require("../models/parking_location");
const jwt = require("jsonwebtoken");

exports.scanOut = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    // Extract user from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, "your_secret_key");
    const employeeId = decoded.employeeId; // Extract employee ID

    const entryRecord = await Vehicle.findOne({ vehicleNumber });
    if (!entryRecord) {
      return res.status(404).json({ message: "Vehicle entry not found!" });
    }

    const inTime = new Date(entryRecord.inTime);
    const outTime = new Date();
    const duration = Math.abs(outTime - inTime) / 60000;

    // Fetch parking configuration
    const config = await ParkingConfig.findOne();
    if (!config) {
      return res.status(500).json({ message: "Parking configuration not found" });
    }

    // Extract pricing details
    const { peak, midPeak, offPeak } = config.pricing;

    const getPricingRate = (time) => {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const currentTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      const isWithinRange = (time, start, end) => time >= start && time < end;

      if (isWithinRange(currentTime, peak.startTime, peak.endTime)) return peak.pricePerHour;
      if (isWithinRange(currentTime, midPeak.startTime, midPeak.endTime)) return midPeak.pricePerHour;
      return offPeak.pricePerHour;
    };

    const ratePerHour = getPricingRate(outTime);
    const price = ((duration / 60) * ratePerHour).toFixed(2);

    // Store the details in the history collection
    const newHistoryEntry = new History({
      vehicleNumber,
      inTime,
      outTime,
      duration: duration.toFixed(2),
      price,
      scannedBy: employeeId, // Store employee ID instead of user ID
    });

    await newHistoryEntry.save();

    // Increase available slots upon exit
    await ParkingConfig.updateOne({}, { $inc: { availableSlots: 1 } });
    
    res.json({
      message: "Exit scanned successfully!",
      vehicleNumber,
      inTime: inTime.toLocaleString(),
      outTime: outTime.toLocaleString(),
      duration: `${duration.toFixed(2)} minutes`,
      price: `₹${price}`,
      scannedBy: employeeId, // Return employee ID
    });
  } catch (error) {
    console.error("Error processing exit:", error);
    res.status(500).json({ error: "Server error" });
  }
};


