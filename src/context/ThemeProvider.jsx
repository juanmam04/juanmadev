import { useCallback, useEffect, useMemo, useState } from 'react'
import { applyThemeTokens, getStoredTheme, THEME_STORAGE_KEY } from '../tokens/theme'
import { ThemeContext } from './themeContext'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme)

  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    applyThemeTokens(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => {
    applyThemeTokens(theme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === 'dark' }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
