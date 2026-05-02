import { GlobalPartners } from '@/components/landing/global-partners';
import { getGlobalPartners } from '@/lib/strapi/queries/partners';

/**
 * Global Partners CMS Wrapper Component
 * Server component that fetches global partners data from Strapi and renders GlobalPartners component
 */
export async function GlobalPartnersCMS() {
  const partners = await getGlobalPartners();
  
  return <GlobalPartners data={partners} />;
}