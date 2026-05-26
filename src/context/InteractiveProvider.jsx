import { useEffect, useMemo, useRef, useState } from 'react'
import { InteractiveContext } from './interactive'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLiteMode } from '../hooks/useLiteMode'
import { springStep } from '../lib/math'
import { theme } from '../tokens/theme'

export function InteractiveProvider({ children }) {
  const [activeSection, setActiveSection] = useState('')
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const smoothX = useRef(0.5)
  const smoothY = useRef(0.5)
  const velX = useRef(0)
  const velY = useRef(0)
  /** Immediate pointer — used by background / canvas (no spring lag). */
  const pointerRef = useRef({ x: 0.5, y: 0.5, clientX: 0, clientY: 0 })
  const reducedMotion = useReducedMotion()
  const liteMode = useLiteMode()
  const trackPointer = !reducedMotion && !liteMode

  const { stiffness, damping } = theme.motion.spring

  /** Spring + pointer CSS vars run on rAF only — avoids re-rendering the tree on every mousemove. */
  useEffect(() => {
    const root = document.documentElement.style

    if (!trackPointer) {
      root.setProperty('--smooth-x', '0.5')
      root.setProperty('--smooth-y', '0.5')
      smoothX.current = 0.5
      smoothY.current = 0.5
      velX.current = 0
      velY.current = 0
      return
    }

    let raf = 0

    const loop = () => {
      const tgt = targetRef.current
      const nx = springStep(smoothX.current, tgt.x, velX, stiffness, damping)
      const ny = springStep(smoothY.current, tgt.y, velY, stiffness, damping)
      smoothX.current = nx
      smoothY.current = ny
      root.setProperty('--smooth-x', String(nx))
      root.setProperty('--smooth-y', String(ny))

      const settled =
        nx === tgt.x &&
        ny === tgt.y &&
        Math.abs(velX.current) <= 0.0001 &&
        Math.abs(velY.current) <= 0.0001

      if (!settled) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }

    const kick = () => {
      if (raf === 0) raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      targetRef.current = { x, y }
      pointerRef.current = { x, y, clientX: e.clientX, clientY: e.clientY }
      root.setProperty('--mouse-x', `${e.clientX}px`)
      root.setProperty('--mouse-y', `${e.clientY}px`)
      root.setProperty('--pointer-xp', `${x * 100}%`)
      root.setProperty('--pointer-yp', `${y * 100}%`)
      kick()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [trackPointer, stiffness, damping])

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

  const value = useMemo(
    () => ({
      pointerRef,
      activeSection,
      reducedMotion,
      liteMode,
    }),
    [activeSection, reducedMotion, liteMode],
  )

  return <InteractiveContext.Provider value={value}>{children}</InteractiveContext.Provider>
}
