import { StatsBar } from '@/components/landing/stats-bar';
import { getHomeStats } from '@/lib/strapi/queries/landing-page';

/**
 * Stats Bar CMS Wrapper Component
 * Server component that fetches home stats data from Strapi and renders StatsBar component
 */
export async function StatsBarCMS() {
  const stats = await getHomeStats();
  
  return <StatsBar data={stats} />;
}