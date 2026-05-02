import { Hero } from '@/components/landing/hero';
import { getLandingPage } from '@/lib/strapi/queries/landing-page';

/**
 * Hero CMS Wrapper Component
 * Server component that fetches hero data from Strapi and renders Hero component
 */
export async function HeroCMS() {
  const landingPage = await getLandingPage();
  
  // Use 'hero' field from Strapi (not 'heroSection')
  return <Hero data={landingPage.hero} />;
}