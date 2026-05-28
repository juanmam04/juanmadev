import { links } from '../../data/site'
import { useLiteMode } from '../../hooks/useLiteMode'

/**
 * Real Servo product screenshot — no fabricated UI overlays.
 * @param {{ href?: string }} props
 */
export default function ServoMockup({ href = links.servo }) {
  const liteMode = useLiteMode()
  const previewSrc = liteMode ? '/servo-preview-mobile.jpg' : '/servo-preview.jpg'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="servo-mockup group relative block overflow-hidden rounded-2xl border border-glass bg-[var(--hero-panel-chrome)] shadow-2xl shadow-blue-500/10 transition-[transform,box-shadow,border-color] duration-500 hover:scale-[1.008] hover:border-blue-500/20 hover:shadow-[0_32px_64px_-24px_rgba(59,130,246,0.3)] light:border-slate-200 light:bg-white light:shadow-[0_16px_48px_-16px_rgba(15,23,42,0.15)] max-md:hover:scale-100 max-md:hover:shadow-2xl"
      aria-label="Visit Servo at servo.com.uy"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div
        className="relative flex items-center gap-2 border-b border-subtle px-4 py-2.5 backdrop-blur-sm"
        style={{ background: 'var(--hero-panel-chrome)' }}
      >
        <span className="h-2 w-2 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-amber-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <div
          className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-glass px-3 py-1"
          style={{ background: 'var(--terminal-bg)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="font-mono text-[10px] text-theme-muted">servo.com.uy</span>
        </div>
      </div>

      <figure className="relative aspect-[1024/614] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img
          src={previewSrc}
          alt="Screenshot of Servo homepage — services marketplace in Uruguay"
          width={liteMode ? 640 : 1024}
          height={liteMode ? 384 : 614}
          sizes="(max-width: 768px) 100vw, 560px"
          loading="lazy"
          decoding="async"
          fetchPriority={liteMode ? 'high' : 'low'}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015] max-md:group-hover:scale-100"
        />
      </figure>
    </a>
  )
}
