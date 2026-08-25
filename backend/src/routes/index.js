/**
 * @file backend/src/routes/index.js
 * Central router for API v1 (/api/v1).
 * Aggregates all modular route endpoints.
 */

import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import knowledgeRoutes from './knowledgeRoutes.js';
import assistantRoutes from './assistantRoutes.js';
import standardsRoutes from './standardsRoutes.js';
import productsRoutes from './productsRoutes.js';
import testingRoutes from './testingRoutes.js';
import usersRoutes from './usersRoutes.js';
import certificationRoutes from './certificationRoutes.js';
import complianceRoutes from './complianceRoutes.js';
import documentsRoutes from './documentsRoutes.js';
import complaintsRoutes from './complaintsRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = Router();

/**
 * Phase 0, Phase 2 & Phase 3 Core Routes
 */
router.use('/health', healthRoutes);
router.use('/knowledge', knowledgeRoutes);
router.use('/assistant', assistantRoutes);
router.use('/standards', standardsRoutes);
router.use('/products', productsRoutes);
router.use('/testing', testingRoutes);
router.use('/users', usersRoutes);
router.use('/certification', certificationRoutes);
router.use('/compliance', complianceRoutes);
router.use('/documents', documentsRoutes);
router.use('/complaints', complaintsRoutes);
router.use('/chat', chatRoutes);

export default router;
