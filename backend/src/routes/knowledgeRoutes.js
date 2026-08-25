import { Router } from 'express';
import { getChunk, getDocument, ingestDocument, searchKnowledge } from '../controllers/knowledgeController.js';

const router = Router();
router.post('/documents', ingestDocument);
router.get('/documents/:id', getDocument);
router.get('/chunks/:id', getChunk);
router.get('/search', searchKnowledge);

export default router;
