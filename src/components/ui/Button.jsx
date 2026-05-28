const variants = {
  primary:
    'btn-glow inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-[transform,box-shadow,background,color,border] duration-300 hover:from-zinc-100 hover:to-white hover:scale-[1.015] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] dark:hover:from-zinc-100 dark:hover:to-white',
  secondary: 'btn-secondary-theme hover:scale-[1.01] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
  ghost:
    'btn-ghost-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
  icon:
    'btn-icon-theme hover:scale-[1.04] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
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
