/**
 * Settings & Navigation Queries
 * 
 * Handles fetching site settings and navigation data from Strapi CMS
 * Falls back to static data when CMS is unavailable
 */

import { fetchStrapiSingle, fetchWithFallback } from '../client';
import { POPULATE_QUERIES, API_ENDPOINTS, CACHE_TAGS } from '../api-contract';
import { fallbackSiteSettings, fallbackNavigation } from '../fallbacks';
import type { SiteSettingsResponse, NavigationResponse, SiteSettings, Navigation } from '../types';

/**
 * Get site settings (logo, contact info, social links, etc.)
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<SiteSettingsResponse>(
        API_ENDPOINTS.SITE_SETTINGS,
        {
          populate: POPULATE_QUERIES.getSiteSettings.populate,
          revalidate: 0, // No caching - always fetch fresh data
          next: {
            tags: [CACHE_TAGS.siteSettings],
          },
        }
      );

      return response.data;
    },
    fallbackSiteSettings,
    'Site settings fetch'
  );
}

/**
 * Get navigation structure (main nav, footer links, etc.)
 */
export async function getNavigation(): Promise<Navigation> {
  return fetchWithFallback(
    async () => {
      const response = await fetchStrapiSingle<NavigationResponse>(
        API_ENDPOINTS.NAVIGATION,
        {
          populate: POPULATE_QUERIES.getNavigation.populate,
          revalidate: 3600, // 1 hour
          next: {
            tags: [CACHE_TAGS.navigation],
          },
        }
      );

      return response.data;
    },
    fallbackNavigation,
    'Navigation fetch'
  );
}

/**
 * Get main navigation items only
 */
export async function getMainNavigation() {
  return fetchWithFallback(
    async () => {
      const navigation = await getNavigation();
      return navigation.mainNav;
    },
    fallbackNavigation.mainNav,
    'Main navigation fetch'
  );
}

/**
 * Get footer navigation links organized by section
 */
export async function getFooterNavigation() {
  return fetchWithFallback(
    async () => {
      const navigation = await getNavigation();
      return {
        company: navigation.footerCompanyLinks || [],
        products: navigation.footerProductLinks || [],
        contact: navigation.footerContactLinks || [],
      };
    },
    {
      company: fallbackNavigation.footerCompanyLinks || [],
      products: fallbackNavigation.footerProductLinks || [],
      contact: fallbackNavigation.footerContactLinks || [],
    },
    'Footer navigation fetch'
  );
}

/**
 * Get combined header data (settings + navigation)
 * Useful for layout components that need both
 */
export async function getHeaderData() {
  return fetchWithFallback(
    async () => {
      const [settings, navigation] = await Promise.all([
        getSiteSettings(),
        getNavigation(),
      ]);

      return {
        logo: settings.logo,
        siteName: settings.siteName,
        mainNav: navigation.mainNav,
      };
    },
    {
      logo: fallbackSiteSettings.logo,
      siteName: fallbackSiteSettings.siteName,
      mainNav: fallbackNavigation.mainNav,
    },
    'Header data fetch'
  );
}

/**
 * Get combined footer data (settings + navigation)
 * Useful for footer component
 */
export async function getFooterData() {
  return fetchWithFallback(
    async () => {
      const [settings, navigation] = await Promise.all([
        getSiteSettings(),
        getNavigation(),
      ]);

      return {
        logo: settings.footerLogo || settings.logo,
        companyDescription: settings.companyDescription,
        copyrightText: settings.copyrightText,
        contactInfo: settings.contactEmail ? {
          email: settings.contactEmail,
          phone: settings.contactPhone,
        } : undefined,
        socialLinks: settings.socialLinks || [],
        footerLinks: {
          company: navigation.footerCompanyLinks || [],
          products: navigation.footerProductLinks || [],
          contact: navigation.footerContactLinks || [],
        },
      };
    },
    {
      logo: fallbackSiteSettings.footerLogo || fallbackSiteSettings.logo,
      companyDescription: fallbackSiteSettings.companyDescription,
      copyrightText: fallbackSiteSettings.copyrightText,
      contactInfo: {
        email: fallbackSiteSettings.contactEmail!,
        phone: fallbackSiteSettings.contactPhone!,
      },
      socialLinks: fallbackSiteSettings.socialLinks || [],
      footerLinks: {
        company: fallbackNavigation.footerCompanyLinks || [],
        products: fallbackNavigation.footerProductLinks || [],
        contact: fallbackNavigation.footerContactLinks || [],
      },
    },
    'Footer data fetch'
  );
}