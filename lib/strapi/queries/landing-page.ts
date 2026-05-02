/**
 * Landing Page Queries
 * 
 * Handles fetching landing page data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiSingle, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackLandingPage, fallbackStats } from '../fallbacks';
import type { LandingPageResponse, StatsResponse, LandingPage, Stat } from '../types';

/**
 * Get complete landing page data
 */
export async function getLandingPage(): Promise<LandingPage> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<LandingPageResponse>(
        API_ENDPOINTS.LANDING_PAGE,
        {
          populate: POPULATE_QUERIES.getLandingPage.populate,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.landingPage],
          },
        }
      );

      return response.data;
    },
    fallbackLandingPage,
    'Landing page fetch'
  );
}

/**
 * Get home page statistics
 */
export async function getHomeStats(): Promise<Stat[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<StatsResponse>(
        API_ENDPOINTS.STATS_BY_SECTION('home'),
        {
          populate: POPULATE_QUERIES.getHomeStats.populate,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.stats],
          },
        }
      );

      return response.data;
    },
    fallbackStats,
    'Home stats fetch'
  );
}

/**
 * Get about page statistics  
 */
export async function getAboutStats(): Promise<Stat[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<StatsResponse>(
        API_ENDPOINTS.STATS_BY_SECTION('about'),
        {
          populate: POPULATE_QUERIES.getAboutStats.populate,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.stats],
          },
        }
      );

      return response.data;
    },
    fallbackStats, // Reuse fallback for now
    'About stats fetch'
  );
}