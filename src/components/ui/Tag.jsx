export default function Tag({ children, accent = false }) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-medium font-mono ${
        accent
          ? 'border border-indigo-500/25 bg-indigo-500/10 text-indigo-300'
          : 'border border-white/[0.08] bg-white/[0.04] text-zinc-400'
      }`}
    >
      {children}
    </span>
  )
}
