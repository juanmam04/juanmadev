import { useRef, useState } from 'react'

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })

  const onMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setSpot({ x: 50, y: 50 })}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.18), transparent 45%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
