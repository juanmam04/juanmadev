import { useEffect, useRef, useState } from 'react'
import { springStep } from '../lib/math'
import { theme } from '../tokens/theme'

/**
 * Spring-animated scalar value.
 */
export function useSpring(target, options = {}) {
  const { stiffness = theme.motion.spring.stiffness, damping = theme.motion.spring.damping, enabled = true } = options
  const [value, setValue] = useState(target)
  const current = useRef(target)
  const velocity = useRef(0)

  useEffect(() => {
    if (!enabled) return

    let frame
    const tick = () => {
      const next = springStep(current.current, target, velocity, stiffness, damping)
      current.current = next
      setValue(next)
      if (next !== target || Math.abs(velocity.current) > 0.0001) {
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, stiffness, damping, enabled])

  return enabled ? value : target
}

/**
 * Spring-animated 2D point.
 */
export function useSpring2D(target, options = {}) {
  const x = useSpring(target.x, options)
  const y = useSpring(target.y, options)
  return { x, y }
}
