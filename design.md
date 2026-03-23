# Design — Build Guild Dubai Website

## Design Philosophy
**A live PCB.** The site should feel like you're looking at a functioning circuit board — traces lighting up as you scroll, components activating, signals traveling through paths. Dark, technical, alive. Not a brochure. Not a generic event site. Something that makes you stop and actually look.

Blueprint hard rule (from HQ): **NO rounded corners. Anywhere. Ever.** Sharp edges only.

## Aesthetic Direction
- **Tone**: Dark electronics lab. Precision engineering meets hacker energy. Technical but not sterile — there's warmth in the amber accents and personality in the copy.
- **Vibe**: Like the inside of a high-end synthesizer mixed with a schematic printout. Monospace everything. Grid lines. Signal pulses. Component labels.
- **Unforgettable element**: The hero has animated circuit traces that pulse with electricity — glowing paths that travel across the screen like signals on a PCB. As you scroll, new "circuits" activate in each section.

## Color Palette
```css
--bg-primary: #08080f;           /* Near-black, slight blue */
--bg-secondary: #0c0c18;         /* Section alt background */
--bg-card: #0f0f1e;              /* Card surface */
--bg-card-hover: #13132a;        /* Card hover state */

--accent-blue: #3b82f6;          /* Blueprint blue — primary CTA, active traces */
--accent-cyan: #22d3ee;          /* Cyan — signal pulses, secondary highlights */
--accent-amber: #f59e0b;         /* Amber — Dubai warmth, used sparingly for heat/energy */
--accent-green: #22c55e;         /* Green — "online" indicators, success states */

--text-primary: #e8eeff;         /* Off-white with slight blue */
--text-secondary: #7986a8;       /* Muted */
--text-muted: #3d4a66;           /* Very muted, labels */

--border: #1a2035;               /* Default border */
--border-glow: rgba(59,130,246,0.3); /* Glowing border */
--trace: rgba(34,211,238,0.15);  /* PCB trace color */
--trace-active: rgba(34,211,238,0.8); /* Lit trace */

--grid: rgba(59,130,246,0.04);   /* Background grid lines */
```

## Typography
**One font only: JetBrains Mono** — every weight, every size, everything. This is a hardware event site. It should feel like it was written in a code editor.

```css
--font: 'JetBrains Mono', monospace;
```

Load from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Usage:
- Hero headline: 800 weight, large, tracked wide
- Section headings: 700 weight
- Body/descriptions: 400 weight, line-height 1.7
- Labels/tags: 500 weight, uppercase, wide letter-spacing
- Muted annotations: 300 weight, smaller

## Layout Rules
- **NO rounded corners** — `border-radius: 0` everywhere, always, no exceptions
- Background: dark `--bg-primary` with faint CSS grid pattern (horizontal + vertical lines, like graph paper or a PCB substrate)
- Content max-width: 1200px, centered
- Sections: generous padding (100px top/bottom desktop, 60px mobile)
- Asymmetric layouts preferred over centered grids — break the axis
- Cards: sharp borders, left accent line in blue/cyan, no background color difference on default (only on hover)

## Background Treatment
```css
body {
  background-color: var(--bg-primary);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 40px 40px;
}
```
Add a subtle radial gradient overlay on hero to create depth and focal point.

## The Circuit Animation System
This is the signature visual. Every section has PCB trace elements — SVG paths styled like copper traces on a circuit board.

**Technique:**
- SVG `<path>` elements with `stroke-dasharray` + `stroke-dashoffset`
- On scroll (IntersectionObserver), animate `stroke-dashoffset` to 0 → the path "draws" itself
- Use `stroke` color of `--accent-cyan` at low opacity for idle, high opacity when animating
- Add a glowing dot that travels along the path after it's drawn (keyframe animation on a `<circle>` with `offset-path`)
- Traces should look like actual PCB routing: 90° corners, L-shapes, T-junctions, component pads at endpoints

**Hero circuit:**
- Large SVG behind/around the hero text
- Multiple paths that stagger-animate on page load
- Some paths pulse continuously after drawing (opacity oscillation)
- Component symbols at nodes: resistor zigzag, capacitor lines, IC chip rectangle

**Section transitions:**
- Thin horizontal trace runs between sections, pulses when section enters viewport
- Small animated dot travels from section to section as you scroll

## Component Styles

