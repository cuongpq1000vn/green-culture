import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS } from '@/lib/strapi/api-contract';

/**
 * Webhook endpoint for Strapi to trigger cache revalidation
 * Call this endpoint when content changes in Strapi CMS
 * 
 * Usage:
 * POST /api/revalidate
 * Headers: { "x-revalidate-token": "your-secret-token" }
 * Body: { "contentType": "landing-page" | "products" | "blog-posts", "action": "update" | "create" | "delete" }
 */

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'dev-token-change-in-production';

// Map Strapi content types to cache tags and paths
const REVALIDATION_MAP = {
  'landing-page': {
    tags: [CACHE_TAGS.landingPage, CACHE_TAGS.stats],
    paths: ['/']
  },
  'products': {
    tags: [CACHE_TAGS.products],
    paths: ['/products', '/']
  },
  'blog-posts': {
    tags: [CACHE_TAGS.blogPosts],
    paths: ['/news', '/']
  },
  'testimonials': {
    tags: [CACHE_TAGS.testimonials],
    paths: ['/about', '/']
  },
  'facilities': {
    tags: [CACHE_TAGS.facilities],
    paths: ['/factory', '/']
  },
  'process-steps': {
    tags: [CACHE_TAGS.processSteps],
    paths: ['/factory', '/']
  },
  'global-partners': {
    tags: [CACHE_TAGS.globalPartners],
    paths: ['/about', '/']
  },
  'stats': {
    tags: [CACHE_TAGS.stats],
    paths: ['/about', '/']
  }
} as const;

type ContentType = keyof typeof REVALIDATION_MAP;

interface RevalidateBody {
  contentType: ContentType;
  action: 'create' | 'update' | 'delete';
  slug?: string; // Optional for specific item revalidation
}

export async function POST(request: NextRequest) {
  try {
    // Verify authorization token
    const token = request.headers.get('x-revalidate-token');
    
    if (!token || token !== REVALIDATE_TOKEN) {
      console.error('Invalid revalidation token');
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Parse request body
    const body: RevalidateBody = await request.json();
    const { contentType, action, slug } = body;

    if (!contentType || !action) {
      return NextResponse.json(
        { message: 'Missing contentType or action' }, 
        { status: 400 }
      );
    }

    // Get revalidation config for content type
    const config = REVALIDATION_MAP[contentType];
    
    if (!config) {
      return NextResponse.json(
        { message: `Unknown contentType: ${contentType}` }, 
        { status: 400 }
      );
    }

    // Revalidate cache tags
    const revalidatedTags: string[] = [];
    for (const tag of config.tags) {
      revalidateTag(tag);
      revalidatedTags.push(tag);
    }

    // Revalidate paths
    const revalidatedPaths: string[] = [];
    for (const path of config.paths) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }

    // Handle specific slug revalidation
    if (slug) {
      if (contentType === 'blog-posts') {
        const slugPath = `/news/${slug}`;
        revalidatePath(slugPath);
        revalidatedPaths.push(slugPath);
      } else if (contentType === 'products') {
        const slugPath = `/products#${slug}`; // Products use hash navigation
        revalidatePath('/products');
        revalidatedPaths.push('/products (with slug)');
      }
    }

    console.log(`Cache revalidated for ${contentType} (${action}):`);
    console.log('- Tags:', revalidatedTags);
    console.log('- Paths:', revalidatedPaths);

    return NextResponse.json({
      message: 'Cache revalidated successfully',
      contentType,
      action,
      slug,
      revalidated: {
        tags: revalidatedTags,
        paths: revalidatedPaths,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { message: 'Revalidation endpoint. Use POST with proper token.' },
    { status: 405 }
  );
}