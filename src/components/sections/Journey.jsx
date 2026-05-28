import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { journey } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'

export default function Journey() {
  const [expanded, setExpanded] = useState(3)

  return (
    <Section id="journey">
      <InView>
        <SectionHeader label="Timeline" title="Journey" />
      </InView>
      <div className="relative max-w-2xl">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-transparent"
          aria-hidden="true"
        />
        <ol className="relative">
          {journey.map((item, index) => {
            const isOpen = expanded === index
            return (
              <InView key={`${item.year}-${index}`} delay={index * 100} as="li" className="relative pb-10 last:pb-0 pl-8">
                <span
                  className={`absolute left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border bg-[var(--color-bg)] transition-all ${
                    isOpen
                      ? 'border-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.5)]'
                      : 'border-glass'
                  }`}
                  aria-hidden="true"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-indigo-400' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
                </span>
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? -1 : index)}
                  className={`group w-full rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                    isOpen
                      ? 'border-indigo-500/25 bg-indigo-500/10'
                      : 'border-subtle bg-glass hover:border-glass'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <time className="font-mono text-sm text-indigo-400">{item.year}</time>
                    <ChevronRight
                      size={16}
                      className={`text-theme-muted-3 transition-transform ${isOpen ? 'rotate-90 text-indigo-400' : 'group-hover:translate-x-0.5'}`}
                      aria-hidden="true"
                    />
                  </div>
                  <p className={`mt-2 text-base leading-relaxed ${isOpen ? 'text-theme-fg' : 'text-theme-muted'}`}>
                    {item.title}
                  </p>
                </button>
              </InView>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
