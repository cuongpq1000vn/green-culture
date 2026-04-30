# Strapi CMS Conversion Plan for EGO Landing Page

## Executive Summary

This document outlines the strategy for converting the EGO agricultural export landing page from static hardcoded content to a Strapi-managed headless CMS architecture. The goal is to preserve the existing Next.js frontend, animations, and design while enabling content editors to manage all text, images, and structured data through Strapi's admin panel.

**Estimated Implementation Time:** 3-4 weeks  
**Strapi Version:** v5.x (latest LTS)  
**API Strategy:** REST API with ISR (Incremental Static Regeneration)

---

## 1. Content Audit

### 1.1 Text Content Inventory

| Component | Content Type | Fields Identified |
|-----------|--------------|-------------------|
| **Hero** | Single | Badge text, Title, Subtitle, CTA label |
| **About** | Single | Badge text, Title, Description (2 paragraphs) |
| **Stats Bar** | Collection | Value, Label (4 items) |
| **Products** | Collection | Title, Description, Category, Varieties[], Certifications[], Packaging |
| **Process Steps** | Collection | Number, Title, Description (4 items) |
| **Facilities** | Collection | Title, Description (3 items) |
| **Global Partners** | Collection | Country, Flag emoji, Partner count, Years (6 items) |
| **Testimonials** | Collection | Quote, Author name, Company, Country (3 items) |
| **Blog Posts** | Collection | Title, Excerpt, Category, Date, Content (3 items) |
| **CTA Section** | Single | Title, Description, Button label |
| **Footer** | Single | Company description, Copyright text, Social links[] |
| **Navigation** | Single | Nav items[], Products dropdown[] |

### 1.2 Media Content Inventory

| Asset | Location | Usage |
|-------|----------|-------|
| `logo.jpg` | `/images/` | Header, Footer |
| `hero-bg.jpg` | `/images/` | Hero background |
| `about-rice-field.jpg` | `/images/` | About section |
| `rice-varieties.jpg` | `/images/` | Products - Rice |
| `coffee-beans.jpg` | `/images/` | Products - Coffee |
| `tropical-mango.jpg` | `/images/` | Products - Mango |
| `cassava-roots.jpg` | `/images/` | Products - Cassava |
| `facility-1.jpg` | `/images/` | Facilities carousel |
| `facility-2.jpg` | `/images/` | Facilities carousel |
| `process-bg.jpg` | `/images/` | Process section background |
| `globe.jpg` | `/images/` | Global Partners |
| `blog-1.jpg`, `blog-2.jpg`, `blog-3.jpg` | `/images/` | Blog posts |
| `cta-bg.jpg` | `/images/` | CTA section background |
| `rice-closeup.jpg` | `/images/` | Featured image section |

### 1.3 Structured Data Analysis

```
Products (4 items)
├── id: string (slug)
├── title: string
├── description: string
├── category: enum [Grains, Beverages, Fruits, Roots & Tubers]
├── image: media
├── varieties: string[] (4 items each)
├── certifications: string[] (3 items each)
└── packaging: string

Testimonials (3 items)
├── quote: text
├── author: string
├── company: string
└── country: string

Blog Posts (3 items)
├── title: string
├── excerpt: text
├── category: enum [Industry News, Sustainability, Technology]
├── date: date
├── image: media
└── content: richtext (future)

Process Steps (4 items)
├── number: string (01-04)
├── title: string
└── description: text

Global Partners (6 items)
├── country: string
├── flag: string (emoji)
├── partnerCount: number
└── yearsCooperation: string

Facilities (3 items)
├── title: string
├── description: text (optional)
└── image: media

Stats (4 items)
├── value: string
└── label: string
```

---

## 2. Strapi Architecture Design

### 2.1 Strapi Project Structure

```
strapi-ego/
├── src/
│   ├── api/
│   │   ├── blog-post/
│   │   ├── certification/
│   │   ├── facility/
│   │   ├── global-partner/
│   │   ├── process-step/
│   │   ├── product/
│   │   ├── product-category/
│   │   ├── stat/
│   │   └── testimonial/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── cta-button.json
│   │   │   ├── link.json
│   │   │   └── seo.json
│   │   └── sections/
│   │       ├── hero-section.json
│   │       ├── about-section.json
│   │       ├── cta-section.json
│   │       └── featured-image-section.json
│   └── single-types/
│       ├── landing-page/
│       ├── site-settings/
│       └── navigation/
├── config/
│   ├── database.ts
│   ├── server.ts
│   └── plugins.ts
└── public/
    └── uploads/
```

