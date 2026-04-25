# Project Guidelines

## Architecture

This is a Next.js 16 App Router project being converted from single-page to multi-page. See `CLAUDE.md` for full stack details and `docs/PLAN.md` for the implementation plan.

## Code Style

- Use TypeScript strict mode for all files
- Use `"use client"` directive only when components need interactivity (useState, useEffect, event handlers, Framer Motion, Swiper)
- Use `cn()` from `@/lib/utils` for conditional Tailwind class merging
- Use existing shadcn/ui components from `@/components/ui/` — do not create custom UI primitives
- Prefer Tailwind utility classes over custom CSS
- Keep components under 200 lines; extract sub-components when larger

## Colors

**CRITICAL:** The brand color is golden amber, NOT green.

- Primary: `#F5A623` — buttons, badges, active states, icons
- Hover: `#D4911E` — button hover, link hover
- Text accent: `#C4880A` — stat values, inline links
- Light bg: `#FFF8E7` — section gradient targets, card backgrounds

Never use `#a3d977`, `#8bc55f`, `#7cb342`, or `#e8f5dc` — these are the old incorrect green values.

## Animation Patterns

Use Framer Motion consistently:
- Scroll reveal: `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}`
- Slide from left: `initial={{ opacity: 0, x: -50 }}`
- Slide from right: `initial={{ opacity: 0, x: 50 }}`
- Stagger children: `delay: index * 0.1`
- Duration: 0.5–0.6s for sections, 0.2s for dropdowns

## Routing

All nav links must use Next.js page routes, not hash anchors:
- `/` — Home
- `/about` — About Us
- `/products` — Products
- `/factory` — Factory
- `/news` — News

Exception: product sub-navigation can use hash anchors within `/products` (e.g., `/products#rice`).

## Images

- Use Next.js `Image` component for all images
- All images live in `public/images/`
- Include descriptive `alt` text
- Use `fill` with `object-cover` for background/hero images
- Use explicit `width`/`height` for inline images

## Build & Test

Always verify with:
```bash
pnpm build
pnpm lint
```
