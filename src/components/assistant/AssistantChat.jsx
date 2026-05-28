import { useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { ASSISTANT_SUGGESTED_QUESTIONS } from '../../data/buildAssistantKnowledge'
import { useAssistantChat } from '../../hooks/useAssistantChat'
function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${
          isUser
            ? 'rounded-br-md bg-indigo-500/25 text-theme-fg'
            : 'rounded-bl-md border border-glass bg-glass-strong text-theme-muted'
        }`}
      >
        {content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function AssistantChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, error, sendMessage, clearChat } = useAssistantChat()
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const panelId = useId()
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading, open])

  const submit = (text) => {
    const value = text ?? input
    if (!value.trim()) return
    setInput('')
    sendMessage(value)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="assistant-fab fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-indigo-500/30 px-4 py-3 text-sm font-medium text-theme-fg shadow-[0_0_40px_-12px_rgba(99,102,241,0.55)] backdrop-blur-xl transition-[transform,box-shadow] hover:scale-[1.02] hover:border-indigo-400/40 hover:shadow-[0_0_48px_-10px_rgba(99,102,241,0.65)] active:scale-[0.98] sm:bottom-6 sm:right-6"
          style={{ background: 'var(--assistant-bg)' }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <Sparkles size={18} className="text-indigo-400" aria-hidden="true" />
          <span className="hidden sm:inline">Ask about Juan</span>
          <span className="sm:hidden">Assistant</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-end sm:justify-end sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          />

          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="assistant-panel relative flex h-[min(100dvh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-glass shadow-2xl backdrop-blur-2xl sm:h-[min(560px,85dvh)] sm:rounded-3xl"
            style={{ background: 'var(--assistant-panel-bg)' }}
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-glass px-4 py-3.5 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10">
                  <MessageCircle size={18} className="text-indigo-400" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 id={titleId} className="truncate text-sm font-semibold text-heading">
                    Juan&apos;s Assistant
                  </h2>
                  <p className="truncate text-xs text-theme-muted-2">
                    Experience, projects, stack & more — from this portfolio
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-lg px-2 py-1.5 text-xs text-theme-muted-2 transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-theme-muted"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-glass p-2 text-theme-muted transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-theme-fg"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div
              ref={listRef}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5"
            >
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-theme-muted">
                    Hi — I&apos;m trained on this site&apos;s content. Ask me about Juan&apos;s experience at
                    CreditON, Servo, his stack, how he works, or whether he&apos;s open to opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ASSISTANT_SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        disabled={loading}
                        onClick={() => submit(q)}
                        className="rounded-full border border-glass bg-glass-strong px-3 py-1.5 text-left text-xs text-theme-muted transition-colors hover:border-indigo-500/25 hover:bg-indigo-500/[0.08] hover:text-theme-fg disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <MessageBubble key={`${m.role}-${i}`} role={m.role} content={m.content} />
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-glass bg-glass-strong px-4 py-3">
                    <span className="assistant-typing text-sm text-theme-muted-2">Thinking…</span>
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-3 py-2 text-xs text-red-300/90">
                  {error}
                </p>
              )}
            </div>

            <footer className="shrink-0 border-t border-glass p-3 sm:p-4">
              <div className="flex gap-2">
                <label className="sr-only" htmlFor="assistant-input">
                  Your question
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={loading}
                  placeholder="e.g. What did you build at Servo?"
                  className="assistant-input max-h-28 min-h-11 flex-1 resize-none rounded-xl border px-3.5 py-2.5 text-sm focus:border-indigo-500/40 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-60"
                  style={{
                    borderColor: 'var(--input-border)',
                    background: 'var(--input-bg)',
                    color: 'var(--input-text)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => submit()}
                  disabled={loading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-white to-zinc-200 text-zinc-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] leading-snug text-theme-muted-3">
                Answers are based on this portfolio. For sensitive topics or formal offers,{' '}
                <a
                  href="mailto:juanmartinezt.dev@gmail.com"
                  className="text-theme-muted-2 underline decoration-zinc-400 underline-offset-2 hover:text-theme-muted dark:decoration-zinc-700"
                >
                  email Juan
                </a>
                .
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
