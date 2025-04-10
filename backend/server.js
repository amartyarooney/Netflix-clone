import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { protectRoute } from "./middlewares/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import logger from "./utils/logger.js"; // Import the logger

dotenv.config();
const PORT = ENV_VARS.PORT;
const app = express();

logger.info("Initializing server...");
logger.info("MONGO URI: " + process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Catch unhandled routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logger.error(error.message);
  res.status(404).json({ message: error.message });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started at http://localhost:${PORT}`);
  connectDB();
});