### Buttons
```css
.btn-primary {
  background: var(--accent-blue);
  color: white;
  border: none;
  padding: 14px 36px;
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 0;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.2s, background 0.2s;
}
.btn-primary:hover {
  background: #2563eb;
  box-shadow: 0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.2);
}

.btn-secondary {
  background: transparent;
  color: var(--accent-cyan);
  border: 1px solid var(--accent-cyan);
  /* same font/size/padding/radius as primary */
}
.btn-secondary:hover {
  background: rgba(34,211,238,0.08);
  box-shadow: 0 0 20px rgba(34,211,238,0.3);
}
```

### Cards
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent-blue);
  border-radius: 0;
  padding: 28px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.card:hover {
  background: var(--bg-card-hover);
  border-left-color: var(--accent-cyan);
  box-shadow: 0 0 30px rgba(34,211,238,0.08), inset 0 0 30px rgba(34,211,238,0.02);
}
```

### Section Labels
Each section starts with a component-label style tag:
```
[ SYS://SCHEDULE ] ────────────────────
```
Style: small monospace, muted color, uppercase, with a decorative line extending to the right. Like a schematic annotation.

### Countdown Timer
```
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  14   │ │  06   │ │  23   │ │  47   │
│  DAYS │ │  HRS  │ │  MIN  │ │  SEC  │
└────────┘ └────────┘ └────────┘ └────────┘
```
- Large JetBrains Mono numbers, heavy weight
- Bordered boxes with glow on the seconds unit
- Colons or `//` separators between units
- SEC unit pulses slightly — makes it feel live

### Timeline (Schedule section)
Vertical timeline with a glowing left rail:
```
│ ← glowing cyan vertical line (like a trace)
●  10:00 AM — time label
│  ┌──────────────────────────────────────┐
│  │ DOORS OPEN                          │
│  │ Arrive, meet people, get settled.   │
│  └──────────────────────────────────────┘
│
●  10:30 AM
│  ┌──────────────────────────────────────┐
│  │ INTRO TO HARDWARE                   │
│  └──────────────────────────────────────┘
```
The dots (●) are "component pads" — circles that glow when their card enters the viewport. The vertical line draws itself downward as you scroll.

### Organizer Cards
- Sharp square avatar with colored background + initials
- Name in heavy JetBrains, role in muted JetBrains
- Bottom: Slack link styled as a terminal command `> /slack @dhruv`
- Subtle scanline overlay on avatar area

### FAQ
- Each row: bordered, full-width, sharp
- Indicator: `[+]` / `[-]` in monospace, right-aligned
- Expand: smooth CSS `max-height` transition
- Open state: left border changes to cyan, faint cyan background

### Navigation
- Fixed top, `backdrop-filter: blur(12px)` + dark semi-transparent background
- Left: Blueprint logo text or image
- Right: nav links in uppercase monospace
- A thin animated line runs under the active section link
- Zero rounded corners

## Animations

### On Load (Hero)
1. Page fades in from black (200ms)
2. Circuit SVG paths draw in, staggered over 1.5s
3. Glowing dots travel along completed paths
4. Hero text fades up with slight Y offset (staggered per line)
5. Countdown starts ticking

### On Scroll (IntersectionObserver)
- Elements enter with `opacity: 0 → 1` + `translateY(24px) → translateY(0)`, 400ms ease-out
- Timeline cards activate one by one as you scroll
- Timeline rail draws downward continuously
- Circuit trace elements in each section animate when section enters viewport
- Sibling cards stagger: 80ms delay between each

### Continuous Ambient Animations
- Glowing dots pulse along hero circuit paths (infinite loop)
- SEC unit in countdown pulses with glow
- Active nav link has subtle glow
- Cursor: custom crosshair cursor (optional — CSS `cursor: crosshair`)

## Mobile
- Breakpoints: 768px tablet, 480px mobile
- Hero: stack vertically, circuit SVG scales down or simplifies
- Timeline: stays vertical, just narrower
- Nav: hamburger, same dark/sharp aesthetic
- Countdown: all 4 units in a 2x2 grid if needed
- Cards: single column

## What NOT To Do
- No gradients going purple-to-pink or purple-to-blue (too generic AI)
- No frosted glass cards with white backgrounds
- No friendly rounded pill buttons
- No pastel colors anywhere
- No stock illustrations or placeholder art
- No font other than JetBrains Mono
- No rounded corners. Not on images. Not on avatars. Not on buttons. Nowhere.
