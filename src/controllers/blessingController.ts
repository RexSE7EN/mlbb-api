import { Request, Response } from 'express';
import { prisma } from '@/config/db.js';

const getBlessings = async (_req: Request, res: Response) => {
  try {
    const blessings = await prisma.blessing.findMany();

    return res.status(200).json({
      status: 'success',
      message: 'Blessings fetched successfully',
      data: blessings,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blessings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getBlessingById = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const blessing = await prisma.blessing.findUnique({
      where: { id },
    });

    if (!blessing) {
      return res.status(404).json({
        status: 'error',
        message: 'Blessing not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Blessing fetched successfully',
      data: blessing,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blessing',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const createBlessing = async (req: Request, res: Response) => {
  const { name, description, image, type } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'Blessing name is required',
    });
  }

  try {
    const blessing = await prisma.blessing.create({
      data: {
        name,
        description: description ?? null,
        image: image ?? null,
        type: type ?? 'UNDEFINED',
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Blessing created successfully',
      data: blessing,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create blessing',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateBlessing = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { name, description, image, type } = req.body;

  try {
    const existingBlessing = await prisma.blessing.findUnique({ where: { id } });

    if (!existingBlessing) {
      return res.status(404).json({
        status: 'error',
        message: 'Blessing not found',
      });
    }

    const blessing = await prisma.blessing.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(type !== undefined && { type }),
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Blessing updated successfully',
      data: blessing,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update blessing',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteBlessing = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const blessing = await prisma.blessing.findUnique({ where: { id } });

    if (!blessing) {
      return res.status(404).json({
        status: 'error',
        message: 'Blessing not found',
      });
    }

    await prisma.blessing.delete({ where: { id } });

    return res.status(200).json({
      status: 'success',
      message: 'Blessing deleted successfully',
      data: blessing,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete blessing',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export {
  getBlessings,
  getBlessingById,
  createBlessing,
  updateBlessing,
  deleteBlessing,
};
