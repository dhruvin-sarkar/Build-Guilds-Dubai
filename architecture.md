# Architecture — Build Guild Dubai Website

## Page Structure
Single-page React app. One scroll journey, anchor-based navigation. `App.tsx` assembles all sections in order.

```tsx
// App.tsx
<>
  <Nav />
  <main>
    <Hero />
    <About />
    <Schedule />
    <Organizers />
    <FAQ />
    <CTA />
  </main>
  <Footer />
</>
```

## Full Layout Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  NAV (fixed, backdrop-blur, no rounded corners)             │
│  [Blueprint Logo]   ABOUT  SCHEDULE  ORGANIZERS  FAQ  [SIGN UP] │
├─────────────────────────────────────────────────────────────┤
│  HERO  (#hero)                                              │
│                                                             │
│  ┌────────────────────┐  ┌──────────────────────────────┐   │
│  │ [ SYS://DUBAI ]    │  │  CIRCUIT SVG ANIMATION       │   │
│  │                    │  │  (animated PCB traces,       │   │
│  │ BUILD              │  │   component symbols,         │   │
│  │ GUILD              │  │   traveling signal dots)     │   │
│  │ DUBAI              │  │                              │   │
│  │                    │  │  ┌──┐    ┌──┐               │   │
│  │ "Dubai's hardware  │  │ ─┤  ├────┤  ├─ ··· →       │   │
│  │  community. One    │  │  └──┘    └──┘               │   │
│  │  day."             │  │                              │   │
│  │                    │  └──────────────────────────────┘   │
│  │ Apr 18 · 10AM-8PM │                                     │
│  │ Dubai, UAE         │                                     │
│  │                    │                                     │
│  │ [SIGN UP] [PLAN →] │                                     │
│  └────────────────────┘                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  COUNTDOWN: 14 DAYS // 06 HRS // 23 MIN // 47 SEC   │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ABOUT  (#about)                                            │
│  [ SYS://OVERVIEW ] ─────────────────────────────           │
│                                                             │
│  Large text or asymmetric layout explaining what            │
│  Build Guilds are. Not info cards. Could be:                │
│  - Big bold statement left, details right                   │
│  - Three horizontal bands of text that reveal on scroll     │
│  - A terminal-style readout of info                         │
│                                                             │
│  "100+ cities. 1 week. Dubai's showing up."                 │
│  Details about what makes this event worth attending.       │
│  Completely free. Beginner welcome. Hack Club funded.       │
├─────────────────────────────────────────────────────────────┤
│  SCHEDULE  (#schedule)                                      │
│  [ SYS://SCHEDULE ] ─────────────────────────────           │
│                                                             │
│  │← glowing cyan vertical trace rail, draws on scroll      │
│  ●  10:00 AM                                                │
│  │  ┌──────────────────────────────────────────────┐        │
│  │  │ DOORS OPEN                                   │        │
│  │  │ Arrive, meet people, get settled.            │        │
│  │  └──────────────────────────────────────────────┘        │
│  │                                                          │
│  ●  10:30 AM                                                │
│  │  ┌──────────────────────────────────────────────┐        │
│  │  │ INTRO TO HARDWARE                            │        │
│  │  │ Crash course on what hardware is...          │        │
│  │  └──────────────────────────────────────────────┘        │
│  │  [continues for all 8 schedule items]                    │
│  ●  08:00 PM                                                │
│     ┌──────────────────────────────────────────────┐        │
│     │ END                                          │        │
│     └──────────────────────────────────────────────┘        │
│                                                             │
│  "Schedule subject to change."                              │
├─────────────────────────────────────────────────────────────┤
│  ORGANIZERS  (#organizers)                                  │
│  [ SYS://TEAM ] ─────────────────────────────               │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  ┌────┐              │  │  ┌────┐              │         │
│  │  │ D  │              │  │  │ A  │              │         │
│  │  └────┘              │  │  └────┘              │         │
│  │  DHRUV               │  │  ALY                 │         │
│  │  Lead Organizer      │  │  Organizer           │         │
│  │  > /slack @dhruv     │  │  > /slack @aly       │         │
│  └──────────────────────┘  └──────────────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  FAQ  (#faq)                                                │
│  [ SYS://FAQ ] ──────────────────────────────               │
│                                                             │
│  ┌─────────────────────────────────────────── [+] ┐         │
│  │ What is Build Guild?                            │         │
│  └──────────────────────────────────────────────── ┘         │
│  ┌─────────────────────────────────────────── [+] ┐         │
│  │ Is it free?                                     │         │
│  └──────────────────────────────────────────────── ┘         │
│  [... 6 more items]                                         │
├─────────────────────────────────────────────────────────────┤
│  CTA  (#rsvp)                                               │
│                                                             │
│  READY TO SHOW UP?                                          │
│  [SIGN UP — IT'S FREE]                                      │
│  > /slack #build-guild-dubai                                │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  Build Guild Dubai — Hack Club Blueprint — April 18, 2026   │
│  [Hack Club] [Blueprint] [Slack] [#build-guild-dubai]       │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### `Nav.tsx`
```tsx
interface NavProps {} // no props
// State: scrolled (boolean), mobileOpen (boolean)
// Links: About, Schedule, Organizers, FAQ + Sign Up CTA button
// useEffect: window.addEventListener('scroll', ...) → set scrolled at 60px
// Classes: nav, nav--scrolled
```

### `Hero.tsx`
```tsx
// Left column: text content (headline, subline, date/location badges, CTAs)
// Right column: <CircuitSVG /> — the hero circuit animation
// Below: <Countdown targetDate="2026-04-18T10:00:00+04:00" />
// Framer Motion: staggered children on mount for text reveal
```

### `CircuitSVG.tsx`
```tsx
interface CircuitSVGProps {
  animate: boolean;       // triggers path drawing
  width?: number;
  height?: number;
}
// Contains multiple <path> elements with stroke-dasharray/dashoffset
// Contains <circle> elements at path endpoints (component pads)
// Contains component symbol groups (resistor, capacitor, IC outlines)
// CSS animations triggered by .animate class or prop change
```

### `Countdown.tsx`
```tsx
interface CountdownProps {
  targetDate: string; // ISO string with timezone
}
// Returns 4 units: days, hours, minutes, seconds
// UI: 4 bordered boxes, monospace numbers, SEC pulses with glow
// useCountdown hook handles the interval logic
```

### `Schedule.tsx`
```tsx
interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean; // for key sessions like PCB Workshop
}
// Timeline rail: vertical div, scaleY via Framer Motion useScroll
// Items: staggered whileInView reveals
// Dot: glows on item enter viewport
```

### `Organizers.tsx`
```tsx
interface Organizer {
  name: string;
  role: string;
  initials: string;
  avatarColor: string;  // CSS color for avatar background
  slackHandle: string;  // '#' placeholder for now
}
// 2-column grid, sharp avatar squares, slack link styled as terminal
```

### `FAQ.tsx`
```tsx
interface FAQItem {
  question: string;
  answer: string;
}
// State: openIndex (number | null)
// AnimatePresence + motion.div for answer height animation
// [+] / [-] indicator
```

## Data (hardcoded in components or in src/data/)
```ts
// schedule.ts
export const scheduleItems: ScheduleItem[] = [
  { time: '10:00 AM', title: 'Doors Open', description: '...' },
  { time: '10:30 AM', title: 'Intro to Hardware', description: '...' },
  // ... etc
]

// organizers.ts
export const organizers: Organizer[] = [
  { name: 'Dhruv', role: 'Lead Organizer', initials: 'D', avatarColor: '#1e40af', slackHandle: '#' },
  { name: 'Aly', role: 'Organizer', initials: 'A', avatarColor: '#065f46', slackHandle: '#' },
]

// faq.ts
export const faqItems: FAQItem[] = [ ... ]
```

## Scroll Animation Architecture

### Framer Motion (primary)
- `whileInView` on all section content
- `viewport={{ once: true, margin: "-100px" }}` — triggers slightly before element is fully in view
- `variants` with `staggerChildren` on container, `fadeUp` on children:
```ts
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}
```

### CSS Animations (for circuit paths)
- IntersectionObserver in `CircuitSVG.tsx` adds `.drawing` class to SVG
- CSS `@keyframes drawPath` animates `stroke-dashoffset` from full length to 0
- Stagger via `animation-delay` on each path

### Timeline Rail
- Framer Motion `useScroll` + `useTransform` on the section ref
- `scaleY` transforms from 0→1 as section scrolls through viewport
- `transformOrigin: 'top'`

## Routing
None. All navigation via `element.scrollIntoView({ behavior: 'smooth' })`. Nav links use `href="#section-id"` with a click handler that prevents default and calls smooth scroll.

## State Summary
- `Nav`: `scrolled` (bool), `mobileOpen` (bool)
- `Countdown`: `{ days, hours, minutes, seconds }` updated every 1s
- `FAQ`: `openIndex` (number | null)
- `CircuitSVG`: `isAnimating` (bool, from IntersectionObserver)
- No global state manager needed
