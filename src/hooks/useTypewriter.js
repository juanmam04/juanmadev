import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useTypewriter(words, { speed = 55, pause = 1800 } = {}) {
  const reduced = useReducedMotion()
  const [text, setText] = useState(() => words[0] ?? '')

  useEffect(() => {
    if (reduced || !words.length) return

    let timeout
    let index = 0
    let char = 0
    let deleting = false

    const tick = () => {
      const word = words[index]

      if (!deleting) {
        setText(word.slice(0, char + 1))
        char += 1
        if (char === word.length) {
          deleting = true
          timeout = setTimeout(tick, pause)
          return
        }
        timeout = setTimeout(tick, speed)
      } else {
        setText(word.slice(0, char - 1))
        char -= 1
        if (char === 0) {
          deleting = false
          index = (index + 1) % words.length
          timeout = setTimeout(tick, speed * 2)
          return
        }
        timeout = setTimeout(tick, speed / 2)
      }
    }

    timeout = setTimeout(tick, speed)
    return () => clearTimeout(timeout)
  }, [words, speed, pause, reduced])

  return reduced ? (words[0] ?? '') : text
}
