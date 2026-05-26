const variants = {
  primary:
    'btn-glow inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-[transform,box-shadow,background] duration-300 hover:from-zinc-100 hover:to-white hover:scale-[1.015] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  secondary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-[border-color,background,box-shadow,transform] duration-300 hover:border-indigo-500/28 hover:bg-indigo-500/[0.08] hover:shadow-[0_0_28px_-12px_rgba(99,102,241,0.35)] hover:scale-[1.01] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  ghost:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors duration-300 hover:bg-white/[0.05] hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  icon:
    'inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-zinc-500 backdrop-blur-sm transition-[border-color,background,color,box-shadow,transform] duration-300 hover:border-indigo-500/22 hover:bg-indigo-500/[0.08] hover:text-indigo-300/90 hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.4)] hover:scale-[1.04] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
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
        {...(download
          ? { download: typeof download === 'string' ? download : true }
          : {})}
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
