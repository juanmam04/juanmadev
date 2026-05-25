import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useTypewriter'

export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * strength, y: y * strength })
  }

  const onLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
