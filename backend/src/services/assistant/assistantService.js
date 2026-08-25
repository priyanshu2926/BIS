/**
 * @file backend/src/services/assistant/assistantService.js
 * Primary orchestration service for Phase 3 BIS RAG pipeline.
 * Coordinates retrieval, prompt compilation, LLM synthesis, citation building, and session history.
 */

import prisma, { isDatabaseAvailable } from '../../lib/prisma.js';
import retrievalService from './retrievalService.js';
import promptService from './promptService.js';
import llmService from './llmService.js';
import citationService from './citationService.js';

// In-memory fallback session store for local development when PostgreSQL is not running
const inMemorySessions = new Map();
const inMemoryMessages = new Map();

/**
 * Helper to get or create a session in database or in-memory store.
 */
const getOrCreateSession = async (sessionId, mode = 'industry', initialTitle = 'New Conversation') => {
  if (await isDatabaseAvailable()) {
    try {
      if (sessionId) {
        const existing = await prisma.chatSession.findUnique({
          where: { id: sessionId },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        });
        if (existing) return existing;
      }

      const created = await prisma.chatSession.create({
        data: {
          title: initialTitle,
          mode: mode || 'industry',
        },
        include: { messages: true },
      });
      return created;
    } catch {
      // Fallback to in-memory store
    }
  }

  // In-memory fallback
  if (sessionId && inMemorySessions.has(sessionId)) {
    const session = inMemorySessions.get(sessionId);
    const messages = inMemoryMessages.get(sessionId) || [];
    return { ...session, messages };
  }

  const newId = sessionId || `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newSession = {
    id: newId,
    title: initialTitle,
    mode: mode || 'industry',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  inMemorySessions.set(newId, newSession);
  inMemoryMessages.set(newId, []);
  return { ...newSession, messages: [] };
};

/** Create an empty chat session for clients that start a conversation before sending a message. */
export const createSession = async ({ mode = 'industry', title = 'New Conversation' } = {}) =>
  getOrCreateSession(null, mode, String(title || 'New Conversation').trim() || 'New Conversation');

/**
 * Save user and assistant messages into session history.
 */
const persistMessages = async (sessionId, userMessage, assistantAnswer, sources = []) => {
  if (await isDatabaseAvailable()) {
    try {
      await prisma.$transaction([
        prisma.chatMessage.create({
          data: {
            sessionId,
            role: 'USER',
            content: userMessage,
          },
        }),
        prisma.chatMessage.create({
          data: {
            sessionId,
            role: 'ASSISTANT',
            content: assistantAnswer,
            metadata: { sources },
          },
        }),
        prisma.chatSession.update({
          where: { id: sessionId },
          data: {
            updatedAt: new Date(),
            title: userMessage.length > 30 ? `${userMessage.substring(0, 30)}...` : userMessage,
          },
        }),
      ]);
      return;
    } catch {
      // Fallback to in-memory store
    }
  }

  const list = inMemoryMessages.get(sessionId) || [];
  const userMsgObj = {
    id: `msg-${Date.now()}-user`,
    sessionId,
    role: 'USER',
    content: userMessage,
    createdAt: new Date().toISOString(),
  };
  const assistantMsgObj = {
    id: `msg-${Date.now()}-assistant`,
    sessionId,
    role: 'ASSISTANT',
    content: assistantAnswer,
    metadata: { sources },
    createdAt: new Date().toISOString(),
  };

  list.push(userMsgObj, assistantMsgObj);
  inMemoryMessages.set(sessionId, list);

  const session = inMemorySessions.get(sessionId);
  if (session) {
    session.updatedAt = new Date().toISOString();
    session.title = userMessage.length > 30 ? `${userMessage.substring(0, 30)}...` : userMessage;
  }
};

/**
 * Process a user question through the complete BIS RAG pipeline.
 * 
 * @param {Object} params
 * @param {string} params.message - User query
 * @param {'industry' | 'consumer'} [params.mode='industry'] - User persona mode
 * @param {string} [params.sessionId=null] - Conversation session identifier
 * @returns {Promise<Object>} Formatted response with answer, citations, and session ID
 */
export const processChat = async ({ message, mode = 'industry', sessionId = null }) => {
  const cleanMessage = String(message || '').trim();
  if (!cleanMessage) {
    const error = new Error('Message is required');
    error.statusCode = 400;
    throw error;
  }

  const validMode = mode === 'consumer' ? 'consumer' : 'industry';

  // 1. Retrieve or initialize chat session
  const session = await getOrCreateSession(sessionId, validMode);
  const currentSessionId = session.id;
  const history = session.messages || [];

  // 2. Derive context from recent conversation for follow-up questions
  let contextQuery = '';
  if (history.length > 0) {
    const recentMessages = history.slice(-4);
    contextQuery = recentMessages.map((m) => m.content).join(' ');
  }

  // 3. Retrieve relevant BIS knowledge chunks
  const retrievedChunks = await retrievalService.retrieveRelevantChunks(cleanMessage, {
    contextQuery,
  });

  // 4. Construct grounded prompt
  const promptData = promptService.constructPrompt({
    message: cleanMessage,
    mode: validMode,
    retrievedChunks,
    history,
  });

  // 5. Generate grounded response from LLM / synthesizer
  const answer = await llmService.generateAnswer(
    { message: cleanMessage, mode: validMode, retrievedChunks },
    promptData
  );

  // 6. Build verified citations strictly from database records
  const sources = citationService.buildCitations(retrievedChunks);

  // 7. Persist messages in session history
  await persistMessages(currentSessionId, cleanMessage, answer, sources);

  return {
    answer,
    mode: validMode,
    sessionId: currentSessionId,
    sources,
  };
};

/**
 * Retrieve session history by session ID.
 * @param {string} sessionId
 * @returns {Promise<Object>}
 */
export const getSessionById = async (sessionId) => {
  if (await isDatabaseAvailable()) {
    try {
      const session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });
      if (session) return session;
    } catch {
      // Fallback
    }
  }

  if (inMemorySessions.has(sessionId)) {
    const session = inMemorySessions.get(sessionId);
    const messages = inMemoryMessages.get(sessionId) || [];
    return { ...session, messages };
  }

  return null;
};

/**
 * List active chat sessions.
 * @param {string} [mode]
 * @returns {Promise<Array<Object>>}
 */
export const listSessions = async (mode) => {
  if (await isDatabaseAvailable()) {
    try {
      const where = mode ? { mode } : {};
      const sessions = await prisma.chatSession.findMany({
        where,
        include: { _count: { select: { messages: true } } },
        orderBy: { updatedAt: 'desc' },
        take: 30,
      });
      return sessions;
    } catch {
      // Fallback
    }
  }

  const results = [];
  for (const [id, session] of inMemorySessions.entries()) {
    if (!mode || session.mode === mode) {
      const msgs = inMemoryMessages.get(id) || [];
      results.push({
        ...session,
        _count: { messages: msgs.length },
      });
    }
  }

  return results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export default {
  processChat,
  getSessionById,
  listSessions,
};
