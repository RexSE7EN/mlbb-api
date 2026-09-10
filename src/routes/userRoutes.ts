import express from "express";
import { getUsers } from "@/controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch("/:id", getUsers);
router.delete("/:id", getUsers);

export default router;