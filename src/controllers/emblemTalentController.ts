import { Request, Response } from 'express';
import { prisma } from '@/config/db.js';

const getEmblemTalents = async (_req: Request, res: Response) => {
  try {
    const emblemTalents = await prisma.emblemTalent.findMany({
      include: { emblem: true },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Emblem talents fetched successfully',
      data: emblemTalents,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch emblem talents',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getEmblemTalentById = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const emblemTalent = await prisma.emblemTalent.findUnique({
      where: { id },
      include: { emblem: true },
    });

    if (!emblemTalent) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem talent not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Emblem talent fetched successfully',
      data: emblemTalent,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch emblem talent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const createEmblemTalent = async (req: Request, res: Response) => {
  const { emblemId, name, description, image } = req.body;

  if (!emblemId || !name) {
    return res.status(400).json({
      status: 'error',
      message: 'emblemId and name are required',
    });
  }

  try {
    const emblem = await prisma.emblem.findUnique({ where: { id: emblemId } });

    if (!emblem) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem not found',
      });
    }

    const emblemTalent = await prisma.emblemTalent.create({
      data: {
        emblemId,
        name,
        description: description ?? null,
        image: image ?? null,
      },
      include: { emblem: true },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Emblem talent created successfully',
      data: emblemTalent,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create emblem talent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateEmblemTalent = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { emblemId, name, description, image } = req.body;

  try {
    const existingEmblemTalent = await prisma.emblemTalent.findUnique({ where: { id } });

    if (!existingEmblemTalent) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem talent not found',
      });
    }

    if (emblemId) {
      const emblem = await prisma.emblem.findUnique({ where: { id: emblemId } });

      if (!emblem) {
        return res.status(404).json({
          status: 'error',
          message: 'Emblem not found',
        });
      }
    }

    const emblemTalent = await prisma.emblemTalent.update({
      where: { id },
      data: {
        ...(emblemId !== undefined && { emblemId }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
      },
      include: { emblem: true },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Emblem talent updated successfully',
      data: emblemTalent,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update emblem talent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteEmblemTalent = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const emblemTalent = await prisma.emblemTalent.findUnique({ where: { id } });

    if (!emblemTalent) {
      return res.status(404).json({
        status: 'error',
        message: 'Emblem talent not found',
      });
    }

    await prisma.emblemTalent.delete({ where: { id } });

    return res.status(200).json({
      status: 'success',
      message: 'Emblem talent deleted successfully',
      data: emblemTalent,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete emblem talent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export {
  getEmblemTalents,
  getEmblemTalentById,
  createEmblemTalent,
  updateEmblemTalent,
  deleteEmblemTalent,
};
