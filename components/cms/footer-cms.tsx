import { Footer } from '@/components/landing/footer';
import { getSiteSettings, getNavigation } from '@/lib/strapi/queries/settings';

/**
 * Footer CMS Wrapper Component
 * Server component that fetches navigation and site settings from Strapi and renders Footer component
 */
export async function FooterCMS() {
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
  ]);
  
  return <Footer siteSettings={siteSettings} navigation={navigation} />;
}