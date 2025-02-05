import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { protectRoute } from "./middlewares/protectRoute.js";
import dotenv from "dotenv"
import { ENV_VARS } from "./config/envVars.js";
import {connectDB} from './config/db.js';
import cookieParser from "cookie-parser";


dotenv.config();
const PORT = ENV_VARS.PORT
const app = express();
console.log("MONGO: ", process.env.MONGO_URI);


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use(express.urlencoded({ extended: true }));
console.log("does it come here?");
app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
    connectDB();
})