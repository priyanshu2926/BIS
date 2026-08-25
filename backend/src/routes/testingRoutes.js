/**
 * @file backend/src/routes/testingRoutes.js
 * Testing Labs API Route definitions.
 */

import { Router } from 'express';
import testingController from '../controllers/testingController.js';

const router = Router();

// Primary requirement endpoints
router.get('/labs', testingController.getLabs);
router.get('/labs/:id', testingController.getLabById);

// Compatibility aliases for frontend services
router.get('/laboratories', testingController.getLabs);
router.get('/laboratories/:id', testingController.getLabById);
router.get('/products', testingController.getTestingProducts);
router.get('/standards', testingController.getTestingStandards);

export default router;
