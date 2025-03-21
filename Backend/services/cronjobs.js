const cron = require("node-cron");
const ParkingConfig = require("../models/parking_location"); // Import the model

// Schedule job to reset availableSlots at midnight every day
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Resetting available slots to total slots...");
    await ParkingConfig.updateMany({}, { $expr: { $set: { availableSlots: "$totalSlots" } } });
    console.log("Available slots reset successfully.");
  } catch (error) {
    console.error("Error resetting available slots:", error);
  }
});
