import { Request, Response } from 'express';

const getAllHeroes = (req: Request, res: Response) => {
  res.json({
    message: 'Assume all the heroes are here'
  });
};

const getHeroById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Assume hero with ID ${id} is here`
  });
}

const createHero = (req: Request, res: Response) => {
  res.json({
    message: 'Assume a new hero is created'
  });
}

const updateHeroById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Assume hero with ID ${id} is updated`
  });
}

const deleteHeroById = (req: Request, res: Response) => {
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