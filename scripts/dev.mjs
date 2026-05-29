import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAssistantEnvStatus, loadAssistantDevEnv } from '../lib/assistant/loadDevEnv.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [major, minor] = process.version.slice(1).split('.').map(Number)

if (major < 20 || (major === 20 && minor < 19)) {
  console.error(
    `[dev] Node.js ${process.version} is too old for Vite 8. Use Node 20.19+ or 22.12+ (current shell: node -v).`,
  )
  process.exit(1)
}

loadAssistantDevEnv(root)
const status = getAssistantEnvStatus()

if (status.ok) {
  console.log(`[assistant] ${status.provider} API key loaded (${status.source})`)
} else {
  console.warn(
    '[assistant] No API key yet. Add OPENAI_API_KEY=sk-... to .env.local, save, and send a chat message (no restart needed).',
  )
}

const viteCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const child = spawn(viteCmd, ['vite'], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
})

child.on('exit', (code) => process.exit(code ?? 1))
