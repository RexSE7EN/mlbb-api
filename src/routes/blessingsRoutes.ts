import express from 'express';
import { authMiddleware, authorizedRoles } from '@/middleware/authMiddleware.js';
import {
  getBlessings,
  getBlessingById,
  createBlessing,
  updateBlessing,
  deleteBlessing,
} from '@/controllers/blessingController.js';

const router = express.Router();

router.get('/', getBlessings);
router.get('/:id', getBlessingById);

router.use(authMiddleware, authorizedRoles(['ADMIN']));
router.post('/', createBlessing);
router.patch('/:id', updateBlessing);
router.delete('/:id', deleteBlessing);

export default router;
