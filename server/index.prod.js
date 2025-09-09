// server/index.js - Production Ready
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes & middleware
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS: Dynamic origin handling for production
const allowedOrigins = [
  "http://localhost:8080", // development
  "http://localhost:3000", // alternative dev port
  process.env.FRONTEND_URL, // production frontend URL from env
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, etc)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/offers", auth, offerRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "DreamPad Finder API is running! 🚀",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API status route
app.get("/api/status", (req, res) => {
  res.json({
    status: "active",
    environment: process.env.NODE_ENV || "development",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// MongoDB connection with better error handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origins:`, allowedOrigins.filter(Boolean));
});
