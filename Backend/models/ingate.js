const mongoose = require('mongoose');
const QRScheduleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
  },
  inTime: {
    type: String,
    // type: Date,// default: Date.now,
  },
  qrCodeData: {
    type: String, // Stores QR code as a Base64 string
  },
});

const QRSchedule = mongoose.model('ingate', QRScheduleSchema);
module.exports = QRSchedule;



