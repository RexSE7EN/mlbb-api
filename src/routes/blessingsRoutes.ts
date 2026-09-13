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
router.use(authMiddleware);

router.get('/', getBlessings);
router.get('/:id', getBlessingById);


router.post('/', authorizedRoles(['ADMIN']), createBlessing);
router.patch('/:id', authorizedRoles(['ADMIN']), updateBlessing);
router.delete('/:id', authorizedRoles(['ADMIN']), deleteBlessing);

export default router;
