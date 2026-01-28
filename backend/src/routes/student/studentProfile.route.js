import { Router } from "express";
import {
  completeStudentProfile,
  getStudentProfile,
} from "../../controllers/studentProfile.controller.js";
import upload from "../../config/Cloudinary.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = Router();

router.put(
  "/profile",
  protect,
  upload.single("profilePic"),
  completeStudentProfile,
);
router.get("/profile", protect, getStudentProfile);
export default router;
