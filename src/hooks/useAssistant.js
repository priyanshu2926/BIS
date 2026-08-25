/**
 * @file src/hooks/useAssistant.js
 * Custom hook for state management of BIS AI Assistant.
 * 
 * Encapsulates all conversation state, message handling, error boundaries,
 * loading indicators, citation sources, and API orchestration.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { assistantApi } from '../services/api/assistantApi'
import { ROLES, createMessage } from '../types/assistant'

export function useAssistant(initialConversationId = null, mode = 'industry') {
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(initialConversationId)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isRegeneratingId, setIsRegeneratingId] = useState(null)
  const [error, setError] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null)
  const lastSentTextRef = useRef('')

  // Derive current conversation object
  const currentConversation = useMemo(
    () => conversations.find((c) => c.id === currentConversationId) || null,
    [conversations, currentConversationId]
  )

  // Derive latest active sources from the most recent assistant message or all messages in current chat
  const activeSources = useMemo(() => {
    // Find the latest assistant message that has sources
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === ROLES.ASSISTANT && messages[i].sources && messages[i].sources.length > 0) {
        return messages[i].sources
      }
    }
    return []
  }, [messages])

  /**
   * Load all conversations on mount
   */
  const loadConversations = useCallback(async (autoSelectFirst = true) => {
    try {
      setIsLoading(true)
      const data = await assistantApi.getConversations()
      const convList = data.conversations || []
      setConversations(convList)

      if (autoSelectFirst && convList.length > 0) {
        setCurrentConversationId((prev) => prev || convList[0].id)
      }
    } catch (err) {
      setError('Unable to load conversations. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Load messages for the active conversation
   */
  const loadConversationMessages = useCallback(async (conversationId) => {
    if (!conversationId) {
      setMessages([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await assistantApi.getConversation(conversationId)
      setMessages(data.messages || [])
    } catch (err) {
      setError('Failed to load conversation history.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  // Load messages whenever active conversation changes
  useEffect(() => {
    if (currentConversationId) {
      loadConversationMessages(currentConversationId)
    }
  }, [currentConversationId, loadConversationMessages])

  /**
   * Select a conversation by ID
   */
  const selectConversation = useCallback((conversationId) => {
    if (conversationId === currentConversationId) return
    setCurrentConversationId(conversationId)
    setError(null)
  }, [currentConversationId])

  /**
   * Create a new conversation session
   */
  const createNewConversation = useCallback(async (title = 'New Conversation') => {
    try {
      setError(null)
      const data = await assistantApi.createConversation(title)
      const newConv = data.conversation
      setConversations((prev) => [newConv, ...prev])
      setCurrentConversationId(newConv.id)
      setMessages([])
      return newConv
    } catch (err) {
      setError('Unable to create a new conversation.')
      throw err
    }
  }, [])

  /**
   * Delete a conversation
   */
  const deleteConversation = useCallback(
    async (conversationId) => {
      try {
        setError(null)
        await assistantApi.deleteConversation(conversationId)
        
        const remaining = conversations.filter((c) => c.id !== conversationId)
        setConversations(remaining)

        if (currentConversationId === conversationId) {
          if (remaining.length > 0) {
            setCurrentConversationId(remaining[0].id)
          } else {
            // No conversations left, create a fresh one
            const newConv = await assistantApi.createConversation('New Conversation')
            setConversations([newConv.conversation])
            setCurrentConversationId(newConv.conversation.id)
            setMessages([])
          }
        }
      } catch (err) {
        setError('Failed to delete conversation.')
      }
    },
    [conversations, currentConversationId]
  )

  /**
   * Send a user message and receive AI response with sources
   * @param {string} text - User message content
   * @param {string} [overrideConversationId=null] - Optional conversation ID to bypass state closure latency
   */
  const sendMessage = useCallback(
    async (text, overrideConversationId = null) => {
      const cleanText = text?.trim()
      if (!cleanText || isSending) return

      lastSentTextRef.current = cleanText
      setError(null)

      let targetConvId = overrideConversationId || currentConversationId

      // If no active conversation, create one first
      if (!targetConvId) {
        try {
          const generatedTitle = cleanText.length > 30 ? `${cleanText.substring(0, 30)}...` : cleanText
          const newConvRes = await assistantApi.createConversation(generatedTitle, mode)
          targetConvId = newConvRes.conversation.id
          setConversations((prev) => [newConvRes.conversation, ...prev])
          setCurrentConversationId(targetConvId)
        } catch {
          setError('Failed to initialize a new conversation session.')
          return
        }
      }

      // Optimistic user message insertion
      const optimisticUserMsg = createMessage({
        conversationId: targetConvId,
        role: ROLES.USER,
        content: cleanText,
      })

      setMessages((prev) => {
        // Prevent duplicate user bubble when retrying the same message
        if (prev.length > 0) {
          const lastMsg = prev[prev.length - 1]
          if (lastMsg.role === ROLES.USER && lastMsg.content === cleanText) {
            return prev
          }
        }
        return [...prev, optimisticUserMsg]
      })
      setIsSending(true)

      try {
        const response = await assistantApi.sendMessage({
          conversationId: targetConvId,
          message: cleanText,
          mode,
        })

        const assistantMsg = response.message
        setMessages((prev) => [...prev, assistantMsg])

        // Update conversation list item
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === targetConvId) {
              return {
                ...c,
                updated_at: new Date().toISOString(),
                message_count: (c.message_count || 0) + 2,
                last_message: cleanText.substring(0, 60),
                title:
                  c.title === 'New Conversation'
                    ? cleanText.length > 32
                      ? `${cleanText.substring(0, 32)}...`
                      : cleanText
                    : c.title,
              }
            }
            return c
          })
        )
      } catch (err) {
        setError(err.message || 'Something went wrong while generating response. Please try again.')
      } finally {
        setIsSending(false)
      }
    },
    [currentConversationId, isSending, mode]
  )

  /**
   * Retry the last sent message
   */
  const retryLastMessage = useCallback(() => {
    if (lastSentTextRef.current) {
      sendMessage(lastSentTextRef.current)
    }
  }, [sendMessage])

  /**
   * Regenerate a specific assistant message
   */
  const regenerateMessage = useCallback(
    async (messageId) => {
      if (!currentConversationId || !messageId || isRegeneratingId) return

      try {
        setIsRegeneratingId(messageId)
        setError(null)

        const response = await assistantApi.regenerateMessage({
          conversationId: currentConversationId,
          messageId,
        })

        const updatedMsg = response.message
        setMessages((prev) => prev.map((m) => (m.id === messageId ? updatedMsg : m)))
      } catch (err) {
        setError('Failed to regenerate response. Please try again.')
      } finally {
        setIsRegeneratingId(null)
      }
    },
    [currentConversationId, isRegeneratingId]
  )

  /**
   * Clear messages in the current conversation
   */
  const clearMessages = useCallback(async () => {
    if (!currentConversationId) return

    try {
      setError(null)
      await assistantApi.clearConversation(currentConversationId)
      setMessages([])
      setConversations((prev) =>
        prev.map((c) => (c.id === currentConversationId ? { ...c, message_count: 0, last_message: '' } : c))
      )
    } catch (err) {
      setError('Unable to clear conversation.')
    }
  }, [currentConversationId])

  /**
   * Open / close source detail preview
   */
  const openSourcePreview = useCallback((source) => {
    setSelectedSource(source)
  }, [])

  const closeSourcePreview = useCallback(() => {
    setSelectedSource(null)
  }, [])

  const dismissError = useCallback(() => {
    setError(null)
  }, [])

  return {
    conversations,
    currentConversationId,
    currentConversation,
    messages,
    isLoading,
    isSending,
    isRegeneratingId,
    error,
    activeSources,
    selectedSource,
    sendMessage,
    selectConversation,
    createNewConversation,
    deleteConversation,
    regenerateMessage,
    retryLastMessage,
    clearMessages,
    openSourcePreview,
    closeSourcePreview,
    dismissError,
  }
}