### 2.2 Single Types (Global/One-off Content)

#### `site-settings` (Single Type)
```json
{
  "kind": "singleType",
  "collectionName": "site_settings",
  "attributes": {
    "siteName": { "type": "string", "required": true },
    "logo": { "type": "media", "required": true },
    "footerLogo": { "type": "media" },
    "companyDescription": { "type": "text" },
    "copyrightText": { "type": "string" },
    "contactEmail": { "type": "email" },
    "contactPhone": { "type": "string" },
    "socialLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    },
    "defaultSeo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

#### `navigation` (Single Type)
```json
{
  "kind": "singleType",
  "collectionName": "navigations",
  "attributes": {
    "mainNav": {
      "type": "component",
      "repeatable": true,
      "component": "shared.nav-item"
    },
    "footerCompanyLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    },
    "footerProductLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    },
    "footerContactLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    }
  }
}
```

#### `landing-page` (Single Type with Dynamic Zones)
```json
{
  "kind": "singleType",
  "collectionName": "landing_pages",
  "attributes": {
    "heroSection": {
      "type": "component",
      "component": "sections.hero-section"
    },
    "statsBar": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::stat.stat"
    },
    "featuredProducts": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product"
    },
    "ctaSection": {
      "type": "component",
      "component": "sections.cta-section"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

### 2.3 Collection Types

#### `product` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "description": { "type": "text", "required": true },
    "image": { "type": "media", "required": true },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::product-category.product-category"
    },
    "varieties": { "type": "json" },
    "certifications": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::certification.certification"
    },
    "packaging": { "type": "string" },
    "featured": { "type": "boolean", "default": false },
    "order": { "type": "integer", "default": 0 },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

#### `product-category` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "product_categories",
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name", "required": true },
    "description": { "type": "text" },
    "image": { "type": "media" },
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product",
      "mappedBy": "category"
    }
  }
}
```

#### `certification` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "certifications",
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name" },
    "description": { "type": "text" },
    "logo": { "type": "media" }
  }
}
```

#### `blog-post` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "excerpt": { "type": "text", "required": true },
    "content": { "type": "richtext" },
    "coverImage": { "type": "media", "required": true },
    "category": {
      "type": "enumeration",
      "enum": ["Industry News", "Sustainability", "Technology", "Company News"]
    },
    "publishedAt": { "type": "datetime" },
    "author": { "type": "string" },
    "featured": { "type": "boolean", "default": false },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

#### `testimonial` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "testimonials",
  "attributes": {
    "quote": { "type": "text", "required": true },
    "authorName": { "type": "string", "required": true },
    "company": { "type": "string", "required": true },
    "country": { "type": "string", "required": true },
    "avatar": { "type": "media" },
    "featured": { "type": "boolean", "default": false },
    "order": { "type": "integer", "default": 0 }
  }
}
```

#### `global-partner` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "global_partners",
  "attributes": {
    "country": { "type": "string", "required": true },
    "flagEmoji": { "type": "string", "required": true },
    "partnerCount": { "type": "integer", "required": true },
    "yearsCooperation": { "type": "string", "required": true },
    "order": { "type": "integer", "default": 0 }
  }
}
```

#### `facility` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "facilities",
  "attributes": {
    "title": { "type": "string", "required": true },
    "description": { "type": "text" },
    "image": { "type": "media", "required": true },
    "order": { "type": "integer", "default": 0 }
  }
}
```

#### `process-step` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "process_steps",
  "attributes": {
    "stepNumber": { "type": "string", "required": true },
    "title": { "type": "string", "required": true },
    "description": { "type": "text", "required": true },
    "order": { "type": "integer", "default": 0 }
  }
}
```

#### `stat` (Collection Type)
```json
{
  "kind": "collectionType",
  "collectionName": "stats",
  "attributes": {
    "value": { "type": "string", "required": true },
    "label": { "type": "string", "required": true },
    "section": {
      "type": "enumeration",
      "enum": ["home", "about"]
    },
    "order": { "type": "integer", "default": 0 }
  }
}
```

### 2.4 Reusable Components

