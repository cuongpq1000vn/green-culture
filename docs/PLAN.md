# Implementation Plan: Multi-Page Conversion + Color Alignment

## Overview

Convert the current single-page scrollable EGO agricultural export landing page into a multi-page Next.js application where each major section lives on its own route, and update the color palette from lime green to golden amber to match the company logo.

**Reference template:** https://template.wipixplatform.com/xuat-khau-nong-san-terralink-supply-co

## Current State

| Aspect | Detail |
|--------|--------|
| Framework | Next.js 16.2.4 with React 19, App Router |
| Package manager | pnpm |
| Styling | Tailwind CSS v4.2.0 + shadcn/ui (New York) |
| Animation | Framer Motion 12.38.0, Swiper 12.1.3 |
| Language | TypeScript 5.7.3 |
| Routing | Single page — all sections inlined in `app/page.tsx` |
| Brand | "EGO" with golden amber logo |
| Content | English |
| Colors | Lime green `#a3d977` accent (does not match logo) |

## Target State

| Aspect | Detail |
|--------|--------|
| Routing | Multi-page — `/`, `/about`, `/products`, `/factory`, `/news` |
| Colors | Golden amber `#F5A623` matching logo, warm tones throughout |
| Content | English, same brand "EGO" |
| Layout | Header + Footer shared across all pages |

---

## Phase 1: Color Palette Update

**Goal:** Replace all lime green accents with golden amber matching the logo.

### 1.1 Update CSS Custom Properties

**File:** `app/globals.css`

| Variable | Current (green) | Target (golden amber) |
|----------|----------------|-----------------------|
| `--primary` | `oklch(0.65 0.15 140)` | `oklch(0.75 0.16 75)` |
| `--accent` | `oklch(0.85 0.15 90)` | `oklch(0.85 0.12 85)` |
| `--secondary` | `oklch(0.96 0.01 140)` | `oklch(0.96 0.01 80)` |
| `--border` | `oklch(0.9 0.01 140)` | `oklch(0.9 0.01 80)` |
| `--input` | `oklch(0.95 0.005 140)` | `oklch(0.95 0.005 80)` |
| `--ring` | `oklch(0.65 0.15 140)` | `oklch(0.75 0.16 75)` |
| `--muted` | `oklch(0.95 0.005 140)` | `oklch(0.95 0.005 80)` |
| `--secondary-foreground` | `oklch(0.3 0.05 140)` | `oklch(0.3 0.05 80)` |
| Swiper bullet | `oklch(0.65 0.15 140)` | `oklch(0.75 0.16 75)` |

### 1.2 Replace Hardcoded Hex Values

Apply across all `components/landing/*.tsx` files:

| Old | New | Usage |
|-----|-----|-------|
| `#a3d977` | `#F5A623` | Primary accent (buttons, badges, icons) |
| `#8bc55f` | `#D4911E` | Hover state |
| `#7cb342` | `#C4880A` | Text accent (links, stat values) |
| `#e8f5dc` | `#FFF8E7` | Light background gradient |
| `#f5f5dc` | `#FFF5E0` | Stat card background |

**Files to update (9 total):**
- `components/landing/header.tsx`
- `components/landing/hero.tsx`
- `components/landing/about.tsx`
- `components/landing/facilities.tsx`
- `components/landing/process.tsx`
- `components/landing/blog.tsx`
- `components/landing/testimonials.tsx`
- `components/landing/cta.tsx`
- `components/landing/footer.tsx`

---

## Phase 2: Multi-Page Routing

**Goal:** Create standalone pages for each major section.

### 2.1 Create Page Routes

| Route | File | Content |
|-------|------|---------|
| `/` | `app/page.tsx` | Hero + Stats preview + Featured products preview + CTA |
| `/about` | `app/about/page.tsx` | About (full) + GlobalPartners + Testimonials |
| `/products` | `app/products/page.tsx` | Product grid (Rice, Coffee, Mango, Cassava) |
| `/factory` | `app/factory/page.tsx` | Facilities carousel + Process steps |
| `/news` | `app/news/page.tsx` | Blog grid (expanded) |

