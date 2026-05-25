import { useInteractive } from '../../context/interactive'

export default function Background() {
  const { smooth } = useInteractive()

  const orb1 = {
    transform: `translate(${(smooth.x - 0.5) * -40}px, ${(smooth.y - 0.5) * -30}px)`,
  }
  const orb2 = {
    transform: `translate(${(smooth.x - 0.5) * 50}px, ${(smooth.y - 0.5) * 40}px)`,
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 noise opacity-30" />
      <div
        className="absolute -left-[20%] top-[-10%] h-[600px] w-[600px] rounded-full opacity-30 blur-[120px] transition-transform duration-100"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          animation: 'pulse-glow 8s ease-in-out infinite',
          ...orb1,
        }}
      />
      <div
        className="absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full opacity-20 blur-[100px] transition-transform duration-100"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)',
          animation: 'pulse-glow 10s ease-in-out 2s infinite',
          ...orb2,
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 50% 40% at ${smooth.x * 100}% ${smooth.y * 100}%, rgba(99,102,241,0.08), transparent)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
