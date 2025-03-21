const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";  // Replace with a secure key

// User Registration
const registerUser = async (employeeId, username, password, role) => {
    const existingUser = await User.findOne({ employeeId });
    if (existingUser) throw new Error("User already exists");

    const user = new User({ employeeId, username, password, role });
    await user.save();
    return { message: "User registered successfully" };
};

// User Login
const loginUser = async (employeeId, password) => {
    const user = await User.findOne({ employeeId });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    return { token, role: user.role };
};

module.exports = { registerUser, loginUser };
