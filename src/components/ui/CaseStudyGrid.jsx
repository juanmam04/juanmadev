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
            'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]',
            wide && 'sm:col-span-2',
          )}
        >
          <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {title}
          </h4>
          {list ? (
            <ul className="mt-3 space-y-2">
              {list.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400/80" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{content}</p>
          )}
        </div>
      ))}
    </div>
  )
}
