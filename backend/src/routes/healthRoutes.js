/**
 * @file backend/src/routes/healthRoutes.js
 * Router for health check and service readiness verification.
 */

import { Router } from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router = Router();

// GET /api/v1/health
router.get('/', getHealthStatus);

export default router;
