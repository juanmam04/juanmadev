import { hero, links, site, socialLinks } from '../../data/site'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import HeroPanel from '../ui/HeroPanel'
import HeroBackground from '../effects/HeroBackground'
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
  const typed = useTypewriter(terminalLines)
  const titleLine = useTypewriter(hero.titleVariants, { speed: 42, pause: 2400 })
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:min-h-[min(92vh,920px)] lg:pt-36 lg:pb-28">
      <HeroBackground />

      <div className="container-main relative px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-16">
          <div className="max-w-2xl lg:max-w-none">
            <InView>
              <Badge>{hero.badge}</Badge>
            </InView>

            <InView delay={60}>
              <p className="mt-5 text-base font-medium text-theme-muted sm:mt-6 sm:text-lg">
                {site.name}
              </p>
              <p className="mt-1 font-mono text-xs text-theme-muted-3 sm:text-sm">
                {site.title} · {site.location}
              </p>
            </InView>

            <InView delay={120}>
              <h1 className="text-display mt-5 max-w-4xl sm:mt-6">
                <span className="hero-title-accent">{hero.titleAccent}</span>
                <br />
                <span
                  className="hero-title-rotate text-heading"
                  aria-label={`${hero.titleAccent} ${hero.titleVariants.join(', ')}`}
                >
                  <span aria-hidden="true">{titleLine}</span>
                  {!reducedMotion && (
                    <span className="hero-title-caret" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              </h1>
            </InView>

            <InView delay={180}>
              <p className="text-lead mt-5 max-w-xl sm:mt-6">
                {hero.subheadline}
              </p>
            </InView>

            <InView delay={240}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-theme-muted-2 sm:text-base">
                {hero.supporting}
              </p>
            </InView>

            <InView delay={300}>
              <div
                className="glass-chip mt-5 flex min-h-[2.75rem] items-center gap-2 px-4 py-3 font-mono text-xs sm:text-sm"
                aria-label={`Focus: ${typed}`}
              >
                <span className="text-indigo-400/90">$</span>
                <span className="truncate text-theme-muted">{typed}</span>
                <span className="animate-pulse text-indigo-400/80" aria-hidden="true">
                  |
                </span>
              </div>
            </InView>

            <InView delay={360}>
              <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <Magnetic strength={0.28}>
                  <Button href="#projects" className="w-full sm:w-auto sm:min-w-[10.5rem]">
                    View Projects
                  </Button>
                </Magnetic>
                <Magnetic strength={0.28}>
                  <Button
                    variant="secondary"
                    href={links.resume}
                    download={links.resumeFilename}
                    className="w-full sm:w-auto"
                  >
                    Download Resume
                  </Button>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <Button variant="ghost" href="#contact" className="w-full sm:w-auto">
                    Contact Me
                  </Button>
                </Magnetic>
              </div>
            </InView>

            <InView delay={420}>
              <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
                {socialLinks.map(({ label, href, icon }) => (
                  <Magnetic key={label} strength={0.32}>
                    <Button
                      variant="icon"
                      href={href}
                      external={icon !== 'mail'}
                      aria-label={label}
                    >
                      <SocialIcon name={icon} size={17} />
                    </Button>
                  </Magnetic>
                ))}
              </div>
            </InView>
          </div>

          <InView delay={180} className="hidden sm:block">
            <div className="hero-panel-parallax transition-transform duration-100 ease-out lg:mt-4">
              <HeroPanel />
            </div>
          </InView>
        </div>

        <InView delay={480}>
          <div className="mt-14 sm:mt-16 lg:mt-20">
            <div className="glow-line mb-6 sm:mb-8" aria-hidden="true" />
            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
              {hero.credibility.map((item, i) => (
                <li key={item}>
                  <Magnetic strength={0.12}>
                    <div className="group flex h-full cursor-default items-center gap-3 rounded-xl border border-subtle bg-glass px-3.5 py-3 transition-all duration-300 hover:border-indigo-500/25 hover:bg-indigo-500/[0.07] hover:shadow-[0_0_28px_-14px_rgba(99,102,241,0.45)] sm:px-4">
                      <span className="font-mono text-[10px] tabular-nums text-indigo-500/60 group-hover:text-indigo-400 sm:text-xs">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-medium text-theme-muted-2 group-hover:text-theme-fg sm:text-sm">
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
