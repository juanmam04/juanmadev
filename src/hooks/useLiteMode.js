import { useEffect, useState } from 'react'
import { getLiteMode, onLiteModeChange } from '../lib/motion'

export function useLiteMode() {
  const [lite, setLite] = useState(getLiteMode)

  useEffect(() => onLiteModeChange(() => setLite(getLiteMode())), [])

  return lite
}
