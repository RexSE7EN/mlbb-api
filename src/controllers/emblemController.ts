import { Request, Response } from 'express';
import { prisma } from '@/config/db.js';

const getEmblems = async (_req: Request, res: Response) => {
  try {
    const emblems = await prisma.emblem.findMany({
      include: { emblemTalents: true },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Emblems fetched successfully',
      data: emblems,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch emblems',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getEmblemById = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const emblem = await prisma.emblem.findUnique({
      where: { id },
      include: { emblemTalents: true },
    });

    if (!emblem) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Emblem fetched successfully',
      data: emblem,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch emblem',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const createEmblem = async (req: Request, res: Response) => {
  const { name, description, image, emblemTalents } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'Emblem name is required',
    });
  }

  try {
    const emblem = await prisma.emblem.create({
      data: {
        name,
        description: description ?? null,
        image: image ?? null,
        emblemTalents: {
          create: Array.isArray(emblemTalents)
            ? emblemTalents.map((talent: {
                name: string;
                description?: string | null;
                image?: string | null;
              }) => ({
                name: talent.name,
                description: talent.description ?? null,
                image: talent.image ?? null,
              }))
            : [],
        },
      },
      include: {
        emblemTalents: true,
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Emblem created successfully',
      data: emblem,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create emblem',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateEmblem = async (req: Request, res: Response) => {
  const { id }  = req.params;

  const { name, description, image } = req.body;

  try {
    const existingEmblem = await prisma.emblem.findUnique({ where: { id } });

    if (!existingEmblem) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem not found',
      });
    }

    const emblem = await prisma.emblem.update({
      where: { id: id.toString() },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Emblem updated successfully',
      data: emblem,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update emblem',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteEmblem = async (req: Request, res: Response) => {
  const { id }  = req.params;

  try {
    const emblem = await prisma.emblem.findUnique({ where: { id } });

    if (!emblem) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem not found',
      });
    }

    await prisma.emblem.delete({ where: { id: id.toString() } });

    return res.status(200).json({
      status: 'success',
      message: 'Emblem deleted successfully',
      data: emblem,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete emblem',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export {
  getEmblems,
  getEmblemById,
  createEmblem,
  updateEmblem,
  deleteEmblem,
};
