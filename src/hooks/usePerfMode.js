import { useLiteMode } from './useLiteMode'
import { useReducedMotion } from './useReducedMotion'

/** True when heavy motion / pointer effects should be off. */
export function usePerfMode() {
  const reduced = useReducedMotion()
  const lite = useLiteMode()
  return reduced || lite
}
