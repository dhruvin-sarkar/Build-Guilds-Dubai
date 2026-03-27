# PRD — Build Guild Dubai Website

## Overview
A landing page for Build Guild Dubai — a 1-day hardware meetup running **April 18, 2026, 10am–8pm**, organized as part of Hack Club Blueprint's global Build Guilds week (April 13–19). The site should be the most try-hard guild site out of any city. Hardware-themed, heavily animated, scroll-driven, and memorable.

## Goals
- Get people to sign up via `https://blueprint.hackclub.com/guilds/invite/dubai`
- Communicate what the event is, when, what they'll actually do, and why it's worth showing up
- Make Dubai's HC community look legitimate and exciting
- Feel like a hardware project itself — technical, alive, detailed

## Target Audience
- Dubai-based teenagers 13–18
- Both complete beginners (never touched a breadboard) AND people who've shipped Blueprint projects
- Hack Club members + curious non-members

## Core User Actions (priority order)
1. Sign up via `https://blueprint.hackclub.com/guilds/invite/dubai`
2. Understand what they'll actually be doing at the event (the schedule is the most important content section)
3. See who's organizing it
4. Get answers to FAQs

---

## Sections

### 1. Hero
- Headline: "Build Guild Dubai"
- Subline: punchy, Dubai-specific, not corporate. Something like:
  - "Dubai's hardware community. One day. Circuits, components, and a whole lot of building."
  - Or: "Never touched a circuit? Perfect. Got a Blueprint project? Bring it."
- Event details: April 18, 2026 · 10:00 AM – 8:00 PM · Dubai, UAE · Venue TBD
- Two CTAs: **"Sign Up"** (primary, links to signup URL) + **"What's the plan?"** (scrolls to schedule)
- Countdown timer to April 18, 2026 10:00 AM GST (UTC+4)
- Hero visual: animated hardware/circuit/electronic aesthetic — see design.md

### 2. About / What Is This
- Brief explanation of Build Guilds globally (100+ cities, same week, all run by local HC members)
- What makes Dubai's worth attending: beginner-welcome, hardware-first, free, organized by people who actually care
- Don't do generic info cards — make this feel designed. Big text, horizontal scroll, staggered reveal, anything visually interesting. Pull from the energy of the conversations: Dhruv and Aly are genuinely excited about this, that should come through in the copy.
- Note that attendees can be total beginners — no experience needed. Mention that Hack Club funds the event so it's completely free.

### 3. Schedule — What We're Doing
**This is the most important content section.** The actual plan for the day:

| Time | Activity |
|---|---|
| 10:00 AM | Doors Open — arrive, meet people, get settled |
| 10:30 AM | **Intro to Hardware** — crash course on what hardware even is, different pathways (PCB design, firmware, embedded, mechanical), what you can realistically build. Fast-paced, not a lecture. |
| 11:30 AM | **Components Crash Course + Hands-On Build Time** — quick walkthrough of the components on the table (what's a capacitor, what's resistance, what does a microcontroller do). Then a guided follow-along example project. Mentors walk around 1-on-1. Beginners get project ideas and support; experienced builders can go off-script. |
| 01:00 PM | Lunch |
| 02:00 PM | **Show & Tell** — anyone with prior hardware projects demos them to the group. Blueprint builds, HC projects, anything they've made. Great for beginners to see what's possible from people their age. |
| 03:00 PM | **PCB Workshop** — guided workshop through EasyEDA or KiCad. Two tracks: PCB hacker card OR PCB keychain. Component placement, traces, the basics. Everyone leaves having designed something real. |
| 06:00 PM | **Intro to Hack Club, Blueprint & Hackpad** — how do you keep going after today? What is Blueprint, what is Hackpad, how do you get funding for your own projects. Real next steps. |
| 07:00 PM | Open Build + Wind Down — unstructured time, keep building, exchange contacts |
| 08:00 PM | End |

Note: "Schedule subject to change — exact timings confirmed closer to the event."

Present this as a timeline with visual design — not a plain table. Each item should feel like an event card.

### 4. Organizers
- **Dhruv** — Lead Organizer (he shipped Hook, Line and Sinker for Ember game jam, passionate about hardware and HC)
- **Aly** — Organizer (organized Campfire Dubai, deep in the HC community, gap year HC applicant)
- Akshat is NOT an organizer — attending as a participant
- Slack links placeholder (`#`)
- Initials avatars until photos added

### 5. FAQ
Answers:

**What is Build Guild?**
A 1-day hardware meetup organized as part of Hack Club Blueprint's global Build Guilds week (April 13–19). Hack Club funds local organizers to run events in their cities. Free, open to any teen curious about hardware.

**Is it free?**
100% free. Hack Club funds us per attendee — you pay nothing to show up.

**Do I need hardware experience?**
Not at all. The whole day is structured so complete beginners can follow along and actually make something. If you've never touched a circuit board, this is the right place to start.

**Who can attend?**
Any teenager aged 13–18 in or near Dubai. You don't need to be a Hack Club member.

**What should I bring?**
A laptop if you have one (not required but helpful). Any hardware projects you want to show off during Show & Tell. Curiosity.

**Where is the venue?**
We're finalizing the venue — join `#build-guild-dubai` on Hack Club Slack for updates.

**Will there be food?**
Yes — lunch is included. We're covering food as part of the event budget.

**What is Hack Club Blueprint?**
A program by Hack Club (a nonprofit with 50,000+ teen makers) where teens design hardware projects and get funding from Hack Club to make them real. Blueprint is made in collaboration with AMD.

### 6. Final CTA + Footer
- Big final push: "Ready to show up?" → Sign Up button
- Slack channel link: `#build-guild-dubai`
- Footer: Hack Club | Blueprint | Slack | `#build-guild-dubai`
- "A Hack Club Blueprint event — Dubai, UAE — April 18, 2026"

---

## Key Data
```
Signup URL:      https://blueprint.hackclub.com/guilds/invite/dubai
Slack channel:   #build-guild-dubai
Event date:      April 18, 2026
Time:            10:00 AM – 8:00 PM
Timezone:        GST / UTC+4 (Dubai)
Location:        Dubai, UAE
Venue:           TBD
Organizers:      Dhruv (Lead), Aly
Age range:       13–18
Cost:            Free (Hack Club funded)
Blueprint site:  https://blueprint.hackclub.com
HC site:         https://hackclub.com
```

## Non-Goals
- No custom signup form — all signups go through Blueprint's link
- No authentication, no backend
- No map integration
- No multi-page routing
