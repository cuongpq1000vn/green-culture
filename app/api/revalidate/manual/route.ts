import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS } from '@/lib/strapi/api-contract';

/**
 * Manual cache clearing endpoint for development/testing
 * 
 * Usage:
 * GET /api/revalidate/manual?token=dev-revalidate-token-2024
 * 
 * This will clear all caches and force fresh data fetch on next request
 */

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'dev-revalidate-token-2024';

export async function GET(request: NextRequest) {
  try {
    // Get token from query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token || token !== REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid or missing token' }, 
        { status: 401 }
      );
    }

    // Revalidate all cache tags
    const allTags = Object.values(CACHE_TAGS);
    for (const tag of allTags) {
      revalidateTag(tag);
    }

    // Revalidate all main paths
    const paths = ['/', '/about', '/products', '/factory', '/news'];
    for (const path of paths) {
      revalidatePath(path);
    }

    console.log('Manual cache revalidation completed');
    console.log('- Cleared tags:', allTags);
    console.log('- Cleared paths:', paths);

    return NextResponse.json({
      message: 'All caches cleared successfully',
      revalidated: {
        tags: allTags,
        paths: paths,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Manual revalidation error:', error);
    
    return NextResponse.json(
      { 
        message: 'Revalidation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}