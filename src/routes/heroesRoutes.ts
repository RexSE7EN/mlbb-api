import express from "express";
import { createHero, deleteHeroById, getAllHeroes, getHeroById, updateHeroById } from "@/controllers/heroController.js";
import { authMiddleware, authorizedRoles } from "@/middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); 

// @route   GET /heroes
// @desc    Get all hero entries
// @access  Public (Authorized users only)
router.get("/", getAllHeroes);

// @route   GET /heroes/:id
// @desc    Get a hero entry by ID
// @access  Public (Authorized users only)
router.get("/:id", getHeroById);

// @route   POST /heroes
// @desc    Create a new hero entry
// @access  Private (Admin only)
router.post("/", authorizedRoles(['ADMIN']), createHero);

// @route   PATCH /heroes/:id
// @desc    Update a hero entry by ID
// @access  Private (Admin only)
router.patch("/:id", authorizedRoles(['ADMIN']), updateHeroById);

// @route   DELETE /heroes/:id
// @desc    Delete a hero entry by ID
// @access  Private (Admin only)
router.delete("/:id", authorizedRoles(['ADMIN']), deleteHeroById);

export default router;