import { useEffect, useRef } from 'react'
import { useInteractive } from '../../context/interactive'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { clamp, distance, lerp } from '../../lib/math'

const SPACING = 28
const RADIUS = 1.1
const INFLUENCE = 140

/**
 * Canvas dot field with pointer displacement — O(n) per frame, resize-aware.
 */
export default function DotField({ className = '' }) {
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const { smooth } = useInteractive()
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      sizeRef.current = { w, h, dpr }
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const cols = Math.ceil(w / SPACING) + 1
      const rows = Math.ceil(h / SPACING) + 1
      const dots = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            ox: col * SPACING,
            oy: row * SPACING,
            x: col * SPACING,
            y: row * SPACING,
          })
        }
      }
      dotsRef.current = dots
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const dots = dotsRef.current
    const { w, h, dpr } = sizeRef.current
    if (!ctx || !dots.length) return

    const mx = smooth.x * w
    const my = smooth.y * h

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      let tx = dot.ox
      let ty = dot.oy

      if (!reduced) {
        const dist = distance(dot.ox, dot.oy, mx, my)
        if (dist < INFLUENCE) {
          const force = (1 - dist / INFLUENCE) ** 2
          const angle = Math.atan2(dot.oy - my, dot.ox - mx)
          tx += Math.cos(angle) * force * 22
          ty += Math.sin(angle) * force * 22
        }
        dot.x = lerp(dot.x, tx, 0.18)
        dot.y = lerp(dot.y, ty, 0.18)
      } else {
        dot.x = dot.ox
        dot.y = dot.oy
      }

      const alpha = reduced
        ? 0.12
        : clamp(0.08 + (1 - distance(dot.x, dot.y, mx, my) / 280) * 0.35, 0.06, 0.45)

      ctx.beginPath()
      ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()
    }
  }, true)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
