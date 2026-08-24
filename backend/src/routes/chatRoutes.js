import { Router } from 'express';
import { createResourceController } from '../controllers/resourceController.js';

const router = Router();
const controller = createResourceController('chat', 'Chat session');
router.get('/', controller.list);
router.get('/:id', controller.getById);
export default router;