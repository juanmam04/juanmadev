export function SectionHeader({ label, title, description, className = '' }) {
  return (
    <header className={`mb-12 flex max-w-3xl flex-col sm:mb-14 lg:mb-16 ${className}`}>
      {label && (
        <span className="mb-3 inline-flex w-fit items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-indigo-400/90 sm:mb-4">
          <span className="h-px w-5 bg-indigo-500/40 sm:w-6" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-lead mt-4 max-w-2xl sm:mt-5">{description}</p>
      )}
      <div className="glow-line mt-6 max-w-[12rem] sm:mt-8" aria-hidden="true" />
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
