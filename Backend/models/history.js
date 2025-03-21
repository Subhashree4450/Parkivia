const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  inTime: { type: String, required: true },
  outTime: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true }, // Price calculated based on duration
  scannedBy: { type: String, required: true },    //edit
});

module.exports = mongoose.model("history", HistorySchema);
