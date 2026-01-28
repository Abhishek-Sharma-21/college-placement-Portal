import { Router } from "express";
import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";
import studentProfileRouter from "./student/studentProfile.route.js";
import jobRouter from "./job.routes.js";
import studentsRouter from "./student/students.route.js";
import announcementRouter from "./announcement.routes.js";
import assessmentRouter from "./assessment.routes.js";
import jobApplicationRouter from "./jobApplication.routes.js";

import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/profile", protect, studentProfileRouter);
router.use("/jobs", protect, jobRouter);
router.use("/students", protect, studentsRouter);
router.use("/announcements", protect, announcementRouter);
router.use("/assessments", protect, assessmentRouter);
router.use("/applications", protect, jobApplicationRouter);

export default router;
