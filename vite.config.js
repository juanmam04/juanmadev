import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleAssistantChat, readJsonBody } from './lib/assistant/chatHandler.js'

function assistantDevApi() {
  return {
    name: 'assistant-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/assistant/chat', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const result = await handleAssistantChat(body, req)
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = result.ok ? 200 : result.status
          res.end(JSON.stringify(result.ok ? { reply: result.reply } : { error: result.error }))
        } catch (err) {
          const status =
            err.message === 'BODY_TOO_LARGE' ? 413 : err.message === 'INVALID_JSON' ? 400 : 500
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                status === 413
                  ? 'Message too long.'
                  : status === 400
                    ? 'Invalid JSON.'
                    : 'Internal assistant error.',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY
  if (env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
  if (env.GROQ_MODEL) process.env.GROQ_MODEL = env.GROQ_MODEL
  if (env.OPENAI_MODEL) process.env.OPENAI_MODEL = env.OPENAI_MODEL

  return {
    plugins: [react(), tailwindcss(), assistantDevApi()],
    server: {
      port: 9847,
      strictPort: true,
    },
  }
})
