import { useCallback, useEffect, useRef } from 'react'
import { useInteractive } from '../../context/interactive'
import { usePerfMode } from '../../hooks/usePerfMode'
import { useLiteMode } from '../../hooks/useLiteMode'
import { clamp, distance } from '../../lib/math'

const SPACING = 34
const SPACING_LITE = 46
const INFLUENCE = 150
const PUSH = 20
const MOUSE_LINKS = 5
const FPS = 30

/**
 * Interactive node mesh — dots + lines react to pointer (desktop & touch).
 */
export default function LinkField({ className = '' }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const ripplesRef = useRef([])
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1, cols: 0, rows: 0 })
  const styleRef = useRef({ rgb: '129,140,248', dot: 0.2, line: 0.14, pulse: 0.55 })
  const visibleRef = useRef(true)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const { pointerRef } = useInteractive()
  const perfMode = usePerfMode()
  const liteMode = useLiteMode()

  const refreshStyles = useCallback(() => {
    const root = getComputedStyle(document.documentElement)
    styleRef.current = {
      rgb: root.getPropertyValue('--link-rgb').trim() || '129,140,248',
      dot: parseFloat(root.getPropertyValue('--link-dot-alpha')) || 0.2,
      line: parseFloat(root.getPropertyValue('--link-line-alpha')) || 0.14,
      pulse: parseFloat(root.getPropertyValue('--link-pulse-alpha')) || 0.55,
    }
  }, [])

  const buildNodes = useCallback(
    (w, h, spacing) => {
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1
      const nodes = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ox = col * spacing
          const oy = row * spacing
          nodes.push({ ox, oy, x: ox, y: oy, col, row })
        }
      }
      sizeRef.current.cols = cols
      sizeRef.current.rows = rows
      nodesRef.current = nodes
    },
    [],
  )

  const paint = useCallback(
    (time) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const nodes = nodesRef.current
      const { w, h, dpr } = sizeRef.current
      if (!ctx || !nodes.length || !visibleRef.current) return

      const rect = canvas.getBoundingClientRect()
      const { clientX, clientY } = pointerRef.current
      const mx = clientX - rect.left
      const my = clientY - rect.top
      const { rgb, dot, line, pulse } = styleRef.current

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const dist = distance(node.ox, node.oy, mx, my)
        const force = dist < INFLUENCE ? (1 - dist / INFLUENCE) ** 2 : 0
        if (force > 0) {
          const angle = Math.atan2(node.oy - my, node.ox - mx)
          node.x = node.ox + Math.cos(angle) * force * PUSH
          node.y = node.oy + Math.sin(angle) * force * PUSH
        } else {
          node.x += (node.ox - node.x) * 0.14
          node.y += (node.oy - node.y) * 0.14
        }
        node.force = force
      }

      const cols = sizeRef.current.cols
      const drawLink = (x1, y1, x2, y2, alpha) => {
        if (alpha < 0.03) return
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(${rgb},${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const right = nodes[i + 1]
        const below = nodes[i + cols]
        const linkAlpha = (f) => clamp(f * pulse, 0, pulse)

        if (right && right.row === a.row) {
          const strength = (a.force + right.force) * 0.5
          drawLink(a.x, a.y, right.x, right.y, linkAlpha(strength) * line * 2.2)
        }
        if (below) {
          const strength = (a.force + below.force) * 0.5
          drawLink(a.x, a.y, below.x, below.y, linkAlpha(strength) * line * 2.2)
        }
      }

      const near = nodes
        .filter((n) => n.force > 0.08)
        .sort((a, b) => b.force - a.force)
        .slice(0, MOUSE_LINKS)

      for (let i = 0; i < near.length; i++) {
        const n = near[i]
        drawLink(mx, my, n.x, n.y, clamp(n.force * pulse, 0.08, 0.45))
      }

      const ripples = ripplesRef.current
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r]
        ripple.t += 0.028
        if (ripple.t >= 1) {
          ripples.splice(r, 1)
          continue
        }
        const radius = ripple.t * 120
        const alpha = (1 - ripple.t) * 0.35
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rgb},${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const alpha = clamp(dot + n.force * (pulse - dot), dot, pulse)
        const radius = 1 + n.force * 1.4
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${alpha})`
        ctx.fill()
      }

      lastFrameRef.current = time
    },
    [pointerRef],
  )

  useEffect(() => {
    refreshStyles()
    const root = document.documentElement
    const observer = new MutationObserver(refreshStyles)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [refreshStyles])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const spacing = liteMode ? SPACING_LITE : SPACING
    const dpr = liteMode ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      sizeRef.current = { ...sizeRef.current, w, h, dpr }
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      buildNodes(w, h, spacing)
      paint(performance.now())
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [liteMode, buildNodes, paint])

  useEffect(() => {
    const parent = canvasRef.current?.parentElement
    if (!parent) return

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 },
    )
    io.observe(parent)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (perfMode) return

    lastFrameRef.current = 0
    const tick = (time) => {
      rafRef.current = requestAnimationFrame(tick)
      const elapsed = time - lastFrameRef.current
      if (elapsed < 1000 / FPS) return
      paint(time)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [perfMode, paint])

  useEffect(() => {
    if (perfMode) return

    const section = () => canvasRef.current?.closest('section')
    const parent = () => canvasRef.current?.parentElement

    const addRipple = (clientX, clientY) => {
      const el = parent()
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return
      }
      ripplesRef.current.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        t: 0,
      })
      if (ripplesRef.current.length > 6) ripplesRef.current.shift()
    }

    const onClick = (e) => {
      const sec = section()
      if (!sec?.contains(e.target)) return
      addRipple(e.clientX, e.clientY)
    }

    const onTouch = (e) => {
      const t = e.touches[0]
      if (!t) return
      const sec = section()
      if (!sec?.contains(e.target)) return
      addRipple(t.clientX, t.clientY)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [perfMode])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      data-effect="link-field"
    />
  )
}
