---
description: "Generate Strapi CMS conversion plan for static landing page - analyze content, design Strapi content types, and create implementation roadmap"
name: "Strapi CMS Conversion Planner"
agent: "architect"
---

# Strapi CMS Conversion Planning

Analyze the current static EGO agricultural export landing page and create a comprehensive plan to convert it into a **Strapi-managed headless CMS content system**.

The goal is to keep the existing landing page design, animations, layout quality, and performance, while moving editable content into Strapi.

## Analysis Framework

### 1. Content Audit

Review the current static landing page and identify all hardcoded content that should be managed from Strapi.

Audit the following:

- **Text content**
  - Hero title, subtitle, CTA labels
  - Section headings and descriptions
  - Product descriptions
  - Company introduction
  - Service descriptions
  - Statistics / numbers
  - Testimonials
  - FAQ content
  - Footer content

- **Media content**
  - Hero images
  - Product images
  - Background images
  - Icons
  - Logos
  - Gallery images

- **Structured data**
  - Product categories
  - Agricultural products
  - Export markets
  - Certifications
  - Blog/news articles
  - Contact information
  - Social links

- **Component integration points**
  - Identify which frontend components should fetch data from Strapi
  - Identify reusable sections that should map to Strapi components or dynamic zones

- **Multi-language readiness**
  - Assess whether Strapi i18n should be enabled
  - Identify content that may need Vietnamese/English versions in the future

---

### 2. Strapi CMS Architecture

Design the CMS architecture specifically using **Strapi**.

#### Required Strapi Architecture Decisions

Analyze and recommend:

- Strapi version and project structure
- Content Types vs Components vs Dynamic Zones
- Single Types for global/one-off content
- Collection Types for repeatable content
- Media Library usage for images/files
- i18n setup if multilingual content is needed
- Role-based permissions for content editors
- Public API permissions for frontend consumption
- Environment variables for Strapi API access

#### Recommended Strapi Content Modeling

Design Strapi schemas for:

- `landing-page`
  - Single Type for the main homepage content
  - Uses Dynamic Zones for flexible sections

- `hero-section`
  - Title
  - Subtitle
  - CTA buttons
  - Hero image/background

- `product`
  - Name
  - Slug
  - Description
  - Category
  - Images
  - Export information

- `product-category`
  - Name
  - Slug
  - Description
  - Image

- `testimonial`
  - Customer name
  - Company/location
  - Quote
  - Avatar/image

- `certification`
  - Name
  - Description
  - Logo/file

- `blog-post`
  - Title
  - Slug
  - Excerpt
  - Content
  - Cover image
  - Published date
  - SEO metadata

- `site-setting`
  - Single Type for logo, navigation, footer, contact info, and social links

- `seo`
  - Reusable component for meta title, meta description, keywords, OG image

---

### 3. Frontend Integration Strategy

Plan how the existing frontend should consume content from Strapi.

Include recommendations for:

- Strapi REST API or GraphQL API
- Data fetching strategy
  - Static generation where possible
  - Server-side rendering only when necessary
  - Incremental regeneration / revalidation
- API client structure
- TypeScript types for Strapi responses
- Handling Strapi media URLs
- Error handling and fallback content
- Preview mode for unpublished content if needed

Example areas to cover:

```ts
// Example Strapi client structure
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchFromStrapi<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Strapi data: ${path}`);
  }

  return res.json();
}