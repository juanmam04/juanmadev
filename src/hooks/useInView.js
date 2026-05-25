import { useEffect, useState } from 'react'

/**
 * @param {import('react').RefObject<Element | null>} ref
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 */
export function useInView(ref, options = {}) {
  const { threshold = 0.08, rootMargin = '0px 0px -8% 0px', once = true } = options
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, once])

  return inView
}
