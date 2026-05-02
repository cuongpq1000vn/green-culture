import { Testimonials } from '@/components/landing/testimonials';
import { getTestimonials } from '@/lib/strapi/queries/testimonials';

/**
 * Testimonials CMS Wrapper Component
 * Server component that fetches testimonials data from Strapi and renders Testimonials component
 */
export async function TestimonialsCMS() {
  const testimonials = await getTestimonials();
  
  return <Testimonials data={testimonials} />;
}