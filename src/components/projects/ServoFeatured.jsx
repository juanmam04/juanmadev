import { ArrowUpRight, Sparkles } from 'lucide-react'
import Tag from '../ui/Tag'
import Button from '../ui/Button'
import CaseStudyGrid from '../ui/CaseStudyGrid'
import ServoMockup from '../ui/ServoMockup'
import Magnetic from '../motion/Magnetic'

/** @param {{ project: Record<string, unknown> }} props */
export default function ServoFeatured({ project }) {
  return (
    <article
      id="servo-case-study"
      className="group relative"
      aria-labelledby="servo-title"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/10 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/25 shadow-[0_24px_80px_-40px_rgba(99,102,241,0.35)]">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-cyan-500/[0.05]"
          aria-hidden="true"
        />

        <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12 lg:p-10 xl:gap-14">
          <div className="flex min-w-0 flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <Sparkles size={12} aria-hidden="true" />
              Featured product
            </span>

            <h3 id="servo-title" className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-2 font-mono text-sm text-cyan-400/90">{project.role}</p>
            <p className="mt-1 text-sm text-zinc-500">{project.subtitle}</p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} accent>
                  {tech}
                </Tag>
              ))}
            </div>

            {project.links?.website && (
              <div className="mt-8">
                <Magnetic strength={0.28}>
                  <Button href={project.links.website} external className="!px-6 !py-3">
                    Visit servo.com.uy
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Button>
                </Magnetic>
              </div>
            )}

            {project.caseStudy && <CaseStudyGrid sections={project.caseStudy} />}
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ServoMockup href={project.links?.website} />
          </div>
        </div>
      </div>
    </article>
  )
}
