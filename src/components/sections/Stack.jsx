import { useState } from 'react'
import { stackCategories } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

const colors = [
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-rose-500',
]

export default function Stack() {
  const [active, setActive] = useState(0)
  const category = stackCategories[active]

  return (
    <Section id="stack">
      <InView>
        <SectionHeader label="Technologies" title="Stack" />
      </InView>
      <InView delay={100}>
        <div className="flex flex-wrap gap-2" role="tablist">
          {stackCategories.map((cat, i) => (
            <button
              key={cat.name}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active === i
                  ? 'border-indigo-500/40 bg-indigo-500/15 text-white shadow-[0_0_24px_-8px_rgba(99,102,241,0.5)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-white/[0.14] hover:text-zinc-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${colors[i % colors.length]}`} />
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </InView>
      <InView delay={150}>
        <InteractiveSurface intensity={4}>
          <article className="surface-card mt-8 min-h-[180px] p-6 sm:p-8" role="tabpanel">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${colors[active % colors.length]}`} />
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={skill}
                  className="stack-tag rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-zinc-400 transition-all hover:scale-105 hover:border-indigo-500/30 hover:text-indigo-300"
                  style={{ '--delay': `${i * 40}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </InteractiveSurface>
      </InView>
    </Section>
  )
}