### 2.2 Restructure Home Page

**File:** `app/page.tsx`

Keep:
- Header
- Hero section
- Stats bar (from About component, extracted)
- Brief products preview (3-4 cards linking to `/products`)
- CTA section
- Footer

Remove from home:
- Full About content → moves to `/about`
- Facilities → moves to `/factory`
- FeaturedImage → moves to `/factory` or `/about`
- Process → moves to `/factory`
- GlobalPartners → moves to `/about`
- Blog → moves to `/news`
- Testimonials → moves to `/about`

### 2.3 Build /about Page

**File:** `app/about/page.tsx`

Sections in order:
1. Page hero banner (title: "About Us", breadcrumb)
2. About content (company intro + image) — reuse from `about.tsx`
3. Stats grid — reuse from `about.tsx`
4. FeaturedImage — reuse `featured-image.tsx`
5. GlobalPartners — reuse `global-partners.tsx`
6. Testimonials — reuse `testimonials.tsx`
7. CTA

### 2.4 Build /products Page

**File:** `app/products/page.tsx`

Sections in order:
1. Page hero banner (title: "Our Products", breadcrumb)
2. Product grid — NEW component: 4 product cards
   - Rice: image, description, key specs (varieties, packaging, certifications)
   - Coffee: image, description, key specs
   - Mango: image, description, key specs
   - Cassava: image, description, key specs
3. Quality assurance section (brief)
4. CTA

Product card design:
- Full-width image top
- Title + description
- Key specs list
- "Learn More" button
- Hover lift animation (consistent with blog cards)

### 2.5 Build /factory Page

**File:** `app/factory/page.tsx`

Sections in order:
1. Page hero banner (title: "Our Factory", breadcrumb)
2. Facilities carousel — reuse `facilities.tsx`
3. Process steps — reuse `process.tsx`
4. FeaturedImage (rice closeup parallax)
5. CTA

### 2.6 Build /news Page

**File:** `app/news/page.tsx`

Sections in order:
1. Page hero banner (title: "News & Updates", breadcrumb)
2. Blog grid — reuse `blog.tsx` (expand to 6 articles for full page)
3. CTA

---

## Phase 3: Navigation Update

**Goal:** Wire header and footer to use page routes instead of hash anchors.

### 3.1 Update Header

**File:** `components/landing/header.tsx`

```
navItems update:
  Home       → /
  About Us   → /about
  Products   → /products (dropdown: /products#rice, /products#coffee, etc.)
  Factory    → /factory
  News       → /news
```

Add active page highlighting:
- Import `usePathname()` from `next/navigation`
- Apply golden amber text color to active nav item
- Match on pathname prefix

### 3.2 Update Footer

**File:** `components/landing/footer.tsx`

```
footerLinks update:
  About Us              → /about
  Our Products          → /products
  Processing Facilities → /factory
  News & Updates        → /news
  Rice                  → /products#rice
  Coffee                → /products#coffee
  Mango                 → /products#mango
  Cassava               → /products#cassava
```

### 3.3 Move Header + Footer to Layout

**File:** `app/layout.tsx`

Move Header and Footer into the root layout so they render on every page without repeating imports in each page file.

---

## Phase 4: Shared Components

**Goal:** Create reusable components for the multi-page structure.

### 4.1 Page Hero Banner

**File:** `components/landing/page-hero.tsx`

A reusable banner component for sub-pages:
- Props: `title`, `breadcrumbs` (array of {label, href})
- Background: subtle gradient or pattern (warm cream tones)
- Framer Motion entrance animation
- Responsive text sizing

### 4.2 Products Grid Component

**File:** `components/landing/products.tsx`

Product card grid component:
- 4 products in a responsive grid (1/2/4 columns)
- Each card: image, title, description, specs, CTA button
- Hover animations consistent with existing patterns
- Uses existing image assets or placeholder images

