/**
 * Testimonials Queries
 * 
 * Handles fetching testimonial data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackTestimonials } from '../fallbacks';
import type { TestimonialsResponse, Testimonial } from '../types';

/**
 * Get all testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<TestimonialsResponse>(
        API_ENDPOINTS.TESTIMONIALS,
        {
          populate: POPULATE_QUERIES.getTestimonials.populate,
          sort: POPULATE_QUERIES.getTestimonials.sort,
          revalidate: 3600, // 1 hour - testimonials don't change often
          next: {
            tags: [CACHE_TAGS.testimonials],
          },
        }
      );

      return response.data;
    },
    fallbackTestimonials,
    'Testimonials fetch'
  );
}

/**
 * Get featured testimonials only
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<TestimonialsResponse>(
        API_ENDPOINTS.FEATURED_TESTIMONIALS(),
        {
          populate: POPULATE_QUERIES.getTestimonials.populate,
          sort: POPULATE_QUERIES.getTestimonials.sort,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.testimonials],
          },
        }
      );

      return response.data;
    },
    fallbackTestimonials.filter(t => t.featured),
    'Featured testimonials fetch'
  );
}