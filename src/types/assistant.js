/**
 * @file src/types/assistant.js
 * Centralized Data Contracts and Types for BIS AI Assistant.
 * 
 * Future FastAPI + RAG backend returns these exact structures.
 * UI components must consume these normalized structures and must not define their own.
 */

/**
 * @typedef {Object} Source
 * @property {string} id - Unique identifier for the source citation
 * @property {string} title - Human-readable title of the document or standard
 * @property {string} document_type - e.g. 'BIS Standard', 'Certification Guideline', 'Lab Testing Manual', 'Quality Control Order'
 * @property {string} document_id - Official or demo standard code e.g. 'IS 374:2019 (Demo)'
 * @property {number|string} page - Page number or section clause
 * @property {string} snippet - Extracted text snippet supporting the AI response
 * @property {string} [url] - Optional link to official gazette / portal preview
 * @property {string} [clause] - Specific clause reference e.g. 'Clause 4.2.1'
 */

/**
 * @typedef {'user' | 'assistant'} MessageRole
 */

/**
 * @typedef {Object} Message
 * @property {string} id - Unique message ID
 * @property {string} conversation_id - ID of the conversation this message belongs to
 * @property {MessageRole} role - Message author role ('user' | 'assistant')
 * @property {string} content - Message text (supports structured markdown)
 * @property {string} created_at - ISO 8601 timestamp string
 * @property {Source[]} [sources] - Array of source citations (for assistant responses)
 * @property {boolean} [is_error] - Indicates if message resulted in an error
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id - Unique conversation ID
 * @property {string} title - Conversation subject line
 * @property {string} created_at - ISO 8601 timestamp string
 * @property {string} updated_at - ISO 8601 timestamp string
 * @property {number} message_count - Total messages count
 * @property {string} [last_message] - Snippet of the latest message
 */

/**
 * Document Type Constants
 */
export const DOCUMENT_TYPES = {
  STANDARD: 'BIS Standard',
  GUIDELINE: 'Certification Guideline',
  SCHEME: 'BIS Scheme Document',
  LAB_MANUAL: 'Lab Testing Manual',
  QCO: 'Quality Control Order',
}

/**
 * Message Roles
 */
export const ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
}

/**
 * Helper to create a new Message object
 * @param {Object} params
 * @param {string} params.conversationId
 * @param {MessageRole} params.role
 * @param {string} params.content
 * @param {Source[]} [params.sources=[]]
 * @param {string} [params.id]
 * @returns {Message}
 */
export function createMessage({
  conversationId,
  role,
  content,
  sources = [],
  id = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  createdAt = new Date().toISOString(),
}) {
  return {
    id,
    conversation_id: conversationId,
    role,
    content,
    created_at: createdAt,
    sources,
  }
}

/**
 * Helper to create a new Conversation object
 * @param {Object} params
 * @param {string} [params.title='New Conversation']
 * @param {string} [params.id]
 * @returns {Conversation}
 */
export function createConversation({
  title = 'New Conversation',
  id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  createdAt = new Date().toISOString(),
  messageCount = 0,
  lastMessage = '',
}) {
  return {
    id,
    title,
    created_at: createdAt,
    updated_at: createdAt,
    message_count: messageCount,
    last_message: lastMessage,
  }
}
