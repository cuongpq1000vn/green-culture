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
        API_ENDPOINTS.facilities,
        {
          populate: POPULATE_QUERIES.facilities.populate,
          sort: POPULATE_QUERIES.facilities.sort,
          revalidate: 3600, // 1 hour
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
 * Get facility by ID or slug
 */
export async function getFacilityById(id: number | string): Promise<Facility | null> {
  return fetchWithFallback(
    async () => {
      const facilities = await getFacilities();
      const facility = facilities.find(f => 
        f.id === id || (typeof id === 'string' && f.title.toLowerCase().includes(id.toLowerCase()))
      );
      return facility || null;
    },
    fallbackFacilities.find(f => 
      f.id === id || (typeof id === 'string' && f.title.toLowerCase().includes(id.toLowerCase()))
    ) || null,
    `Facility fetch for ID: ${id}`
  );
}

/**
 * Get all process steps
 */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiCollection<ProcessStepsResponse>(
        API_ENDPOINTS.processSteps,
        {
          populate: POPULATE_QUERIES.processSteps.populate,
          sort: POPULATE_QUERIES.processSteps.sort,
          revalidate: 3600, // 1 hour
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

/**
 * Get process step by number or ID
 */
export async function getProcessStepById(id: number | string): Promise<ProcessStep | null> {
  return fetchWithFallback(
    async () => {
      const steps = await getProcessSteps();
      const step = steps.find(s => 
        s.id === id || s.stepNumber === id || s.stepNumber === String(id).padStart(2, '0')
      );
      return step || null;
    },
    fallbackProcessSteps.find(s => 
      s.id === id || s.stepNumber === id || s.stepNumber === String(id).padStart(2, '0')
    ) || null,
    `Process step fetch for ID: ${id}`
  );
}

/**
 * Get factory overview data combining facilities and process steps
 */
export async function getFactoryOverview() {
  return fetchWithFallback(
    async () => {
      const [facilities, processSteps] = await Promise.all([
        getFacilities(),
        getProcessSteps(),
      ]);

      return {
        facilities,
        processSteps,
        totalFacilities: facilities.length,
        totalProcessSteps: processSteps.length,
      };
    },
    {
      facilities: fallbackFacilities,
      processSteps: fallbackProcessSteps,
      totalFacilities: fallbackFacilities.length,
      totalProcessSteps: fallbackProcessSteps.length,
    },
    'Factory overview fetch'
  );
}