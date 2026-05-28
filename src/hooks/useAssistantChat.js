import { useCallback, useRef, useState } from 'react'

const API_URL = '/api/assistant/chat'

export function useAssistantChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const sendMessage = useCallback(async (text) => {
    const content = text.trim()
    if (!content || loading) return

    setError(null)
    const userMessage = { role: 'user', content }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setLoading(true)

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Could not get a response.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Connection error.')
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }, [loading, messages])

  const clearChat = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setLoading(false)
  }, [])

  return { messages, loading, error, sendMessage, clearChat }
}
