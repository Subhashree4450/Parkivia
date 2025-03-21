const History = require("../models/history");

const getRevenue = async (req, res) => {
  try {
    const revenueData = await History.aggregate([
      // Step 1: Convert date strings to Date objects using $dateFromString
      {
        $addFields: {
          date: {
            $dateFromString: {
              dateString: "$inTime",
              format: "%a %b %d %Y %H:%M:%S GMT%z (%Z)", // Match the format of your date string
              onError: null,
              onNull: null
            }
          }
        }
      },
      {
        $match: {
          date: { $ne: null }
        }
      },
      {
        $facet: {
          // Daily Revenue
          dailyRevenue: [
            {
              $group: {
                _id: {
                  day: { $dayOfMonth: "$date" },
                  month: { $month: "$date" },
                  year: { $year: "$date" }
                },
                totalRevenue: { $sum: "$price" }
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
          ],

          // Weekly Revenue
          weeklyRevenue: [
            {
              $group: {
                _id: {
                  week: { $week: "$date" },
                  year: { $year: "$date" }
                },
                totalRevenue: { $sum: "$price" }
              }
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } }
          ],

          // Monthly Revenue
          monthlyRevenue: [
            {
              $group: {
                _id: {
                  month: { $month: "$date" },
                  year: { $year: "$date" }
                },
                totalRevenue: { $sum: "$price" }
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
          ],

          // Peak Days (Last 30 Days)
          peakDays: [
            {
              $match: {
                date: {
                  $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
              }
            },
            {
              $group: {
                _id: {
                  day: { $dayOfMonth: "$date" },
                  month: { $month: "$date" },
                  year: { $year: "$date" }
                },
                totalRevenue: { $sum: "$price" }
              }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 }
          ]
        }
      }
    ]);

    res.status(200).json(revenueData[0]);
  } catch (error) {
    console.error("Error fetching revenue:", error);
    res.status(500).json({ message: "Error fetching revenue data" });
  }
};

module.exports = { getRevenue };
