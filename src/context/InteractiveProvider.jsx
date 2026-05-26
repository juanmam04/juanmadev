import { useCallback, useEffect, useRef, useState } from 'react'
import { InteractiveContext } from './interactive'
import { useSpring2D } from '../hooks/useSpring'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLiteMode } from '../hooks/useLiteMode'

export function InteractiveProvider({ children }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scroll, setScroll] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const target = useRef({ x: 0.5, y: 0.5 })
  /** Immediate pointer — used by background / canvas (no spring lag). */
  const pointerRef = useRef({ x: 0.5, y: 0.5, clientX: 0, clientY: 0 })
  const reducedMotion = useReducedMotion()
  const liteMode = useLiteMode()
  const trackPointer = !reducedMotion && !liteMode

  const smooth = useSpring2D(mouse, { enabled: trackPointer })

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!trackPointer) return

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      target.current = { x, y }
      pointerRef.current = { x, y, clientX: e.clientX, clientY: e.clientY }
      setMouse(target.current)
      const root = document.documentElement.style
      root.setProperty('--mouse-x', `${e.clientX}px`)
      root.setProperty('--mouse-y', `${e.clientY}px`)
      root.setProperty('--pointer-xp', `${x * 100}%`)
      root.setProperty('--pointer-yp', `${y * 100}%`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [trackPointer])

  useEffect(() => {
    if (!trackPointer) return
    document.documentElement.style.setProperty('--smooth-x', String(smooth.x))
    document.documentElement.style.setProperty('--smooth-y', String(smooth.y))
  }, [smooth.x, smooth.y, trackPointer])

  useEffect(() => {
    const ids = ['about', 'experience', 'projects', 'capabilities', 'stack', 'contact']
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const parallax = useCallback(
    (strength = 16) => {
      if (!trackPointer) return {}
      return {
        transform: `translate3d(${(smooth.x - 0.5) * strength}px, ${(smooth.y - 0.5) * strength}px, 0)`,
      }
    },
    [smooth.x, smooth.y, trackPointer],
  )

  return (
    <InteractiveContext.Provider
      value={{ mouse, smooth, pointerRef, scroll, activeSection, parallax, reducedMotion, liteMode }}
    >
      {children}
    </InteractiveContext.Provider>
  )
}
