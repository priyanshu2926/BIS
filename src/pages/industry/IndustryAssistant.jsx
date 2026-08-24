/**
 * @file src/pages/industry/IndustryAssistant.jsx
 * Production-grade BIS AI Assistant Page for Industry Users.
 * 
 * Features:
 * - Full conversation history with grouped timelines & search
 * - Production-quality Chat Interface with streaming typing indicator
 * - Markdown-rendered responses with tables, clauses, checklists
 * - Citation Sources panel & deep-dive Source Inspection Modal
 * - Copy response & regeneration triggers
 * - Zero direct fetch/network calls (all decoupled through useAssistant hook & assistantApi service)
 */

import { BookOpen, FileCheck, Info, MessageSquare, Plus, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatHeader from '../../components/assistant/ChatHeader'
import ChatWindow from '../../components/assistant/ChatWindow'
import ConversationList from '../../components/assistant/ConversationList'
import SourceCard from '../../components/assistant/SourceCard'
import SourcePreviewModal from '../../components/assistant/SourcePreviewModal'
import { useAssistant } from '../../hooks/useAssistant'
import IndustryLayout from '../../layouts/IndustryLayout'

export default function IndustryAssistant() {
  const location = useLocation()
  const handledPromptRef = useRef(false)

  const {
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
  } = useAssistant()

  // Handle incoming 'Ask AI' navigation prompt from Standards search
  useEffect(() => {
    if (location.state?.prompt && !handledPromptRef.current && !isLoading) {
      handledPromptRef.current = true
      const incomingPrompt = location.state.prompt
      // Start a fresh conversation with standard title if provided
      const title = location.state.standardNumber || 'Standards Query'
      createNewConversation(title).then(() => {
        sendMessage(incomingPrompt)
      })
    }
  }, [location.state, isLoading, createNewConversation, sendMessage])

  // Responsive Drawer states
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileSourcesOpen, setMobileSourcesOpen] = useState(false)

  return (
    <IndustryLayout title="AI Assistant">
      <div className="flex h-[calc(100vh-140px)] min-h-[640px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        {/* Chat Header */}
        <ChatHeader
          activeTitle={currentConversation?.title || 'BIS AI Assistant'}
          sourceCount={activeSources.length}
          onNewChat={() => createNewConversation('New Conversation')}
          onClearChat={clearMessages}
          onToggleSidebar={() => setMobileNavOpen(true)}
          onToggleSources={() => setMobileSourcesOpen((prev) => !prev)}
          sourcesOpen={mobileSourcesOpen}
        />

        {/* 3-Column Workspace Body */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* ======================================================== */}
          {/* 1. Left: Conversation History Sidebar (Desktop)           */}
          {/* ======================================================== */}
          <div className="hidden w-72 shrink-0 border-r border-slate-200 lg:block">
            <ConversationList
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={selectConversation}
              onNewConversation={() => createNewConversation('New Conversation')}
              onDeleteConversation={deleteConversation}
            />
          </div>

          {/* Mobile Conversation Drawer */}
          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileNavOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-rise">
                <ConversationList
                  conversations={conversations}
                  currentConversationId={currentConversationId}
                  onSelectConversation={selectConversation}
                  onNewConversation={() => createNewConversation('New Conversation')}
                  onDeleteConversation={deleteConversation}
                  onCloseMobile={() => setMobileNavOpen(false)}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. Center: Main Chat Window                              */}
          {/* ======================================================== */}
          <main className="flex flex-1 flex-col overflow-hidden">
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              isSending={isSending}
              isRegeneratingId={isRegeneratingId}
              error={error}
              onSendMessage={sendMessage}
              onRegenerate={regenerateMessage}
              onViewSource={openSourcePreview}
              onRetry={retryLastMessage}
              onDismissError={dismissError}
            />
          </main>

          {/* ======================================================== */}
          {/* 3. Right: Verified Sources Panel (Desktop)               */}
          {/* ======================================================== */}
          <aside className="hidden w-80 shrink-0 flex-col border-l border-slate-200 bg-white xl:flex">
            {/* Sources Header */}
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-navy">
                    <BookOpen size={16} />
                  </span>
                  <h3 className="text-sm font-bold text-ink">Verified Sources</h3>
                </div>
                {activeSources.length > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-navy">
                    {activeSources.length} cited
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Official BIS standards & scheme clauses supporting this chat.
              </p>
            </div>

            {/* Sources List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeSources.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                    <FileCheck size={24} />
                  </span>
                  <p className="mt-3 text-xs font-bold text-slate-600">No sources for this view</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    Ask about specific product standards (e.g. electric fans, steel bottles, lab tests) to see verified BIS citations.
                  </p>
                </div>
              ) : (
                activeSources.map((source) => (
                  <SourceCard
                    key={source.id}
                    source={source}
                    onViewSource={openSourcePreview}
                  />
                ))
              )}
            </div>

            {/* Trust Footer */}
            <div className="border-t border-slate-100 bg-slate-50/70 p-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-navy">
                <ShieldCheck size={13} className="text-emerald-600" />
                BIS RAG Verification
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400 leading-tight">
                All citations are referenced from published Gazette notifications & BIS documents.
              </p>
            </div>
          </aside>

          {/* Mobile Sources Drawer */}
          {mobileSourcesOpen && (
            <div className="fixed inset-0 z-50 xl:hidden">
              <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileSourcesOpen(false)}
                aria-hidden="true"
              />
              <aside className="absolute inset-y-0 right-0 flex w-84 max-w-[85vw] flex-col bg-white shadow-2xl animate-rise">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={17} className="text-navy" />
                    <h3 className="text-sm font-bold text-ink">
                      Sources ({activeSources.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSourcesOpen(false)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                    aria-label="Close sources drawer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeSources.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                      No citations available for this message.
                    </div>
                  ) : (
                    activeSources.map((source) => (
                      <SourceCard
                        key={source.id}
                        source={source}
                        onViewSource={(src) => {
                          setMobileSourcesOpen(false)
                          openSourcePreview(src)
                        }}
                      />
                    ))
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      {/* Deep-dive Source Inspection Modal */}
      {selectedSource && (
        <SourcePreviewModal source={selectedSource} onClose={closeSourcePreview} />
      )}
    </IndustryLayout>
  )
}
