import { strapiApi } from './client';
import type {
  StrapiResponse,
  StrapiCollectionResponse,
  ProductResponse,
  StatResponse,
  TestimonialResponse,
  GlobalPartnerResponse,
  FacilityResponse,
  ProcessStepResponse,
  BlogPostResponse,
  CertificationResponse,
  ProductCategoryResponse,
  LandingPageResponse,
  SiteSettingResponse,
  NavigationResponse,
  MediaFormat
} from './types';

/**
 * Products API
 */
export async function getProducts(): Promise<ProductResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<ProductResponse>>('/api/products?populate=deep');
  return response.data;
}

export async function getProduct(id: string): Promise<ProductResponse> {
  const response = await strapiApi<StrapiResponse<ProductResponse>>(`/api/products/${id}?populate=deep`);
  return response.data;
}

/**
 * Statistics API
 */
export async function getStats(): Promise<StatResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<StatResponse>>('/api/stats');
  return response.data;
}

/**
 * Testimonials API
 */
export async function getTestimonials(): Promise<TestimonialResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<TestimonialResponse>>('/api/testimonials?populate=deep');
  return response.data;
}

/**
 * Global Partners API
 */
export async function getGlobalPartners(): Promise<GlobalPartnerResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<GlobalPartnerResponse>>('/api/global-partners?populate=deep');
  return response.data;
}

/**
 * Facilities API
 */
export async function getFacilities(): Promise<FacilityResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<FacilityResponse>>('/api/facilities?populate=deep');
  return response.data;
}

/**
 * Process Steps API
 */
export async function getProcessSteps(): Promise<ProcessStepResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<ProcessStepResponse>>('/api/process-steps');
  return response.data;
}

/**
 * Blog Posts API
 */
export async function getBlogPosts(): Promise<BlogPostResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<BlogPostResponse>>('/api/blog-posts?populate=deep');
  return response.data;
}

export async function getBlogPost(id: string): Promise<BlogPostResponse> {
  const response = await strapiApi<StrapiResponse<BlogPostResponse>>(`/api/blog-posts/${id}?populate=deep`);
  return response.data;
}

/**
 * Certifications API
 */
export async function getCertifications(): Promise<CertificationResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<CertificationResponse>>('/api/certifications?populate=deep');
  return response.data;
}

/**
 * Product Categories API
 */
export async function getProductCategories(): Promise<ProductCategoryResponse[]> {
  const response = await strapiApi<StrapiCollectionResponse<ProductCategoryResponse>>('/api/product-categories');
  return response.data;
}

/**
 * Single Types API
 */
export async function getLandingPage(): Promise<LandingPageResponse> {
  const response = await strapiApi<StrapiResponse<LandingPageResponse>>('/api/landing-page?populate=deep');
  return response.data;
}

export async function getSiteSettings(): Promise<SiteSettingResponse> {
  const response = await strapiApi<StrapiResponse<SiteSettingResponse>>('/api/site-setting?populate=deep');
  return response.data;
}

export async function getNavigation(): Promise<NavigationResponse> {
  const response = await strapiApi<StrapiResponse<NavigationResponse>>('/api/navigation?populate=deep');
  return response.data;
}

/**
 * Media helpers
 */
export function getImageUrl(media: MediaFormat | null | undefined, size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string {
  if (!media) return '/images/placeholder.jpg';
  
  const format = media.formats?.[size];
  if (format?.url) {
    return format.url.startsWith('http') ? format.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${format.url}`;
  }
  
  return media.url?.startsWith('http') ? media.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
}

export function getImageAlt(media: MediaFormat | null | undefined): string {
  return media?.alternativeText || media?.name || 'Image';
}