# Strapi CMS Conversion — Parallel Implementation Plan

## Architecture Overview

Two agents work in parallel with a shared contract (TypeScript types + API schema) established in Phase 0. The **Backend Agent** builds the Strapi CMS, and the **Frontend Agent** builds the integration layer and refactors components.

```
Phase 0  ──────────────────────  SHARED (contract definition)
Phase 1  ── Backend ──┬── Frontend ──  PARALLEL (foundation)
Phase 2  ── Backend ──┼── Frontend ──  PARALLEL (content types + data layer)
Phase 3  ── Backend ──┼── Frontend ──  PARALLEL (migration + component refactor)
Phase 4  ──────────────────────  JOINT (integration testing)
Phase 5  ──────────────────────  JOINT (deployment)
```

---

## Phase 0: Shared Contract (Sequential — Both Agents)

**Goal:** Establish the API contract so both agents can work independently.

| # | Task | Owner | Output |
|---|------|-------|--------|
| 0.1 | Create `lib/strapi/types.ts` with all TypeScript interfaces | Either | Shared type definitions |
| 0.2 | Define API endpoint paths and populate query shapes | Either | `lib/strapi/api-contract.ts` |
| 0.3 | Define environment variable names (`STRAPI_URL`, `STRAPI_API_TOKEN`, `NEXT_PUBLIC_STRAPI_URL`) | Either | `.env.example` |
| 0.4 | Agree on Strapi media URL format and `StrapiMedia` shape | Either | Part of types.ts |

**Deliverables:**
- [lib/strapi/types.ts](lib/strapi/types.ts) — All interfaces from [CMS-CONVERSION-PLAN.md §3.3](docs/CMS-CONVERSION-PLAN.md)
- `.env.example` with all required variables
- API contract document listing every endpoint, its populate shape, and return type

**Gate:** Both agents review and approve the contract before proceeding.

---

## Phase 1: Foundation (Parallel)

### Backend Agent — Strapi Project Bootstrap

| # | Task | Details |
|---|------|---------|
| 1B.1 | Initialize Strapi v5 project | `npx create-strapi@latest strapi-ego --typescript` in a `cms/` directory |
| 1B.2 | Configure SQLite (dev) + PostgreSQL (prod) | `config/database.ts` with env-based switching |
| 1B.3 | Configure upload plugin breakpoints | 64, 500, 750, 1200, 1920 |
| 1B.4 | Configure i18n plugin | Default `en`, future `vi` |
| 1B.5 | Configure CORS | Allow `localhost:3000` and production frontend origin |
| 1B.6 | Create reusable components | `shared/seo`, `shared/cta-button`, `shared/link`, `shared/nav-item` |
| 1B.7 | Create section components | `sections/hero-section`, `sections/cta-section`, `sections/about-section` |

**Deliverables:** Running Strapi instance at `localhost:1337` with all shared components registered.

### Frontend Agent — Integration Layer

| # | Task | Details |
|---|------|---------|
| 1F.1 | Create `lib/strapi/client.ts` | Base `fetchStrapi<T>()` with auth headers, ISR `revalidate`, error handling |
| 1F.2 | Create `lib/strapi/utils/media.ts` | `getStrapiMediaUrl()`, `getStrapiImageProps()` |
| 1F.3 | Create `lib/strapi/utils/populate.ts` | Populate query builder helpers |
| 1F.4 | Add env vars to `next.config.ts` | Add `images.remotePatterns` for Strapi media domain |
| 1F.5 | Create static fallback data | Extract current hardcoded content into `lib/strapi/fallbacks/` for graceful degradation |
| 1F.6 | Create query modules (stubs) | `lib/strapi/queries/{landing-page,products,blog,testimonials,settings,facilities,partners}.ts` — implement with fallback data initially |

**Deliverables:** Complete `lib/strapi/` directory with working client that returns fallback data. Frontend continues to render correctly.

---

## Phase 2: Content Types + Data Layer (Parallel)

### Backend Agent — Content Type Creation

| # | Task | Content Type | Priority |
|---|------|-------------|----------|
| 2B.1 | `product-category` | Collection | High (dependency) |
| 2B.2 | `certification` | Collection | High (dependency) |
| 2B.3 | `product` | Collection (relations to category + certifications) | High |
| 2B.4 | `stat` | Collection (enum: home/about) | High |
| 2B.5 | `blog-post` | Collection | Medium |
| 2B.6 | `testimonial` | Collection | Medium |
| 2B.7 | `global-partner` | Collection | Medium |
| 2B.8 | `facility` | Collection | Medium |
| 2B.9 | `process-step` | Collection | Medium |
| 2B.10 | `landing-page` | Single Type (hero, stats, featured products, CTA) | High |
| 2B.11 | `site-settings` | Single Type (logo, footer, SEO) | Medium |
| 2B.12 | `navigation` | Single Type (main nav, footer links) | Medium |
| 2B.13 | Configure Public role permissions | find + findOne for all collection types, find for single types | High |
| 2B.14 | Create Content Editor role | find, findOne, create, update (no delete) | Low |
| 2B.15 | Generate API token for frontend | Read-only token | High |

