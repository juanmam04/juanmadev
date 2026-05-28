import { useState } from 'react'
import InteractiveSurface from '../motion/InteractiveSurface'

const lines = [
  { cmd: 'pm2 restart servo-api', out: '→ deployed · nginx · ec2' },
  { cmd: 'rails db:migrate', out: '→ CreditON · production' },
  { cmd: 'npm run build', out: '→ portfolio · optimized' },
]

function StatusRow({ label, value, status, active }) {
  const colors = {
    live: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
    building: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/25',
    prod: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/25',
  }

  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 transition-all duration-300 ${
        active ? 'border-indigo-500/25 bg-indigo-500/10' : 'border-subtle bg-glass'
      }`}
    >
      <span className="text-xs text-theme-muted-2">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-theme-muted">{value}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${colors[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  )
}

export default function HeroPanel() {
  const [lineIndex, setLineIndex] = useState(0)
  const [systemIndex, setSystemIndex] = useState(1)
  const line = lines[lineIndex]

  const systems = [
    { label: 'CreditON', value: 'Rails · MySQL', status: 'prod' },
    { label: 'Servo', value: 'servo.com.uy', status: 'building' },
    { label: 'Automation', value: 'AI pipelines', status: 'live' },
  ]

  return (
    <div className="relative pb-16 lg:pb-0">
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/10 blur-2xl"
        aria-hidden="true"
      />

      <InteractiveSurface intensity={10}>
        <div className="animate-float relative surface-card overflow-hidden shadow-2xl shadow-indigo-500/10 light:shadow-[0_24px_60px_-24px_rgba(79,70,229,0.22)]">
          <div
            className="flex items-center gap-2 border-b border-subtle px-4 py-3"
            style={{ background: 'var(--hero-panel-chrome)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[11px] text-theme-muted-3">~/juanmadev</span>
          </div>

          <button
            type="button"
            className="w-full space-y-4 p-5 text-left font-mono text-[11px] leading-relaxed transition-colors hover:bg-[var(--glass-bg)] sm:p-6 sm:text-xs"
            onClick={() => setLineIndex((i) => (i + 1) % lines.length)}
          >
            <div>
              <p className="text-theme-muted-3"># click to run next command</p>
              <p className="mt-1">
                <span className="text-indigo-400">$</span>{' '}
                <span className="text-theme-muted">{line.cmd}</span>
              </p>
              <p className="text-emerald-400">{line.out}</p>
            </div>
            <div
              className="rounded-lg border border-subtle p-3"
              style={{ background: 'var(--terminal-bg)' }}
            >
              <p className="text-theme-muted-3">stack.ts</p>
              <p className="mt-2">
                <span className="text-violet-400">const</span>{' '}
                <span className="text-cyan-300">product</span>{' '}
                <span className="text-theme-muted-2">=</span>{' '}
                <span className="text-amber-200 light:text-amber-700">{'{'}</span>
              </p>
              <p className="pl-4 text-theme-muted">
                scope: <span className="text-emerald-400">&quot;fullstack&quot;</span>,
              </p>
              <p className="text-amber-200 light:text-amber-700">{'};'}</p>
            </div>
          </button>
        </div>
      </InteractiveSurface>

      <div className="animate-float-delayed absolute -bottom-6 -left-4 w-[calc(100%-2rem)] sm:-left-8 sm:w-72">
        <InteractiveSurface intensity={6}>
          <div className="surface-card space-y-2 p-4 shadow-xl dark:shadow-black/40 light:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.2)]">
            <p className="text-[10px] font-medium uppercase tracking-widest text-theme-muted-3">
              Active systems
            </p>
            {systems.map((s, i) => (
              <button
                key={s.label}
                type="button"
                className="w-full text-left"
                onMouseEnter={() => setSystemIndex(i)}
                onFocus={() => setSystemIndex(i)}
              >
                <StatusRow {...s} active={systemIndex === i} />
              </button>
            ))}
          </div>
        </InteractiveSurface>
      </div>
    </div>
  )
}
