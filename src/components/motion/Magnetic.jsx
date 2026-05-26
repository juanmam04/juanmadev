import { useRef, useState } from 'react'
import { usePerfMode } from '../../hooks/usePerfMode'
import { springStep } from '../../lib/math'
import { theme } from '../../tokens/theme'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'

/**
 * Magnetic displacement with spring physics (RAF-synchronized).
 */
export default function Magnetic({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null)
  const offset = useRef({ x: 0, y: 0 })
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const reduced = usePerfMode()

  useAnimationFrame(() => {
    const { stiffness, damping } = theme.motion.spring
    offset.current.x = springStep(offset.current.x, target.current.x, velocityX, stiffness, damping)
    offset.current.y = springStep(offset.current.y, target.current.y, velocityY, stiffness, damping)
    setTranslate({ x: offset.current.x, y: offset.current.y })
  }, !reduced)

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    target.current = {
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    }
  }

  const onLeave = () => {
    target.current = { x: 0, y: 0 }
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: reduced ? undefined : `translate3d(${translate.x}px, ${translate.y}px, 0)`,
        willChange: reduced ? 'auto' : 'transform',
      }}
    >
      {children}
    </div>
  )
}
