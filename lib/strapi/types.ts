// Strapi CMS Type Definitions
// Generated from CMS-CONVERSION-PLAN.md

export interface StrapiMedia {
  id: number
  url: string
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
}

export interface StrapiImageFormat {
  url: string
  width: number
  height: number
  size: number
}

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Shared Components
export interface CtaButton {
  id: number
  text: string
  url?: string
  isExternal: boolean
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
}

export interface Link {
  id: number
  label: string
  href: string
  icon?: string
  openInNewTab: boolean
}

export interface NavItem {
  id: number
  label: string
  href: string
  children?: Link[]
}

export interface SeoComponent {
  id: number
  metaTitle?: string
  metaDescription?: string
  metaImage?: StrapiMedia
  metaSocial?: Array<{
    id: number
    socialNetwork: string
    title: string
    description: string
    image?: StrapiMedia
  }>
}

// Section Components
export interface HeroSection {
  id: number
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: StrapiMedia
  backgroundVideo?: StrapiMedia
  ctaButton?: CtaButton
  secondaryButton?: CtaButton
  alignment?: 'left' | 'center' | 'right'
  overlay?: boolean
  overlayOpacity?: number
}

export interface CTASection {
  id: number
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: StrapiMedia
  primaryButton?: CtaButton
  secondaryButton?: CtaButton
  alignment?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark' | 'primary'
  overlay?: boolean
  overlayOpacity?: number
}

// Keep alias for backwards compatibility
export type CtaSection = CTASection

export interface AboutSection {
  id: number
  title: string
  subtitle?: string
  content: string
  image?: StrapiMedia
}

// Collection Types
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  shortDescription?: string
  specifications?: string
  origin?: string
  featured: boolean
  order: number
  image?: StrapiMedia
  gallery?: StrapiMedia[]
  category?: ProductCategory
  seo?: SeoComponent
  createdAt: string
  updatedAt: string
  publishedAt: string
  // Computed/display properties for UI compatibility
  title?: string
  varieties?: string[]
  certifications?: string[]
  packaging?: string
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  image?: StrapiMedia
  products?: Product[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Certification {
  id: number
  name: string
  slug?: string
  description?: string
  logo?: StrapiMedia
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage: StrapiMedia
  category: 'Industry News' | 'Sustainability' | 'Technology' | 'Company News'
  publishedAt: string
  author?: string
  featured: boolean
  seo?: SeoComponent
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: number
  quote: string
  authorName: string
  company: string
  country: string
  avatar?: StrapiMedia
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface GlobalPartner {
  id: number
  country: string
  flagEmoji?: string
  partnerCount?: number
  yearsCooperation?: string
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Facility {
  id: number
  title: string
  description?: string
  image: StrapiMedia
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ProcessStep {
  id: number
  stepNumber: string
  title: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Stat {
  id: number
  value: string
  label: string
  section: 'home' | 'about'
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Single Types
export interface LandingPage {
  id: number
  documentId?: string
  hero?: HeroSection
  homeStats?: Stat[]
  aboutSection?: AboutSection
  featuredProducts?: Product[]
  facilitiesSection?: { 
    title: string; 
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
  }
  processSection?: { title: string; subtitle?: string }
  partnersSection?: { title: string; subtitle?: string }
  testimonialsSection?: { title: string; subtitle?: string }
  blogSection?: { title: string; subtitle?: string }
  ctaSection?: CTASection
  seo?: SeoComponent
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface SiteSettings {
  id: number
  siteName: string
  siteDescription?: string
  logo: StrapiMedia
  logoAlt?: string
  favicon?: StrapiMedia
  companyInfo?: any  // JSON field
  contactInfo?: any  // JSON field
  socialLinks?: any  // JSON field
  footerText?: string  // Rich text
  copyrightText?: string
  defaultSeo?: SeoComponent
  gtmId?: string
  gaId?: string
  primaryColor?: string
  secondaryColor?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Navigation {
  id: number
  mainNav: NavItem[]
  footerCompanyLinks?: Link[]
  footerProductLinks?: Link[]
  footerContactLinks?: Link[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Response Types for Strapi API
export type StatResponse = StrapiResponse<Stat>
export type ProductResponse = StrapiResponse<Product>
export type SiteSettingsResponse = StrapiResponse<SiteSettings>
export type NavigationResponse = StrapiResponse<Navigation>
export type LandingPageResponse = StrapiResponse<LandingPage>
export type BlogPostResponse = StrapiResponse<BlogPost>
export type TestimonialResponse = StrapiResponse<Testimonial>
export type FacilityResponse = StrapiResponse<Facility>
export type ProcessStepResponse = StrapiResponse<ProcessStep>
export type GlobalPartnerResponse = StrapiResponse<GlobalPartner>
export type ProductCategoryResponse = StrapiResponse<ProductCategory>
export type CertificationResponse = StrapiResponse<Certification>

// Collection Response Types
export type StatsResponse = StrapiResponse<Stat[]>
export type ProductsResponse = StrapiResponse<Product[]>
export type BlogPostsResponse = StrapiResponse<BlogPost[]>
export type TestimonialsResponse = StrapiResponse<Testimonial[]>
export type FacilitiesResponse = StrapiResponse<Facility[]>
export type ProcessStepsResponse = StrapiResponse<ProcessStep[]>
export type GlobalPartnersResponse = StrapiResponse<GlobalPartner[]>
export type ProductCategoriesResponse = StrapiResponse<ProductCategory[]>
export type CertificationsResponse = StrapiResponse<Certification[]>

// API Populate Shapes
export interface PopulateShapes {
  landingPage: {
    populate: {
      heroSection: {
        populate: {
          backgroundImage: true
          ctaButton: true
        }
      }
      statsBar: {
        sort: ['order:asc']
      }
      featuredProducts: {
        populate: {
          image: true
          category: true
          certifications: true
        }
        sort: ['order:asc']
      }
      ctaSection: {
        populate: {
          backgroundImage: true
          ctaButton: true
        }
      }
      seo: {
        populate: {
          metaImage: true
        }
      }
    }
  }
  
  products: {
    populate: {
      image: true
      category: true
      certifications: {
        populate: {
          logo: true
        }
      }
      seo: {
        populate: {
          metaImage: true
        }
      }
    }
    sort: ['order:asc']
  }
  
  blogPosts: {
    populate: {
      coverImage: true
      seo: {
        populate: {
          metaImage: true
        }
      }
    }
    sort: ['publishedAt:desc']
  }
  
  testimonials: {
    populate: {
      avatar: true
    }
    sort: ['order:asc']
  }
  
  facilities: {
    populate: {
      image: true
    }
    sort: ['order:asc']
  }
  
  processSteps: {
    sort: ['order:asc']
  }
  
  globalPartners: {
    sort: ['order:asc']
  }
  
  siteSettings: {
    populate: {
      logo: true
      footerLogo: true
      socialLinks: true
      defaultSeo: {
        populate: {
          metaImage: true
        }
      }
    }
  }
  
  navigation: {
    populate: {
      mainNav: {
        populate: {
          children: true
        }
      }
      footerCompanyLinks: true
      footerProductLinks: true
      footerContactLinks: true
    }
  }
}