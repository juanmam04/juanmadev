export const theme = {
  color: {
    bg: '#050508',
    fg: '#fafafa',
    muted: '#a1a1aa',
    border: 'rgba(255,255,255,0.08)',
    accent: '#818cf8',
  },
  motion: {
    spring: { stiffness: 0.14, damping: 0.8 },
    reveal: { duration: 800, y: 28 },
  },
  layout: {
    maxWidth: '72rem',
  },
}

export function applyThemeTokens() {
  const root = document.documentElement
  root.style.setProperty('--color-bg', theme.color.bg)
  root.style.setProperty('--color-fg', theme.color.fg)
  root.style.setProperty('--color-muted', theme.color.muted)
  root.style.setProperty('--color-border', theme.color.border)
  root.style.setProperty('--color-accent', theme.color.accent)
}
