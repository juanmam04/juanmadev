import { ArrowUpRight, Sparkles } from 'lucide-react'
import { projects } from '../../data/site'
import Section, { SectionHeader } from '../ui/Section'
import Tag from '../ui/Tag'
import Button from '../ui/Button'
import InView from '../motion/InView'
import InteractiveSurface from '../motion/InteractiveSurface'
import Magnetic from '../motion/Magnetic'

function FeaturedProject({ project }) {
  return (
    <article id="servo-case-study" className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/20">
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/30 via-transparent to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative p-6 sm:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          <Sparkles size={12} aria-hidden="true" />
          Featured
        </span>
        <h3 className="mt-5 text-3xl font-bold text-white sm:text-4xl">{project.name}</h3>
        <p className="mt-2 font-mono text-sm text-cyan-400">{project.role}</p>
        <p className="mt-2 text-sm text-zinc-500">{project.subtitle}</p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Tag key={tech} accent>
              {tech}
            </Tag>
          ))}
        </div>
        {project.links && (
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic strength={0.3}>
              <Button href={project.links.website} external>
                Visit Website
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </Magnetic>
          </div>
        )}
      </div>
    </article>
  )
}

function SecondaryProject({ project }) {
  return (
    <InteractiveSurface intensity={6}>
      <article className="surface-card surface-card-hover relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-violet-500/10 to-transparent" aria-hidden="true" />
        <h3 className="relative text-xl font-bold text-white">{project.name}</h3>
        <p className="relative mt-1 font-mono text-xs text-violet-400">{project.role}</p>
        <p className="relative mt-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>
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
        <SectionHeader label="Work" title="Selected Projects" />
      </InView>
      <div className="space-y-8">
        {featured.map((p) => (
          <InView key={p.id}>
            <InteractiveSurface intensity={3}>
              <FeaturedProject project={p} />
            </InteractiveSurface>
          </InView>
        ))}
        {secondary.map((p, i) => (
          <InView key={p.id} delay={i * 100}>
            <SecondaryProject project={p} />
          </InView>
        ))}
      </div>
    </Section>
  )
}
