/**
 * @file src/components/assistant/ChatMessage.jsx
 * Production-ready Chat Message component supporting Markdown-like formatting,
 * inline citations, copy button, regenerate action, and source pills.
 */

import { Bot, Check, Copy, FileText, Info, RotateCw, User } from 'lucide-react'
import { useState } from 'react'
import { ROLES } from '../../types/assistant'

/**
 * Format ISO date to readable time
 */
function formatTimestamp(isoString) {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

/**
 * Parse inline formatting (bold, italic, code, math symbols)
 */
function parseInlineMarkdown(text) {
  if (!text) return null

  // Split by bold (**text**) or inline code (`code`)
  const parts = []
  let remaining = text
  let keyIdx = 0

  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Push text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    const chunk = match[0]
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      parts.push(
        <strong key={`b-${keyIdx++}`} className="font-bold text-ink">
          {chunk.slice(2, -2)}
        </strong>
      )
    } else if (chunk.startsWith('`') && chunk.endsWith('`')) {
      parts.push(
        <code
          key={`c-${keyIdx++}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-navy border border-slate-200"
        >
          {chunk.slice(1, -1)}
        </code>
      )
    } else if (chunk.startsWith('*') && chunk.endsWith('*')) {
      parts.push(
        <em key={`i-${keyIdx++}`} className="italic text-slate-700">
          {chunk.slice(1, -1)}
        </em>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

/**
 * Custom Markdown-like Block Renderer
 */
function MarkdownRenderer({ content }) {
  if (!content) return null

  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (!line.trim()) {
      i++
      continue
    }

    // Heading 3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="mt-4 mb-2 text-base font-bold text-ink first:mt-0">
          {parseInlineMarkdown(line.replace(/^###\s+/, ''))}
        </h3>
      )
      i++
      continue
    }

    // Heading 4
    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="mt-3 mb-1.5 text-sm font-bold text-navy">
          {parseInlineMarkdown(line.replace(/^####\s+/, ''))}
        </h4>
      )
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-2.5 border-l-3 border-saffron bg-amber-50/60 py-2 px-3.5 text-xs leading-relaxed text-amber-950 rounded-r-lg"
        >
          {parseInlineMarkdown(line.replace(/^>\s+/, ''))}
        </blockquote>
      )
      i++
      continue
    }

    // Table detection (Markdown table starting with |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim())
        const rowLines = tableLines.slice(2) // skip separator row like |:---|:---|

        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {headerCells.map((h, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 font-bold text-ink">
                      {parseInlineMarkdown(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {rowLines.map((r, rIdx) => {
                  const cells = r
                    .split('|')
                    .slice(1, -1)
                    .map((c) => c.trim())
                  return (
                    <tr key={rIdx} className="hover:bg-slate-50/60">
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2 text-slate-700">
                          {parseInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
        continue
      }
    }

    // Unordered List (- or *)
    if (/^[\*\-]\s+/.test(line)) {
      const listItems = []
      while (i < lines.length && /^[\*\-]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^[\*\-]\s+/, ''))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1.5 pl-4 list-disc text-sm text-slate-700">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered List (1. 2. etc.)
    if (/^\d+\.\s+/.test(line)) {
      const listItems = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-2 space-y-1.5 pl-5 list-decimal text-sm text-slate-700">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Regular Paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1.5 text-sm leading-relaxed text-slate-700">
        {parseInlineMarkdown(line)}
      </p>
    )
    i++
  }

  return <div className="space-y-1">{elements}</div>
}

export default function ChatMessage({
  message,
  onRegenerate,
  onViewSource,
  isRegenerating = false,
}) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === ROLES.USER
  const sources = message.sources || []

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-rise">
        <div className="flex max-w-[85%] flex-col items-end sm:max-w-[75%]">
          {/* User Message Bubble */}
          <div className="rounded-2xl rounded-tr-xs bg-navy px-4 py-3 text-sm leading-relaxed text-white shadow-xs">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          {/* Timestamp */}
          <span className="mt-1 text-[11px] font-medium text-slate-400">
            {formatTimestamp(message.created_at)}
          </span>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-700 text-xs font-bold">
          <User size={15} />
        </div>
      </div>
    )
  }

  // Assistant Message
  return (
    <div className="flex items-start gap-3.5 animate-rise">
      {/* Bot Avatar */}
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy to-[#0b4d8f] text-white shadow-xs">
        <Bot size={18} aria-hidden="true" />
      </div>

      {/* Assistant Content Container */}
      <div className="flex flex-1 flex-col max-w-[95%] sm:max-w-[88%]">
        <div className="rounded-2xl rounded-tl-xs border border-slate-200 bg-white p-4.5 shadow-xs">
          {/* Assistant Header Tag */}
          <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy">BIS AI Assistant</span>
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-navy">
                Verified Guidance
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {formatTimestamp(message.created_at)}
            </span>
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose prose-sm max-w-none text-slate-800">
            <MarkdownRenderer content={message.content} />
          </div>

          {/* Inline Sources Badges if available */}
          {sources.length > 0 ? (
            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <FileText size={12} className="text-navy" />
                  Sources ({sources.length}):
                </span>
                {sources.map((src, sIdx) => (
                  <button
                    key={src.id || sIdx}
                    type="button"
                    onClick={() => onViewSource && onViewSource(src)}
                    className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50/70 px-2 py-0.5 text-xs font-semibold text-navy transition hover:bg-navy hover:text-white"
                    title={`View citation: ${src.title}`}
                  >
                    <span>{src.document_id}</span>
                    {src.page && <span className="opacity-75">· p.{src.page}</span>}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 italic">
              <Info size={12} />
              <span>No official source was returned for this response.</span>
            </div>
          )}

          {/* Action Bar (Copy & Regenerate) */}
          <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
            <div className="flex items-center gap-2">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-navy"
                aria-label="Copy message response"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Regenerate Button */}
              {onRegenerate && (
                <button
                  type="button"
                  onClick={() => onRegenerate(message.id)}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-navy disabled:opacity-50"
                  aria-label="Regenerate response"
                >
                  <RotateCw
                    size={13}
                    className={isRegenerating ? 'animate-spin text-navy' : ''}
                  />
                  <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
                </button>
              )}
            </div>

            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              BIS Standardized
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
