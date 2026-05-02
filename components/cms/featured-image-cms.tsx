import { FeaturedImage } from '@/components/landing/featured-image';
import { getLandingPage } from '@/lib/strapi/queries/landing-page';

/**
 * Featured Image CMS Wrapper Component
 * Server component that fetches featured image data from Strapi and renders FeaturedImage component
 */
export async function FeaturedImageCMS() {
  const landingPage = await getLandingPage();
  
  // Use featured image from landing page if available
  const featuredImageData = landingPage.featuredImage || undefined;
  
  return <FeaturedImage data={featuredImageData} />;
}