import express from "express";
import { authMiddleware, authorizedRoles } from "@/middleware/authMiddleware.js";
import { loginUser, registerUser, logoutUser } from "@/controllers/authController.js";

const router = express.Router();

router.post("/register", authMiddleware, authorizedRoles(['ADMIN']), registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;