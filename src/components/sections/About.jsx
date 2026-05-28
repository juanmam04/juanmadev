import { useState } from 'react'
import { about } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

const highlights = [
  { label: 'Base', value: 'Montevideo, UY', detail: 'GMT-3' },
  { label: 'Focus', value: 'Fullstack · Product', detail: 'End-to-end' },
  { label: 'Building', value: 'Servo · CreditON', detail: 'Production' },
  { label: 'Studying', value: 'CS · ORT Uruguay', detail: '2023 —' },
]

export default function About() {
  const [active, setActive] = useState(0)

  return (
    <Section id="about" className="section-muted">
      <div className="relative">
        <InView>
          <SectionHeader label="Profile" title={about.title} />
        </InView>
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
          <InView delay={100}>
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={p.slice(0, 32)}
                  className={`text-base leading-relaxed transition-opacity duration-300 sm:text-lg ${
                    i === active ? 'text-theme-muted' : 'text-theme-muted-2'
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          </InView>
          <InView delay={200}>
            <InteractiveSurface intensity={5}>
              <aside className="surface-card p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-theme-muted-3">
                  Snapshot
                </p>
                <ul className="mt-4 space-y-2">
                  {highlights.map((h, i) => (
                    <li key={h.label}>
                      <button
                        type="button"
                        className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                          active === i
                            ? 'border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_24px_-12px_rgba(99,102,241,0.4)]'
                            : 'border-transparent hover:border-subtle hover:bg-glass'
                        }`}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                      >
                        <span className="text-xs text-theme-muted-3">{h.label}</span>
                        <span className="mt-1 block text-sm font-semibold text-theme-fg">{h.value}</span>
                        <span className="mt-0.5 font-mono text-[10px] text-indigo-400/80">{h.detail}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
            </InteractiveSurface>
          </InView>
        </div>
      </div>
    </Section>
  )
}
