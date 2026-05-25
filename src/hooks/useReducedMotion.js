import { useEffect, useState } from 'react'
import { getReducedMotion, onReducedMotionChange } from '../lib/motion'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(getReducedMotion)

  useEffect(() => onReducedMotionChange(() => setReduced(getReducedMotion())), [])

  return reduced
}
