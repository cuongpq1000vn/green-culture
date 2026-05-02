/**
 * Facilities & Process Queries
 * 
 * Handles fetching facility and process step data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiCollection, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackFacilities, fallbackProcessSteps } from '../fallbacks';
import type { FacilitiesResponse, ProcessStepsResponse, Facility, ProcessStep } from '../types';

/**
 * Get all facilities
 */
export async function getFacilities(): Promise<Facility[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<FacilitiesResponse>(
        API_ENDPOINTS.FACILITIES,
        {
          populate: POPULATE_QUERIES.getFacilities.populate,
          sort: POPULATE_QUERIES.getFacilities.sort,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.facilities],
          },
        }
      );

      return response.data;
    },
    fallbackFacilities,
    'Facilities fetch'
  );
}

/**
 * Get all process steps
 */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProcessStepsResponse>(
        API_ENDPOINTS.PROCESS_STEPS,
        {
          populate: POPULATE_QUERIES.getProcessSteps.populate,
          sort: POPULATE_QUERIES.getProcessSteps.sort,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.processSteps],
          },
        }
      );

      return response.data;
    },
    fallbackProcessSteps,
    'Process steps fetch'
  );
}