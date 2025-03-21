const QRCode = require("qrcode");
const QRSchedule = require("../models/ingate"); // Import Mongoose model

/**
 * Generate a QR Code and save the schedule data to the database.
 * @param {string} vehicleNumber - The slot number for parking.
 * @returns {Object} - Contains the generated QR code URL and saved schedule data.
 */
const generateQRCode = async (vehicleNumber) => {
  try {
    // Get UTC time and convert to IST
    const inTimeUTC = new Date();
    const inTimeIST = new Date(inTimeUTC.getTime() + 5.5 * 60 * 60 * 1000);

    // Format IST time properly
    const formattedISTTime = inTimeIST.toISOString().replace("T", " ").slice(0, 19);

    // Prepare QR data with IST time
    const qrData = { vehicleNumber, inTimeIST: formattedISTTime };

    // Generate QR code
    const qrCodeBase64 = await QRCode.toDataURL(JSON.stringify(qrData));

    // Save data to MongoDB (Store IST time)
    const savedSchedule = await QRSchedule.create({
      vehicleNumber,
      inTime: formattedISTTime, // Store IST time directly
      qrCodeData: qrCodeBase64,
    });

    // console.log("Backend Response:", { qrCodeBase64, inTimeIST: formattedISTTime });

    return { 
      qrCodeBase64, 
      inTimeIST: formattedISTTime  // Send correct IST time to frontend
    };
  } catch (error) {
    console.error("Backend Error:", error);
    throw new Error("Failed to generate QR code: " + error.message);
  }
};

module.exports = { generateQRCode };