### 4.3 Stats Bar Component

**File:** `components/landing/stats-bar.tsx`

Extracted from About component for reuse on home page:
- Horizontal stats display
- Counter animation on scroll
- Compact layout suitable for home page preview

---

## Phase 5: Metadata & SEO

### 5.1 Root Metadata

**File:** `app/layout.tsx`

Update the metadata to reflect multi-page structure:
- Title template: `%s | EGO Agricultural Export`
- Default description updated for multi-page site

### 5.2 Per-Page Metadata

Each new page gets its own metadata export:

| Page | Title | Description |
|------|-------|-------------|
| `/` | EGO - Agricultural Supply & Export from Vietnam | Home page description |
| `/about` | About Us \| EGO | Company introduction, partners, experience |
| `/products` | Our Products \| EGO | Rice, coffee, mango, cassava export products |
| `/factory` | Our Factory \| EGO | Processing facilities and quality systems |
| `/news` | News & Updates \| EGO | Industry news and company updates |

---

## Phase 6: Verification

### 6.1 Build & Lint

```bash
pnpm build    # Must pass with no errors
pnpm lint     # Must pass with no errors
```

### 6.2 Route Testing

Verify all routes render correctly:
- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/products`
- `http://localhost:3000/factory`
- `http://localhost:3000/news`

### 6.3 Navigation Testing

- Desktop: all nav links navigate between pages
- Mobile: hamburger menu works, all links navigate correctly
- Footer: all links navigate correctly
- Active page indicator shows on correct nav item

### 6.4 Visual Testing

- No green `#a3d977` colors remain anywhere
- Golden amber accent is consistent across all pages
- Responsive layout works at 320, 768, 1024, 1440px
- Framer Motion animations work on all pages
- Swiper carousels function on `/about` and `/factory` pages

### 6.5 Accessibility

- All images have descriptive alt text
- Heading hierarchy is correct on each page (h1 → h2 → h3)
- Buttons and links have accessible names
- Color contrast meets WCAG AA for golden amber on white

---

## File Inventory

### Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Color variables: green → golden amber |
| `app/page.tsx` | Restructure as landing with previews |
| `app/layout.tsx` | Add Header/Footer, update metadata |
| `components/landing/header.tsx` | Nav routes + active state + colors |
| `components/landing/hero.tsx` | Color updates |
| `components/landing/about.tsx` | Color updates |
| `components/landing/facilities.tsx` | Color updates |
| `components/landing/process.tsx` | Color updates |
| `components/landing/global-partners.tsx` | Minor updates |
| `components/landing/blog.tsx` | Color updates |
| `components/landing/testimonials.tsx` | Color updates |
| `components/landing/cta.tsx` | Color updates |
| `components/landing/footer.tsx` | Routes + colors |

### Files to Create

| File | Purpose |
|------|---------|
| `app/about/page.tsx` | About Us page |
| `app/products/page.tsx` | Products page |
| `app/factory/page.tsx` | Factory page |
| `app/news/page.tsx` | News page |
| `components/landing/page-hero.tsx` | Reusable sub-page banner |
| `components/landing/products.tsx` | Product grid component |
| `components/landing/stats-bar.tsx` | Compact stats for home page |

### Dependencies

No new dependencies required. The existing stack covers everything:
- Framer Motion → animations
- Swiper → carousels
- Lucide React → icons
- shadcn/ui → buttons, UI primitives
- Next.js Image → optimized images

---

## Execution Order

```
Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4 ──→ Phase 5 ──→ Phase 6
Colors      Pages       Nav         Shared       Metadata    Verify
(1 hour)    (2 hours)   (30 min)    (1 hour)     (15 min)    (30 min)
```

Phase 1 can run independently.
Phase 4 components are needed by Phase 2 pages, so create them early in Phase 2.
Phase 3 depends on Phase 2 routes existing.
Phase 5 is independent and can run in parallel with Phase 3.
Phase 6 runs last.
