---
description: "Use when editing Tailwind CSS, global styles, CSS custom properties, or color tokens. Covers the OKLch color system, Tailwind v4 theme, and design token conventions."
applyTo: ["app/globals.css", "styles/globals.css"]
---
# Styling Standards

## Color System

This project uses OKLch color space in CSS custom properties. The Tailwind v4 `@theme inline` block maps these to Tailwind utility classes.

### Golden Amber Palette (correct)

| Token | OKLch Value | Hex Approx | Usage |
|-------|-------------|------------|-------|
| `--primary` | `oklch(0.75 0.16 75)` | `#F5A623` | Buttons, active states |
| `--accent` | `oklch(0.85 0.12 85)` | warm gold | Accent backgrounds |
| `--ring` | `oklch(0.75 0.16 75)` | `#F5A623` | Focus rings |

### Forbidden Values

Do NOT use these green values anywhere:
- `oklch(0.65 0.15 140)` — old green primary
- `#a3d977`, `#8bc55f`, `#7cb342` — old hex greens

## Tailwind v4 Notes

- Config is in CSS, not `tailwind.config.js`
- `@theme inline` block defines design tokens
- `@custom-variant dark` enables dark mode with class strategy
- Font: Inter via Google Fonts, CSS variable `--font-inter`

## Swiper Styles

Custom Swiper pagination uses the primary color:
```css
.swiper-pagination-bullet {
  background-color: oklch(0.75 0.16 75) !important;
}
```
