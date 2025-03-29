const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Ensure correct path

const router = express.Router();



router.post("/signup", async (req, res) => {
    try {
        const { employeeId, username, password, role } = req.body;

        if (!["admin", "gateworker"].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Allowed: admin, gateworker" });
        }

        const existingUser = await User.findOne({ employeeId });
        if (existingUser) return res.status(400).json({ error: "Employee ID already exists" });

        const newUser = new User({ employeeId, username, password, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { employeeId, password } = req.body;
        console.log("Login attempt:", employeeId); // ✅ Debug log

        const user = await User.findOne({ employeeId });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, employeeId: user.employeeId }, "your_secret_key", { expiresIn: "1h" });   //edit

        console.log("Login successful for:", user.username);
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
