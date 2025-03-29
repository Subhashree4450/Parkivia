const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Ensure it matches login

const authMiddleware = (req, res, next) => {
    try {
        // ✅ Ensure Authorization header exists
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // ✅ Extract token correctly
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. Invalid token format." });
        }

        // ✅ Verify & attach user data
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded || !decoded.employeeId) {
            return res.status(401).json({ message: "Invalid token. Missing employee ID." });
        }

        req.user = decoded; // Attach full user info
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = { authMiddleware };



