import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
import { notFound } from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandle.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // React default port
  "http://localhost:5173", // Vite default port
  "http://localhost:4000", // In case frontend runs on same port
  "https://college-placement-porrtal.vercel.app", // Note: Your current frontend URL (with typo)
  "https://college-placement-portal.vercel.app", // In case you fix the typo later
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

// Ensure preflight requests respond with correct CORS headers
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// API handler
app.use("/api", apiRouter);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
