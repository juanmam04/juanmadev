import { handleAssistantChat, readJsonBody } from '../../lib/assistant/chatHandler.js'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body =
      typeof req.body === 'object' && req.body !== null ? req.body : await readJsonBody(req)
    const result = await handleAssistantChat(body, req)

    if (!result.ok) {
      return res.status(result.status).json({ error: result.error })
    }

    return res.status(200).json({ reply: result.reply })
  } catch (err) {
    if (err.message === 'BODY_TOO_LARGE') {
      return res.status(413).json({ error: 'Message too long.' })
    }
    if (err.message === 'INVALID_JSON') {
      return res.status(400).json({ error: 'Invalid JSON.' })
    }
    console.error('[assistant]', err)
    return res.status(500).json({ error: 'Internal assistant error.' })
  }
}
