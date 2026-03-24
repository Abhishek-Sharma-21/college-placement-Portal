import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/apiRouter.js";
import { notFound } from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandle.js";

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));
app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
