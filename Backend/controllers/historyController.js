const History = require("../models/history");

const getHistory = async (req, res) => {
    try {
        const history = await History.find().sort({ inTime: -1 }); // Latest first
        res.status(200).json(history);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};

module.exports = { getHistory };
