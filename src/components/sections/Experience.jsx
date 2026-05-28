import { experience } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'

export default function Experience() {
  return (
    <Section id="experience" className="section-muted">
      <div className="relative">
        <InView>
          <SectionHeader label="Work" title="Experience" />
        </InView>
        <div className="space-y-6">
          {experience.map((job) => (
            <InView key={job.company}>
              <InteractiveSurface intensity={5}>
                <article className="surface-card surface-card-hover overflow-hidden">
                  <div
                    className="h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500"
                    aria-hidden="true"
                  />
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-heading">{job.company}</h3>
                        <p className="mt-1 font-mono text-sm text-indigo-400">{job.role}</p>
                      </div>
                      <time className="w-fit rounded-full border border-glass bg-glass-strong px-3 py-1 text-xs text-theme-muted-2">
                        {job.period}
                      </time>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-theme-muted">{job.description}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 50)}
                          className="elevated-card flex gap-3 rounded-lg p-3 text-sm leading-relaxed text-theme-muted transition-colors hover:border-indigo-500/20 hover:bg-indigo-500/5"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </InteractiveSurface>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}
