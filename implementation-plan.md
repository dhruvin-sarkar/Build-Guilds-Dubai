# Implementation Plan — Build Guild Dubai Website

## Build Order
Phase by phase. Each phase complete and polished before moving on. Do not scaffold everything then style.

---

## Phase 0 — Project Bootstrap
- [ ] `npm create vite@latest build-guild-dubai -- --template react-ts`
- [ ] Install dependencies: `framer-motion`
- [ ] Delete Vite boilerplate (App.css, logo.svg, default content)
- [ ] Set up `index.html` with Google Fonts link (JetBrains Mono all weights), meta tags, OG tags, page title
- [ ] Set up `src/index.css`:
  - CSS reset (box-sizing, margin, padding)
  - `:root` with all CSS custom properties (full palette from design.md)
  - Global `body` styles: background color + grid pattern
  - Global `* { border-radius: 0 !important; }` — nuclear option to ensure no rounded corners slip through
  - Global `font-family: var(--font)` everywhere
  - Smooth scroll: `html { scroll-behavior: smooth; }`
- [ ] Set up `src/App.tsx` with placeholder section divs
- [ ] Set up folder structure: `components/`, `components/ui/`, `hooks/`, `data/`
- [ ] Verify dev server runs and background grid is visible

---

## Phase 1 — Data Layer
- [ ] Create `src/data/schedule.ts` — all 8 schedule items with time, title, description, optional highlight flag
- [ ] Create `src/data/organizers.ts` — Dhruv and Aly with initials, avatar color, placeholder slack
- [ ] Create `src/data/faq.ts` — all 8 FAQ items with question and answer
- [ ] Create `src/data/constants.ts` — signup URL, slack channel, target date, event details
- [ ] All data typed with TypeScript interfaces

---

## Phase 2 — UI Primitives
Build these small reusable components first, before any sections:

**`SectionLabel.tsx`**
- [ ] Renders `[ SYS://LABEL ] ─────────` style annotation
- [ ] Props: `label: string`
- [ ] Monospace, muted color, decorative line via CSS (border or pseudo-element)

**`Card.tsx`**
- [ ] Base card with dark background, sharp border, left accent line
- [ ] Props: `children`, optional `highlight?: boolean`
- [ ] Hover state: border glow, subtle bg shift

**`CircuitSVG.tsx`**
- [ ] Build the hero circuit SVG — draw actual PCB-style paths (L-shaped traces, T-junctions, component pads, resistor/capacitor symbols)
- [ ] `stroke-dasharray` + `stroke-dashoffset` on all path elements
- [ ] IntersectionObserver triggers `.drawing` class on mount/enter
- [ ] CSS `@keyframes` animate each path's dashoffset to 0, staggered via animation-delay
- [ ] Traveling dot: small circle using CSS `offset-path` and `offset-distance` keyframe
- [ ] Test animation in isolation before wiring to Hero

**`Countdown.tsx`**
- [ ] `useCountdown` hook: calculates remaining days/hours/mins/secs to `2026-04-18T10:00:00+04:00`, setInterval every 1000ms, cleanup on unmount
- [ ] UI: 4 bordered boxes, monospace numbers heavy weight, unit labels below
- [ ] SEC box has ambient glow pulse animation
- [ ] Separators between units: `//`

---

## Phase 3 — Navigation
- [ ] Fixed nav, `position: fixed`, `z-index: 100`
- [ ] Left: Blueprint logo (hotlink from Delhi site) or fallback text "Blueprint × Dubai"
- [ ] Right: links + Sign Up button
- [ ] `useEffect` scroll listener → `scrolled` state → add class for backdrop-blur + border-bottom
- [ ] Smooth scroll handler on all anchor links (prevent default, scrollIntoView)
- [ ] Mobile: hamburger button toggles `mobileOpen`, slide-in drawer from right or top
- [ ] Zero rounded corners, all sharp
- [ ] Test sticky scroll behavior

---

## Phase 4 — Hero Section
- [ ] Two-column CSS Grid (text left, circuit right), collapses to single column on mobile
- [ ] Text content:
  - Small label: `[ SYS://BUILD_GUILD_DUBAI ]`
  - H1: "BUILD GUILD DUBAI" — large, heavy, tracked
  - Subline: the punchy Dubai line
  - Info row: date badge + location badge (sharp, bordered)
  - CTA buttons: Sign Up (primary) + What's the Plan? (secondary)
- [ ] Framer Motion stagger on text children: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, `delayChildren: 0.2`, `staggerChildren: 0.1`
- [ ] `<CircuitSVG />` in right column — set to animate on mount
- [ ] `<Countdown />` full-width below the two columns
- [ ] Subtle radial gradient overlay centered on hero for depth
- [ ] Test on mobile (circuit SVG below text, countdown readable)

---

## Phase 5 — About Section
- [ ] `id="about"`, `<SectionLabel label="OVERVIEW" />`
- [ ] Layout: NOT info cards. Go for something visually ambitious. Suggestions:
  - Option A: Large bold stat on left (`100+ cities`) with details right, stacked in rows
  - Option B: Terminal-style readout — animated text that types out the key facts
  - Option C: Three large horizontal strips that reveal on scroll, each with a key fact
