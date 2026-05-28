export default function Tag({ children, accent = false }) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-medium font-mono ${
        accent
          ? 'border border-indigo-500/30 bg-indigo-500/12 text-indigo-200 light:border-indigo-200 light:bg-indigo-50 light:text-indigo-800'
          : 'border border-glass bg-glass-strong text-theme-muted'
      }`}
    >
      {children}
    </span>
  )
}
