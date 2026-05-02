/**
 * Strapi Media Utilities
 * 
 * Helper functions for working with Strapi media files,
 * including URL generation and Next.js Image component props.
 */

import type { StrapiMedia, StrapiImageFormat } from '../types';
import { API_CONFIG } from '../api-contract';

/**
 * Get the full URL for a Strapi media file
 */
export function getStrapiMediaUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // If it's already a full URL (e.g., from Cloudinary), return as-is
  if (url.startsWith('http')) return url;
  
  // If it's a local Next.js public path (fallback images), return as-is
  // This includes /images/, /icons/, and other public static assets
  if (url.startsWith('/images/') || 
      url.startsWith('/icon') || 
      url.startsWith('/favicon') || 
      url.endsWith('.ico') || 
      url.endsWith('.svg') || 
      url.endsWith('.png') && !url.startsWith('/uploads/')) {
    // Debug log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[getStrapiMediaUrl] Local asset detected: ${url}`);
    }
    return url;
  }
  
  // If it starts with /, prepend base URL (for CMS uploads)
  if (url.startsWith('/')) {
    const fullUrl = `${API_CONFIG.PUBLIC_URL}${url}`;
    // Debug log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[getStrapiMediaUrl] CMS asset: ${url} -> ${fullUrl}`);
    }
    return fullUrl;
  }
  
  // Otherwise, assume it's a relative path
  return `${API_CONFIG.PUBLIC_URL}/${url}`;
}

/**
 * Get the best format URL for a given breakpoint
 */
export function getStrapiImageUrl(
  media: StrapiMedia | undefined | null,
  format: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string {
  if (!media) return '';

  // If requesting original or no formats available, return main URL
  if (format === 'original' || !media.formats) {
    return getStrapiMediaUrl(media.url);
  }

  // Try to get the requested format
  const formatUrl = media.formats[format]?.url;
  if (formatUrl) {
    return getStrapiMediaUrl(formatUrl);
  }

  // Fallback to original if format not available
  return getStrapiMediaUrl(media.url);
}

/**
 * Generate props for Next.js Image component with responsive srcSet
 */
export function getStrapiImageProps(
  media: StrapiMedia | undefined | null,
  options: {
    alt?: string;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    fill?: boolean;
    width?: number;
    height?: number;
  } = {}
) {
  if (!media) {
    return {
      src: '',
      alt: options.alt || '',
      width: options.width || 800,
      height: options.height || 600,
    };
  }

  const {
    alt = media.alternativeText || media.name || '',
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority = false,
    quality = 75,
    fill = false,
    width = media.width,
    height = media.height,
  } = options;

  const baseProps = {
    src: getStrapiMediaUrl(media.url),
    alt,
    priority,
    quality,
    sizes,
  };

  if (fill) {
    return {
      ...baseProps,
      fill: true,
    };
  }

  return {
    ...baseProps,
    width: width || 800,
    height: height || 600,
  };
}

/**
 * Generate a responsive srcSet for manual use
 */
export function getStrapiImageSrcSet(
  media: StrapiMedia | undefined | null
): string {
  if (!media?.formats) return '';

  const srcSet: string[] = [];

  // Add available formats with their widths
  if (media.formats.thumbnail) {
    srcSet.push(`${getStrapiMediaUrl(media.formats.thumbnail.url)} ${media.formats.thumbnail.width}w`);
  }
  if (media.formats.small) {
    srcSet.push(`${getStrapiMediaUrl(media.formats.small.url)} ${media.formats.small.width}w`);
  }
  if (media.formats.medium) {
    srcSet.push(`${getStrapiMediaUrl(media.formats.medium.url)} ${media.formats.medium.width}w`);
  }
  if (media.formats.large) {
    srcSet.push(`${getStrapiMediaUrl(media.formats.large.url)} ${media.formats.large.width}w`);
  }

  // Add original as fallback
  if (media.width) {
    srcSet.push(`${getStrapiMediaUrl(media.url)} ${media.width}w`);
  }

  return srcSet.join(', ');
}

/**
 * Get the optimal image format for a given container width
 */
export function getOptimalImageFormat(
  containerWidth: number
): 'thumbnail' | 'small' | 'medium' | 'large' | 'original' {
  if (containerWidth <= 156) return 'thumbnail';
  if (containerWidth <= 500) return 'small';
  if (containerWidth <= 750) return 'medium';
  if (containerWidth <= 1200) return 'large';
  return 'original';
}

/**
 * Generate CSS background image style with multiple formats for better performance
 */
export function getStrapiBackgroundImageStyle(
  media: StrapiMedia | undefined | null,
  format: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'large'
): React.CSSProperties {
  if (!media) {
    return {};
  }

  const imageUrl = getStrapiImageUrl(media, format);
  
  return {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
}

/**
 * Validate if media object has required properties
 */
export function isValidStrapiMedia(media: any): media is StrapiMedia {
  return (
    media &&
    typeof media === 'object' &&
    typeof media.id === 'number' &&
    typeof media.url === 'string' &&
    typeof media.name === 'string'
  );
}

/**
 * Get media metadata for analytics or debugging
 */
export function getStrapiMediaMetadata(media: StrapiMedia | undefined | null) {
  if (!media) return null;

  return {
    id: media.id,
    name: media.name,
    alt: media.alternativeText,
    width: media.width,
    height: media.height,
    size: media.formats ? Object.keys(media.formats).length : 0,
    url: getStrapiMediaUrl(media.url),
  };
}