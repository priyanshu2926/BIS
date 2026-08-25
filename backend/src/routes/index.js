/**
 * @file backend/src/routes/index.js
 * Central router for API v1 (/api/v1).
 * Aggregates all modular route endpoints.
 */

import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import knowledgeRoutes from './knowledgeRoutes.js';
import assistantRoutes from './assistantRoutes.js';

const router = Router();

/**
 * Phase 0, Phase 2 & Phase 3 Core Routes
 */
router.use('/health', healthRoutes);
router.use('/knowledge', knowledgeRoutes);
router.use('/assistant', assistantRoutes);

/**
 * Future API Module Placeholders (to be implemented in subsequent phases):
 * 
 * router.use('/standards', standardsRoutes);
 * router.use('/certification', certificationRoutes);
 * router.use('/compliance', complianceRoutes);
 * router.use('/testing', testingRoutes);
 * router.use('/documents', documentsRoutes);
 * router.use('/products', productsRoutes);
 * router.use('/complaints', complaintsRoutes);
 */

export default router;
