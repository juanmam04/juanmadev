import { hero, links, site, socialLinks } from '../../data/site'
import { useInteractive } from '../../context/interactive'
import { useTypewriter } from '../../hooks/useTypewriter'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import HeroPanel from '../ui/HeroPanel'
import DotField from '../canvas/DotField'
import InView from '../motion/InView'
import Magnetic from '../motion/Magnetic'
import { SocialIcon } from '../ui/SocialIcons'

const terminalLines = [
  'ship production features',
  'build fullstack products',
  'deploy on AWS · NGINX',
  'own frontend → infrastructure',
]

export default function Hero() {
  const { parallax } = useInteractive()
  const typed = useTypewriter(terminalLines)

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:min-h-[92vh] lg:pt-40 lg:pb-32">
      <div className="absolute inset-0">
        <DotField />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]"
          aria-hidden="true"
        />
      </div>

      <div className="container-main relative px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <InView>
              <Badge>{hero.badge}</Badge>
            </InView>

            <InView delay={80}>
              <p className="mt-6 text-lg font-medium text-zinc-300 sm:text-xl">
                {site.name}
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-500 sm:text-sm">
                {site.title} · {site.location}
              </p>
            </InView>

            <InView delay={160}>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                <span className="text-gradient-hero">I build software</span>
                <br />
                <span className="text-white">products from scratch.</span>
              </h1>
            </InView>

            <InView delay={220}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                {hero.subheadline}
              </p>
            </InView>

            <InView delay={280}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500">
                {hero.supporting}
              </p>
            </InView>

            <InView delay={320}>
              <div
                className="mt-6 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-sm backdrop-blur-sm"
                aria-label={`Focus: ${typed}`}
              >
                <span className="text-indigo-400">$</span>
                <span className="text-zinc-300">{typed}</span>
                <span className="animate-pulse text-indigo-400" aria-hidden="true">
                  |
                </span>
              </div>
            </InView>

            <InView delay={380}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.3}>
                  <Button href="#projects">View Projects</Button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Button variant="secondary" href={links.resume} download>
                    Download Resume
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="ghost" href="#contact">
                    Contact Me
                  </Button>
                </Magnetic>
              </div>
            </InView>

            <InView delay={440}>
              <div className="mt-8 flex flex-wrap gap-2">
                {socialLinks.map(({ label, href, icon }) => (
                  <Magnetic key={label} strength={0.35}>
                    <Button
                      variant="icon"
                      href={href}
                      external={icon !== 'mail'}
                      aria-label={label}
                    >
                      <SocialIcon name={icon} size={18} />
                    </Button>
                  </Magnetic>
                ))}
              </div>
            </InView>
          </div>

          <InView delay={200}>
            <div
              style={parallax(14)}
              className="transition-transform duration-100 ease-out lg:mt-8"
            >
              <HeroPanel />
            </div>
          </InView>
        </div>

        <InView delay={500}>
          <div className="mt-20 lg:mt-24">
            <div className="glow-line mb-8" aria-hidden="true" />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {hero.credibility.map((item, i) => (
                <li key={item}>
                  <Magnetic strength={0.15}>
                    <div className="group flex h-full cursor-default items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_-12px_rgba(99,102,241,0.5)]">
                      <span className="font-mono text-xs text-indigo-500/70 group-hover:text-indigo-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100">
                        {item}
                      </span>
                    </div>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>
        </InView>
      </div>
    </section>
  )
}