#### `shared/seo`
```json
{
  "collectionName": "components_shared_seo",
  "attributes": {
    "metaTitle": { "type": "string", "maxLength": 60 },
    "metaDescription": { "type": "text", "maxLength": 160 },
    "keywords": { "type": "string" },
    "ogImage": { "type": "media" },
    "canonicalUrl": { "type": "string" }
  }
}
```

#### `shared/cta-button`
```json
{
  "collectionName": "components_shared_cta_button",
  "attributes": {
    "label": { "type": "string", "required": true },
    "href": { "type": "string", "required": true },
    "variant": {
      "type": "enumeration",
      "enum": ["primary", "secondary", "outline"],
      "default": "primary"
    },
    "openInNewTab": { "type": "boolean", "default": false }
  }
}
```

#### `shared/link`
```json
{
  "collectionName": "components_shared_link",
  "attributes": {
    "label": { "type": "string", "required": true },
    "href": { "type": "string", "required": true },
    "icon": { "type": "string" },
    "openInNewTab": { "type": "boolean", "default": false }
  }
}
```

#### `shared/nav-item`
```json
{
  "collectionName": "components_shared_nav_item",
  "attributes": {
    "label": { "type": "string", "required": true },
    "href": { "type": "string", "required": true },
    "children": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    }
  }
}
```

#### `sections/hero-section`
```json
{
  "collectionName": "components_sections_hero",
  "attributes": {
    "badge": { "type": "string" },
    "title": { "type": "string", "required": true },
    "subtitle": { "type": "text" },
    "backgroundImage": { "type": "media", "required": true },
    "ctaButton": {
      "type": "component",
      "component": "shared.cta-button"
    }
  }
}
```

#### `sections/cta-section`
```json
{
  "collectionName": "components_sections_cta",
  "attributes": {
    "title": { "type": "string", "required": true },
    "description": { "type": "text" },
    "backgroundImage": { "type": "media" },
    "ctaButton": {
      "type": "component",
      "component": "shared.cta-button"
    }
  }
}
```

#### `sections/about-section`
```json
{
  "collectionName": "components_sections_about",
  "attributes": {
    "badge": { "type": "string" },
    "title": { "type": "string", "required": true },
    "description": { "type": "richtext" },
    "image": { "type": "media" }
  }
}
```

---

## 3. Frontend Integration Strategy

### 3.1 API Client Architecture

Create a type-safe Strapi client in `lib/strapi/`:

```
lib/
├── strapi/
│   ├── client.ts          # Base fetch wrapper
│   ├── types.ts           # TypeScript interfaces
│   ├── queries/
│   │   ├── landing-page.ts
│   │   ├── products.ts
│   │   ├── blog.ts
│   │   ├── testimonials.ts
│   │   └── settings.ts
│   └── utils/
│       ├── media.ts       # Strapi media URL helper
│       └── populate.ts    # Populate query builder
```

### 3.2 Base Strapi Client

```typescript
// lib/strapi/client.ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapi<T>(
  path: string,
  options: {
    populate?: string | object;
    filters?: object;
    sort?: string[];
    pagination?: { page?: number; pageSize?: number };
    revalidate?: number;
  } = {}
): Promise<StrapiResponse<T>> {
  const { populate, filters, sort, pagination, revalidate = 60 } = options;
  
  const params = new URLSearchParams();
  
  if (populate) {
    if (typeof populate === 'string') {
      params.append('populate', populate);
    } else {
      params.append('populate', JSON.stringify(populate));
    }
  }
  
  if (filters) {
    params.append('filters', JSON.stringify(filters));
  }
  
  if (sort) {
    sort.forEach(s => params.append('sort[]', s));
  }
  
  if (pagination) {
    if (pagination.page) params.append('pagination[page]', String(pagination.page));
    if (pagination.pageSize) params.append('pagination[pageSize]', String(pagination.pageSize));
  }

  const url = `${STRAPI_URL}/api${path}?${params.toString()}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
```

### 3.3 TypeScript Types

```typescript
// lib/strapi/types.ts

// Base Strapi types
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// Content types
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  image: StrapiMedia;
  category: ProductCategory;
  varieties: string[];
  certifications: Certification[];
  packaging: string;
  featured: boolean;
  order: number;
}

export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia;
}

