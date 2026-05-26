import { useEffect, useRef } from 'react'

/** Updates transform via rAF — avoids context + React re-renders on every scroll tick. */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let scheduled = false
    let progress = 0

    const flush = () => {
      scheduled = false
      const el = barRef.current
      if (el) el.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress = max > 0 ? window.scrollY / max : 0
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(flush)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500"
      aria-hidden="true"
    />
  )
}
