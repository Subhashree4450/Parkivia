const mongoose = require("mongoose");

const ParkingConfigSchema = new mongoose.Schema({
  totalSlots: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  pricing: {
    peak: { 
      startTime: { type: String, required: true }, 
      endTime: { type: String, required: true }, 
      pricePerHour: { type: Number, required: true } 
    },
    midPeak: { 
      startTime: { type: String, required: true }, 
      endTime: { type: String, required: true }, 
      pricePerHour: { type: Number, required: true } 
    },
    offPeak: { 
      startTime: { type: String, required: true }, 
      endTime: { type: String, required: true }, 
      pricePerHour: { type: Number, required: true } 
    }
  }
});

module.exports = mongoose.model("ParkingConfig", ParkingConfigSchema);
