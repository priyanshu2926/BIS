/**
 * @file src/services/api/assistantApi.js
 * Primary API Service for BIS AI Assistant.
 * 
 * Clean abstraction layer decoupling React components & custom hooks from API/network logic.
 * Currently uses high-fidelity mockAssistantApi.
 * Can be swapped to a real FastAPI + RAG backend without modifying any UI components.
 * 
 * Proposed Future FastAPI Endpoints:
 * - POST   /api/assistant/chat
 * - GET    /api/assistant/conversations
 * - GET    /api/assistant/conversations/{conversation_id}
 * - POST   /api/assistant/conversations
 * - DELETE /api/assistant/conversations/{conversation_id}
 * - POST   /api/assistant/messages/{message_id}/regenerate
 * - POST   /api/assistant/conversations/{conversation_id}/clear
 */

import { apiClient } from './apiClient'
import { mockAssistantApi } from '../mock/mockAssistantApi'

// Set to false when connecting to live FastAPI backend
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

export const assistantApi = {
  /**
   * Fetch all conversation history summaries
   * @returns {Promise<{ conversations: Array }>}
   */
  async getConversations() {
    if (USE_MOCK_API) {
      return mockAssistantApi.getConversations()
    }
    return apiClient.get('/assistant/conversations')
  },

  /**
   * Fetch specific conversation with full message history and citations
   * @param {string} conversationId
   * @returns {Promise<{ conversation: Object, messages: Array }>}
   */
  async getConversation(conversationId) {
    if (USE_MOCK_API) {
      return mockAssistantApi.getConversation(conversationId)
    }
    return apiClient.get(`/assistant/conversations/${conversationId}`)
  },

  /**
   * Create a new empty conversation session
   * @param {string} [title='New Conversation']
   * @returns {Promise<{ conversation: Object }>}
   */
  async createConversation(title = 'New Conversation') {
    if (USE_MOCK_API) {
      return mockAssistantApi.createConversation(title)
    }
    return apiClient.post('/assistant/conversations', { title })
  },

  /**
   * Delete a conversation by ID
   * @param {string} conversationId
   * @returns {Promise<{ success: boolean, id: string }>}
   */
  async deleteConversation(conversationId) {
    if (USE_MOCK_API) {
      return mockAssistantApi.deleteConversation(conversationId)
    }
    return apiClient.delete(`/assistant/conversations/${conversationId}`)
  },

  /**
   * Send a user message and retrieve AI response with source citations
   * @param {Object} params
   * @param {string} params.conversationId
   * @param {string} params.message
   * @returns {Promise<{ message: Object, conversation: Object }>}
   */
  async sendMessage({ conversationId, message }) {
    if (USE_MOCK_API) {
      return mockAssistantApi.sendMessage({ conversationId, message })
    }
    return apiClient.post('/assistant/chat', {
      conversation_id: conversationId,
      message,
    })
  },

  /**
   * Request regeneration of an assistant response
   * @param {Object} params
   * @param {string} params.conversationId
   * @param {string} params.messageId
   * @returns {Promise<{ message: Object }>}
   */
  async regenerateMessage({ conversationId, messageId }) {
    if (USE_MOCK_API) {
      return mockAssistantApi.regenerateMessage({ conversationId, messageId })
    }
    return apiClient.post(`/assistant/messages/${messageId}/regenerate`, {
      conversation_id: conversationId,
    })
  },

  /**
   * Clear all messages in current conversation
   * @param {string} conversationId
   * @returns {Promise<{ success: boolean }>}
   */
  async clearConversation(conversationId) {
    if (USE_MOCK_API) {
      return mockAssistantApi.clearConversation(conversationId)
    }
    return apiClient.post(`/assistant/conversations/${conversationId}/clear`)
  },
}
