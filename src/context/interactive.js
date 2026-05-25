import { createContext, useContext } from 'react'

export const InteractiveContext = createContext(null)

export function useInteractive() {
  const ctx = useContext(InteractiveContext)
  if (!ctx) throw new Error('useInteractive must be used within InteractiveProvider')
  return ctx
}
