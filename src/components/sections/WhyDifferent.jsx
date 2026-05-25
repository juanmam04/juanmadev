import { Lightbulb, Layers, Server, Zap } from 'lucide-react'
import { whyDifferent } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

const config = [
  {
    Icon: Lightbulb,
    span: 'sm:col-span-2',
    iconClass: 'border-indigo-500/25 bg-indigo-500/15 text-indigo-400',
    glow: 'hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.35)]',
  },
  {
    Icon: Layers,
    span: '',
    iconClass: 'border-cyan-500/25 bg-cyan-500/15 text-cyan-400',
    glow: 'hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.25)]',
  },
  {
    Icon: Server,
    span: '',
    iconClass: 'border-violet-500/25 bg-violet-500/15 text-violet-400',
    glow: 'hover:shadow-[0_0_40px_-15px_rgba(167,139,250,0.25)]',
  },
  {
    Icon: Zap,
    span: 'sm:col-span-2',
    iconClass: 'border-amber-500/25 bg-amber-500/15 text-amber-400',
    glow: 'hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.2)]',
  },
]

export default function WhyDifferent() {
  return (
    <Section id="why-different">
      <InView>
        <SectionHeader label="Differentiator" title="Why I'm different" />
      </InView>
      <div className="grid gap-4 sm:grid-cols-2">
        {whyDifferent.map((item, index) => {
          const { Icon, span, iconClass, glow } = config[index]
          return (
            <InView key={item.title} delay={index * 80} className={span}>
              <InteractiveSurface intensity={7}>
                <article className={`surface-card surface-card-hover h-full p-6 sm:p-8 ${glow}`}>
                  <div className={`inline-flex rounded-xl border p-3 ${iconClass}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="mt-6 block font-mono text-xs tabular-nums text-zinc-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                </article>
              </InteractiveSurface>
            </InView>
          )
        })}
      </div>
    </Section>
  )
}
