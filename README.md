# juanmadev — Personal site

Sitio personal de **Juan Manuel Martínez**, Fullstack Software Engineer (Montevideo, Uruguay).  
Portfolio orientado a producto y startups: muestra trabajo real, stack técnico y proyectos en producción — sin plantillas genéricas ni métricas inventadas.

**Live:** [juanmadevv.vercel.app](https://juanmadevv.vercel.app)

---

## Qué es este repo

SPA en **React + Vite** con una capa de interacción hecha a mano (canvas, springs, scroll spy). Todo el contenido vive en un solo archivo de datos; los componentes se encargan solo de presentación y motion.

Diseñado para sentirse **moderno, técnico y minimal** — pensado para founders, engineers y recruiters que quieren ver cómo pensás y qué construís.

---

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19 |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Iconos | Lucide React |
| Routing | Anchors nativos (sin react-router) |
| Animación | Canvas + RAF + springs propios (sin Framer Motion / GSAP) |

---

## Secciones del sitio

- **Hero** — headline, CTAs, terminal typewriter, grid de puntos interactivo, panel de sistemas activos
- **Why I'm different** — diferenciadores en bento grid
- **About** — perfil y highlights
- **Journey** — línea de tiempo
- **Experience** — CreditON y rol actual
- **Projects** — **Servo** como featured case study + proyectos secundarios
- **Capabilities** — skills agrupadas por área
- **Stack** — tecnologías con tags animados
- **Principles** — valores de trabajo
- **Contact** — email, LinkedIn, GitHub, X, descarga de CV

---

## Highlights de ingeniería

### Canvas (`DotField`)

- Grid de puntos en `<canvas>` con loop `requestAnimationFrame`
- Posición del puntero **relativa al hero** (no normalizada a viewport completo)
- `ResizeObserver` + cap de `devicePixelRatio` (máx. 2 en desktop)
- En móvil / touch: grid estático, menos puntos, sin RAF continuo

### Motion system

- **Springs** (`lib/math.springStep`, `useSpring`) — parallax suave en cards
- **Pointer inmediato** — fondo y spotlight siguen el cursor sin lag (CSS vars `--mouse-x/y`, `--pointer-xp/yp`)
- **Magnetic** — botones con desplazamiento físico en desktop
- **InteractiveSurface** — tilt 3D + spotlight en cards
- **InView** — reveal al scroll con `IntersectionObserver`
- **Modo lite** — `(pointer: coarse)`, viewport estrecho o `save-data`: desactiva efectos pesados

### Performance

- **Code splitting** — secciones bajo el fold con `React.lazy` + `Suspense`
- **Imágenes** — Servo con variante mobile (`servo-preview-mobile.jpg`), lazy load
- **Fuentes** — Inter + JetBrains Mono, carga no bloqueante
- **Favicon** — variantes 32px y 192px

### Accesibilidad

- `prefers-reduced-motion` respeta preferencias del sistema
- Skip link, landmarks semánticos, `aria-current` en navegación
- Targets táctiles ≥ 44px en botones principales

---

## Estructura del proyecto

```
juanmadev/
├── public/
│   ├── favicon-32.png
│   ├── favicon-192.png
│   ├── JuanManuelMartinezResume.pdf
│   ├── servo-preview.jpg
│   └── servo-preview-mobile.jpg
├── src/
│   ├── App.jsx                 # shell + lazy sections
│   ├── main.jsx
│   ├── index.css               # utilidades, motion, fondo
│   ├── data/
│   │   └── site.js             # TODO el contenido del sitio
│   ├── lib/
│   │   ├── math.js             # spring, lerp, distance, cn
│   │   └── motion.js           # reduced motion, lite mode
│   ├── hooks/
│   │   ├── useSpring.js
│   │   ├── useAnimationFrame.js
│   │   ├── useInView.js
│   │   ├── useLiteMode.js
│   │   ├── usePerfMode.js
│   │   ├── useReducedMotion.js
│   │   ├── useSmoothScroll.js
│   │   ├── useSurfaceTransform.js
│   │   └── useTypewriter.js
│   ├── tokens/
│   │   └── theme.js            # design tokens → CSS variables
│   ├── context/
│   │   ├── InteractiveProvider.jsx
│   │   └── interactive.js
│   └── components/
│       ├── canvas/             # DotField
│       ├── motion/             # InView, Magnetic, InteractiveSurface
│       ├── effects/            # CursorGlow, ScrollProgress
│       ├── sections/           # Hero, About, Projects, …
│       ├── projects/           # ServoFeatured
│       ├── layout/             # Header, Footer
│       └── ui/                 # Button, Section, ServoMockup, …
├── index.html
├── vite.config.js              # puerto dev: 9847
└── package.json
```

---

## Empezar en local

**Requisitos:** Node.js 18+ (recomendado 20+)

```bash
git clone https://github.com/juanmam04/juanmadev.git
cd juanmadev
npm install
npm run dev
```

Abrí [http://localhost:9847](http://localhost:9847)

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto **9847**) |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Preview del build local |
| `npm run lint` | ESLint |

### Puerto ocupado

Si `9847` está en uso:

```bash
lsof -ti :9847 | xargs kill -9
npm run dev
```

---

## Editar contenido

**Un solo archivo:** `src/data/site.js`

Ahí están:

- Datos personales (`site`, `links`)
- Navegación
- Copy del hero, about, experience, projects
- Case study de Servo (`caseStudy[]`)
- Capabilities, stack, principles, contact
- `socialLinks` para iconos del hero

No hace falta tocar JSX para cambiar textos, links o stack — solo `site.js`.

### Assets estáticos

| Archivo | Uso |
|---------|-----|
| `public/JuanManuelMartinezResume.pdf` | Descarga de CV (`links.resume`) |
| `public/servo-preview.jpg` | Screenshot de Servo (desktop) |
| `public/servo-preview-mobile.jpg` | Screenshot optimizado (móvil) |
| `public/favicon-32.png` / `favicon-192.png` | Favicon |

Al reemplazar el CV, mantené el nombre `JuanManuelMartinezResume.pdf` o actualizá `links.resume` y `links.resumeFilename` en `site.js`.

---

## Asistente IA (preguntas sobre Juan)

Botón flotante **“Preguntame sobre Juan”** — responde con contexto del portfolio (experiencia, Servo, stack, disponibilidad).

### Cómo funciona

- **Frontend:** `src/components/assistant/AssistantChat.jsx`
- **Conocimiento:** se arma desde `src/data/site.js` + `src/data/assistantProfile.js` → `buildAssistantKnowledge.js`
- **API:** `api/assistant/chat.js` (Vercel serverless) — la API key **nunca** va al navegador

### Configurar en local

1. Copiá `.env.example` → `.env`
2. Creá una key en [Groq Console](https://console.groq.com/keys) (gratis) y pegala:

```bash
GROQ_API_KEY=gsk_...
```

3. `npm run dev` — Vite expone `/api/assistant/chat` en desarrollo

Alternativa: `OPENAI_API_KEY` en `.env` (usa `gpt-4o-mini` por defecto).

### Deploy en Vercel

En el proyecto → **Settings → Environment Variables**:

| Variable | Descripción |
|----------|-------------|
| `GROQ_API_KEY` | Recomendado (Groq) |
| `GROQ_MODEL` | Opcional (`llama-3.3-70b-versatile`) |
| `OPENAI_API_KEY` | Alternativa a Groq |

Redeploy después de agregar la variable.

### Que la IA te conozca mejor

Editá **`src/data/assistantProfile.js`** (idiomas, FAQs, límites, contexto de CreditON/Servo).  
Los textos del sitio siguen en **`src/data/site.js`** — el asistente los incluye automáticamente.

---

## Deploy

Build estático compatible con **Vercel**, Netlify, Cloudflare Pages, etc.

```bash
npm run build
```

Output: carpeta `dist/`. En Vercel, framework preset **Vite** y build command `npm run build`.

---

## Decisiones de diseño (breve)

- **Sin router** — una página con anchors; menos JS, scroll suave nativo + polyfill ligero
- **Sin librerías de animación** — control total del costo en móvil y del timing del cursor
- **Contenido data-driven** — fácil de mantener y de auditar (nada inventado en el repo)
- **Servo como producto** — screenshot real, mini case study, CTA a [servo.com.uy](https://servo.com.uy/)

---

## Links

- **Sitio:** [juanmadevv.vercel.app](https://juanmadevv.vercel.app)
- **GitHub:** [@juanmam04](https://github.com/juanmam04)
- **LinkedIn:** [juan-manuel-martínez-trinidad](https://www.linkedin.com/in/juan-manuel-mart%C3%ADnez-trinidad)
- **X:** [@jm_martiinez](https://x.com/jm_martiinez)
- **Servo:** [servo.com.uy](https://servo.com.uy/)
- **Email:** juanmartinezt.dev@gmail.com

---

## Licencia

Proyecto personal — © Juan Manuel Martínez.  
El código es de referencia para portfolio; pedí antes de reutilizarlo como plantilla comercial.
