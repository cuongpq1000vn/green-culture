import { About } from '@/components/landing/about';
import { getLandingPage, getHomeStats } from '@/lib/strapi/queries/landing-page';

/**
 * About CMS Wrapper Component
 * Server component that fetches about section and stats data from Strapi and renders About component
 */
export async function AboutCMS() {
  const [landingPage, stats] = await Promise.all([
    getLandingPage(),
    getHomeStats(),
  ]);
  
  return <About data={landingPage.aboutSection} stats={stats} />;
}