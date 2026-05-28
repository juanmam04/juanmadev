import { principles } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

export default function Principles() {
  return (
    <Section id="principles" className="section-muted">
      <div className="relative">
        <InView>
          <SectionHeader label="Philosophy" title="How I work" />
        </InView>
        <ul className="grid gap-3 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <InView key={principle} delay={index * 50} as="li">
              <InteractiveSurface intensity={5}>
                <div className="elevated-card group flex h-full items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-500/25 hover:bg-indigo-500/10 hover:shadow-[0_0_28px_-14px_rgba(99,102,241,0.35)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 font-mono text-xs font-bold text-indigo-400 transition-transform group-hover:scale-110">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-theme-muted sm:text-base">{principle}</span>
                </div>
              </InteractiveSurface>
            </InView>
          ))}
        </ul>
      </div>
    </Section>
  )
}
