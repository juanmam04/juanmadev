import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeTokens, getStoredTheme } from './tokens/theme'
import { ThemeProvider } from './context/ThemeProvider'
import './index.css'
import App from './App.jsx'

applyThemeTokens(getStoredTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
