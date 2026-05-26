import { links } from '../../data/site'

/**
 * Real Servo product screenshot — no fabricated UI overlays.
 * @param {{ href?: string }} props
 */
export default function ServoMockup({ href = links.servo }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="servo-mockup group relative block overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-2xl shadow-blue-500/10 transition-[transform,box-shadow,border-color] duration-500 hover:scale-[1.008] hover:border-blue-500/20 hover:shadow-[0_32px_64px_-24px_rgba(59,130,246,0.3)]"
      aria-label="Visit Servo at servo.com.uy"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-2 border-b border-white/[0.06] bg-zinc-900/95 px-4 py-2.5 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-amber-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-white/[0.08] bg-black/50 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="font-mono text-[10px] text-zinc-400">servo.com.uy</span>
        </div>
      </div>

      <figure className="relative aspect-[1024/614] overflow-hidden bg-zinc-900">
        <img
          src="/servo-preview.jpg"
          alt="Captura de la página principal de Servo — marketplace de servicios en Uruguay"
          width={1024}
          height={614}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </figure>
    </a>
  )
}
