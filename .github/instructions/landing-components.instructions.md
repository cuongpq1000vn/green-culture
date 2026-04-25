---
description: "Use when creating or editing landing page components, sections, or pages. Covers component patterns, animation config, responsive breakpoints, and color tokens."
applyTo: "components/landing/**"
---
# Landing Component Standards

## Component Structure

Every landing component follows this pattern:

```tsx
"use client";

import { motion } from "framer-motion";

export function SectionName() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </section>
  );
}
```

## Animation Config

Standard scroll reveal:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6 }}
```

Stagger children: `delay: index * 0.1`

## Color Tokens

- Buttons: `bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full`
- Text accent: `text-[#C4880A]`
- Badges: `bg-[#F5A623] text-foreground`
- Light bg: `bg-gradient-to-b from-background to-[#FFF8E7]`
- NEVER use green hex values (#a3d977, #8bc55f, #7cb342, #e8f5dc)

## Responsive Breakpoints

- Mobile first
- `md:` at 768px (2-column grids)
- `lg:` at 1024px (full layouts, side-by-side)
- Text: `text-3xl md:text-4xl lg:text-5xl` for headings

## Section Badge Pattern

```tsx
<span className="inline-block px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 mb-4">
  Section Label
</span>
```

## Image Pattern

Always use Next.js Image:
```tsx
<Image src="/images/name.jpg" alt="Descriptive text" fill className="object-cover" />
```
