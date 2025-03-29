const mongoose = require('mongoose');

const dailyRevenueSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true },
    totalRevenue: { type: Number, required: true },
    vehicleCount: { type: Number, required: true }
});

const DailyRevenue = mongoose.model('DailyRevenue', dailyRevenueSchema);

module.exports = DailyRevenue;
