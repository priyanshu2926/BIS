/** API adapter for the Phase 3 Express BIS assistant endpoints. */
import { apiClient } from './apiClient'
import { mockAssistantApi } from '../mock/mockAssistantApi'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

const toConversation = (session) => ({
  id: session.id,
  title: session.title,
  created_at: session.createdAt,
  updated_at: session.updatedAt,
  message_count: session._count?.messages ?? session.messages?.length ?? 0,
})

const toMessage = (message) => ({
  id: message.id,
  conversation_id: message.sessionId,
  role: String(message.role).toLowerCase() === 'assistant' ? 'assistant' : 'user',
  content: message.content,
  created_at: message.createdAt,
  sources: message.metadata?.sources || [],
})

export const assistantApi = {
  async getConversations() {
    if (USE_MOCK_API) return mockAssistantApi.getConversations()
    const response = await apiClient.get('/assistant/sessions')
    return { conversations: (response.data || []).map(toConversation) }
  },

  async getConversation(conversationId) {
    if (USE_MOCK_API) return mockAssistantApi.getConversation(conversationId)
    const response = await apiClient.get(`/assistant/sessions/${conversationId}`)
    const session = response.data
    return { conversation: toConversation(session), messages: (session.messages || []).map(toMessage) }
  },

  async createConversation(title = 'New Conversation', mode = 'industry') {
    if (USE_MOCK_API) return mockAssistantApi.createConversation(title)
    const response = await apiClient.post('/assistant/sessions', { title, mode })
    return { conversation: toConversation(response.data) }
  },

  async sendMessage({ conversationId, message, mode = 'industry' }) {
    if (USE_MOCK_API) return mockAssistantApi.sendMessage({ conversationId, message })
    const response = await apiClient.post('/assistant/chat', { sessionId: conversationId, message, mode })
    const data = response.data
    return {
      conversation: { id: data.sessionId, mode: data.mode },
      message: {
        id: `assistant_${Date.now()}`,
        conversation_id: data.sessionId,
        role: 'assistant',
        content: data.answer,
        created_at: new Date().toISOString(),
        sources: data.sources || [],
      },
    }
  },
}
