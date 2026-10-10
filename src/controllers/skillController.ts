import { prisma } from "@/config/db.js";
import { Request, Response } from 'express';

const getAllSkills = async (req: Request, res: Response) => {
  const { heroId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume all skills for hero with ID ${heroId} are retrieved`,
  });
};

const getSkillById = async (req: Request, res: Response) => {
    const { heroId, skillId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume all skills for hero with ID ${heroId} and skill with ID ${skillId} are retrieved`,
  });
}

const createSkill = async (req: Request, res: Response) => {
  const { heroId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume skills for hero with ID ${heroId} are created`,
  });
}

const updateSkillById = async (req: Request, res: Response) => {
  const { heroId, skillId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume all skills for hero with ID ${heroId} and skill with ID ${skillId} are updated`,
  });
}

const deleteSkillById = async (req: Request, res: Response) => {
    const { heroId, skillId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume all skills for hero with ID ${heroId} and skill with ID ${skillId} are deleted`,
  });
}

export {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkillById,
  deleteSkillById
};