/**
 * Testimonials & Partners Queries
 * 
 * Handles fetching testimonial and global partner data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackTestimonials, fallbackGlobalPartners } from '../fallbacks';
import type { TestimonialsResponse, GlobalPartnersResponse, Testimonial, GlobalPartner } from '../types';

/**
 * Get all testimonials with optional filtering
 */
export async function getTestimonials(options: {
  featured?: boolean;
  limit?: number;
} = {}) {
  return fetchWithFallback(
    async () => {
      const filters: Record<string, any> = {};
      
      if (options.featured) {
        filters.featured = true;
      }

      const response = await fetchStrapiCollection<TestimonialsResponse>(
        API_ENDPOINTS.testimonials,
        {
          populate: POPULATE_QUERIES.testimonials.populate,
          sort: POPULATE_QUERIES.testimonials.sort,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
          pagination: options.limit ? { pageSize: options.limit } : undefined,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.testimonials],
          },
        }
      );

      return response.data;
    },
    // Apply fallback filtering
    fallbackTestimonials.filter(testimonial => {
      if (options.featured && !testimonial.featured) return false;
      return true;
    }).slice(0, options.limit || fallbackTestimonials.length),
    'Testimonials fetch'
  );
}

/**
 * Get featured testimonials for carousel display
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return getTestimonials({ featured: true });
}

/**
 * Get testimonials by country
 */
export async function getTestimonialsByCountry(country: string): Promise<Testimonial[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<TestimonialsResponse>(
        API_ENDPOINTS.testimonials,
        {
          populate: POPULATE_QUERIES.testimonials.populate,
          sort: POPULATE_QUERIES.testimonials.sort,
          filters: {
            country: { $eq: country }
          },
          revalidate: 3600,
          next: {
            tags: [CACHE_TAGS.testimonials],
          },
        }
      );

      return response.data;
    },
    fallbackTestimonials.filter(testimonial => testimonial.country === country),
    `Testimonials fetch for country: ${country}`
  );
}

/**
 * Get all global partners
 */
export async function getGlobalPartners(): Promise<GlobalPartner[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<GlobalPartnersResponse>(
        API_ENDPOINTS.globalPartners,
        {
          populate: POPULATE_QUERIES.globalPartners,
          sort: POPULATE_QUERIES.globalPartners.sort,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.globalPartners],
          },
        }
      );

      return response.data;
    },
    fallbackGlobalPartners,
    'Global partners fetch'
  );
}

/**
 * Get partner statistics (derived from global partners data)
 */
export async function getPartnerStatistics() {
  return fetchWithFallback(
    async () => {
      const partners = await getGlobalPartners();
      
      const totalPartners = partners.reduce((sum, partner) => sum + partner.partnerCount, 0);
      const totalCountries = partners.length;
      const averageCooperation = Math.round(
        partners.reduce((sum, partner) => {
          const years = parseInt(partner.yearsCooperation.replace('+', ''));
          return sum + years;
        }, 0) / partners.length
      );

      return {
        totalPartners,
        totalCountries,
        averageCooperation,
      };
    },
    {
      totalPartners: 60,
      totalCountries: 6,
      averageCooperation: 6,
    },
    'Partner statistics calculation'
  );
}