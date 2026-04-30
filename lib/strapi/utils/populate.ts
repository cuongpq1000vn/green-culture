/**
 * Strapi Populate Query Utilities
 * 
 * Helper functions for building complex populate queries
 * for efficient data fetching from Strapi API.
 */

import type { PopulateQuery } from '../api-contract';

/**
 * Base populate builder that creates nested populate objects
 */
export function buildPopulateQuery(fields: string[]): Record<string, any> {
  const populate: Record<string, any> = {};

  fields.forEach(field => {
    if (field.includes('.')) {
      // Handle nested relations like 'category.image'
      const parts = field.split('.');
      let current = populate;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        if (i === parts.length - 1) {
          // Last part - just set to true
          current[part] = true;
        } else {
          // Intermediate part - create nested populate
          if (!current[part]) {
            current[part] = { populate: {} };
          }
          current = current[part].populate;
        }
      }
    } else {
      // Simple field
      populate[field] = true;
    }
  });

  return populate;
}

/**
 * Create populate query with additional options
 */
export function buildPopulateWithOptions(
  field: string,
  options: {
    sort?: string[];
    filters?: Record<string, any>;
    fields?: string[];
    populate?: Record<string, any>;
  } = {}
): Record<string, any> {
  const query: Record<string, any> = {};

  if (options.populate) {
    query.populate = options.populate;
  }

  if (options.sort) {
    query.sort = options.sort;
  }

  if (options.filters) {
    query.filters = options.filters;
  }

  if (options.fields) {
    query.fields = options.fields;
  }

  return { [field]: query };
}

/**
 * Predefined populate queries for common use cases
 */
export const COMMON_POPULATES = {
  // Basic media populate
  withImage: buildPopulateQuery(['image']),
  
  // Media gallery
  withGallery: buildPopulateQuery(['image', 'gallery']),
  
  // SEO fields
  withSEO: buildPopulateQuery(['seo.metaImage']),
  
  // Product with full details
  productComplete: {
    populate: {
      image: true,
      gallery: true,
      category: {
        populate: {
          image: true,
        },
      },
      certifications: {
        populate: {
          logo: true,
        },
        sort: ['name:asc'],
      },
      seo: {
        populate: {
          metaImage: true,
        },
      },
    },
  },
  
  // Blog post with cover
  blogPostComplete: {
    populate: {
      coverImage: true,
      seo: {
        populate: {
          metaImage: true,
        },
      },
    },
  },
  
  // Testimonial with avatar
  testimonialComplete: {
    populate: {
      avatar: true,
    },
  },
  
  // Navigation with nested links
  navigationComplete: {
    populate: {
      mainNav: {
        populate: {
          children: true,
        },
      },
      footerCompanyLinks: true,
      footerProductLinks: true,
      footerContactLinks: true,
    },
  },
  
  // Site settings with all media
  siteSettingsComplete: {
    populate: {
      logo: true,
      footerLogo: true,
      socialLinks: true,
      defaultSeo: {
        populate: {
          metaImage: true,
        },
      },
    },
  },
} as const;

/**
 * Build filters for common query patterns
 */
export const COMMON_FILTERS = {
  // Published content only
  published: {
    publishedAt: {
      $notNull: true,
    },
  },
  
  // Featured content
  featured: {
    featured: true,
  },
  
  // Active content
  active: {
    $or: [
      { isActive: { $null: true } },
      { isActive: true },
    ],
  },
  
  // By category slug
  byCategory: (slug: string) => ({
    category: {
      slug: {
        $eq: slug,
      },
    },
  }),
  
  // By date range
  byDateRange: (start: string, end: string) => ({
    publishedAt: {
      $gte: start,
      $lte: end,
    },
  }),
  
  // Search in title and description
  search: (query: string) => ({
    $or: [
      {
        title: {
          $containsi: query,
        },
      },
      {
        description: {
          $containsi: query,
        },
      },
    ],
  }),
} as const;

/**
 * Build sort parameters
 */
export const COMMON_SORTS = {
  newest: ['publishedAt:desc'],
  oldest: ['publishedAt:asc'],
  alphabetical: ['title:asc'],
  order: ['order:asc'],
  featured: ['featured:desc', 'order:asc'],
} as const;

/**
 * Combine populate, filters, and sort into a complete query
 */
export function buildCompleteQuery(options: {
  populate?: Record<string, any>;
  filters?: Record<string, any>;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}) {
  const query: Record<string, any> = {};

  if (options.populate) {
    query.populate = options.populate;
  }

  if (options.filters) {
    query.filters = options.filters;
  }

  if (options.sort) {
    query.sort = options.sort;
  }

  if (options.pagination) {
    if (options.pagination.page) {
      query['pagination[page]'] = options.pagination.page;
    }
    if (options.pagination.pageSize) {
      query['pagination[pageSize]'] = options.pagination.pageSize;
    }
  }

  return query;
}

/**
 * Utility to merge multiple filter objects
 */
export function mergeFilters(
  ...filters: (Record<string, any> | undefined)[]
): Record<string, any> {
  const validFilters = filters.filter(Boolean) as Record<string, any>[];
  
  if (validFilters.length === 0) return {};
  if (validFilters.length === 1) return validFilters[0];

  // Use $and to combine multiple filter objects
  return {
    $and: validFilters,
  };
}