/**
 * Strapi Queries Index
 * 
 * Central export point for all query functions
 * Provides easy access to data fetching functions across the application
 */

// Landing page queries
export {
  getLandingPage,
  getHeroSection,
  getCTASection,
  getHomeStats,
  getAboutStats,
} from './landing-page';

// Products queries
export {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductCategories,
  getProductsByCategory,
  getCertifications,
} from './products';

// Blog queries
export {
  getBlogPosts,
  getFeaturedBlogPosts,
  getLatestBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getBlogCategories,
} from './blog';

// Testimonials & partners queries
export {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialsByCountry,
  getGlobalPartners,
  getPartnerStatistics,
} from './testimonials';

// Facilities & process queries
export {
  getFacilities,
  getFacilityById,
  getProcessSteps,
  getProcessStepById,
  getFactoryOverview,
} from './facilities';

// Settings & navigation queries
export {
  getSiteSettings,
  getNavigation,
  getMainNavigation,
  getFooterNavigation,
  getHeaderData,
  getFooterData,
} from './settings';

// Convenience exports for common page data combinations
export const pageQueries = {
  // Home page data
  home: async () => {
    const [landingPage, featuredProducts, homeStats, testimonials] = await Promise.all([
      getLandingPage(),
      getFeaturedProducts(),
      getHomeStats(),
      getFeaturedTestimonials(),
    ]);

    return {
      landingPage,
      featuredProducts,
      stats: homeStats,
      testimonials,
    };
  },

  // About page data
  about: async () => {
    const [aboutStats, testimonials, globalPartners] = await Promise.all([
      getAboutStats(),
      getFeaturedTestimonials(),
      getGlobalPartners(),
    ]);

    return {
      stats: aboutStats,
      testimonials,
      globalPartners,
    };
  },

  // Products page data
  products: async () => {
    const [products, categories, certifications] = await Promise.all([
      getProducts(),
      getProductCategories(),
      getCertifications(),
    ]);

    return {
      products,
      categories,
      certifications,
    };
  },

  // Factory page data
  factory: async () => {
    return getFactoryOverview();
  },

  // News page data
  news: async (page = 1, limit = 10) => {
    const [posts, categories] = await Promise.all([
      getBlogPosts({ page, limit }),
      getBlogCategories(),
    ]);

    return {
      posts,
      categories,
    };
  },

  // Layout data (for app layout)
  layout: async () => {
    const [headerData, footerData] = await Promise.all([
      getHeaderData(),
      getFooterData(),
    ]);

    return {
      header: headerData,
      footer: footerData,
    };
  },
};