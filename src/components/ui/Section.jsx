export function SectionHeader({ label, title, description, className = '' }) {
  return (
    <header className={`mb-14 flex max-w-3xl flex-col lg:mb-20 ${className}`}>
      {label && (
        <span className="mb-4 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
          <span className="h-px w-6 bg-indigo-500/50" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>
      )}
      <div className="glow-line mt-8 max-w-xs" aria-hidden="true" />
    </header>
  )
}

export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container-main relative">{children}</div>
    </section>
  )
}
