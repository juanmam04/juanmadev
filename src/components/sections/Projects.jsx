import { projects } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import Tag from '../ui/Tag'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'
import ServoFeatured from '../projects/ServoFeatured'

function SecondaryProject({ project }) {
  return (
    <InteractiveSurface intensity={6}>
      <article className="surface-card surface-card-hover relative overflow-hidden p-6 sm:p-8">
        <div
          className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-violet-500/10 to-transparent"
          aria-hidden="true"
        />
        <h3 className="relative text-xl font-semibold tracking-tight text-heading">{project.name}</h3>
        <p className="relative mt-1 font-mono text-xs text-violet-400">{project.role}</p>
        <p className="relative mt-4 text-sm leading-relaxed text-theme-muted">{project.description}</p>
        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </article>
    </InteractiveSurface>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const secondary = projects.filter((p) => !p.featured)

  return (
    <Section id="projects">
      <InView>
        <SectionHeader
          label="Work"
          title="Selected Projects"
          description="Products and systems built end-to-end — from idea to production."
        />
      </InView>
      <div className="space-y-10 lg:space-y-12">
        {featured.map((p) => (
          <InView key={p.id}>
            <ServoFeatured project={p} />
          </InView>
        ))}
        {secondary.map((p, i) => (
          <InView key={p.id} delay={i * 80}>
            <SecondaryProject project={p} />
          </InView>
        ))}
      </div>
    </Section>
  )
}
