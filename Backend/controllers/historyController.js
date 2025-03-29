const History = require("../models/history");
const DailyRevenue = require("../models/dailyrevenue");

// Get all history data (for table)
const getHistory = async (req, res) => {
    try {
        const history = await History.find().sort({ inTime: -1 }); // Latest first
        res.status(200).json(history);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};

// Get stats for visualizations
const getRevenue = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const historyData = await History.find();

        // Convert inTime strings to Date objects manually
        const formattedData = historyData.map(item => {
            const convertedDate = new Date(item.inTime);
            return {
                ...item._doc,
                convertedDate
            };
        });

        // Filter data for the last 7 days
        const filteredData = formattedData.filter(item => item.convertedDate >= sevenDaysAgo);

        // Daily revenue and vehicle count calculation
        const dailyStats = filteredData.reduce((acc, item) => {
            const date = item.convertedDate.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = { totalRevenue: 0, vehicleCount: 0 };
            }
            acc[date].totalRevenue += item.price;
            acc[date].vehicleCount += 1;
            return acc;
        }, {});

        // Convert daily stats object to array
        const dailyRevenueArray = Object.entries(dailyStats).map(([date, stats]) => ({
            _id: date,
            totalRevenue: stats.totalRevenue,
            vehicleCount: stats.vehicleCount
        })).sort((a, b) => a._id.localeCompare(b._id));

        // Save daily stats to the database (update if already exists)
        for (const stat of dailyRevenueArray) {
            await DailyRevenue.updateOne(
                { date: stat._id },
                {
                    $set: {
                        totalRevenue: stat.totalRevenue,
                        vehicleCount: stat.vehicleCount
                    }
                },
                { upsert: true } // Insert if not exists, update if exists
            );
        }

        // Fetch from database for frontend visualization
        const storedDailyStats = await DailyRevenue.find().sort({ date: 1 });

        // Employee stats calculation
        const employeeStats = filteredData.reduce((acc, item) => {
            acc[item.scannedBy] = (acc[item.scannedBy] || 0) + item.price;
            return acc;
        }, {});

        // Convert employee stats object to array
        const employeeStatsArray = Object.entries(employeeStats).map(([employeeId, totalScannedAmount]) => ({
            employeeId,
            totalScannedAmount
        })).sort((a, b) => b.totalScannedAmount - a.totalScannedAmount);

        res.status(200).json({ dailyRevenue: storedDailyStats, employeeStats: employeeStatsArray });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};

module.exports = { getHistory, getRevenue };
