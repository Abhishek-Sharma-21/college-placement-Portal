import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// Verify the session cookie and return the current user
router.get("/me", protect, getMe);

export default router;
