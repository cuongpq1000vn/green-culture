import { Header } from '@/components/landing/header';
import { getSiteSettings, getNavigation } from '@/lib/strapi/queries/settings';

/**
 * Header CMS Wrapper Component
 * Server component that fetches navigation and site settings from Strapi and renders Header component
 */
export async function HeaderCMS() {
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
  ]);
  
  return <Header siteSettings={siteSettings} navigation={navigation} />;
}