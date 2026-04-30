/**
 * Blog Queries
 * 
 * Handles fetching blog post data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackBlogPosts } from '../fallbacks';
import type { BlogPostsResponse, BlogPost } from '../types';

/**
 * Get all blog posts with optional filtering and pagination
 */
export async function getBlogPosts(options: {
  featured?: boolean;
  category?: string;
  limit?: number;
  page?: number;
} = {}) {
  return fetchWithFallback(
    async () => {
      const filters: Record<string, any> = {};
      
      if (options.featured) {
        filters.featured = true;
      }
      
      if (options.category) {
        filters.category = { $eq: options.category };
      }

      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.blogPosts,
        {
          populate: POPULATE_QUERIES.blogPosts.populate,
          sort: POPULATE_QUERIES.blogPosts.sort,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
          pagination: {
            page: options.page || 1,
            pageSize: options.limit || 10,
          },
          revalidate: 1800, // 30 minutes
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data;
    },
    // Apply fallback filtering
    fallbackBlogPosts.filter(post => {
      if (options.featured && !post.featured) return false;
      if (options.category && post.category !== options.category) return false;
      return true;
    }).slice(0, options.limit || fallbackBlogPosts.length),
    'Blog posts fetch'
  );
}

/**
 * Get featured blog posts for home page
 */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return getBlogPosts({ featured: true, limit });
}

/**
 * Get latest blog posts
 */
export async function getLatestBlogPosts(limit = 6): Promise<BlogPost[]> {
  return getBlogPosts({ limit });
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.blogPosts,
        {
          populate: POPULATE_QUERIES.blogPostDetail.populate,
          filters: {
            slug: { $eq: slug }
          },
          pagination: { pageSize: 1 },
          revalidate: 1800,
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data[0] || null;
    },
    fallbackBlogPosts.find(post => post.slug === slug) || null,
    `Blog post fetch for slug: ${slug}`
  );
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(
  category: string, 
  options: { limit?: number; page?: number } = {}
): Promise<BlogPost[]> {
  return getBlogPosts({ 
    category, 
    limit: options.limit, 
    page: options.page 
  });
}

/**
 * Get available blog categories (derived from posts)
 */
export async function getBlogCategories(): Promise<string[]> {
  return fetchWithFallback(
    async () => {
      // In a real implementation, this might be a separate content type
      // For now, we'll derive it from the blog posts
      const posts = await getBlogPosts();
      const categories = new Set(posts.map(post => post.category));
      return Array.from(categories).sort();
    },
    ['Industry News', 'Sustainability', 'Technology', 'Company News'],
    'Blog categories fetch'
  );
}