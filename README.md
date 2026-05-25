# Juan Manuel Martínez — Personal Site

React + Vite portfolio with a custom motion layer (no animation libraries).

## Engineering highlights

- **Canvas dot field** (`DotField`) — pointer-reactive grid, `ResizeObserver`, RAF loop, `devicePixelRatio` cap
- **Spring physics** (`lib/math.springStep`, `useSpring`) — smooth pointer tracking & magnetic buttons
- **Unified surface hook** (`useSurfaceTransform`) — 3D tilt + spotlight in one pass
- **Code-split sections** — `React.lazy` + `Suspense` below the fold
- **Design tokens** — CSS variables injected from `tokens/theme.js`
- **Accessibility** — `prefers-reduced-motion` disables canvas/magnetic/spring effects

## Structure

```
src/
├── lib/           # math, motion utilities
├── hooks/         # useSpring, useInView, useAnimationFrame, …
├── tokens/        # theme tokens
├── context/       # global pointer + scroll state
├── components/
│   ├── canvas/    # DotField
│   ├── motion/    # InView, Magnetic, InteractiveSurface
│   ├── sections/  # lazy-loaded page sections
│   └── ui/
└── data/site.js   # content only
```

## Commands

```bash
npm install
npm run dev      # http://localhost:9847
npm run build
```
