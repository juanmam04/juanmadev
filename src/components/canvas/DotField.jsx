import { useCallback, useEffect, useRef } from 'react'
import { useInteractive } from '../../context/interactive'
import { usePerfMode } from '../../hooks/usePerfMode'
import { useLiteMode } from '../../hooks/useLiteMode'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { clamp, distance } from '../../lib/math'

const SPACING = 28
const SPACING_LITE = 42
const RADIUS = 1.1
const INFLUENCE = 140

/**
 * Canvas dot field — pointer at real cursor position within the hero canvas.
 */
export default function DotField({ className = '' }) {
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const { pointerRef } = useInteractive()
  const perfMode = usePerfMode()
  const liteMode = useLiteMode()

  const paint = useCallback(
    (interactive) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const dots = dotsRef.current
      const { w, h, dpr } = sizeRef.current
      if (!ctx || !dots.length) return

      let mx = w / 2
      let my = h / 2
      if (interactive && canvas) {
        const rect = canvas.getBoundingClientRect()
        const { clientX, clientY } = pointerRef.current
        mx = clientX - rect.left
        my = clientY - rect.top
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        let tx = dot.ox
        let ty = dot.oy

        if (interactive) {
          const dist = distance(dot.ox, dot.oy, mx, my)
          if (dist < INFLUENCE) {
            const force = (1 - dist / INFLUENCE) ** 2
            const angle = Math.atan2(dot.oy - my, dot.ox - mx)
            tx += Math.cos(angle) * force * 22
            ty += Math.sin(angle) * force * 22
          }
          dot.x = tx
          dot.y = ty
        } else {
          dot.x = dot.ox
          dot.y = dot.oy
        }

        const alpha = interactive
          ? clamp(0.08 + (1 - distance(dot.x, dot.y, mx, my) / 280) * 0.35, 0.06, 0.45)
          : 0.11

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
    },
    [pointerRef],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const spacing = liteMode ? SPACING_LITE : SPACING
      const dpr = liteMode ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      sizeRef.current = { w, h, dpr }
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1
      const dots = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            ox: col * spacing,
            oy: row * spacing,
            x: col * spacing,
            y: row * spacing,
          })
        }
      }
      dotsRef.current = dots
      paint(!perfMode)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => ro.disconnect()
  }, [liteMode, perfMode, paint])

  useAnimationFrame(() => paint(true), !perfMode)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
