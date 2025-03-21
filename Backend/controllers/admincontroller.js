
const ParkingConfig = require("../models/parking_location");
const User = require("../models/user");

// ✅ Default Configuration Values
const DEFAULT_SLOTS = 50;
const DEFAULT_PRICING = {
  peak: { startTime: "08:00", endTime: "18:00", pricePerHour: 5 },
  midPeak: { startTime: "18:00", endTime: "22:00", pricePerHour: 3 },
  offPeak: { startTime: "22:00", endTime: "08:00", pricePerHour: 2 },
};

// ✅ Fetch parking configuration (total slots & pricing)
exports.getParkingConfig = async (req, res) => {
  try {
    let config = await ParkingConfig.findOne();

    // If no config exists, create one with default values
    if (!config) {
      config = await ParkingConfig.create({
        totalSlots: DEFAULT_SLOTS,
        pricing: DEFAULT_PRICING,
      });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parking config", error: error.message });
  }
};

// ✅ Update total parking slots
exports.updateTotalSlots = async (req, res) => {
  try {
    const { totalSlots } = req.body;

    if (totalSlots === undefined) {
      return res.status(400).json({ message: "Total slots value is required" });
    }

    const config = await ParkingConfig.findOneAndUpdate(
      {},
      { totalSlots },
      { new: true, upsert: true } // Upsert ensures a document exists
    );

    res.json({ message: "Total slots updated successfully", config });
  } catch (error) {
    res.status(500).json({ message: "Error updating total slots", error: error.message });
  }
};

// ✅ Update pricing hours and rates
exports.updatePricing = async (req, res) => {
  try {
    const { peak, midPeak, offPeak } = req.body;

    if (!peak && !midPeak && !offPeak) {
      return res.status(400).json({ message: "At least one pricing update is required" });
    }

    let config = await ParkingConfig.findOne();

    // If no config exists, initialize with default values
    if (!config) {
      config = await ParkingConfig.create({
        totalSlots: DEFAULT_SLOTS,
        pricing: DEFAULT_PRICING,
      });
    }

    config.pricing.peak = peak || config.pricing.peak;
    config.pricing.midPeak = midPeak || config.pricing.midPeak;
    config.pricing.offPeak = offPeak || config.pricing.offPeak;

    await config.save();
    res.json({ message: "Pricing updated successfully", config });
  } catch (error) {
    res.status(500).json({ message: "Error updating pricing", error: error.message });
  }
};

// ✅ Fetch all workers
exports.getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "gateworker" }).select("-password"); // Exclude password
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workers", error: error.message });
  }
};