export interface Certification {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  logo?: StrapiMedia;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: StrapiMedia;
  category: 'Industry News' | 'Sustainability' | 'Technology' | 'Company News';
  publishedAt: string;
  author?: string;
  featured: boolean;
}

export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  company: string;
  country: string;
  avatar?: StrapiMedia;
  featured: boolean;
  order: number;
}

export interface GlobalPartner {
  id: number;
  documentId: string;
  country: string;
  flagEmoji: string;
  partnerCount: number;
  yearsCooperation: string;
  order: number;
}

export interface Facility {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  image: StrapiMedia;
  order: number;
}

export interface ProcessStep {
  id: number;
  documentId: string;
  stepNumber: string;
  title: string;
  description: string;
  order: number;
}

export interface Stat {
  id: number;
  documentId: string;
  value: string;
  label: string;
  section: 'home' | 'about';
  order: number;
}

// Component types
export interface HeroSection {
  badge?: string;
  title: string;
  subtitle?: string;
  backgroundImage: StrapiMedia;
  ctaButton?: CTAButton;
}

export interface CTASection {
  title: string;
  description?: string;
  backgroundImage?: StrapiMedia;
  ctaButton?: CTAButton;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  openInNewTab: boolean;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: StrapiMedia;
  canonicalUrl?: string;
}

// Single type responses
export interface LandingPage {
  heroSection: HeroSection;
  statsBar: Stat[];
  featuredProducts: Product[];
  ctaSection: CTASection;
  seo?: SEO;
}

export interface SiteSettings {
  siteName: string;
  logo: StrapiMedia;
  footerLogo?: StrapiMedia;
  companyDescription?: string;
  copyrightText?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks: Link[];
  defaultSeo?: SEO;
}

export interface Link {
  label: string;
  href: string;
  icon?: string;
  openInNewTab: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: Link[];
}

export interface Navigation {
  mainNav: NavItem[];
  footerCompanyLinks: Link[];
  footerProductLinks: Link[];
  footerContactLinks: Link[];
}
```

### 3.4 Media URL Helper

```typescript
// lib/strapi/utils/media.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function getStrapiMediaUrl(url: string | undefined | null): string {
  if (!url) return '/images/placeholder.jpg';
  
  // If already absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

export function getStrapiImageProps(media: StrapiMedia | undefined | null) {
  if (!media) {
    return {
      src: '/images/placeholder.jpg',
      alt: 'Image',
      width: 800,
      height: 600,
    };
  }
  
  return {
    src: getStrapiMediaUrl(media.url),
    alt: media.alternativeText || 'Image',
    width: media.width,
    height: media.height,
  };
}
```

### 3.5 Data Fetching Patterns

```typescript
// lib/strapi/queries/landing-page.ts
import { fetchStrapi } from '../client';
import type { LandingPage, Stat, Product } from '../types';

export async function getLandingPage(): Promise<LandingPage> {
  const response = await fetchStrapi<LandingPage>('/landing-page', {
    populate: {
      heroSection: {
        populate: ['backgroundImage', 'ctaButton']
      },
      statsBar: {
        populate: '*'
      },
      featuredProducts: {
        populate: ['image', 'category', 'certifications']
      },
      ctaSection: {
        populate: ['backgroundImage', 'ctaButton']
      },
      seo: {
        populate: ['ogImage']
      }
    },
    revalidate: 60
  });
  
  return response.data;
}

export async function getHomeStats(): Promise<Stat[]> {
  const response = await fetchStrapi<Stat[]>('/stats', {
    filters: { section: { $eq: 'home' } },
    sort: ['order:asc'],
    revalidate: 60
  });
  
  return response.data;
}
```

```typescript
// lib/strapi/queries/products.ts
import { fetchStrapi } from '../client';
import type { Product, ProductCategory } from '../types';