**Deliverables:** All content types created, permissions configured, API token generated. Empty API returns `{ data: [] }` for collections.

### Frontend Agent — Query Implementation + Component Props

| # | Task | Details |
|---|------|---------|
| 2F.1 | Implement `queries/landing-page.ts` | `getLandingPage()`, `getHomeStats()` with populate shapes |
| 2F.2 | Implement `queries/products.ts` | `getProducts()`, `getProductBySlug()`, `getProductCategories()` |
| 2F.3 | Implement `queries/blog.ts` | `getBlogPosts()`, `getBlogPostBySlug()` |
| 2F.4 | Implement `queries/testimonials.ts` | `getTestimonials()` |
| 2F.5 | Implement `queries/facilities.ts` | `getFacilities()`, `getProcessSteps()` |
| 2F.6 | Implement `queries/partners.ts` | `getGlobalPartners()` |
| 2F.7 | Implement `queries/settings.ts` | `getSiteSettings()`, `getNavigation()` |
| 2F.8 | Add data prop interfaces to all landing components | Add `data` prop type to Hero, StatsBar, Products, About, Facilities, Process, GlobalPartners, Testimonials, Blog, CTA, Header, Footer |
| 2F.9 | Create wrapper components | For each component: `<HeroCMS />` that fetches data and passes to existing `<Hero data={...} />` |

**Deliverables:** All query functions implemented (falling back to static data when Strapi is unavailable). Component interfaces ready for CMS data.

---

## Phase 3: Content Migration + Component Refactor (Parallel)

### Backend Agent — Data Population

| # | Task | Details |
|---|------|---------|
| 3B.1 | Create `scripts/migrate-images.ts` | Upload all 14 images from `public/images/` to Strapi media library |
| 3B.2 | Create `scripts/migrate-content.ts` | Seed all content types with current static data |
| 3B.3 | Seed certifications (8 items) | ISO 22000, HACCP, GlobalGAP, etc. |
| 3B.4 | Seed product categories (4 items) | Grains, Beverages, Fruits, Roots & Tubers |
| 3B.5 | Seed products (4 items) | Rice, Coffee, Mango, Cassava with image + category + certifications |
| 3B.6 | Seed stats (4 home + 4 about) | 25+ Years, 500+ Partners, etc. |
| 3B.7 | Seed testimonials (3 items) | With quote, author, company, country |
| 3B.8 | Seed global partners (6 items) | Japan, USA, EU, etc. |
| 3B.9 | Seed facilities (3 items) | With uploaded images |
| 3B.10 | Seed process steps (4 items) | Sourcing, Processing, Quality, Export |
| 3B.11 | Seed blog posts (3 items) | With cover images |
| 3B.12 | Seed landing page single type | Hero section, CTA section, featured product relations |
| 3B.13 | Seed site settings | Logo, footer text, social links |
| 3B.14 | Seed navigation | Main nav items, footer link groups |
| 3B.15 | Verify all API endpoints return correct data | Manual + script verification |

**Deliverables:** Strapi fully populated with all content. API returns real data matching current static content exactly.

### Frontend Agent — Component Refactor

| # | Task | Component | Complexity |
|---|------|-----------|------------|
| 3F.1 | Refactor `hero.tsx` | Accept `HeroSection` data prop, use `getStrapiImageProps()` | Medium |
| 3F.2 | Refactor `stats-bar.tsx` | Accept `Stat[]` data prop | Low |
| 3F.3 | Refactor `products.tsx` | Accept `Product[]` data prop | Medium |
| 3F.4 | Refactor `about.tsx` | Accept about section data | Medium |
| 3F.5 | Refactor `facilities.tsx` | Accept `Facility[]` data | Medium |
| 3F.6 | Refactor `process.tsx` | Accept `ProcessStep[]` data | Low |
| 3F.7 | Refactor `global-partners.tsx` | Accept `GlobalPartner[]` data | Low |
| 3F.8 | Refactor `testimonials.tsx` | Accept `Testimonial[]` data | Medium |
| 3F.9 | Refactor `blog.tsx` | Accept `BlogPost[]` data | Medium |
| 3F.10 | Refactor `cta.tsx` | Accept `CTASection` data | Low |
| 3F.11 | Refactor `header.tsx` | Accept `Navigation` + `SiteSettings` data | High |
| 3F.12 | Refactor `footer.tsx` | Accept `SiteSettings` + `Navigation` data | Medium |
| 3F.13 | Update `app/page.tsx` | Server component fetching from Strapi | Medium |
| 3F.14 | Update `app/about/page.tsx` | Fetch about data, stats, partners, testimonials | Medium |
| 3F.15 | Update `app/products/page.tsx` | Fetch products + categories | Medium |
| 3F.16 | Update `app/factory/page.tsx` | Fetch facilities + process steps | Medium |
| 3F.17 | Update `app/news/page.tsx` | Fetch blog posts | Medium |
| 3F.18 | Update `app/layout.tsx` | Fetch site settings + navigation for Header/Footer | High |

