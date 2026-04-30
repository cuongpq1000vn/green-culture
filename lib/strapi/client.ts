/**
 * Strapi API Client
 * 
 * Base client for fetching data from Strapi with built-in error handling,
 * ISR revalidation, and TypeScript support.
 */

import { API_CONFIG, getRequestHeaders } from './api-contract';

// Custom error class for Strapi API errors
export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

/**
 * Helper to flatten nested populate objects for Strapi v5 query format
 * Converts { hero: { populate: { backgroundImage: true } } }
 * to populate[hero][populate][backgroundImage]=true
 * 
 * In Strapi 5, using '*' for media fields causes errors because it tries
 * to populate nested 'related' fields that don't exist. Use 'true' instead.
 */
function flattenPopulate(
  obj: Record<string, any>,
  prefix: string,
  params: URLSearchParams
): void {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = `${prefix}[${key}]`;
    
    if (value === true) {
      // Use 'true' instead of '*' to avoid Strapi 5 deep populate errors
      params.set(newKey, 'true');
    } else if (typeof value === 'object' && value !== null) {
      flattenPopulate(value, newKey, params);
    } else if (value !== undefined && value !== null) {
      params.set(newKey, String(value));
    }
  }
}

// Base fetch function with error handling and authentication
export async function fetchStrapi<T>(
  endpoint: string,
  options: {
    cache?: 'force-cache' | 'no-store';
    revalidate?: number;
    next?: {
      revalidate?: number;
      tags?: string[];
    };
    query?: Record<string, any>;
  } = {}
): Promise<T> {
  const {
    cache = 'force-cache',
    revalidate = API_CONFIG.DEFAULT_REVALIDATE,
    next,
    query = {},
  } = options;

  try {
    // Build URL with query parameters
    const url = new URL(`${API_CONFIG.BASE_URL}/api${endpoint}`);
    
    // Add query parameters - use Strapi v5 format
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'sort' && Array.isArray(value)) {
          // Strapi v5: sort[0]=field:asc
          value.forEach((sortItem, index) => {
            url.searchParams.set(`sort[${index}]`, String(sortItem));
          });
        } else if (key === 'populate') {
          // For deep population in Strapi v5, we need to populate each component/relation
          // Use deep=true to populate all nested relations
          if (typeof value === 'object' && value !== null) {
            // Convert nested populate object to Strapi v5 format
            // populate[hero][populate]=* for nested components
            flattenPopulate(value, 'populate', url.searchParams);
          } else {
            url.searchParams.set('populate', '*');
          }
        } else if (typeof value === 'object') {
          url.searchParams.set(key, JSON.stringify(value));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    });

    // Configure fetch options
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: getRequestHeaders(),
      cache,
      ...(revalidate && { next: { revalidate, ...next } }),
    };

    console.log(`Fetching from Strapi: ${url.toString()}`);

    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new StrapiError(
        `HTTP ${response.status}: ${errorData.error?.message || response.statusText}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data as T;

  } catch (error) {
    // Re-throw StrapiError as-is
    if (error instanceof StrapiError) {
      throw error;
    }

    // Handle network errors, parsing errors, etc.
    console.error('Strapi fetch error:', error);
    throw new StrapiError(
      `Failed to fetch from Strapi: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      error
    );
  }
}

// Specialized fetch for collections with pagination support
export async function fetchStrapiCollection<T>(
  endpoint: string,
  options: {
    populate?: Record<string, any>;
    sort?: string[];
    filters?: Record<string, any>;
    pagination?: {
      page?: number;
      pageSize?: number;
    };
    cache?: 'force-cache' | 'no-store';
    revalidate?: number;
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  } = {}
) {
  const {
    populate,
    sort,
    filters,
    pagination,
    ...fetchOptions
  } = options;

  const query: Record<string, any> = {};

  if (populate) {
    query.populate = populate;
  }

  if (sort && sort.length > 0) {
    query.sort = sort;
  }

  if (filters) {
    query.filters = filters;
  }

  if (pagination) {
    if (pagination.page) {
      query['pagination[page]'] = pagination.page;
    }
    if (pagination.pageSize) {
      query['pagination[pageSize]'] = pagination.pageSize;
    }
  }

  return fetchStrapi<T>(endpoint, {
    ...fetchOptions,
    query,
  });
}

// Specialized fetch for single types
export async function fetchStrapiSingle<T>(
  endpoint: string,
  options: {
    populate?: Record<string, any>;
    cache?: 'force-cache' | 'no-store';
    revalidate?: number;
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  } = {}
) {
  const { populate, ...fetchOptions } = options;

  const query: Record<string, any> = {};
  
  if (populate) {
    query.populate = populate;
  }

  return fetchStrapi<T>(endpoint, {
    ...fetchOptions,
    query,
  });
}

// Check if Strapi is available
export async function checkStrapiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/content-manager/content-types`, {
      headers: getRequestHeaders(),
    });
    return response.ok;
  } catch (error) {
    console.warn('Strapi health check failed:', error);
    return false;
  }
}

// Utility for graceful fallback handling
export async function fetchWithFallback<T, F>(
  fetcher: () => Promise<T>,
  fallback: F,
  logPrefix = 'Strapi fetch'
): Promise<T | F> {
  try {
    const result = await fetcher();
    // Check if result is empty array - treat as failed fetch
    if (Array.isArray(result) && result.length === 0) {
      console.warn(`${logPrefix} returned empty array, using fallback`);
      return fallback;
    }
    console.log(`${logPrefix} successful, got:`, Array.isArray(result) ? `${result.length} items` : 'data');
    return result;
  } catch (error) {
    console.warn(`${logPrefix} failed, using fallback:`, error instanceof Error ? error.message : error);
    return fallback;
  }
}