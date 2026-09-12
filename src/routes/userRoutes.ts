import express from "express";
import { authMiddleware, authorizedRoles } from "@/middleware/authMiddleware.js";
import { getUsers, updateUserById, deleteUserById } from "@/controllers/userController.js";

const router = express.Router();

router.use(authMiddleware, authorizedRoles(['ADMIN'])); 

// @route   GET /users
// @desc    Get all user entries
// @access  Private (Admin only)
router.get("/", getUsers);

// @route   GET /users/:id
// @desc    Get a user entry by ID
// @access  Private (Admin only)
router.get("/:id", getUsers);

// @route   PATCH /users/:id
// @desc    Update a user entry by ID
// @access  Private (Admin only)
router.patch("/:id", updateUserById);

// @route   DELETE /users/:id
// @desc    Delete a user entry by ID
// @access  Private (Admin only)
router.delete("/:id", deleteUserById);

export default router;