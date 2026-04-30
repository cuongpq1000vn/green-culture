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
 * Get all blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.BLOG_POSTS,
        {
          populate: POPULATE_QUERIES.getBlogPosts.populate,
          sort: POPULATE_QUERIES.getBlogPosts.sort,
          revalidate: 1800, // 30 minutes
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data;
    },
    fallbackBlogPosts,
    'Blog posts fetch'
  );
}

/**
 * Get recent blog posts (limited)
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.RECENT_BLOG_POSTS(limit),
        {
          populate: POPULATE_QUERIES.getBlogPosts.populate,
          revalidate: 1800, // 30 minutes
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data;
    },
    fallbackBlogPosts.slice(0, limit),
    'Recent blog posts fetch'
  );
}

/**
 * Get single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.BLOG_POST_BY_SLUG(slug),
        {
          populate: POPULATE_QUERIES.getBlogPosts.populate,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data[0] || null;
    },
    fallbackBlogPosts.find(p => p.slug === slug) || null,
    'Blog post by slug fetch'
  );
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<BlogPostsResponse>(
        API_ENDPOINTS.BLOG_POSTS + '?filters[featured][$eq]=true',
        {
          populate: POPULATE_QUERIES.getBlogPosts.populate,
          sort: POPULATE_QUERIES.getBlogPosts.sort,
          revalidate: 1800, // 30 minutes
          next: {
            tags: [CACHE_TAGS.blogPosts],
          },
        }
      );

      return response.data;
    },
    fallbackBlogPosts.filter(p => p.featured),
    'Featured blog posts fetch'
  );
}