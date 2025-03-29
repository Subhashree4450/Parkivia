const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const authRoutes = require("./controllers/authcontroller"); // Import Auth Controller

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://Subhashree:Parkivia58@cluster0.8hgme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      serverSelectionTimeoutMS: 5000 
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Call the connection function
connectDB();

// Routes
app.use("/", routes); // Existing QR routes
app.use("/auth", authRoutes); // New Auth Routes

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
  });
  
});

