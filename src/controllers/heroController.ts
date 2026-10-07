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
  const { id } = req.params;
  const hero = await prisma.hero.findUnique({
    where: {
      id: id.toString(),
      name: id.toString(),
    },
  });

  if (!hero) {
    return res.status(404).json({ status: 'error', message: 'Hero not found' });
  }

  return res.status(200).json({ status: 'success', message: 'Got hero successfully', data: hero });
}

const createHero = async (req: Request, res: Response) => {

  /*
  id          String      @id @default(uuid())
  name        String
  role        Role[]  @default([UNDEFINED])
  description String?
  image       String?
  releaseDate DateTime @default(now())
  skills      Skill[]
  skins       Skin[]
  attributes  HeroAttribute?
  */

  const { name, description, role, image, release_date, skills, skins, attributes } = req.body;

  if (!name) {
    return res.status(400).json({ status: 'error', message: 'Name is required' });
  }

  if (!skills || skills.length < 2) {
    return res.status(400).json({ status: 'error', message: 'At least two skills are required' });
  }

  if (skins && skins.length === 0) {
    return res.status(400).json({ status: 'error', message: 'At least one skin is required' });
  }

  const existingHero = await prisma.hero.findFirst({
    where: {
      name: name,
    },
  });

  if (existingHero) {
    return res.status(400).json({ status: 'error', message: 'Hero with this name already exists' });
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
  const { id } = req.params;
  res.json({
    message: `Assume hero with ID ${id} is updated`
  });
}

const deleteHeroById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Assume hero with ID ${id} is deleted`
  });
}

export {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHeroById,
  deleteHeroById
};