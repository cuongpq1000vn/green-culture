/**
 * Global Partners Queries
 * 
 * Handles fetching global partner data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackGlobalPartners } from '../fallbacks';
import type { GlobalPartnersResponse, GlobalPartner } from '../types';

/**
 * Get all global partners
 */
export async function getGlobalPartners(): Promise<GlobalPartner[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<GlobalPartnersResponse>(
        API_ENDPOINTS.GLOBAL_PARTNERS,
        {
          populate: POPULATE_QUERIES.getGlobalPartners.populate,
          sort: POPULATE_QUERIES.getGlobalPartners.sort,
          revalidate: 0, // No caching - always fetch fresh data
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