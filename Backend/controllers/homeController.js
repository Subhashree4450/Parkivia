const ParkingConfig = require("../models/parking_location");

const getParkingDetails = async (req, res) => {
  try {
    const parkingConfig = await ParkingConfig.findOne(); // Fetch parking details
    if (!parkingConfig) {
      return res.status(404).json({ message: "Parking configuration not found" });
    }

    const { totalSlots, availableSlots } = parkingConfig;
    const chanceOfGettingSlot = ((availableSlots / totalSlots) * 100).toFixed(2);

    res.status(200).json({
      totalSlots,
      availableSlots,
      chanceOfGettingSlot,
    });
  } catch (error) {
    console.error("Error fetching parking details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getParkingDetails };
