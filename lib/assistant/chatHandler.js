import { buildAssistantKnowledge } from '../../src/data/buildAssistantKnowledge.js'

const KNOWLEDGE = buildAssistantKnowledge()

const SYSTEM_PROMPT = `You are the assistant for Juan Manuel Martínez's personal portfolio (juanmadev).
Your only source of truth is the KNOWLEDGE DOCUMENT below. Do not use external knowledge about Juan.

Rules:
- Always respond in English.
- Tone: professional, clear, friendly — like an engineering peer. No hype or overselling.
- Keep answers concise (2–6 short paragraphs or a list). Offer to go deeper if needed.
- Refer to Juan in third person unless the visitor clearly addresses you as Juan; stay consistent.
- If something is NOT in the document, say you do not have that data and suggest email: juanmartinezt.dev@gmail.com or site links.
- NEVER invent numbers, clients, awards, total years of experience, or technologies not listed.
- For hiring or collaboration, point to email or LinkedIn from the document.

KNOWLEDGE DOCUMENT:
---
${KNOWLEDGE}
---`

const LIMITS = {
  maxBodyBytes: 24_000,
  maxMessageLen: 900,
  maxHistory: 12,
  maxTokens: 720,
  temperature: 0.35,
}

const rateMap = new Map()

function rateLimitKey(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function checkRateLimit(key) {
  const windowMs = 60 * 60 * 1000
  const max = 25
  const now = Date.now()
  let entry = rateMap.get(key)
  if (!entry || now - entry.start > windowMs) {
    entry = { start: now, count: 0 }
    rateMap.set(key, entry)
  }
  entry.count += 1
  if (entry.count > max) {
    return { ok: false, retryAfterSec: Math.ceil((entry.start + windowMs - now) / 1000) }
  }
  return { ok: true }
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return []
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, LIMITS.maxMessageLen),
    }))
    .filter((m) => m.content.length > 0)
    .slice(-LIMITS.maxHistory)
}

function getApiConfig() {
  const groq = process.env.GROQ_API_KEY?.trim()
  if (groq) {
    return {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      key: groq,
      model: process.env.GROQ_MODEL?.trim() || 'llama-3.3-70b-versatile',
    }
  }
  const openai = process.env.OPENAI_API_KEY?.trim()
  if (openai) {
    return {
      url: 'https://api.openai.com/v1/chat/completions',
      key: openai,
      model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    }
  }
  return null
}

/**
 * @param {{ messages: Array<{ role: string, content: string }> }} body
 * @param {{ headers?: Record<string, string>, socket?: { remoteAddress?: string } }} reqMeta
 */
export async function handleAssistantChat(body, reqMeta = {}) {
  const api = getApiConfig()
  if (!api) {
    return {
      ok: false,
      status: 503,
      error:
        process.env.VERCEL === '1'
          ? 'Assistant is not configured on the server. Add GROQ_API_KEY or OPENAI_API_KEY to your Vercel environment variables.'
          : 'Assistant is not configured locally. Add OPENAI_API_KEY=sk-... to .env.local, save the file, and try again (no restart needed).',
    }
  }

  const rate = checkRateLimit(rateLimitKey(reqMeta))
  if (!rate.ok) {
    return {
      ok: false,
      status: 429,
      error: `Too many requests. Try again in ${rate.retryAfterSec} seconds.`,
    }
  }

  const messages = sanitizeMessages(body?.messages)
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return { ok: false, status: 400, error: 'Send at least one valid user message.' }
  }

  const response = await fetch(api.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${api.key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: api.model,
      temperature: LIMITS.temperature,
      max_tokens: LIMITS.maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const detail = data?.error?.message || data?.error || response.statusText
    console.error('[assistant]', response.status, detail)
    return {
      ok: false,
      status: 502,
      error: 'Could not generate a response right now. Please try again shortly.',
    }
  }

  const reply = data?.choices?.[0]?.message?.content?.trim()
  if (!reply) {
    return { ok: false, status: 502, error: 'Empty response from the model.' }
  }

  return { ok: true, reply }
}

export function readJsonBody(req, maxBytes = LIMITS.maxBodyBytes) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > maxBytes) {
        reject(new Error('BODY_TOO_LARGE'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('INVALID_JSON'))
      }
    })
    req.on('error', reject)
  })
}
