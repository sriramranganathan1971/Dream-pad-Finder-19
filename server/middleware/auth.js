// server/middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    // 1) Check header
    const authHeader = req.headers.authorization || "";
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2) Or check cookie if you set httpOnly cookie:
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}
