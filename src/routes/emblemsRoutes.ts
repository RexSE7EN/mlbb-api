import express from 'express';
import { authMiddleware, authorizedRoles } from '@/middleware/authMiddleware.js';
import {
  getEmblems,
  getEmblemById,
  createEmblem,
  updateEmblem,
  deleteEmblem,
} from '@/controllers/emblemController.js';

const router = express.Router();

router.get('/', getEmblems);
router.get('/:id', getEmblemById);

router.use(authMiddleware, authorizedRoles(['ADMIN']));
router.post('/', createEmblem);
router.patch('/:id', updateEmblem);
router.delete('/:id', deleteEmblem);

export default router;
