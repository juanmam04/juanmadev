import { useEffect, useRef } from 'react'

/**
 * Runs callback on every animation frame until cancelled.
 * @param {(time: number, delta: number) => void} callback
 * @param {boolean} enabled
 */
export function useAnimationFrame(callback, enabled = true) {
  const cb = useRef(callback)
  const last = useRef(0)

  useEffect(() => {
    cb.current = callback
  })

  useEffect(() => {
    if (!enabled) return

    let frame
    const loop = (time) => {
      const delta = last.current ? time - last.current : 16
      last.current = time
      cb.current(time, delta)
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [enabled])
}
