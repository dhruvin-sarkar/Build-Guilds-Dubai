# Tech Stack — Build Guild Dubai Website

## Core Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + TypeScript | Component-based, easy scroll animations, typed props |
| Build Tool | Vite | Fast dev server, instant HMR, simple config |
| Styling | CSS Modules or plain CSS-in-JS (styled-components) | Scoped styles, easy theming via CSS variables |
| Animations | Framer Motion | Scroll-triggered animations, stagger effects, layout animations |
| Routing | None | Single page, anchor scroll only |
| Icons | None — inline SVG only | Custom hardware/circuit SVGs, no icon library |
| Font | JetBrains Mono via Google Fonts | Only font used throughout |
| Deployment | Netlify | Free static hosting, connects to GitHub, instant deploys |

## File Structure
```
build-guild-dubai/
├── public/
│   ├── favicon.ico
│   └── og-image.png           # Open Graph preview image
├── src/
│   ├── main.tsx               # Entry point
│   ├── App.tsx                # Root component, section assembly
│   ├── index.css              # CSS custom properties, reset, global styles, bg grid
│   ├── components/
│   │   ├── Nav.tsx            # Fixed navigation
│   │   ├── Hero.tsx           # Hero section + circuit SVG + countdown
│   │   ├── About.tsx          # What Is This section
│   │   ├── Schedule.tsx       # Timeline section
│   │   ├── Organizers.tsx     # Organizer cards
│   │   ├── FAQ.tsx            # Accordion FAQ
│   │   ├── CTA.tsx            # Final signup CTA
│   │   ├── Footer.tsx         # Footer
│   │   └── ui/
│   │       ├── CircuitSVG.tsx # Reusable animated circuit trace SVG
│   │       ├── Countdown.tsx  # Live countdown timer component
│   │       ├── SectionLabel.tsx # The [ SYS://LABEL ] header element
│   │       └── Card.tsx       # Base card with left-accent border
│   └── hooks/
│       ├── useCountdown.ts    # Countdown logic hook
│       └── useScrollReveal.ts # IntersectionObserver hook (backup if not using Framer)
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

No other dependencies. No UI libraries, no Tailwind, no Bootstrap, no icon packs.

## Google Fonts
In `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

## CSS Custom Properties
All in `src/index.css` `:root` block. See design.md for the full palette. All components reference CSS variables — no hardcoded hex values in component files.

## Key Component Notes

### `CircuitSVG.tsx`
- Accepts `paths` prop (array of SVG path `d` strings)
- Accepts `animate` prop (boolean — triggered by IntersectionObserver in parent)
- Uses CSS `stroke-dasharray` + `stroke-dashoffset` animation
- Exports a traveling dot component that follows a path using CSS `offset-path`

### `Countdown.tsx`
- Uses `useCountdown` hook
- Target: `new Date('2026-04-18T10:00:00+04:00')`
- Returns `{ days, hours, minutes, seconds }`
- Updates every 1000ms via `setInterval`
- Cleans up interval on unmount

### `FAQ.tsx`
- State: `openIndex: number | null`
- Click handler: toggle open/close, collapse others
- Animation: Framer Motion `AnimatePresence` for smooth height transition on answer reveal

### `Schedule.tsx`
- Timeline rail: a vertical `<div>` that uses Framer Motion `useScroll` + `scaleY` to draw downward as user scrolls through the section
- Each timeline item: `motion.div` with `whileInView` for stagger reveal
- Dot indicator: glows on item activation

## Animation Strategy
- **Page load**: Framer Motion `initial`/`animate` on Hero elements, staggered with `delayChildren`
- **Scroll reveal**: `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`
- **Stagger siblings**: wrap in `motion.div` with `variants` and `staggerChildren: 0.08`
- **Circuit paths**: CSS animation (`@keyframes` on `stroke-dashoffset`), triggered by adding a class when IntersectionObserver fires
- **Continuous loops**: CSS `@keyframes` for pulse, glow, traveling dots

## TypeScript Conventions
- Strict mode on
- All component props typed with interfaces
- No `any` types
- Schedule items, FAQ items, organizer data: typed arrays in `src/data/` (optional), or hardcoded in component with type annotations

## Deployment (Netlify)
1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Auto-deploys on push to `main`
6. No environment variables needed

## Performance Notes
- `display=swap` on Google Fonts to avoid FOIT
- Images: WebP format, lazy load below fold
- Framer Motion tree-shakes unused features
- No SSR needed — pure client-side React
- Circuit SVGs: keep path counts reasonable, avoid hundreds of animated elements

## Browser Support
Chrome, Firefox, Safari, Edge — last 2 versions. No IE.

## Meta Tags (in `index.html`)
```html
<title>Build Guild Dubai — Hack Club Blueprint</title>
<meta name="description" content="Dubai's 1-day hardware meetup. Part of Hack Club Blueprint's global Build Guilds week. April 18, 2026. Free to attend.">
<meta property="og:title" content="Build Guild Dubai">
<meta property="og:description" content="Circuits, components, and a whole lot of building. Join us April 18, 2026.">
<meta property="og:image" content="/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```
