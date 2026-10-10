import express from "express";
import { createSkill, deleteSkillById, getAllSkills, getSkillById, updateSkillById } from "@/controllers/skillController.js";
import { authMiddleware, authorizedRoles } from "@/middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); 

// @route   GET /heroes/:heroId/skills
// @desc    Get all skills of a hero
// @access  Public (Authorized users only)
router.get("/:heroId/skills", getAllSkills);

// @route   POST /heroes/:heroId/skills
// @desc    Create a new skill for a hero
// @access  Private (Admin only)
router.post("/:heroId/skills", authorizedRoles(['ADMIN']), createSkill);

// @route   GET /heroes/:heroId/skills/:skillId
// @desc    Get a specific skill of a hero by ID
// @access  Public (Authorized users only)
router.get("/:heroId/skills/:skillId", getSkillById);

// @route   PATCH /heroes/:heroId/skills/:skillId
// @desc    Update a specific skill of a hero by ID
// @access  Private (Admin only)
router.patch("/:heroId/skills/:skillId", authorizedRoles(['ADMIN']), updateSkillById);

// @route   DELETE /heroes/:heroId/skills/:skillId
// @desc    Delete a specific skill of a hero by ID
// @access  Private (Admin only)
router.delete("/:heroId/skills/:skillId", authorizedRoles(['ADMIN']), deleteSkillById);

export default router;