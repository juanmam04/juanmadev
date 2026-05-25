import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeTokens } from './tokens/theme'
import './index.css'
import App from './App.jsx'

applyThemeTokens()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
