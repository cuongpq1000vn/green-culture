/**
 * Products Queries
 * 
 * Handles fetching product data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchStrapiSingle, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackProducts, fallbackProductCategories } from '../fallbacks';
import type { ProductsResponse, ProductCategoriesResponse, ProductResponse, Product, ProductCategory } from '../types';

/**
 * Get all products with full relations
 */
export async function getProducts(): Promise<Product[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.PRODUCTS,
        {
          populate: POPULATE_QUERIES.getProducts.populate,
          sort: POPULATE_QUERIES.getProducts.sort,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data;
    },
    fallbackProducts,
    'Products fetch'
  );
}

/**
 * Get featured products only
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.FEATURED_PRODUCTS(),
        {
          populate: POPULATE_QUERIES.getProducts.populate,
          sort: POPULATE_QUERIES.getProducts.sort,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data;
    },
    fallbackProducts.filter(p => p.featured),
    'Featured products fetch'
  );
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.PRODUCT_BY_SLUG(slug),
        {
          populate: POPULATE_QUERIES.getProducts.populate,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data[0] || null;
    },
    fallbackProducts.find(p => p.slug === slug) || null,
    'Product by slug fetch'
  );
}

/**
 * Get products by category
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductsResponse>(
        API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categorySlug),
        {
          populate: POPULATE_QUERIES.getProducts.populate,
          sort: POPULATE_QUERIES.getProducts.sort,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.products],
          },
        }
      );

      return response.data;
    },
    fallbackProducts.filter(p => p.category?.slug === categorySlug),
    'Products by category fetch'
  );
}

/**
 * Get all product categories
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProductCategoriesResponse>(
        API_ENDPOINTS.PRODUCT_CATEGORIES,
        {
          populate: POPULATE_QUERIES.getProductCategories.populate,
          revalidate: 0, // No caching - always fetch fresh data
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