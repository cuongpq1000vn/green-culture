/**
 * Development utility to force cache refresh
 * Use this when you need to immediately see Strapi content changes
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS } from '@/lib/strapi/api-contract';

// Clear all Next.js caches programmatically
export async function clearAllCaches() {
  // Revalidate all cache tags
  Object.values(CACHE_TAGS).forEach(tag => {
    revalidateTag(tag);
  });

  // Revalidate all main paths
  const paths = ['/', '/about', '/products', '/factory', '/news'];
  paths.forEach(path => {
    revalidatePath(path);
  });

  console.log('🗑️ All caches cleared at', new Date().toISOString());
}

// Force browser cache refresh by adding timestamp to requests
export function getBustCacheUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set('_bust', Date.now().toString());
  return url.toString();
}

// Development-only cache status checker
export function logCacheStatus() {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Development Mode: All caches disabled');
    console.log('📍 Strapi URL:', process.env.STRAPI_URL);
    console.log('🔑 Has API Token:', !!process.env.STRAPI_API_TOKEN);
    console.log('⏰ Cache bust timestamp:', Date.now());
  }
}