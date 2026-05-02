import { Facilities } from '@/components/landing/facilities';
import { getFacilities } from '@/lib/strapi/queries/facilities';
import { getLandingPage } from '@/lib/strapi/queries/landing-page';

/**
 * Facilities CMS Wrapper Component
 * Server component that fetches facilities data from Strapi and renders Facilities component
 */
export async function FacilitiesCMS() {
  const [facilities, landingPage] = await Promise.all([
    getFacilities(),
    getLandingPage(),
  ]);
  
  // Extract facilities section header from landing page if available
  const sectionHeader = landingPage.facilitiesSection ? {
    badge: landingPage.facilitiesSection.subtitle,
    title: landingPage.facilitiesSection.title,
    description: landingPage.facilitiesSection.description || "Our modern facilities combine traditional expertise with advanced technology, featuring practical infrastructure designed to support export-ready standards.",
    buttonText: landingPage.facilitiesSection.buttonText || "Learn More",
    buttonHref: landingPage.facilitiesSection.buttonHref || "/factory",
  } : undefined;
  
  return <Facilities data={facilities} sectionHeader={sectionHeader} />;
}