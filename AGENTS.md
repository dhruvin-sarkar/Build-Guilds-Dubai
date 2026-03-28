# AGENTS.md — Build Guild Dubai Website

## What You Are Building
A single-page React + TypeScript website for **Build Guild Dubai** — a real 1-day hardware meetup on April 18, 2026, organized by Dhruv and Aly as part of Hack Club Blueprint's global Build Guilds week. This site needs to be the most polished guild site of any city — heavily animated, hardware-themed, and memorable.

## Read These First (in this order)
1. `PRD.md` — what to build, all sections, all content, the event schedule
2. `design.md` — exact colors, fonts, aesthetic direction, animation system
3. `tech-stack.md` — React + TypeScript + Framer Motion, file structure, dependencies
4. `architecture.md` — component breakdown, data types, layout diagram
5. `implementation-plan.md` — build order, phase by phase checklist
before continuing https://github.com/dhruvin-sarkar/Build-Guilds-Dubai

this is my repo mak sure to commit every 400 lines
---

## Hard Rules — Never Break These

### Design
- **ZERO rounded corners. Anywhere. Ever.** This is a Blueprint design system rule and a hard requirement. `border-radius: 0` globally. Add `* { border-radius: 0 !important; }` to global CSS as a safety net. If any element has rounded corners, redo it.
- **JetBrains Mono only.** Every single text element on the page uses this font. No fallback to system fonts in practice — load all weights from Google Fonts.
- **Dark theme only.** `--bg-primary: #08080f`. No light sections.
- **Use CSS custom properties from design.md.** No hardcoded hex values in JSX/TSX files.
- The site should feel like a **live PCB** — circuit animations, signal pulses, technical aesthetic. Not a generic event landing page.

### Technical
- **React 18 + TypeScript + Vite.** No other framework.
- **Framer Motion** for scroll animations and transitions.
- **No UI libraries.** No Tailwind, no MUI, no shadcn, no Bootstrap. Write all styles from scratch.
- **No other npm dependencies** beyond what's in tech-stack.md.
- All components typed. No `any`.
- Single page — all nav is anchor-based smooth scroll.

### Content
- **Signup URL:** `https://blueprint.hackclub.com/guilds/invite/dubai` — never change this
- **Date:** April 18, 2026 — not a range, not TBD, this is confirmed
- **Time:** 10:00 AM – 8:00 PM GST (UTC+4)
- **Organizers:** Dhruv (Lead Organizer) and Aly (Organizer) — only these two. Akshat is NOT an organizer.
- **Venue:** TBD everywhere — do not make one up
- **Age range:** 13–18
- **Cost:** Free

---

## Event Context (read this — it'll help you write better copy)
This event was organized by two Dubai HC members who genuinely care about it. Dhruv ran a game jam (Ember) pulling an all-nighter to debug a Unity WebGL export, shipped a fishing game called Hook, Line and Sinker, and has been deep in hardware research for weeks. Aly organized Campfire Dubai and is applying to Hack Club's gap year program. They chose April 18th specifically because it's a weekend. The event plan came from days of back-and-forth about what would actually work for Dubai's HC community — a mix of beginners and people who've shipped projects. The energy is passionate and genuine. Copy should reflect that — not corporate, not generic.

---

## Full Schedule Data
```ts
const scheduleItems = [
  {
    time: '10:00 AM',
    title: 'Doors Open',
    description: 'Arrive, meet people, get settled. First looks at the components and setup.',
  },
  {
    time: '10:30 AM',
    title: 'Intro to Hardware',
    description: 'Crash course on what hardware actually is. Different pathways — PCB design, firmware, embedded systems, mechanical. What you can realistically build as a beginner. Fast-paced, not a lecture.',
    highlight: false,
  },
  {
    time: '11:30 AM',
    title: 'Components Crash Course + Hands-On Build Time',
    description: 'Quick walkthrough of the components on the table — capacitors, resistors, microcontrollers, what they actually do. Then a guided follow-along example project. Mentors walk around 1-on-1. Experienced builders go off-script.',
    highlight: true,
  },
  {
    time: '01:00 PM',
    title: 'Lunch',
    description: 'Included. Take a break, keep talking.',
  },
  {
    time: '02:00 PM',
    title: 'Show & Tell',
    description: "Anyone with prior hardware projects demos them to the group. Blueprint builds, HC projects, anything they've made. See what people your age are actually shipping.",
    highlight: true,
  },
  {
    time: '03:00 PM',
    title: 'PCB Workshop',
    description: 'Guided workshop through EasyEDA or KiCad. Two tracks: PCB hacker card or PCB keychain. Component placement, traces, the basics. Everyone leaves having designed something real.',
    highlight: true,
  },
  {
    time: '06:00 PM',
    title: 'Intro to Hack Club, Blueprint & Hackpad',
    description: 'How do you keep going after today? What is Blueprint, what is Hackpad, how do you get funding for your own projects. Real next steps, not just vibes.',
  },
  {
    time: '07:00 PM',
    title: 'Open Build + Wind Down',
    description: 'Unstructured time. Keep building, keep talking, exchange contacts.',
  },
  {
    time: '08:00 PM',
    title: 'End',
    description: "That's a wrap. See you at the next one.",
  },
]
```

