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
router.use(authMiddleware);

router.get('/', getEmblems);

router.get('/:id', getEmblemById);


router.post('/',authorizedRoles(['ADMIN']), createEmblem);
router.patch('/:id',authorizedRoles(['ADMIN']), updateEmblem);
router.delete('/:id',authorizedRoles(['ADMIN']), deleteEmblem);

export default router;
