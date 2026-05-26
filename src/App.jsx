import { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { InteractiveProvider } from './context/InteractiveProvider'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Background from './components/ui/Background'
import CursorGlow from './components/effects/CursorGlow'
import ScrollProgress from './components/effects/ScrollProgress'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'

const WhyDifferent = lazy(() => import('./components/sections/WhyDifferent'))
const About = lazy(() => import('./components/sections/About'))
const Journey = lazy(() => import('./components/sections/Journey'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Capabilities = lazy(() => import('./components/sections/Capabilities'))
const Stack = lazy(() => import('./components/sections/Stack'))
const Principles = lazy(() => import('./components/sections/Principles'))
const Contact = lazy(() => import('./components/sections/Contact'))

function SectionFallback() {
  return (
    <div className="section-padding">
      <div className="h-48 animate-pulse rounded-2xl border border-white/[0.04] bg-white/[0.02]" aria-hidden="true" />
    </div>
  )
}

function AppShell() {
  useSmoothScroll()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Background />
      <Header />
      <main id="main">
        <Hero />
        <div className="relative">
          <div className="section-divider" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50" aria-hidden="true" />
          <Suspense fallback={<SectionFallback />}>
            <WhyDifferent />
            <About />
            <Journey />
            <Experience />
            <Projects />
            <Capabilities />
            <Stack />
            <Principles />
            <Contact />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <InteractiveProvider>
      <AppShell />
      <Analytics />
    </InteractiveProvider>
  )
}
