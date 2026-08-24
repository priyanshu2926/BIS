/**
 * @file backend/src/routes/standardsRoutes.js
 * Standards API Route definitions.
 */

import { Router } from 'express';
import standardsController from '../controllers/standardsController.js';

const router = Router();

// Specific routes before parameterized :id route
router.get('/search', standardsController.searchStandards);
router.get('/categories', standardsController.getCategories);
router.get('/product-categories', standardsController.getProductCategories);

// Root collection and ID routes
router.get('/', standardsController.getStandards);
router.get('/:id', standardsController.getStandardById);

export default router;
