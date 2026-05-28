import { cn } from '../../lib/math'

/**
 * @param {{ sections: Array<{ key: string, title: string, content?: string, list?: string[], wide?: boolean }> }} props
 */
export default function CaseStudyGrid({ sections }) {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {sections.map(({ key, title, content, list, wide }) => (
        <div
          key={key}
          className={cn(
            'elevated-card rounded-xl p-4 transition-colors duration-300 hover:border-[var(--glass-border-hover)] light:hover:bg-white',
            wide && 'sm:col-span-2',
          )}
        >
          <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-theme-muted-2 light:text-zinc-600">
            {title}
          </h4>
          {list ? (
            <ul className="mt-3 space-y-2">
              {list.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-theme-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400/80" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2.5 text-sm leading-relaxed text-theme-muted">{content}</p>
          )}
        </div>
      ))}
    </div>
  )
}
