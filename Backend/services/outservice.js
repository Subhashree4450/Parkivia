const Vehicle = require("../models/ingate");

const processExit = async (vehicleNumber) => {
  const entryRecord = await Vehicle.findOne({ vehicleNumber });

  if (!entryRecord) {
    throw new Error("Vehicle entry not found!");
  }

  const inTime = new Date(entryRecord.inTime);
  const outTime = new Date();
  const duration = Math.abs(outTime - inTime) / 60000; // in minutes

  return {
    vehicleNumber,
    inTime: inTime.toLocaleString(),
    outTime: outTime.toLocaleString(),
    duration: `${duration.toFixed(2)} minutes`,
  };
};

module.exports = { processExit };
