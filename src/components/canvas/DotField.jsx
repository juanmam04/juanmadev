import { useCallback, useEffect, useRef } from 'react'
import { useInteractive } from '../../context/interactive'
import { usePerfMode } from '../../hooks/usePerfMode'
import { clamp, distance } from '../../lib/math'

const SPACING = 40
const INFLUENCE = 120
const PUSH = 14
const RADIUS = 1

/** Simple dot grid — dots shift slightly toward the pointer. */
export default function DotField({ className = '' }) {
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const styleRef = useRef({ rgb: '255,255,255', min: 0.05, max: 0.2 })
  const visibleRef = useRef(true)
  const paintRafRef = useRef(0)
  const lastPointerRef = useRef({ clientX: -1, clientY: -1 })
  const { pointerRef } = useInteractive()
  const perfMode = usePerfMode()

  const refreshStyles = useCallback(() => {
    const root = getComputedStyle(document.documentElement)
    styleRef.current = {
      rgb: root.getPropertyValue('--dot-rgb').trim() || '255,255,255',
      min: parseFloat(root.getPropertyValue('--dot-alpha-min')) || 0.05,
      max: parseFloat(root.getPropertyValue('--dot-alpha-max')) || 0.2,
    }
  }, [])

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const dots = dotsRef.current
    const { w, h, dpr } = sizeRef.current
    if (!ctx || !dots.length || !visibleRef.current) return

    const { clientX, clientY } = pointerRef.current
    const rect = canvas.getBoundingClientRect()
    const mx = clientX - rect.left
    const my = clientY - rect.top
    const { rgb, min, max } = styleRef.current

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      const dist = distance(dot.ox, dot.oy, mx, my)

      if (dist < INFLUENCE) {
        const force = (1 - dist / INFLUENCE) ** 2
        const angle = Math.atan2(dot.oy - my, dot.ox - mx)
        dot.x = dot.ox + Math.cos(angle) * force * PUSH
        dot.y = dot.oy + Math.sin(angle) * force * PUSH
      } else {
        dot.x += (dot.ox - dot.x) * 0.12
        dot.y += (dot.oy - dot.y) * 0.12
      }

      const alpha = clamp(
        min + (1 - distance(dot.x, dot.y, mx, my) / 260) * (max - min),
        min,
        max,
      )

      ctx.beginPath()
      ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},${alpha})`
      ctx.fill()
    }
  }, [pointerRef])

  const schedulePaint = useCallback(() => {
    if (perfMode || !visibleRef.current) return
    if (paintRafRef.current !== 0) return
    paintRafRef.current = requestAnimationFrame(() => {
      paintRafRef.current = 0
      const { clientX, clientY } = pointerRef.current
      const last = lastPointerRef.current
      if (clientX === last.clientX && clientY === last.clientY) return
      lastPointerRef.current = { clientX, clientY }
      paint()
    })
  }, [perfMode, paint, pointerRef])

  useEffect(() => {
    refreshStyles()
    const root = document.documentElement
    const observer = new MutationObserver(refreshStyles)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [refreshStyles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
          const ox = col * SPACING
          const oy = row * SPACING
          dots.push({ ox, oy, x: ox, y: oy })
        }
      }
      dotsRef.current = dots
      lastPointerRef.current = { clientX: -1, clientY: -1 }
      paint()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => ro.disconnect()
  }, [paint])

  useEffect(() => {
    const parent = canvasRef.current?.parentElement
    if (!parent) return

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) schedulePaint()
      },
      { threshold: 0.05 },
    )
    io.observe(parent)
    return () => io.disconnect()
  }, [schedulePaint])

  useEffect(() => {
    if (perfMode) return
    window.addEventListener('mousemove', schedulePaint, { passive: true })
    window.addEventListener('touchmove', schedulePaint, { passive: true })
    return () => {
      window.removeEventListener('mousemove', schedulePaint)
      window.removeEventListener('touchmove', schedulePaint)
      cancelAnimationFrame(paintRafRef.current)
      paintRafRef.current = 0
    }
  }, [perfMode, schedulePaint])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
