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

  res.json({
    message: 'Assume a new hero is created'
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