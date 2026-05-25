import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Lightweight smooth scroll for in-page anchors (no dependency).
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor || anchor.getAttribute('href') === '#') return

      const id = anchor.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (!target) return

      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduced])
}
