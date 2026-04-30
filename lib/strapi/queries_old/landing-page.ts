/**
 * Landing Page Queries
 * 
 * Handles fetching landing page data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiSingle, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackLandingPage, fallbackStats, fallbackHeroSection, fallbackCTASection } from '../fallbacks';
import type { LandingPageResponse, StatsResponse, HeroSection, CTASection, Stat } from '../types';

/**
 * Get the complete landing page data with hero, stats, and CTA sections
 */
export async function getLandingPage() {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<LandingPageResponse>(
        API_ENDPOINTS.landingPage,
        {
          populate: POPULATE_QUERIES.landingPage.populate,
          revalidate: 3600, // 1 hour
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
 * Get hero section data specifically
 */
export async function getHeroSection(): Promise<HeroSection> {
  return fetchWithFallback(
    async () => {
      const landingPage = await fetchStrapiSingle<LandingPageResponse>(
        API_ENDPOINTS.landingPage,
        {
          populate: {
            heroSection: {
              populate: {
                backgroundImage: true,
                ctaButton: true,
              },
            },
          },
          revalidate: 3600,
          next: {
            tags: [CACHE_TAGS.landingPage],
          },
        }
      );
      return landingPage.data.heroSection;
    },
    fallbackHeroSection,
    'Hero section fetch'
  );
}

/**
 * Get CTA section data
 */
export async function getCTASection(): Promise<CTASection> {
  return fetchWithFallback(
    async () => {
      const landingPage = await fetchStrapiSingle<LandingPageResponse>(
        API_ENDPOINTS.landingPage,
        {
          populate: {
            ctaSection: {
              populate: {
                backgroundImage: true,
                ctaButton: true,
              },
            },
          },
          revalidate: 3600,
          next: {
            tags: [CACHE_TAGS.landingPage],
          },
        }
      );
      return landingPage.data.ctaSection;
    },
    fallbackCTASection,
    'CTA section fetch'
  );
}

/**
 * Get stats for home page
 */
export async function getHomeStats(): Promise<Stat[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<StatsResponse>(
        API_ENDPOINTS.stats,
        {
          populate: POPULATE_QUERIES.stats,
          revalidate: 3600,
          next: {
            tags: [CACHE_TAGS.stats],
          },
        }
      );
      
      // Filter for home page stats
      return response.data.filter((stat: Stat) => 
        stat.section === 'home' || stat.section === 'both'
      );
    },
    fallbackStats.filter(stat => stat.section === 'home'),
    'Home stats fetch'
  );
}

/**
 * Get stats for about page
 */
export async function getAboutStats(): Promise<Stat[]> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<StatsResponse>(
        API_ENDPOINTS.stats,
        {
          populate: POPULATE_QUERIES.stats,
          revalidate: 3600,
          next: {
            tags: [CACHE_TAGS.stats],
          },
        }
      );
      
      // Filter for about page stats
      return response.data.filter((stat: Stat) => 
        stat.section === 'about' || stat.section === 'both'
      );
    },
    fallbackStats.filter(stat => stat.section === 'about'),
    'About stats fetch'
  );
}