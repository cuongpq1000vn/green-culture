/**
 * Products Queries
 * 
 * Handles fetching product data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchStrapiSingle, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackProducts, fallbackProductCategories, fallbackCertifications } from '../fallbacks';
import type { 
  ProductsResponse, 
  ProductResponse, 
  ProductCategoriesResponse, 
  CertificationsResponse,
  Product,
  ProductCategory,
  Certification
} from '../types';

/**
 * Get all products with optional filtering
 */
export async function getProducts(options: {
  featured?: boolean;
  category?: string;
  limit?: number;
} = {}) {
  return fetchWithFallback(
    async () => {
      const filters: Record<string, any> = {};
      
      if (options.featured) {
        filters.featured = true;
      }
      
      if (options.category) {
        filters.category = {
          slug: { $eq: options.category }
        };
      }

      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.products,
        {
          populate: POPULATE_QUERIES.products.populate,
          sort: POPULATE_QUERIES.products.sort,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
          pagination: options.limit ? { pageSize: options.limit } : undefined,
          revalidate: 1800, // 30 minutes
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data;
    },
    // Apply fallback filtering
    fallbackProducts.filter(product => {
      if (options.featured && !product.featured) return false;
      if (options.category && product.category?.slug !== options.category) return false;
      return true;
    }).slice(0, options.limit || fallbackProducts.length),
    'Products fetch'
  );
}

/**
 * Get featured products for home page
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true, limit: 4 });
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string) {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.products,
        {
          populate: POPULATE_QUERIES.productDetail.populate,
          filters: {
            slug: { $eq: slug }
          },
          pagination: { pageSize: 1 },
          revalidate: 1800,
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data[0] || null;
    },
    fallbackProducts.find(product => product.slug === slug) || null,
    `Product fetch for slug: ${slug}`
  );
}

/**
 * Get all product categories
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductCategoriesResponse>(
        API_ENDPOINTS.productCategories,
        {
          populate: POPULATE_QUERIES.productCategories.populate,
          sort: POPULATE_QUERIES.productCategories.sort,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.productCategories],
          },
        }
      );

      return response.data;
    },
    fallbackProductCategories,
    'Product categories fetch'
  );
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts({ category: categorySlug });
}

/**
 * Get all certifications
 */
export async function getCertifications(): Promise<Certification[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<CertificationsResponse>(
        API_ENDPOINTS.certifications,
        {
          populate: {
            logo: true,
          },
          sort: ['name:asc'],
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.certifications],
          },
        }
      );

      return response.data;
    },
    fallbackCertifications,
    'Certifications fetch'
  );
}