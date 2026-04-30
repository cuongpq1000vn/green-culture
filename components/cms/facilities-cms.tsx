import { Facilities } from '@/components/landing/facilities';
import { getFacilities } from '@/lib/strapi/queries/facilities';

/**
 * Facilities CMS Wrapper Component
 * Server component that fetches facilities data from Strapi and renders Facilities component
 */
export async function FacilitiesCMS() {
  const facilities = await getFacilities();
  
  return <Facilities data={facilities} />;
}