export async function getProducts(): Promise<Product[]> {
  const response = await fetchStrapi<Product[]>('/products', {
    populate: ['image', 'category', 'certifications'],
    sort: ['order:asc'],
    revalidate: 60
  });
  
  return response.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchStrapi<Product[]>('/products', {
    filters: { slug: { $eq: slug } },
    populate: ['image', 'category', 'certifications', 'seo.ogImage'],
    revalidate: 60
  });
  
  return response.data[0] || null;
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await fetchStrapi<ProductCategory[]>('/product-categories', {
    populate: ['image'],
    sort: ['name:asc'],
    revalidate: 3600
  });
  
  return response.data;
}
```

### 3.6 Component Integration Examples

#### Hero Component Integration
```tsx
// components/landing/hero.tsx
import { getStrapiImageProps } from '@/lib/strapi/utils/media';
import type { HeroSection } from '@/lib/strapi/types';

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  const bgImage = getStrapiImageProps(data.backgroundImage);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage.src}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.badge && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 rounded-full border border-foreground/20 text-sm">
              {data.badge}
            </span>
          </motion.div>
        )}
        
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          {data.title}
        </motion.h1>
        
        {data.subtitle && (
          <motion.p className="max-w-2xl mx-auto text-lg text-foreground/70 mb-8">
            {data.subtitle}
          </motion.p>
        )}
        
        {data.ctaButton && (
          <motion.div>
            <Button
              size="lg"
              className="bg-[#F5A623] hover:bg-[#D4911E]"
              asChild={data.ctaButton.href.startsWith('/')}
            >
              {data.ctaButton.openInNewTab ? (
                <a href={data.ctaButton.href} target="_blank" rel="noopener noreferrer">
                  {data.ctaButton.label}
                </a>
              ) : (
                <Link href={data.ctaButton.href}>{data.ctaButton.label}</Link>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

### 3.7 Page Integration

```tsx
// app/page.tsx
import { getLandingPage, getHomeStats } from '@/lib/strapi/queries/landing-page';
import { getProducts } from '@/lib/strapi/queries/products';
import { Hero } from '@/components/landing/hero';
import { StatsBar } from '@/components/landing/stats-bar';
import { Products } from '@/components/landing/products';
import { CTA } from '@/components/landing/cta';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateMetadata() {
  const landingPage = await getLandingPage();
  
  return {
    title: landingPage.seo?.metaTitle || 'EGO - Agricultural Supply & Export from Vietnam',
    description: landingPage.seo?.metaDescription || 'Premium agricultural exports',
  };
}

export default async function Home() {
  const [landingPage, stats, products] = await Promise.all([
    getLandingPage(),
    getHomeStats(),
    getProducts()
  ]);

  return (
    <main className="min-h-screen bg-background">
      <Hero data={landingPage.heroSection} />
      <StatsBar data={stats} />
      <Products data={products.filter(p => p.featured).slice(0, 4)} />
      <CTA data={landingPage.ctaSection} />
    </main>
  );
}
```

---

## 4. Environment Configuration

### 4.1 Environment Variables

```env
# .env.local (Next.js frontend)
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Production
# STRAPI_URL=https://cms.ego-export.com
# NEXT_PUBLIC_STRAPI_URL=https://cms.ego-export.com
```

### 4.2 Strapi Configuration

```typescript
// strapi/config/plugins.ts
export default {
  // Enable i18n for future multilingual support
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'vi'],
    },
  },
  // Media library with image optimization
  upload: {
    config: {
      breakpoints: {
        xlarge: 1920,
        large: 1200,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
};
```

---

## 5. Content Migration Strategy

### 5.1 Migration Script

```typescript
// scripts/migrate-content.ts
import { readFileSync } from 'fs';
import { join } from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

// Extract static content from current components
const staticContent = {
  stats: [
    { value: "25+", label: "Years Experience", section: "home", order: 0 },
    { value: "500+", label: "Global Partners", section: "home", order: 1 },
    { value: "50K+", label: "Tons Exported", section: "home", order: 2 },
    { value: "99%", label: "Quality Guaranteed", section: "home", order: 3 },
  ],
  products: [
    {
      title: "Premium Rice",
      slug: "rice",
      description: "High-quality Vietnamese rice varieties...",
      varieties: ["Jasmine Rice", "Long-grain Rice", "Short-grain Rice", "Brown Rice"],
      packaging: "5kg, 10kg, 25kg, 50kg bags",
      category: "Grains",
      featured: true,
      order: 0,
    },
    // ... other products
  ],
  testimonials: [
    {
      quote: "EGO has been our trusted rice supplier for over 5 years...",
      authorName: "Ahmed Al-Rashid",
      company: "Gulf Food Distributors",
      country: "UAE",
      featured: true,
      order: 0,
    },
    // ... other testimonials
  ],
  // ... other content types
};

async function migrateContent() {
  // 1. Create certifications first (they're referenced by products)
  const certifications = ["ISO 22000", "HACCP", "GlobalGAP", "Organic Certified", "Fair Trade", "Rainforest Alliance", "UTZ Certified", "BRC Food"];
  
  for (const cert of certifications) {
    await createEntry('certifications', {
      name: cert,
      slug: cert.toLowerCase().replace(/\s+/g, '-'),
    });
  }
  
  // 2. Create product categories
  const categories = [
    { name: "Grains", slug: "grains" },
    { name: "Beverages", slug: "beverages" },
    { name: "Fruits", slug: "fruits" },
    { name: "Roots & Tubers", slug: "roots-tubers" },
  ];
  
  for (const cat of categories) {
    await createEntry('product-categories', cat);
  }
  
  // 3. Upload images and create products
  // ... image upload logic
  
  // 4. Create remaining content
  // ... stats, testimonials, blog posts, etc.
  
  console.log('Migration complete!');
}

async function createEntry(contentType: string, data: object) {
  const res = await fetch(`${STRAPI_URL}/api/${contentType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_ADMIN_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  
  if (!res.ok) {
    console.error(`Failed to create ${contentType}:`, await res.text());
  }
  
  return res.json();
}

migrateContent();
```

### 5.2 Image Migration

```typescript
// scripts/migrate-images.ts
import { createReadStream } from 'fs';
import { join } from 'path';
import FormData from 'form-data';

const imageMap = {
  'hero-bg.jpg': 'Hero background',
  'about-rice-field.jpg': 'About section rice field',
  'rice-varieties.jpg': 'Rice product',
  'coffee-beans.jpg': 'Coffee product',
  'tropical-mango.jpg': 'Mango product',
  'cassava-roots.jpg': 'Cassava product',
  'facility-1.jpg': 'Processing facility 1',
  'facility-2.jpg': 'Storage facility',
  'process-bg.jpg': 'Process section background',
  'globe.jpg': 'Global reach illustration',
  'blog-1.jpg': 'Blog post 1',
  'blog-2.jpg': 'Blog post 2',
  'blog-3.jpg': 'Blog post 3',
  'cta-bg.jpg': 'CTA section background',
  'logo.jpg': 'EGO Logo',
};

async function uploadImage(filename: string, alt: string): Promise<number> {
  const filePath = join(process.cwd(), 'public', 'images', filename);
  const form = new FormData();
  
  form.append('files', createReadStream(filePath));
  form.append('fileInfo', JSON.stringify({
    alternativeText: alt,
    caption: alt,
  }));
  
  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_ADMIN_TOKEN}`,
    },
    body: form as unknown as BodyInit,
  });
  
  const [uploaded] = await res.json();
  return uploaded.id;
}
```

---

## 6. Permissions & Security

### 6.1 Public API Permissions

Configure in Strapi Admin → Settings → Roles → Public:

| Content Type | find | findOne | create | update | delete |
|--------------|------|---------|--------|--------|--------|
| Blog Post | ✅ | ✅ | ❌ | ❌ | ❌ |
| Certification | ✅ | ✅ | ❌ | ❌ | ❌ |
| Facility | ✅ | ✅ | ❌ | ❌ | ❌ |
| Global Partner | ✅ | ✅ | ❌ | ❌ | ❌ |
| Process Step | ✅ | ✅ | ❌ | ❌ | ❌ |
| Product | ✅ | ✅ | ❌ | ❌ | ❌ |
| Product Category | ✅ | ✅ | ❌ | ❌ | ❌ |
| Stat | ✅ | ✅ | ❌ | ❌ | ❌ |
| Testimonial | ✅ | ✅ | ❌ | ❌ | ❌ |
| Landing Page | ✅ | N/A | ❌ | ❌ | ❌ |
| Navigation | ✅ | N/A | ❌ | ❌ | ❌ |
| Site Settings | ✅ | N/A | ❌ | ❌ | ❌ |

### 6.2 Content Editor Role

Create custom "Content Editor" role with permissions:

- **All Collection Types**: find, findOne, create, update
- **All Single Types**: find, update
- **Media Library**: access, create, update
- **No delete permissions** (prevent accidental data loss)

---

## 7. Implementation Phases

### Phase 1: Strapi Setup (Week 1)
- [ ] Initialize Strapi v5 project
- [ ] Configure database (SQLite for dev, PostgreSQL for prod)
- [ ] Create all content types and components
- [ ] Configure i18n plugin
- [ ] Set up media library with image optimization
- [ ] Configure public API permissions

### Phase 2: Content Migration (Week 1-2)
- [ ] Run image migration script
- [ ] Create migration scripts for all content types
- [ ] Populate initial content from static files
- [ ] Verify content in Strapi admin
- [ ] Test API responses

### Phase 3: Frontend Integration (Week 2-3)
- [ ] Create Strapi client library
- [ ] Add TypeScript types
- [ ] Update Hero component
- [ ] Update StatsBar component
- [ ] Update Products component
- [ ] Update About section
- [ ] Update Facilities section
- [ ] Update Process section
- [ ] Update GlobalPartners section
- [ ] Update Testimonials component
- [ ] Update Blog component
- [ ] Update CTA section
- [ ] Update Header (navigation)
- [ ] Update Footer

### Phase 4: Testing & Optimization (Week 3-4)
- [ ] Test all pages with CMS data
- [ ] Verify ISR revalidation works
- [ ] Test responsive design
- [ ] Test all animations with dynamic content
- [ ] Performance audit (Core Web Vitals)
- [ ] Error handling & fallbacks
- [ ] SEO verification

### Phase 5: Deployment (Week 4)
- [ ] Deploy Strapi to production (Railway/Render/DigitalOcean)
- [ ] Configure production environment variables
- [ ] Set up media storage (Cloudinary/AWS S3)
- [ ] Deploy updated Next.js frontend
- [ ] Configure CORS and security headers
- [ ] Final production testing

---

## 8. Technical Considerations

### 8.1 Caching Strategy

| Content Type | Revalidation | Rationale |
|--------------|--------------|-----------|
| Landing Page | 60s | Infrequent updates |
| Products | 60s | Moderate updates |
| Blog Posts | 60s | Regular updates |
| Site Settings | 3600s | Rarely changes |
| Navigation | 3600s | Rarely changes |
| Testimonials | 300s | Occasional updates |

### 8.2 Error Handling

```typescript
// lib/strapi/client.ts - Enhanced error handling
export async function fetchStrapi<T>(path: string, options = {}): Promise<T> {
  try {
    const response = await fetch(/* ... */);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null as T; // Return null for missing content
      }
      throw new Error(`Strapi error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    
    // Return fallback data from static imports for critical paths
    if (path.includes('landing-page')) {
      return staticFallback.landingPage as T;
    }
    
    throw error;
  }
}
```

### 8.3 Preview Mode (Optional)

For content preview before publishing:

```typescript
// app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  if (secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  draftMode().enable();
  redirect(slug || '/');
}
```

---

## 9. Cost & Hosting Recommendations

### Strapi Hosting Options

| Provider | Cost | Best For |
|----------|------|----------|
| **Railway** | ~$5/mo | Quick deployment, good DX |
| **Render** | Free tier available | Budget-friendly |
| **DigitalOcean App Platform** | ~$12/mo | Production stability |
| **Strapi Cloud** | $99/mo | Managed, official support |

### Media Storage

| Provider | Cost | Integration |
|----------|------|-------------|
| **Cloudinary** | Free tier (25GB) | Excellent Strapi plugin |
| **AWS S3** | Pay-per-use | Official Strapi provider |
| **Local** | N/A | Dev only |

### Recommended Production Stack

- **Strapi**: Railway or DigitalOcean ($5-12/mo)
- **Database**: PostgreSQL on same provider
- **Media**: Cloudinary free tier
- **Frontend**: Vercel (existing)

**Total estimated cost**: $5-15/month

---

## 10. Summary

This plan converts the EGO landing page to a Strapi-powered CMS while:

1. **Preserving** all existing frontend design, animations, and performance
2. **Enabling** non-technical content editors to manage all text and images
3. **Future-proofing** with i18n support for Vietnamese translation
4. **Optimizing** with ISR caching for fast page loads
5. **Securing** with proper API permissions and token-based auth

The modular architecture separates concerns cleanly:
- **Strapi** = Content management, media library, API
- **Next.js** = Rendering, routing, animations, styling
- **TypeScript** = Type safety across the stack
