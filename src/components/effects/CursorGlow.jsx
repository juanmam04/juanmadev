import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CursorGlow() {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.08), transparent 40%)`,
      }}
    />
  )
}
