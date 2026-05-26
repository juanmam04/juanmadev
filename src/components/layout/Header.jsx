import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation, site, links } from '../../data/site'
import { useInteractive } from '../../context/interactive'
import Button from '../ui/Button'
import Magnetic from '../motion/Magnetic'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeSection } = useInteractive()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled || mobileOpen
          ? 'border-b border-white/[0.06] bg-[#050508]/72 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
        <Magnetic strength={0.2}>
          <a
            href="#"
            className="group flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              closeMobile()
            }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 font-mono text-xs font-bold text-white transition-all group-hover:border-indigo-500/30 group-hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]">
              JM
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
              {site.name}
            </span>
          </a>
        </Magnetic>

        <nav
          className={`hidden items-center gap-1 rounded-full border p-1 md:flex ${
            scrolled ? 'border-white/[0.08] bg-white/[0.03] backdrop-blur-xl' : 'border-transparent'
          }`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200'
                }`}
                {...(isActive ? { 'aria-current': 'location' } : {})}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:block" strength={0.25}>
            <Button
              variant="secondary"
              href={links.resume}
              download={links.resumeFilename}
              className="!px-4 !py-2 text-xs"
            >
              Resume
            </Button>
          </Magnetic>
          <button
            type="button"
            className="inline-flex rounded-xl border border-white/[0.08] p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/[0.06] bg-[#050508]/95 px-5 py-6 backdrop-blur-2xl md:hidden">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/[0.06]"
              onClick={closeMobile}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
