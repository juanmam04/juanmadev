/** @param {...(string | false | null | undefined)} classes */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1)
}

/**
 * Critically damped spring step toward target.
 * @param {number} current
 * @param {number} target
 * @param {number} velocity - mutable ref .current
 * @param {number} stiffness
 * @param {number} damping
 */
export function springStep(current, target, velocity, stiffness = 0.12, damping = 0.82) {
  const force = (target - current) * stiffness
  velocity.current = (velocity.current + force) * damping
  const next = current + velocity.current
  if (Math.abs(target - next) < 0.001 && Math.abs(velocity.current) < 0.001) {
    velocity.current = 0
    return target
  }
  return next
}

export const easing = {
  outExpo: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
  outCubic: (t) => 1 - (1 - t) ** 3,
}
