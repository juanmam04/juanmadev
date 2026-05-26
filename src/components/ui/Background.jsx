import { usePerfMode } from '../../hooks/usePerfMode'

export default function Background() {
  const staticBg = usePerfMode()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]" aria-hidden="true">
      <div className="absolute inset-0 noise opacity-30 max-md:opacity-20" />
      <div
        className={`background-orb background-orb--indigo absolute -left-[20%] top-[-10%] h-[600px] w-[600px] rounded-full opacity-30 blur-[120px] max-md:h-[420px] max-md:w-[420px] max-md:blur-[80px] max-md:opacity-20 ${
          staticBg ? '' : 'background-orb--track'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          animation: staticBg ? undefined : 'pulse-glow 8s ease-in-out infinite',
        }}
      />
      <div
        className={`background-orb background-orb--cyan absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full opacity-20 blur-[100px] max-md:h-[360px] max-md:w-[360px] max-md:blur-[70px] max-md:opacity-[0.15] ${
          staticBg ? '' : 'background-orb--track'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)',
          animation: staticBg ? undefined : 'pulse-glow 10s ease-in-out 2s infinite',
        }}
      />
      <div
        className={`background-spotlight absolute inset-0 opacity-50 max-md:opacity-30 ${
          staticBg ? '' : 'background-spotlight--track'
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
