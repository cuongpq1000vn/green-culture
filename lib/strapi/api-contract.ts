// API Contract for Strapi CMS Integration
// Defines all API endpoints, populate shapes, and return types

import type { 
  LandingPage, 
  Product, 
  ProductCategory, 
  BlogPost, 
  Testimonial, 
  Facility, 
  ProcessStep, 
  GlobalPartner, 
  Stat, 
  SiteSettings, 
  Navigation,
  StrapiResponse,
  PopulateShapes
} from './types'

// API Base Configuration
export const API_CONFIG = {
  BASE_URL: process.env.STRAPI_URL || 'http://localhost:1337',
  API_TOKEN: process.env.STRAPI_API_TOKEN,
  PUBLIC_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  DEFAULT_REVALIDATE: 60, // seconds
  IMAGE_FORMATS: ['thumbnail', 'small', 'medium', 'large'] as const,
  UPLOAD_BREAKPOINTS: [64, 500, 750, 1200, 1920] as const
}

// Helper to get request headers with auth token
export function getRequestHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (API_CONFIG.API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_CONFIG.API_TOKEN}`
  }
  
  return headers
}

// Environment Variables Required
export const ENV_VARS = {
  // Backend (Server-side only)
  STRAPI_URL: 'Full Strapi URL for server-side fetching (e.g., http://localhost:1337)',
  STRAPI_API_TOKEN: 'Read-only API token from Strapi admin panel',
  
  // Frontend (Public)
  NEXT_PUBLIC_STRAPI_URL: 'Strapi URL for client-side requests (same as STRAPI_URL for most cases)'
} as const

// API Endpoint Definitions
export const API_ENDPOINTS = {
  // Single Types
  LANDING_PAGE: '/landing-page',
  SITE_SETTINGS: '/site-setting',
  NAVIGATION: '/navigation',
  
  // Collection Types  
  PRODUCTS: '/products',
  PRODUCT_CATEGORIES: '/product-categories',
  CERTIFICATIONS: '/certifications',
  BLOG_POSTS: '/blog-posts',
  TESTIMONIALS: '/testimonials',
  FACILITIES: '/facilities',
  PROCESS_STEPS: '/process-steps',
  GLOBAL_PARTNERS: '/global-partners',
  STATS: '/stats',
  
  // Dynamic endpoints
  PRODUCT_BY_SLUG: (slug: string) => `/products?filters[slug][$eq]=${slug}`,
  BLOG_POST_BY_SLUG: (slug: string) => `/blog-posts?filters[slug][$eq]=${slug}`,
  STATS_BY_SECTION: (section: 'home' | 'about') => `/stats?filters[section][$eq]=${section}`,
  PRODUCTS_BY_CATEGORY: (categorySlug: string) => `/products?filters[category][slug][$eq]=${categorySlug}`,
  FEATURED_PRODUCTS: () => `/products?filters[featured][$eq]=true`,
  FEATURED_TESTIMONIALS: () => `/testimonials?filters[featured][$eq]=true`,
  RECENT_BLOG_POSTS: (limit: number = 3) => `/blog-posts?sort[0]=publishedAt:desc&pagination[pageSize]=${limit}`
} as const

// Query Shapes with Populate
export const QUERY_SHAPES = {
  // Landing Page - Complete homepage data
  getLandingPage: {
    endpoint: API_ENDPOINTS.LANDING_PAGE,
    populate: {
      hero: {
        populate: {
          backgroundImage: true,
          ctaButton: true
        }
      },
      homeStats: true,
      aboutSection: {
        populate: {
          image: true
        }
      },
      featuredProducts: {
        populate: {
          image: true,
          category: true
        }
      },
      ctaSection: {
        populate: {
          backgroundImage: true,
          primaryButton: true
        }
      },
      seo: {
        populate: {
          metaImage: true
        }
      }
    },
    returnType: 'LandingPage' as const
  },
  
  // Products - All products with full relations
  getProducts: {
    endpoint: API_ENDPOINTS.PRODUCTS,
    populate: {
      image: true,
      category: true,
      gallery: true,
      seo: {
        populate: {
          metaImage: true
        }
      }
    },
    sort: ['order:asc'],
    returnType: 'Product[]' as const
  },
  
  // Product Categories
  getProductCategories: {
    endpoint: API_ENDPOINTS.PRODUCT_CATEGORIES,
    populate: {
      image: true
    },
    returnType: 'ProductCategory[]' as const
  },
  
  // Blog Posts
  getBlogPosts: {
    endpoint: API_ENDPOINTS.BLOG_POSTS,
    populate: {
      coverImage: true,
      seo: {
        populate: {
          metaImage: true
        }
      }
    },
    sort: ['publishedAt:desc'],
    returnType: 'BlogPost[]' as const
  },
  
  // Testimonials
  getTestimonials: {
    endpoint: API_ENDPOINTS.TESTIMONIALS,
    populate: {
      avatar: true
    },
    sort: ['order:asc'],
    returnType: 'Testimonial[]' as const
  },
  
  // Facilities
  getFacilities: {
    endpoint: API_ENDPOINTS.FACILITIES,
    populate: {
      image: true
    },
    sort: ['order:asc'],
    returnType: 'Facility[]' as const
  },
  
  // Process Steps
  getProcessSteps: {
    endpoint: API_ENDPOINTS.PROCESS_STEPS,
    sort: ['order:asc'],
    returnType: 'ProcessStep[]' as const
  },
  
  // Global Partners
  getGlobalPartners: {
    endpoint: API_ENDPOINTS.GLOBAL_PARTNERS,
    sort: ['order:asc'],
    returnType: 'GlobalPartner[]' as const
  },
  
  // Stats - by section
  getHomeStats: {
    endpoint: API_ENDPOINTS.STATS_BY_SECTION('home'),
    sort: ['order:asc'],
    returnType: 'Stat[]' as const
  },
  
  getAboutStats: {
    endpoint: API_ENDPOINTS.STATS_BY_SECTION('about'),
    sort: ['order:asc'],
    returnType: 'Stat[]' as const
  },
  
  // Site Settings
  getSiteSettings: {
    endpoint: API_ENDPOINTS.SITE_SETTINGS,
    populate: {
      logo: true,
      footerLogo: true,
      socialLinks: true,
      defaultSeo: {
        populate: {
          metaImage: true
        }
      }
    },
    returnType: 'SiteSettings' as const
  },
  
  // Navigation
  getNavigation: {
    endpoint: API_ENDPOINTS.NAVIGATION,
    populate: {
      mainNav: {
        populate: {
          children: true
        }
      },
      footerCompanyLinks: true,
      footerProductLinks: true,
      footerContactLinks: true
    },
    returnType: 'Navigation' as const
  }
} as const

// Media URL Formats
export const MEDIA_CONFIG = {
  // Strapi media URL construction
  getMediaUrl: (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${API_CONFIG.PUBLIC_URL}${url}`
  },
  
  // Responsive image props for Next.js Image
  getImageProps: (media: any, alt?: string) => {
    if (!media) return null
    
    return {
      src: media.url.startsWith('http') ? media.url : `${API_CONFIG.PUBLIC_URL}${media.url}`,
      alt: alt || media.alternativeText || media.name || '',
      width: media.width || 1200,
      height: media.height || 800,
      ...(media.formats && {
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      })
    }
  }
} as const

// HTTP Status Codes for API responses
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const

// Legacy exports for backward compatibility
export const POPULATE_QUERIES = QUERY_SHAPES
export const CACHE_TAGS = {
  landingPage: 'landing-page',
  siteSettings: 'site-settings', 
  navigation: 'navigation',
  products: 'products',
  productCategories: 'product-categories',
  blogPosts: 'blog-posts',
  testimonials: 'testimonials',
  facilities: 'facilities',
  processSteps: 'process-steps',
  globalPartners: 'global-partners',
  stats: 'stats'
} as const

// Type exports for usage in query functions
export type QueryShape = keyof typeof QUERY_SHAPES
export type EndpointKey = keyof typeof API_ENDPOINTS