## Organizer Data
```ts
const organizers = [
  {
    name: 'Dhruv',
    role: 'Lead Organizer',
    initials: 'D',
    avatarColor: '#1e3a8a',
    slackHandle: '#',
    bio: 'Game dev, hardware enthusiast, pulled an all-nighter debugging Unity WebGL for Ember game jam.',
  },
  {
    name: 'Aly',
    role: 'Organizer',
    initials: 'A',
    avatarColor: '#064e3b',
    slackHandle: '#',
    bio: 'Organized Campfire Dubai. Deep in the HC community. Designed the campfire merch.',
  },
]
```

## FAQ Data
```ts
const faqItems = [
  {
    question: 'What is Build Guild?',
    answer: 'A 1-day hardware meetup organized as part of Hack Club Blueprint\'s global Build Guilds week (April 13–19). Hack Club funds local organizers to run events in their cities. Free, open to any teen who\'s curious about hardware.',
  },
  {
    question: 'Is it free?',
    answer: '100% free. Hack Club funds us per attendee — you pay nothing to show up.',
  },
  {
    question: 'Do I need hardware experience?',
    answer: 'Not at all. The whole day is structured so complete beginners can follow along and actually make something. If you\'ve never touched a circuit board, this is the right place to start.',
  },
  {
    question: 'Who can attend?',
    answer: 'Any teenager aged 13–18 in or near Dubai. You don\'t need to be a Hack Club member.',
  },
  {
    question: 'What should I bring?',
    answer: 'A laptop if you have one (not required but helpful). Any hardware projects you want to show off during Show & Tell. Curiosity.',
  },
  {
    question: 'Where is the venue?',
    answer: 'We\'re finalizing the venue — join #build-guild-dubai on Hack Club Slack for updates.',
  },
  {
    question: 'Will there be food?',
    answer: 'Yes. Lunch is included as part of the event.',
  },
  {
    question: 'What is Hack Club Blueprint?',
    answer: 'A program by Hack Club — a nonprofit with 50,000+ teen makers — where teens design hardware projects and get funding from Hack Club to make them real. Blueprint is made in collaboration with AMD.',
  },
]
```

## Key Links & Constants
```ts
const SIGNUP_URL = 'https://blueprint.hackclub.com/guilds/invite/dubai'
const SLACK_CHANNEL = '#build-guild-dubai'
const EVENT_DATE = '2026-04-18T10:00:00+04:00'  // GST
const EVENT_DATE_DISPLAY = 'April 18, 2026'
const EVENT_TIME = '10:00 AM – 8:00 PM'
const EVENT_LOCATION = 'Dubai, UAE'
const EVENT_VENUE = 'TBD'
const BLUEPRINT_URL = 'https://blueprint.hackclub.com'
const HC_URL = 'https://hackclub.com'
const BLUEPRINT_LOGO = 'https://buildguilddelhi.netlify.app/homepage_logo-3585630b.webp'
```

## The Circuit Animation — Implementation Notes
This is the most important visual. Get it right.

1. Build an SVG with multiple `<path>` elements representing PCB traces. Use `M`, `L`, `H`, `V` commands to create 90° trace routing (no curves — PCBs use right angles). Example paths:
   ```svg
   <path d="M 50 100 H 150 V 200 H 300 V 150" stroke="#22d3ee" fill="none" stroke-width="1.5"/>
   ```

2. Calculate each path's length with `path.getTotalLength()` in a `useEffect`. Set `strokeDasharray` and `strokeDashoffset` to that length.

3. On animate trigger, transition `strokeDashoffset` to `0` using CSS animation or Framer Motion animate. Stagger paths with increasing delays.

4. Add component symbols at path endpoints:
   - Resistor: zigzag line segment
   - Capacitor: two parallel lines with gap
   - IC chip: rectangle with lines coming off sides
   - Component pad: small filled circle/square

5. Traveling dot: small circle element that uses `offset-path: path('...')` with `offset-distance` animating from 0% to 100% in a loop after the path is drawn.

6. Keep the SVG viewBox large enough to fill the hero right column, responsive via `width="100%" height="100%"`.

## Build Order
Follow `implementation-plan.md` — Phase 0 through Phase 11, in order. Do not skip phases. Do not move to a new phase until the current one is complete and looks correct.

## Definition of Done
- `npm run build` succeeds, zero TypeScript errors
- All sections present and populated with real content
- Circuit animation draws on hero load
- Countdown ticking in real time
- Timeline rail draws on scroll
- All scroll reveals working
- Zero rounded corners anywhere
- JetBrains Mono throughout
- Signup link correct
- Responsive on mobile
- Deployable to Netlify with `npm run build` + `dist` directory
