import { Process } from '@/components/landing/process';
import { getProcessSteps } from '@/lib/strapi/queries/facilities';

/**
 * Process CMS Wrapper Component
 * Server component that fetches process steps data from Strapi and renders Process component
 */
export async function ProcessCMS() {
  const processSteps = await getProcessSteps();
  
  return <Process data={processSteps} />;
}