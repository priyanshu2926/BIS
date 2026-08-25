/**
 * @file backend/src/controllers/assistantController.js
 * Controller handling Assistant chat interactions and conversation history.
 */

import assistantService from '../services/assistant/assistantService.js';

/**
 * Process a user question through the BIS Assistant RAG pipeline.
 * @route POST /api/v1/assistant/chat
 * @access Public
 */
export const chat = async (req, res, next) => {
  try {
    const { message, mode, sessionId } = req.body || {};

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Field "message" is required and cannot be empty.',
      });
    }

    if (mode && !['industry', 'consumer'].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mode. Supported modes are "industry" and "consumer".',
      });
    }

    const data = await assistantService.processChat({
      message: String(message).trim(),
      mode: mode || 'industry',
      sessionId: sessionId || null,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

/** Create an empty conversation session. */
export const createSession = async (req, res, next) => {
  try {
    const { mode, title } = req.body || {};
    if (mode && !['industry', 'consumer'].includes(mode)) {
      return res.status(400).json({ success: false, message: 'Invalid mode. Supported modes are "industry" and "consumer".' });
    }
    const session = await assistantService.createSession({ mode: mode || 'industry', title });
    return res.status(201).json({ success: true, data: session });
  } catch (error) {
    return next(error);
  }
};

/**
 * Retrieve conversation session history.
 * @route GET /api/v1/assistant/sessions/:id
 * @access Public
 */
export const getSession = async (req, res, next) => {
  try {
    const session = await assistantService.getSessionById(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Conversation session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * List conversation sessions.
 * @route GET /api/v1/assistant/sessions
 * @access Public
 */
export const listSessions = async (req, res, next) => {
  try {
    const mode = req.query.mode;
    const sessions = await assistantService.listSessions(mode);

    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  chat,
  createSession,
  getSession,
  listSessions,
};
