import { CTA } from '@/components/landing/cta';
import { getLandingPage } from '@/lib/strapi/queries/landing-page';

/**
 * CTA CMS Wrapper Component
 * Server component that fetches CTA section data from Strapi and renders CTA component
 */
export async function CTACMS() {
  const landingPage = await getLandingPage();
  
  return <CTA data={landingPage.ctaSection} />;
}