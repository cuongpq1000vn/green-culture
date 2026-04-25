# CLAUDE.md

## Project Goal

Convert a single-page EGO agricultural export landing page into a multi-page Next.js application and update the color palette to match the company logo.

**Reference template:** https://template.wipixplatform.com/xuat-khau-nong-san-terralink-supply-co
**Implementation plan:** `docs/PLAN.md`

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.2.4 (App Router) |
| React | 19 |
| TypeScript | 5.7.3 |
| Tailwind CSS | v4.2.0 (PostCSS plugin) |
| shadcn/ui | New York style, neutral base |
| Framer Motion | 12.38.0 |
| Swiper | 12.1.3 |
| Icons | Lucide React 0.564.0 |
| Package Manager | pnpm |

## Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Dev server at localhost:3000
pnpm build       # Production build
pnpm lint        # ESLint
```

## Project Structure

```
app/
  layout.tsx          # Root layout (Inter font, metadata, Analytics)
  page.tsx            # Home page — currently inlines all sections
  globals.css         # Tailwind v4 theme, OKLch color tokens, Swiper styles
  about/page.tsx      # TO CREATE
  products/page.tsx   # TO CREATE
  factory/page.tsx    # TO CREATE
  news/page.tsx       # TO CREATE

components/
  landing/
    header.tsx        # Fixed nav, logo, desktop+mobile menu, green accent
    hero.tsx          # Full-height hero, bg image, CTA button
    about.tsx         # Stats grid + company intro + image
    facilities.tsx    # Swiper carousel, 2-col layout
    featured-image.tsx # Parallax rice closeup
    process.tsx       # 4-step accordion with bg image
    global-partners.tsx # Partner country cards + globe image
    blog.tsx          # 3-col blog grid
    testimonials.tsx  # Swiper testimonial carousel
    cta.tsx           # Full-bleed CTA with bg image
    footer.tsx        # 4-col dark footer
    page-hero.tsx     # TO CREATE — reusable sub-page banner
    products.tsx      # TO CREATE — product grid
    stats-bar.tsx     # TO CREATE — compact stats for home
  ui/                 # shadcn/ui primitives (40+ components)
  theme-provider.tsx  # next-themes wrapper

lib/utils.ts          # cn() class merge utility
public/images/        # logo.jpg, hero-bg.jpg, about-rice-field.jpg, etc.
```

## Color System

### Current (WRONG — does not match logo)
- Primary accent: `#a3d977` (lime green)
- Hover: `#8bc55f`
- Text accent: `#7cb342`

### Target (matches golden amber logo)
- Primary accent: `#F5A623`
- Hover: `#D4911E`
- Text accent: `#C4880A`
- Light background: `#FFF8E7`

CSS custom properties in `app/globals.css` use OKLch color space. Update `--primary`, `--accent`, `--ring`, `--secondary`, `--border`, `--input`, `--muted` hue from 140 (green) to ~75 (amber).

## Routing

### Current: Single page scroll with hash anchors
### Target: Multi-page with these routes

| Route | Page |
|-------|------|
| `/` | Home — Hero + Stats + Product preview + CTA |
| `/about` | About + Partners + Testimonials |
| `/products` | Product grid (Rice, Coffee, Mango, Cassava) |
| `/factory` | Facilities + Process |
| `/news` | Blog articles |

Header/Footer shared across all pages via root layout.

## Implementation Principles

- Follow `docs/PLAN.md` phase by phase
- Reuse existing components — do not rewrite from scratch
- Replace ALL green hex values with golden amber equivalents
- Use `usePathname()` for active nav state in header
- Keep all Framer Motion animations working
- Keep responsive design working at 320/768/1024/1440px
- Use semantic HTML with proper heading hierarchy per page
- Do not add new npm dependencies unless absolutely necessary
- Do not add backend logic
- Keep content in English

## Naming Conventions

- Components: PascalCase exports, kebab-case filenames
- Pages: `app/<route>/page.tsx`
- CSS: Tailwind utility classes + `cn()` for conditional merging
- Images: kebab-case in `public/images/`
- Animations: Framer Motion `whileInView` with `viewport={{ once: true }}`

## Quality Gates

Before marking work complete:
1. `pnpm build` passes
2. `pnpm lint` passes
3. All 5 routes render correctly
4. No green `#a3d977` colors remain
5. Navigation works between all pages (desktop + mobile)
6. Responsive layout verified
7. All images have alt text
8. Heading hierarchy correct per page (single h1)
