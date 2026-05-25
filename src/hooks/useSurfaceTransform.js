import { useCallback, useRef, useState } from 'react'
import { clamp } from '../lib/math'
import { useReducedMotion } from './useReducedMotion'

/**
 * 3D tilt + local spotlight for card surfaces.
 * @param {{ intensity?: number }} options
 */
export function useSurfaceTransform({ intensity = 8 } = {}) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const reduced = useReducedMotion()

  const onMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rx = clamp(-y * intensity, -12, 12)
      const ry = clamp(x * intensity, -12, 12)
      setTransform(
        `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`,
      )
      setSpot({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    [intensity, reduced],
  )

  const onLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setSpot({ x: 50, y: 50 })
  }, [])

  const spotlightStyle = {
    background: `radial-gradient(480px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.07), transparent 42%)`,
  }

  return { ref, transform, spotlightStyle, onMove, onLeave }
}
