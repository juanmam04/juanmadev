const variants = {
  primary:
    'btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:from-zinc-100 hover:to-white hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  icon:
    'inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/25 hover:bg-indigo-500/10 hover:text-indigo-300 hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
}

export default function Button({
  variant = 'primary',
  href,
  external = false,
  download,
  className = '',
  children,
  ...props
}) {
  const classes = `${variants[variant] ?? variants.primary} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: true } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
