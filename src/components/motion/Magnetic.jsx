import { useEffect, useRef } from 'react'
import { usePerfMode } from '../../hooks/usePerfMode'
import { springStep } from '../../lib/math'
import { theme } from '../../tokens/theme'

/**
 * Magnetic displacement with spring physics — DOM updates on rAF only when animating.
 */
export default function Magnetic({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null)
  const offset = useRef({ x: 0, y: 0 })
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef(0)
  const reduced = usePerfMode()

  useEffect(() => {
    if (reduced) {
      cancelAnimationFrame(rafId.current)
      rafId.current = 0
      const el = ref.current
      if (el) {
        el.style.transform = ''
        el.style.willChange = 'auto'
      }
      offset.current = { x: 0, y: 0 }
      target.current = { x: 0, y: 0 }
      velocityX.current = 0
      velocityY.current = 0
      return
    }

    const el = ref.current
    if (el) el.style.willChange = 'transform'

    return () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = 0
      if (el) {
        el.style.transform = ''
        el.style.willChange = 'auto'
      }
    }
  }, [reduced])

  const tick = () => {
    const el = ref.current
    if (reduced || !el) {
      rafId.current = 0
      return
    }

    const { stiffness, damping } = theme.motion.spring
    const ox = springStep(offset.current.x, target.current.x, velocityX, stiffness, damping)
    const oy = springStep(offset.current.y, target.current.y, velocityY, stiffness, damping)
    offset.current.x = ox
    offset.current.y = oy
    el.style.transform = `translate3d(${ox}px, ${oy}px, 0)`

    const settled =
      ox === target.current.x &&
      oy === target.current.y &&
      Math.abs(velocityX.current) <= 0.0001 &&
      Math.abs(velocityY.current) <= 0.0001

    if (!settled) {
      rafId.current = requestAnimationFrame(tick)
    } else {
      rafId.current = 0
    }
  }

  const kick = () => {
    if (reduced || rafId.current !== 0) return
    rafId.current = requestAnimationFrame(tick)
  }

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    target.current = {
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    }
    kick()
  }

  const onLeave = () => {
    target.current = { x: 0, y: 0 }
    kick()
  }

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}
