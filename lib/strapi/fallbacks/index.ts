/**
 * Fallback Data Index
 * 
 * Central export point for all static fallback data
 * Used when Strapi CMS is unavailable or during development
 */

// Export all fallback data
export { 
  fallbackProducts, 
  fallbackProductCategories, 
  fallbackCertifications 
} from './products';

export { 
  fallbackLandingPage,
  fallbackHeroSection,
  fallbackCTASection,
  fallbackStats,
  fallbackAboutSection,
} from './landing-page';

export { 
  fallbackTestimonials, 
  fallbackGlobalPartners 
} from './testimonials';

export { 
  fallbackFacilities, 
  fallbackProcessSteps 
} from './facilities';

export { fallbackBlogPosts } from './blog';

export { 
  fallbackSiteSettings, 
  fallbackNavigation 
} from './settings';

// Combined exports for convenience
export const fallbackData = {
  landingPage: () => import('./landing-page').then(m => m.fallbackLandingPage),
  products: () => import('./products').then(m => m.fallbackProducts),
  productCategories: () => import('./products').then(m => m.fallbackProductCategories),
  certifications: () => import('./products').then(m => m.fallbackCertifications),
  testimonials: () => import('./testimonials').then(m => m.fallbackTestimonials),
  globalPartners: () => import('./testimonials').then(m => m.fallbackGlobalPartners),
  facilities: () => import('./facilities').then(m => m.fallbackFacilities),
  processSteps: () => import('./facilities').then(m => m.fallbackProcessSteps),
  blogPosts: () => import('./blog').then(m => m.fallbackBlogPosts),
  siteSettings: () => import('./settings').then(m => m.fallbackSiteSettings),
  navigation: () => import('./settings').then(m => m.fallbackNavigation),
  stats: () => import('./landing-page').then(m => m.fallbackStats),
};