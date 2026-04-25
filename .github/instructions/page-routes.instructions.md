---
description: "Use when creating new page routes, updating routing, or working on app directory structure. Covers page metadata, layout patterns, and route conventions."
applyTo: "app/**"
---
# Page Route Standards

## Page File Template

Every page under `app/<route>/page.tsx`:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | EGO",
  description: "Page description for SEO",
};

export default function PageName() {
  return (
    <div className="min-h-screen pt-20">
      {/* pt-20 accounts for fixed header height */}
      {/* Page content sections */}
    </div>
  );
}
```

## Layout

Header and Footer are in the root layout (`app/layout.tsx`). Do NOT import them in individual pages.

## Metadata

Use the `Metadata` type export for static metadata:
- Title format: `"Page Name | EGO"`
- Always include a description

## Content Sections

Pages compose existing landing components:
- `/about` → About + GlobalPartners + Testimonials
- `/products` → Products grid component
- `/factory` → Facilities + Process
- `/news` → Blog grid

## Key Rule

The home page (`app/page.tsx`) is a landing page with preview sections and links to sub-pages. It does NOT contain all full sections.
