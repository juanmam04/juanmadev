import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ASSISTANT_KEYS = ['OPENAI_API_KEY', 'OPENAI_MODEL', 'GROQ_API_KEY', 'GROQ_MODEL']

/** @param {string} filePath */
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {}

  let content = readFileSync(filePath, 'utf8')
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1)

  /** @type {Record<string, string>} */
  const env = {}
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

/**
 * Load assistant env from disk (.env.local overrides .env).
 * Safe to call on every dev request so saves apply without restart.
 * @param {string} [root=process.cwd()]
 */
export function loadAssistantDevEnv(root = process.cwd()) {
  const layers = [
    resolve(root, '.env'),
    resolve(root, '.env.local'),
    resolve(root, '.env.development'),
    resolve(root, '.env.development.local'),
  ]

  /** @type {Record<string, string>} */
  const merged = {}
  for (const file of layers) {
    Object.assign(merged, parseEnvFile(file))
  }

  for (const key of ASSISTANT_KEYS) {
    const value = merged[key]?.trim()
    if (value) process.env[key] = value
  }

  return merged
}

/** @param {Record<string, string>} [merged] */
export function getAssistantEnvStatus(merged = loadAssistantDevEnv()) {
  const groq = merged.GROQ_API_KEY?.trim()
  if (groq) {
    return { ok: true, provider: 'Groq', source: '.env.local / .env' }
  }
  const openai = merged.OPENAI_API_KEY?.trim()
  if (openai) {
    return { ok: true, provider: 'OpenAI', source: '.env.local / .env' }
  }
  return { ok: false, provider: null, source: null }
}
