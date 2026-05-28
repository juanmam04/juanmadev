import { Code2, Layers, Cloud, Cpu, Layout, Workflow, Wrench, Rocket } from 'lucide-react'
import { capabilities } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

const icons = [Code2, Layers, Cloud, Cpu, Layout, Workflow, Wrench, Rocket]
const featured = [0, 1, 7]

export default function Capabilities() {
  return (
    <Section id="capabilities" className="section-muted">
      <div className="relative">
        <InView>
          <SectionHeader label="Skills" title="What I can do" />
        </InView>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = icons[index]
            const isFeatured = featured.includes(index)
            return (
              <InView key={item.title} delay={index * 60} className={isFeatured ? 'sm:col-span-2' : ''}>
                <InteractiveSurface intensity={isFeatured ? 8 : 6}>
                  <article
                    className={`surface-card surface-card-hover group h-full p-5 transition-shadow hover:shadow-[0_0_36px_-14px_rgba(99,102,241,0.35)] sm:p-6 ${isFeatured ? 'lg:p-8' : ''}`}
                  >
                    <div className="inline-flex rounded-lg border border-glass bg-indigo-500/10 p-2.5 text-indigo-400 transition-transform group-hover:scale-110">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <h3 className={`mt-4 font-bold text-heading ${isFeatured ? 'text-lg' : 'text-sm'}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-2 leading-relaxed text-theme-muted-2 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                      {item.description}
                    </p>
                  </article>
                </InteractiveSurface>
              </InView>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
