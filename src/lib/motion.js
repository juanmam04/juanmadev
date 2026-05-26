export function getReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function onReducedMotionChange(callback) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

/** Touch / narrow viewports / save-data: fewer effects, less CPU/GPU work. */
export function getLiteMode() {
  if (typeof window === 'undefined') return false
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.matchMedia('(max-width: 767px)').matches
  const saveData = navigator.connection?.saveData === true
  return coarse || narrow || saveData
}

export function onLiteModeChange(callback) {
  if (typeof window === 'undefined') return () => {}
  const queries = [
    window.matchMedia('(pointer: coarse)'),
    window.matchMedia('(max-width: 767px)'),
  ]
  const onChange = () => callback()
  queries.forEach((mq) => mq.addEventListener('change', onChange))
  navigator.connection?.addEventListener?.('change', onChange)
  return () => {
    queries.forEach((mq) => mq.removeEventListener('change', onChange))
    navigator.connection?.removeEventListener?.('change', onChange)
  }
}
