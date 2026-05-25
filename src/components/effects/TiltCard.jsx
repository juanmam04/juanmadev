import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useTypewriter'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const reduced = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02,1.02,1.02)`,
    })
  }

  const onLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    })
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
