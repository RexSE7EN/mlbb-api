import { prisma } from "@/config/db.js";
import { Request, Response } from 'express';

const getAllHeroes = async (req: Request, res: Response) => {
  const heroes = await prisma.hero.findMany();

  if (!heroes || heroes.length === 0) {
    return res.status(404).json({ status: 'error', message: 'No heroes found' });
  }

  return res.status(200).json({ status: 'success', message: 'Got all heroes successfully', data: heroes })

};

const getHeroById = async (req: Request, res: Response) => {
  const { heroId } = req.params;
  const hero = await prisma.hero.findFirst({
    where: {
      OR: [
        { id: heroId.toString() },
        { name: heroId.toString() }
      ],
    },
  });

  if (!hero) {
    return res.status(404).json({ status: 'error', message: 'Hero not found' });
  }

  return res.status(200).json({ status: 'success', message: 'Got hero successfully', data: hero });
}

const createHero = async (req: Request, res: Response) => {

  const { name, description, role, image, release_date, skills, skins, attributes } = req.body;

  if (!name) {
    return res.status(400).json({ status: 'error', message: 'Name is required' });
  }

  if (!skills || skills.length < 2) {
    return res.status(400).json({ status: 'error', message: 'At least two skills are required' });
  }

  const existingHero = await prisma.hero.findFirst({
    where: {
      name: name,
    },
  });

  if (existingHero) {
    return res.status(400).json({ status: 'error', message: 'Hero with this name already exists' });
  }

  // Validate data (role, date, etc.) as needed
  if (role && !['ASSASSIN', 'FIGHTER', 'MAGE', 'MARKSMAN', 'SUPPORT', 'TANK'].includes(role)) {
    return res.status(400).json({ status: 'error', message: 'Invalid role' });
  }

  if (release_date && new Date(release_date) > new Date()) {
    return res.status(400).json({ status: 'error', message: 'Release date cannot be in the future' });
  }

  const newHero = await prisma.hero.create({
    data: {
      name,
      description,
      role,
      image,
      releaseDate: release_date ? new Date(release_date) : undefined,
      skills: {
        create: skills
      },
      skins: { 
        create: skins ?? [
          {
            name: 'Default Skin - ' + name,
            releaseDate: release_date ? new Date(release_date) : undefined,
          }
        ]
      },
      attributes: {
        create: attributes ?? {}
      }
    },
  });

  res.json({
    status: 'success',
    message: 'New hero is created',
    data: newHero
  });
}

const updateHeroById = async (req: Request, res: Response) => {
  const { heroId } = req.params;

  return res.status(200).json({
    status: 'success',
    message: `Assume hero with ID ${heroId} is updated`
  });
}

const deleteHeroById = async (req: Request, res: Response) => {
  const { heroId } = req.params;

  const hero = await prisma.hero.findUnique({
    where: {
      id: heroId.toString(),
    },
  });

  if (!hero) {
    return res.status(404).json({ status: 'error', message: 'Hero not found' });
  }

  await prisma.hero.delete({
    where: {
      id: heroId.toString(),
    },
  });

  return res.status(200).json({
    status: 'success',
    message: `Assume hero with ID ${heroId} is deleted`
  });
}

export {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHeroById,
  deleteHeroById
};