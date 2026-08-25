/**
 * @file backend/src/routes/index.js
 * Central router for API v1 (/api/v1).
 * Aggregates all modular route endpoints.
 */

import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
<<<<<<< HEAD
import knowledgeRoutes from './knowledgeRoutes.js';
import assistantRoutes from './assistantRoutes.js';
=======
import standardsRoutes from './standardsRoutes.js';
import productsRoutes from './productsRoutes.js';
import testingRoutes from './testingRoutes.js';
import usersRoutes from './usersRoutes.js';
import certificationRoutes from './certificationRoutes.js';
import complianceRoutes from './complianceRoutes.js';
import documentsRoutes from './documentsRoutes.js';
import complaintsRoutes from './complaintsRoutes.js';
import chatRoutes from './chatRoutes.js';
>>>>>>> ed99aa5029fb2b3f561ad1cc7dee8cdb621096d5

const router = Router();

/**
 * Phase 0, Phase 2 & Phase 3 Core Routes
 */
router.use('/health', healthRoutes);
<<<<<<< HEAD
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
=======
router.use('/standards', standardsRoutes);
router.use('/products', productsRoutes);
router.use('/testing', testingRoutes);
router.use('/users', usersRoutes);
router.use('/certification', certificationRoutes);
router.use('/compliance', complianceRoutes);
router.use('/documents', documentsRoutes);
router.use('/complaints', complaintsRoutes);
router.use('/chat', chatRoutes);
>>>>>>> ed99aa5029fb2b3f561ad1cc7dee8cdb621096d5

export default router;
