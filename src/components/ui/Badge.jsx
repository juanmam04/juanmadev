export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300 backdrop-blur-sm light:border-emerald-500/35 light:bg-emerald-500/10 light:text-emerald-800 light:shadow-[0_2px_12px_-4px_rgba(16,185,129,0.25)] ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 light:bg-emerald-500" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600" />
      </span>
      {children}
    </span>
  )
}