- [ ] Pick the option that feels most unique and execute it fully
- [ ] Framer Motion `whileInView` on all elements
- [ ] Content: what Build Guilds are, what makes Dubai's worth attending, free, beginner welcome, HC funded

---

## Phase 6 — Schedule Section
- [ ] `id="schedule"`, `<SectionLabel label="SCHEDULE" />`
- [ ] Vertical timeline layout
- [ ] Timeline rail: vertical `<div>` with cyan left-border, Framer Motion `useScroll` + `scaleY` from 0→1 as section scrolls through, `transformOrigin: 'top'`
- [ ] Each `ScheduleItem`:
  - Dot on left rail (glows on item enter viewport via `whileInView`)
  - Time label: small monospace, muted
  - Card: title in heavy mono, description in light mono
  - Highlighted items (PCB Workshop, Show & Tell) get cyan left border instead of blue
- [ ] Framer Motion `staggerChildren` on item list
- [ ] "Schedule subject to change" note at bottom in muted small text
- [ ] Test scroll animation — rail should draw as you scroll through section
- [ ] Mobile: full width, comfortable spacing

---

## Phase 7 — Organizers Section
- [ ] `id="organizers"`, `<SectionLabel label="TEAM" />`
- [ ] 2-column grid (2 cards: Dhruv + Aly)
- [ ] Each organizer card:
  - Sharp square avatar div with initials + colored background (no border-radius)
  - Name: heavy JetBrains, large
  - Role: muted JetBrains, smaller
  - Slack link styled as: `> /slack @handle` — monospace terminal aesthetic
- [ ] Framer Motion stagger on both cards
- [ ] Brief bios optional (pull from context: Dhruv made Hook Line and Sinker, organized Ember game jam; Aly organized Campfire Dubai)

---

## Phase 8 — FAQ Section
- [ ] `id="faq"`, `<SectionLabel label="FAQ" />`
- [ ] Map over `faqItems` array
- [ ] Each item: bordered row, question text + `[+]`/`[-]` right-aligned indicator
- [ ] Click: toggle `openIndex`, collapse sibling
- [ ] Answer reveal: Framer Motion `AnimatePresence` + `motion.div` with `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: 'auto', opacity: 1 }}`
- [ ] Open state: left border switches to cyan, faint cyan background
- [ ] Framer Motion `whileInView` on the whole FAQ block

---

## Phase 9 — CTA + Footer
- [ ] CTA section (`id="rsvp"`):
  - Big headline: "READY TO SHOW UP?"
  - Subline: "April 18, 2026 · Dubai, UAE · Free"
  - Primary button: "SIGN UP — IT'S FREE" → `https://blueprint.hackclub.com/guilds/invite/dubai`, `target="_blank"`
  - Secondary link: `> /slack #build-guild-dubai`
  - Subtle circuit decoration in background
- [ ] Footer:
  - Top border: 1px solid `--border`
  - Left: "Build Guild Dubai // A Hack Club Blueprint Event"
  - Center: quick nav links
  - Right: Hack Club, Blueprint, Slack links
  - Bottom: "April 18, 2026 · Dubai, UAE"
  - All monospace, small, muted

---

## Phase 10 — Polish + QA

**Animation Audit**
- [ ] Hero circuit draws on load ✓
- [ ] Hero text staggers in ✓
- [ ] Countdown ticking ✓
- [ ] About section reveals on scroll ✓
- [ ] Timeline rail draws as you scroll ✓
- [ ] Timeline items stagger in ✓
- [ ] Organizer cards stagger in ✓
- [ ] FAQ block reveals on scroll ✓

**Design Audit**
- [ ] Zero rounded corners anywhere — inspect every element
- [ ] Only JetBrains Mono used — no system fonts
- [ ] All colors from CSS variables — no hardcoded hex in JSX
- [ ] All hover states have transitions
- [ ] Countdown is styled (not plain numbers)
- [ ] Circuit animation looks good and doesn't feel janky

**Content Audit**
- [ ] Signup link is correct: `https://blueprint.hackclub.com/guilds/invite/dubai`
- [ ] All 8 schedule items present with correct times
- [ ] Dhruv = Lead Organizer, Aly = Organizer (Akshat NOT listed as organizer)
- [ ] All FAQ questions and answers correct (see PRD.md)
- [ ] Venue shown as TBD everywhere
- [ ] Date: April 18, 2026 everywhere

**Responsive QA**
- [ ] 1440px — large desktop
- [ ] 1024px — small desktop
- [ ] 768px — tablet breakpoint
- [ ] 480px — mobile
- [ ] 375px — iPhone SE
- [ ] No horizontal overflow anywhere
- [ ] Countdown readable at all sizes
- [ ] Timeline readable on mobile
- [ ] Nav hamburger works

**Technical QA**
- [ ] No console errors
- [ ] All external links open in `_blank` with `rel="noopener noreferrer"`
- [ ] Meta tags present in `index.html`
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] Built output in `dist/` loads correctly

---

## Phase 11 — Deploy
- [ ] Push to GitHub
- [ ] Connect to Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Verify live URL
- [ ] Test on real mobile device
