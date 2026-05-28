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
  /** Immediate pointer — used by canvas (no spring lag). */
  const pointerRef = useRef({ x: 0.5, y: 0.5, clientX: 0, clientY: 0 })
  const pendingPointerRef = useRef(null)
  const pointerRafRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const liteMode = useLiteMode()
  const trackPointer = !reducedMotion && !liteMode

  const { stiffness, damping } = theme.motion.spring

  /** Pointer CSS vars + spring run on rAF only — one style flush per frame max. */
  useEffect(() => {
    const root = document.documentElement.style

    if (!trackPointer) {
      root.setProperty('--smooth-x', '0.5')
      root.setProperty('--smooth-y', '0.5')
      root.setProperty('--mouse-x', '50vw')
      root.setProperty('--mouse-y', '50vh')
      root.setProperty('--pointer-xp', '50%')
      root.setProperty('--pointer-yp', '50%')
      smoothX.current = 0.5
      smoothY.current = 0.5
      velX.current = 0
      velY.current = 0
      return
    }

    let springRaf = 0

    const flushPointerStyles = () => {
      pointerRafRef.current = 0
      const pending = pendingPointerRef.current
      if (!pending) return
      pendingPointerRef.current = null
      root.setProperty('--mouse-x', `${pending.clientX}px`)
      root.setProperty('--mouse-y', `${pending.clientY}px`)
      root.setProperty('--pointer-xp', `${pending.xp}%`)
      root.setProperty('--pointer-yp', `${pending.yp}%`)
    }

    const springLoop = () => {
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
        springRaf = requestAnimationFrame(springLoop)
      } else {
        springRaf = 0
      }
    }

    const kickSpring = () => {
      if (springRaf === 0) springRaf = requestAnimationFrame(springLoop)
    }

    const schedulePointerFlush = () => {
      if (pointerRafRef.current !== 0) return
      pointerRafRef.current = requestAnimationFrame(() => {
        flushPointerStyles()
        kickSpring()
      })
    }

    const onPointer = (clientX, clientY) => {
      const x = clientX / window.innerWidth
      const y = clientY / window.innerHeight
      targetRef.current = { x, y }
      pointerRef.current = { x, y, clientX, clientY }
      pendingPointerRef.current = {
        clientX,
        clientY,
        xp: x * 100,
        yp: y * 100,
      }
      schedulePointerFlush()
    }

    const onMove = (e) => onPointer(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) onPointer(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchstart', onTouch)
      cancelAnimationFrame(springRaf)
      cancelAnimationFrame(pointerRafRef.current)
      pointerRafRef.current = 0
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
