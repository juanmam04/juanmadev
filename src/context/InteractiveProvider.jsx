import { useCallback, useEffect, useRef, useState } from 'react'
import { InteractiveContext } from './interactive'
import { useSpring2D } from '../hooks/useSpring'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function InteractiveProvider({ children }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scroll, setScroll] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const target = useRef({ x: 0.5, y: 0.5 })
  const reducedMotion = useReducedMotion()

  const smooth = useSpring2D(mouse, { enabled: !reducedMotion })

  useEffect(() => {
    const onMove = (e) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      setMouse(target.current)
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--smooth-x', String(smooth.x))
    document.documentElement.style.setProperty('--smooth-y', String(smooth.y))
  }, [smooth.x, smooth.y])

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
      if (reducedMotion) return {}
      return {
        transform: `translate3d(${(smooth.x - 0.5) * strength}px, ${(smooth.y - 0.5) * strength}px, 0)`,
      }
    },
    [smooth.x, smooth.y, reducedMotion],
  )

  return (
    <InteractiveContext.Provider
      value={{ mouse, smooth, scroll, activeSection, parallax, reducedMotion }}
    >
      {children}
    </InteractiveContext.Provider>
  )
}
