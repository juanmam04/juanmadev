import { contact, links } from '../../data/site'
import Section from '../ui/Section'
import Button from '../ui/Button'
import InView from '../motion/InView'
import Magnetic from '../motion/Magnetic'
import InteractiveSurface from '../motion/InteractiveSurface'

export default function Contact() {
  return (
    <Section id="contact" className="!pb-32">
      <InView>
        <InteractiveSurface intensity={4}>
          <div className="contact-aurora relative overflow-hidden rounded-3xl border border-white/[0.1] p-[1px]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-cyan-500/20 to-violet-500/40"
              aria-hidden="true"
            />
            <div className="relative rounded-[23px] bg-[#050508]/95 p-8 sm:p-12 lg:p-16">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-[80px]"
                aria-hidden="true"
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">Get in touch</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">{contact.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {contact.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic strength={0.35}>
                  <Button href={links.email}>Email Me</Button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Button variant="secondary" href={links.linkedin} external>
                    LinkedIn
                  </Button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Button variant="secondary" href={links.github} external>
                    GitHub
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="ghost" href={links.resume} download>
                    Resume
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </InteractiveSurface>
      </InView>
    </Section>
  )
}
