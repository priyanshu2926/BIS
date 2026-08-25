/**
 * @file backend/src/routes/productsRoutes.js
 * Products API Route definitions.
 */

import { Router } from 'express';
import productsController from '../controllers/productsController.js';

const router = Router();

router.get('/search', productsController.searchProducts);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

export default router;
