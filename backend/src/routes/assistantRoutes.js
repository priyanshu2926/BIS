/**
 * @file backend/src/routes/assistantRoutes.js
 * Express router for Assistant chat endpoints and conversation sessions.
 */

import { Router } from 'express';
import { chat, createSession, getSession, listSessions } from '../controllers/assistantController.js';
import { assistantRateLimiter } from '../middleware/rateLimitMiddleware.js';

const router = Router();

// POST /api/v1/assistant/chat
router.post('/chat', assistantRateLimiter, chat);
router.post('/sessions', createSession);

// GET /api/v1/assistant/sessions/:id
router.get('/sessions/:id', getSession);

// GET /api/v1/assistant/sessions
router.get('/sessions', listSessions);

export default router;
