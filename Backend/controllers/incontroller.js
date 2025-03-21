const { generateQRCode } = require('../services/inservice');

/**
 * Handle QR code generation requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateQR = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ error: 'Vehicle number is required.' });
    }

    const { qrCodeBase64, savedSchedule, inTimeIST } = await generateQRCode(vehicleNumber);

    // Respond with the generated QR code and IST time
    res.status(200).json({
      message: 'QR code generated successfully.',
      qrCodeBase64,
      inTimeIST, 
      schedule: savedSchedule,
    });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the QR code.' });
  }
};

module.exports = { generateQR };



// const { generateQRCode } = require('../services/inservice');
// const ParkingConfig = require("../models/parking_location");
// /**
//  * Handle QR code generation requests.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// const generateQR = async (req, res) => {
//   try {
//     const { vehicleNumber } = req.body;

//     if (!vehicleNumber) {
//       return res.status(400).json({ error: 'Vehicle number is required.' });
//     }

//     // Fetch parking configuration
//     const config = await ParkingConfig.findOne();
//     if (!config) {
//       return res.status(500).json({ error: "Parking configuration not found." });
//     }

//     if (config.availableSlots <= 0) {
//       return res.status(400).json({ error: "No available slots. Parking is full." });
//     }

//     const { qrCodeBase64, savedSchedule, inTimeIST } = await generateQRCode(vehicleNumber);

//     // Decrease available slots on successful entry
//     await ParkingConfig.updateOne({}, { $inc: { availableSlots: -1 } });

//     res.status(200).json({
//       message: 'QR code generated successfully.',
//       qrCodeBase64,
//       inTimeIST, 
//       schedule: savedSchedule,
//     });
//   } catch (error) {
//     console.error('Error generating QR code:', error.message);
//     res.status(500).json({ error: 'An error occurred while generating the QR code.' });
//   }
// };

// module.exports = { generateQR };