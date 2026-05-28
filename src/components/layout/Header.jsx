import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation, site, links } from '../../data/site'
import { useInteractive } from '../../context/interactive'
import Button from '../ui/Button'
import Magnetic from '../motion/Magnetic'
import ThemeToggle from '../ui/ThemeToggle'

export default function Header() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 20,
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeSection } = useInteractive()

  useEffect(() => {
    let raf = 0
    let lastScrolled = typeof window !== 'undefined' && window.scrollY > 20

    const flush = () => {
      raf = 0
      const next = window.scrollY > 20
      if (next !== lastScrolled) {
        lastScrolled = next
        setScrolled(next)
      }
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(flush)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
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
          ? 'border-b border-subtle bg-header backdrop-blur-xl backdrop-saturate-150'
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
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 font-mono text-xs font-bold text-heading transition-all group-hover:border-indigo-500/30 group-hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]">
              JM
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-heading sm:block">
              {site.name}
            </span>
          </a>
        </Magnetic>

        <nav
          className={`hidden items-center gap-1 rounded-full border p-1 md:flex ${
            scrolled ? 'border-glass bg-glass-strong backdrop-blur-xl' : 'border-transparent'
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
                    ? 'text-[var(--nav-active-text)]'
                    : 'text-[var(--nav-text)] hover:bg-[var(--glass-bg-hover)] hover:text-[var(--nav-text-hover)]'
                }`}
                style={isActive ? { background: 'var(--nav-active-bg)' } : undefined}
                {...(isActive ? { 'aria-current': 'location' } : {})}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
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
            className="inline-flex rounded-xl border border-glass bg-glass-strong p-2 text-theme-muted transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-theme-fg md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-subtle px-5 py-6 backdrop-blur-2xl md:hidden"
          style={{ background: 'var(--header-bg-mobile)' }}
        >
          <div className="mb-4 flex items-center justify-between sm:hidden">
            <span className="text-xs font-medium uppercase tracking-wider text-theme-muted-2">
              Theme
            </span>
            <ThemeToggle />
          </div>
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-3 text-sm text-theme-muted transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-theme-fg"
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