**Refactoring pattern** (same for all components):

```
1. Add optional `data` prop alongside existing hardcoded content
2. Use `data` prop when provided, fall back to hardcoded content when not
3. Preserve all Framer Motion animations exactly
4. Swap local image paths for getStrapiImageProps() when data comes from CMS
5. Verify build passes after each component
```

**Deliverables:** All components accept CMS data. All pages fetch from Strapi. Fallback to static data when Strapi is unreachable.

---

## Phase 4: Integration Testing (Joint — Sequential)

**Prerequisite:** Both agents' Phase 3 deliverables are complete.

| # | Task | Owner | Details |
|---|------|-------|---------|
| 4.1 | Connect frontend to live Strapi | Both | Set `STRAPI_URL=http://localhost:1337` in `.env.local` |
| 4.2 | Verify all 5 routes render with CMS data | Frontend | `/`, `/about`, `/products`, `/factory`, `/news` |
| 4.3 | Verify all images load from Strapi media | Frontend | Check `next/image` remote patterns |
| 4.4 | Verify ISR revalidation | Frontend | Change content in Strapi, confirm frontend updates after revalidation window |
| 4.5 | Verify all Framer Motion animations | Frontend | Scroll reveal, stagger, parallax |
| 4.6 | Verify responsive at 320/768/1024/1440 | Frontend | No overflow, no broken layouts |
| 4.7 | Verify fallback behavior | Frontend | Stop Strapi, confirm frontend still renders with static data |
| 4.8 | Verify no hardcoded content remains | Frontend | Grep for old static strings in components |
| 4.9 | `pnpm build` passes | Frontend | No type errors, no build warnings |
| 4.10 | `pnpm lint` passes | Frontend | Clean lint |
| 4.11 | Strapi API security check | Backend | No write endpoints exposed to Public role |
| 4.12 | Performance audit | Frontend | Lighthouse on all 5 routes, CWV targets met |

**Gate:** All 12 checks pass before proceeding to deployment.

---

## Phase 5: Deployment (Joint — Sequential)

| # | Task | Owner | Details |
|---|------|-------|---------|
| 5.1 | Deploy Strapi to Railway/Render | Backend | PostgreSQL database, env vars configured |
| 5.2 | Configure Cloudinary for media storage | Backend | Install `@strapi/provider-upload-cloudinary` |
| 5.3 | Re-run content migration against production Strapi | Backend | Same seed scripts with production URL |
| 5.4 | Update frontend env vars | Frontend | Point `STRAPI_URL` to production CMS |
| 5.5 | Configure `next.config.ts` remote patterns for production | Frontend | Cloudinary domain + Strapi domain |
| 5.6 | Deploy frontend to Vercel | Frontend | Verify env vars in Vercel dashboard |
| 5.7 | Configure CORS on production Strapi | Backend | Allow Vercel domain only |
| 5.8 | Final production smoke test | Both | All 5 routes, all images, all animations |
| 5.9 | Set up Strapi webhook → Vercel revalidation (optional) | Both | On-demand ISR when content changes |

---

## Dependency Graph

```
Phase 0 (types.ts, contract)
    │
    ├──────────────────────────────┐
    ▼                              ▼
Phase 1B (Strapi bootstrap)    Phase 1F (client + utils)
    │                              │
    ▼                              ▼
Phase 2B (content types)       Phase 2F (queries + prop interfaces)
    │                              │
    ▼                              ▼
Phase 3B (seed data)           Phase 3F (component refactor)
    │                              │
    └──────────┬───────────────────┘
               ▼
         Phase 4 (integration testing)
               │
               ▼
         Phase 5 (deployment)
```

**Key insight:** The only hard synchronization point is Phase 4. Phases 1–3 are fully parallelizable because the Frontend Agent works against fallback data (extracted from current static content) while the Backend Agent builds the real CMS. The shared types contract from Phase 0 ensures both sides produce compatible shapes.

## Estimated Scope

| Phase | Backend Tasks | Frontend Tasks | Parallel? |
|-------|:---:|:---:|:---:|
| 0 | 2 | 2 | No (shared) |
| 1 | 7 | 6 | Yes |
| 2 | 15 | 9 | Yes |
| 3 | 15 | 18 | Yes |
| 4 | 2 | 10 | No (joint) |
| 5 | 5 | 4 | Partially |

## Agent Assignment

### Backend Agent (`cms-architect`)
- Responsible for all Strapi setup, configuration, content types
- Creates and runs migration scripts
- Handles deployment and production configuration
- Manages API permissions and security

### Frontend Agent (`frontend-integrator`)
- Responsible for Next.js integration layer
- Creates TypeScript types and client libraries
- Refactors components to accept CMS data
- Handles performance optimization and fallback patterns

This parallel approach enables both agents to work simultaneously without blocking each other, reducing overall implementation time from ~4 weeks sequential to ~2-3 weeks parallel execution.