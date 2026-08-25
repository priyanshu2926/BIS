import { Router } from 'express';
import complaintsController from '../controllers/complaintsController.js';

const router = Router();
router.get('/', complaintsController.list);
router.get('/:id', complaintsController.getById);
router.post('/', complaintsController.create);
export default router;