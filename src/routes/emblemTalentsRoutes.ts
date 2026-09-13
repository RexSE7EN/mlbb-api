import express from 'express';
import { authMiddleware, authorizedRoles } from '@/middleware/authMiddleware.js';
import {
  getEmblemTalents,
  getEmblemTalentById,
  createEmblemTalent,
  updateEmblemTalent,
  deleteEmblemTalent,
} from '@/controllers/emblemTalentController.js';

const router = express.Router();

router.get('/', getEmblemTalents);
router.get('/:id', getEmblemTalentById);

router.use(authMiddleware, authorizedRoles(['ADMIN']));
router.post('/', createEmblemTalent);
router.patch('/:id', updateEmblemTalent);
router.delete('/:id', deleteEmblemTalent);

export default router;
