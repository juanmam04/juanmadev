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
          <div className="contact-aurora relative overflow-hidden rounded-3xl border border-glass p-[1px]">
            <div className="contact-aurora-border absolute inset-0" aria-hidden="true" />
            <div className="relative rounded-[23px] bg-panel p-8 sm:p-12 lg:p-16">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-[80px]"
                aria-hidden="true"
              />
              <p className="section-label font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">Get in touch</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
                {contact.title}
              </h2>
              <p className="text-lead mt-5 max-w-2xl">
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
                <Magnetic strength={0.3}>
                  <Button variant="secondary" href={links.twitter} external>
                    X
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="ghost" href={links.resume} download={links.resumeFilename}>
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
