import express from "express";
import { authMiddleware, authorizedRoles } from "@/middleware/authMiddleware.js";
import { getUsers } from "@/controllers/userController.js";

const router = express.Router();

router.use(authMiddleware, authorizedRoles(['ADMIN'])); 

router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch("/:id", getUsers);
router.delete("/:id", getUsers);

export default router;