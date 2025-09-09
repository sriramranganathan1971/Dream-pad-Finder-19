// server/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes & middleware
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import auth from "./middleware/auth.js"; // ✅ auth middleware

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS: allow your frontend (adjust port if needed)
app.use(
  cors({
    origin: "http://localhost:8080", // frontend host
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// ✅ Protect offers route with auth middleware
app.use("/api/offers", auth, offerRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
